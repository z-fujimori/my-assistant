use std::collections::{BTreeMap};
use futures::TryStreamExt;
use sqlx::{Row, SqlitePool};

use crate::{GetTask, InputTask, Project, UpdateUrl};

type DbResult<T> = Result<T, Box<dyn std::error::Error>>;

pub(crate) async fn get_all_tasks(pool: &SqlitePool) -> DbResult<Vec<GetTask>> {
  const SQL: &str = " \
  WITH sorted_projects AS ( \
    SELECT task_id, json_group_array(json_object('id', id, 'rep_url', rep_url)) AS projects \
    FROM projects GROUP BY task_id \
  ) \
  SELECT t.id, t.name, COALESCE(sp.projects, '[]') AS projects \
  FROM tasks t \
  LEFT JOIN sorted_projects sp  \
  ON t.id = sp.task_id";
  
  let mut rows = sqlx::query(SQL).fetch(pool);
  let mut tasks = BTreeMap::new();
  while let Some(row) = rows.try_next().await? {
    let id: i64 = row.try_get("id")?;
    let name: &str = row.try_get("name")?;
    let projects: Vec<Project> = serde_json::from_str(row.try_get("projects")?)?;
    // let projects: Result<String, sqlx::Error> = row.try_get("projects");
    tasks.insert(id, GetTask::new(id, name, projects));
  }

  Ok(tasks.into_iter().map(|(_k, v)| v).collect())
}

pub(crate) async fn insert_task(pool: &SqlitePool, task: InputTask) -> DbResult<()> {
  println!("{:?}",task);
  // トランザクションを開始する
  let mut tx = pool.begin().await?;
  // 挿入
  sqlx::query("INSERT INTO tasks (name) VALUES (?)")
    .bind(task.name)
    .execute(&mut *tx)
    .await?;
  // トランザクションをコミット
  tx.commit().await?;
  Ok(())
}

