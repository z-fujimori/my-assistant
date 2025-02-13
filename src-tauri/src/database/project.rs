use std::collections::{BTreeMap};
use anyhow::Result;
use chrono::{Datelike, Local, Timelike};
use futures::TryStreamExt;
use serde::{Deserialize, Serialize};
use sqlx::{Error, Row, SqlitePool};

use crate::{GetProject, InsertProject, UpdateUrl};

type DbResult<T> = Result<T, Box<dyn std::error::Error>>;

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Branch {
  id: i64,
  name: String,
  is_working: i8
}
#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Branches {
  branches: Vec<Branch>
}
#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct ProjectWithBranch {
  id: i64,
  task_id: i64,
  rep_url: String,
  last_date: String,
  pub branches: Vec<Branch>
}
impl ProjectWithBranch {
  pub fn new(  id: i64, task_id: i64, rep_url: String, last_date: String, branches: Vec<Branch>) -> Self {
    ProjectWithBranch {
      id: id,
      task_id: task_id,
      rep_url: rep_url,
      last_date: last_date,
      branches: branches
    }
  }
}

pub(crate) async fn get_all_projects(pool: &SqlitePool) -> DbResult<Vec<GetProject>> {
  const SQL: &str = "SELECT * from projects";
  let mut rows = sqlx::query(SQL).fetch(pool);
  let mut projects = BTreeMap::new();
  while let Some(row) = rows.try_next().await? {
    let id:i64 = row.try_get("id")?;
    let task_id: i64 = row.try_get("task_id")?;
    let rep_url: String = row.try_get("rep_url")?;
    let last_date: String = row.try_get("last_date")?;

    projects.insert(id, GetProject{id, task_id, rep_url, last_date});
  }
  Ok(projects.into_iter().map(|(_k, v)| v).collect())
}

pub(crate) async fn get_project(pool: &SqlitePool, project_id: i64) -> Result<GetProject> {
  let row = sqlx::query("SELECT * FROM projects WHERE id = ?")
  .bind(project_id)
  .fetch_optional(pool)
  .await?;
  // fetch(pool) は ストリームを返す ため、すぐに Option<T> として扱えない。fetch_optional(pool) を使うと、結果が0件なら None を返し、1件なら Some(row) を返す。

  match row {
    Some(row) => {
        let id: i64 = row.try_get("id")?;
        let task_id: i64 = row.try_get("task_id")?;
        let rep_url: String = row.try_get("rep_url")?;
        let last_date: String = row.try_get("last_date")?;

        Ok(GetProject { id, task_id, rep_url, last_date })
    }
    None => Err(sqlx::Error::RowNotFound.into()), // ★ データがない場合のエラーハンドリング
  }
}

pub(crate) async fn update_last_date(pool: &SqlitePool, project_id: i64, last_date:String) -> Result<(), sqlx::Error> {
  let result = sqlx::query("UPDATE projects SET last_date = ? WHERE id = ?")
  .bind(last_date)
  .bind(project_id)
  .execute(pool)
  .await?;

  if result.rows_affected() == 0 {
    Err(sqlx::Error::RowNotFound)
  } else {
    Ok(())
  }
}

pub(crate)  async fn get_project_with_branches(pool: &SqlitePool, project_id: i64) -> Result<ProjectWithBranch> {
  let sql_query = format!(
    "SELECT *, COALESCE(
      (
          SELECT json_group_array(
            json_object('id',id,'name',name,'is_working',is_working))
            FROM (SELECT * FROM branches WHERE projects.id = branches.project_id)),
          '[]'
      ) 
      AS branches
  FROM projects
  WHERE id = {};"
  , project_id);

  let mut rows = sqlx::query(&sql_query).fetch(pool);
  let mut project = vec![];

  while let Some(row) = rows.try_next().await? {
    let id: i64 = row.try_get("id")?;
    let task_id: i64 = row.try_get("task_id")?;
    let rep_url: String = row.try_get("rep_url")?;
    let last_date: String = row.try_get("last_date")?;
    let branches: Vec<Branch> = serde_json::from_str(row.try_get("branches")?)?;
    
    project.push(ProjectWithBranch{task_id:task_id, id: id, rep_url: rep_url, last_date: last_date, branches: branches});
  }
  let pro = project[0].clone();
  Ok(pro)
}

pub(crate) async fn insert_project(pool: &SqlitePool, data: InsertProject) -> DbResult<()> {
  let mut tx = pool.begin().await?;
  let now = Local::now();
  let into_date = format!(
    "{:04}-{:02}-{:02} {:02}:{:02}:{:02}",
    now.year(), now.month(), now.day(),
    now.hour(), now.minute(), now.second()
  );
  // 挿入
  sqlx::query("INSERT INTO projects (rep_url, task_id, last_date) VALUES (?, ?, ?)")
    .bind(data.url)
    .bind(data.task_id)
    .bind(into_date)
    .execute(&mut *tx)
    .await?;
  tx.commit().await?;
  Ok(())
}

pub(crate) async fn update_url(pool: &SqlitePool, data: UpdateUrl) -> DbResult<()> {
  let mut tx = pool.begin().await?;
  // 挿入
  sqlx::query("UPDATE projects SET rep_url = (?) WHERE id = (?)")
    .bind(data.url)
    .bind(data.id)
    .execute(&mut *tx)
    .await?;
  tx.commit().await?;
  Ok(())
}

pub(crate) async fn delete_project(pool: &SqlitePool, id: i64) ->DbResult<()> {
  let mut tx = pool.begin().await?;
  // 挿入
  sqlx::query("DELETE FROM projects WHERE id = (?)")
    .bind(id)
    .execute(&mut *tx)
    .await?;
  tx.commit().await?;
  Ok(())
}

pub(crate) async fn get_project_belongs_task(pool: &SqlitePool, task_id: i64) -> Result<Vec<GetProject>> {
  let SQL = format!("SELECT * from projects where task_id = {}",task_id);
  let mut rows = sqlx::query(&SQL).fetch(pool);
  let mut projects = BTreeMap::new();
  while let Some(row) = rows.try_next().await? {
    let id:i64 = row.try_get("id")?;
    let task_id: i64 = row.try_get("task_id")?;
    let rep_url: String = row.try_get("rep_url")?;
    let last_date: String = row.try_get("last_date")?;

    projects.insert(id, GetProject{id, task_id, rep_url, last_date});
  }
  Ok(projects.into_iter().map(|(_k, v)| v).collect())
}
