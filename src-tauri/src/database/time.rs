use std::{collections::BTreeMap};
use crate::{database::{github, project}, DailyTime, GetTime, InputTime};
use futures::TryStreamExt;
use sqlx::{Row, SqlitePool};

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

  github::check_code_changes(pool, time.task_id).await?;

  // トランザクションをコミットする
  tx.commit().await?;
  Ok(())
}

pub(crate) async fn get_daily_time(pool: &SqlitePool, head_day: &str, tail_day: &str) -> DbResult<Vec<DailyTime>> {
  let sql_query = format!(
    "SELECT 
      DATE(start_time) as start_date, 
      SUM(work_time) as total_time, 
      SUM(additions) as total_add, 
      SUM(deletions) as total_del 
      FROM times 
      WHERE DATE('{}') < start_date 
      AND DATE('{}') >= start_date 
      GROUP BY start_date ORDER BY start_date;",
      head_day, tail_day
  );
  let mut rows = sqlx::query(&sql_query).fetch(pool);
  let mut times = vec![];

  while let Some(row) = rows.try_next().await? {
    let day: String = row.try_get("start_date")?;
    let time: i64 = row.try_get("total_time")?;
    let add: i64 = row.try_get("total_add")?;
    let del: i64 = row.try_get("total_del")?;
    // times.insert(DailyTime::new(day, time, add, del));
    times.push(DailyTime::new(day, time, add, del));
  }
  Ok(times)
}
