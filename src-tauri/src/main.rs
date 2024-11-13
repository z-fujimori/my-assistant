// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use serde::{Deserialize, Serialize};
use tauri::{Manager, State};
pub(crate) mod database;

#[derive(Debug, Serialize, Deserialize)]
pub struct InputTime{
    // id: i64,
    title_id: i64,
    start_time: String,
    end_time: String
}
#[derive(Debug, Serialize, Deserialize)]
pub struct GetTime{
    id: i64,
    title_id: i64,
    title: String,
    start_time: String,
    end_time: String
}
impl GetTime {
}
#[derive(Debug, Serialize, Deserialize)]
pub struct Times{
    times: Vec<GetTime>,
}
#[derive(Debug, Serialize, Deserialize)]
pub struct InputTitle {
    title: String,
}
#[derive(Debug, Serialize, Deserialize)]
pub struct  GetTitle{
    id: i64,
    title: String,
}
impl GetTitle {
    pub fn new(id: i64, title: &str) -> Self {
        GetTitle { 
            id: id, 
            title: title.to_string(), 
        }
    }
}
#[derive(Debug, Serialize, Deserialize)]
pub struct Titles{
    titles: Vec<GetTitle>,
}

#[tauri::command]
async fn get_titles(sqlite_pool: State<'_, sqlx::SqlitePool>) -> Result<Titles, String> {
    let titles = database::get_titles(&sqlite_pool)
        .await
        .map_err(|e| e.to_string())?;
    Ok(Titles { titles })
}
#[tauri::command]
async fn handle_add_time (
    sqlite_pool: State<'_, sqlx::SqlitePool>,
    time: InputTime
) -> Result<(), String> {
    database::insert_time(&*sqlite_pool, time)
        .await
        .map_err(|e| e.to_string())?;

    Ok(())
}
#[tauri::command]
async fn handle_add_title (
    sqlite_pool: State<'_, sqlx::SqlitePool>,
    title: InputTitle,
) ->  Result<(), String> {
    database::insert_title(&*sqlite_pool, title)
        .await
        .map_err(|e| e.to_string())?;
    Ok(())
}
#[tauri::command]
async fn get_all_times(sqlite_pool:  State<'_, sqlx::SqlitePool>) -> Result<Times, String> {
    let times = database::get_all_times(&sqlite_pool)
        .await
        .map_err(|e| e.to_string())?;
    Ok(Times { times })
}

fn main() -> Result<(), Box<dyn std::error::Error>> {
    // my_assistant_lib::run()
    use tauri::async_runtime::block_on;

    // データベースのファイルパス等を設定する
    const DATABASE_DIR: &str = "my-asi-db";
    const DATABASE_FILE: &str = "db.sqlite";
    // ユーザのホームディレクトリ直下にデータベースのディレクトリを作成する
    // もし、各OSで標準的に使用されるアプリ専用のデータディレクトリに保存したいなら
    // directoriesクレートの`ProjectDirs::data_dir`メソッドなどを使うとよい
    // https://docs.rs/directories/latest/directories/struct.ProjectDirs.html#method.data_dir
    let home_dir = directories::UserDirs::new()
        .map(|dirs| dirs.home_dir().to_path_buf())
        // ホームディレクトリが取得できないときはカレントディレクトリを使う
        .unwrap_or_else(|| std::env::current_dir().expect("Cannot access the current directory"));
    let database_dir = home_dir.join(DATABASE_DIR);
    let database_file = database_dir.join(DATABASE_FILE);

    // データベースファイルが存在するかチェックする
    let db_exists = std::fs::metadata(&database_file).is_ok();
    // 存在しないなら、ファイルを格納するためのディレクトリを作成する
    if !db_exists {
        std::fs::create_dir(&database_dir)?;
    }

    // データベースURLを作成する
    //
    // std::fs::canonicalizeを、dunce::canonicalizeに変更
    //
    //     stdのcanonicalizeは、Windows環境ではUNCパス（例：\\?\C:\Users\..）を返すが、
    //     それを元にURLを作成するとSQLiteが受け付けないものになってしまう。dunceの
    //     canonicalizeは普通のパス（例：C:\Users\）を返すので、それを使えばWindowsでも動く。
    //
    //     詳細: https://github.com/tatsuya6502/gihyo-tauri-kanban/pull/1
    let database_dir_str = dunce::canonicalize(&database_dir)
        .unwrap()
        .to_string_lossy()
        .replace('\\', "/");
    let database_url = format!("sqlite://{}/{}", database_dir_str, DATABASE_FILE);    
    
    // デバックdb確認
    if cfg!(debug_assertions) {
        println!("DBのパス(debug) {}", database_url);
    }

    // SQLiteのコネクションプールを作成する
    let sqlite_pool = block_on(database::create_sqlite_pool(&database_url))?;
    
    //  データベースファイルが存在しなかったなら、マイグレーションSQLを実行する
    if !db_exists {
        println!("db作成開始");
        block_on(database::migrate_database(&sqlite_pool))?;
        println!("db作成完了");
    }

    // デバックdb確認
    if cfg!(debug_assertions) {
        println!("{}", db_exists);
        block_on(database::show_tables(&sqlite_pool))?;
    }
    
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            handle_add_time,
            get_titles,
            handle_add_title,
            get_all_times,
        ])
        // ハンドラからコネクションプールにアクセスできるよう、登録する
        .setup(|app| {
            app.manage(sqlite_pool);
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");

    Ok(())
}

