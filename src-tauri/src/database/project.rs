use std::collections::{BTreeMap};
use futures::TryStreamExt;
use sqlx::{Row, SqlitePool};

use crate::{GetProject, GetTask, InputTask, Project, UpdateUrl};

type DbResult<T> = Result<T, Box<dyn std::error::Error>>;


pub(crate) async fn get_all_projects(pool: &SqlitePool) -> DbResult<Vec<GetProject>> {
  const SQL: &str = "SELECT * from projects";
  let mut rows = sqlx::query(SQL).fetch(pool);
  let mut projects = BTreeMap::new();
  while let Some(row) = rows.try_next().await? {
    let id:i64 = row.try_get("id")?;
    let task_id: i64 = row.try_get("task_id")?;
    let rep_url: String = row.try_get("rep_url")?;
    let pull_num: i64 = row.try_get("pull_num")?;

    projects.insert(id, GetProject{id, task_id, rep_url, pull_num});
  }
  Ok(projects.into_iter().map(|(_k, v)| v).collect())
}

pub(crate) async fn update_url(pool: &SqlitePool, data: UpdateUrl) -> DbResult<()> {
  println!("url:{}  id:{}", data.url.clone(), data.id.clone());
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
