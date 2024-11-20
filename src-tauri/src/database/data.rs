use std::{collections::BTreeMap, str::FromStr};
// use chrono::{DateTime, NaiveDateTime, Local};
use futures::TryStreamExt;
use sqlx::{
    sqlite::{SqliteConnectOptions, SqliteJournalMode, SqlitePoolOptions, SqliteSynchronous}, Row, Sqlite, SqlitePool, Transaction 
};

use crate::{GetTime, GetTask, InputTime, InputTask};

/// このモジュール内の関数の戻り値型
type DbResult<T> = Result<T, Box<dyn std::error::Error>>;

/// SQLiteのコネクションプールを作成して返す
pub(crate) async fn create_sqlite_pool(database_url: &str) -> DbResult<SqlitePool> {
  // コネクションの設定
  let connection_options = SqliteConnectOptions::from_str(database_url)?
    // DBが存在しないなら作成する
    .create_if_missing(true)
    // トランザクション使用時の性能向上のため、WALを使用する
    .journal_mode(SqliteJournalMode::Wal)
    .synchronous(SqliteSynchronous::Normal);

  // 上の設定を使ってコネクションプールを作成する
  let sqlite_pool = SqlitePoolOptions::new()
    .connect_with(connection_options)
    .await?;

  Ok(sqlite_pool)
}
// マイグレーションを行う
pub(crate) async fn migrate_database(pool: &SqlitePool) -> DbResult<()> {
  println!("マイグレーション実行");
  // let pool = SqlitePoolOptions::new().connect("sqlite::memory:").await?;
  sqlx::migrate!("./db").run(pool).await?;
  Ok(())
}
#[cfg(debug_assertions)] // リリースビルドでは無視
pub(crate) async fn show_tables(pool: &SqlitePool) -> DbResult<()> {
  let rows = sqlx::query(
    &format!("SELECT {} FROM times", "*")
  )
  .fetch_all(pool)
  .await?;
  // .expect("failed to get value")

  for row in rows {
    let id: i64 = row.get("id");
    let task_id: i64 = row.get("task_id");
    let start_time: String = row.get("start_time");
    let end_time: String = row.get("end_time");

    println!("id: {}, task_id: {}, start_time: {}, end_time: {}", id, task_id, start_time, end_time);
  }

  Ok(())
}
pub(crate) async fn get_all_tasks(pool: &SqlitePool) -> DbResult<Vec<GetTask>> {
  const SQL: &str = "SELECT * FROM tasks ORDER BY id ASC";
  let mut rows = sqlx::query(SQL).fetch(pool);
  
  let mut tasks = BTreeMap::new();
  while let Some(row) = rows.try_next().await? {
    let id: i64 = row.try_get("id")?;
    let name: &str = row.try_get("name")?;
    tasks.insert(id, GetTask::new(id, name));
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
pub(crate) async fn insert_time(pool: &SqlitePool, time: InputTime) -> DbResult<()> {
  // トランザクションを開始する
  let mut tx = pool.begin().await?;
  // テーブルに挿入
  sqlx::query("INSERT INTO times (task_id, start_time, end_time) VALUES (?, ?, ?)")
    // .bind(time.id)
    .bind(time.task_id)
    .bind(time.start_time)
    .bind(time.end_time)
    .execute(pool)
    .await?;

  // トランザクションをコミットする
  tx.commit().await?;
  Ok(())
}
