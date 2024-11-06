use std::{str::FromStr};

use sqlx::{
    sqlite::{SqliteConnectOptions, SqliteJournalMode, SqlitePoolOptions, SqliteSynchronous}, Row, Sqlite, SqlitePool, Transaction 
};

use crate::Time;

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
pub(crate) async fn show_tables(pool: &SqlitePool) -> DbResult<()> {
    // let dynamic_column = "title";
    let rows = sqlx::query(
            &format!("SELECT {} FROM times", "*")
        )
        .fetch_all(pool)
        .await?;
        // .expect("failed to get value")

        for row in rows {
            let id: i64 = row.get("id");
            let title: String = row.get("title");
            let start_time: i64 = row.get("start_time");
            let end_time: i64 = row.get("end_time");
    
            println!("id: {}, title: {}, start_time: {}, end_time: {}", id, title, start_time, end_time);
        }

        Ok(())
}

pub(crate) async fn insert_time(pool: &SqlitePool, time: Time) -> DbResult<()> {
    // トランザクションを開始する
    let mut tx = pool.begin().await?;
    // テーブルに挿入
    sqlx::query("INSERT INTO times (id, title, start_time, end_time) VALUES (?, ?, ?, ?)")
        .bind(time.id)
        .bind(time.title)
        .bind(time.start_time)
        .bind(time.end_time)
        .execute(pool)
        .await?;

    // トランザクションをコミットする
    tx.commit().await?;

    Ok(())
}

