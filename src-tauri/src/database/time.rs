use std::collections::BTreeMap;
use crate::{GetTime, InputTime};
use futures::TryStreamExt;
use sqlx::{Row, SqlitePool};
use chrono::TimeDelta;

type DbResult<T> = Result<T, Box<dyn std::error::Error>>;

pub(crate) async fn get_all_times(pool: &SqlitePool) -> DbResult<Vec<GetTime>> {
  const SQL: &str = "SELECT times.id, tasks.id as task_id, tasks.name, times.start_time, times.end_time \
  FROM times \
  INNER JOIN tasks \
  ON times.task_id = tasks.id \
  ORDER BY times.id DESC";
  let mut rows = sqlx::query(SQL).fetch(pool);
  let mut times = BTreeMap::new();
  while let Some(row) = rows.try_next().await? {
    let id:i64 = row.try_get("id")?;
    let task_id = row.try_get("task_id")?;
    let task = row.try_get("name")?;
    let start_time = row.try_get("start_time")?;
    let end_time = row.try_get("end_time")?;

    times.insert(id, GetTime{id, task_id, task, start_time, end_time});
  }
  Ok(times.into_iter().map(|(_k, v)| v).collect())
}
pub(crate) async fn insert_time(pool: &SqlitePool, time: InputTime, work_time: i64) -> DbResult<()> {
  // トランザクションを開始する
  let mut tx = pool.begin().await?;
  // テーブルに挿入
  sqlx::query("INSERT INTO times (task_id, start_time, end_time, work_time) VALUES (?, ?, ?, ?)")
    // .bind(time.id)
    .bind(time.task_id)
    .bind(time.start_time)
    .bind(time.end_time)
    .bind(work_time)
    .execute(pool)
    .await?;

  // トランザクションをコミットする
  tx.commit().await?;
  Ok(())
}
