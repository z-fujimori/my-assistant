// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use directories::ProjectDirs;
use serde::{Deserialize, Serialize};
use tauri::{Manager, State};
pub(crate) mod database;
use crate::database::{data, task, time, project};
use chrono::{DateTime, Local, NaiveDateTime, TimeZone};


#[derive(Debug, Serialize, Deserialize)]
pub struct InputTime{
  // id: i64,
  task_id: i64,
  start_time: String,
  end_time: String
}
#[derive(Debug, Serialize, Deserialize)]
pub struct GetTime{
  id: i64,
  task_id: i64,
  task: String,
  start_time: String,
  end_time: String,
}
impl GetTime {
}
#[derive(Debug, Serialize, Deserialize)]
pub struct Times{
  times: Vec<GetTime>,
}
#[derive(Debug, Serialize, Deserialize)]
pub struct InputTask {
  name: String,
}
#[derive(Debug, Serialize, Deserialize)]
pub struct  GetTask{
  id: i64,
  name: String,
  projects: Vec<Project>
}
#[derive(Debug, Serialize, Deserialize)]
pub struct Project {
  id: u32,
  rep_url: String,
}
impl GetTask {
  pub fn new(id: i64, name: &str, projects: Vec<Project>) -> Self {
    GetTask { 
      id: id, 
      name: name.to_string(), 
      projects: projects
    }
  }
}
#[derive(Debug, Serialize, Deserialize)]
pub struct GetTasksWithTime {
  id: i64,
  name: String,
  times: Vec<DailyTime>
}
#[derive(Debug, Serialize, Deserialize)]
pub struct DailyTime {
  start_date: String,
  time: i64,
  additions: i64,
  deletions: i64
}
impl GetTasksWithTime {
  pub fn new(id: i64, name: &str, times: Vec<DailyTime>) -> Self {
    GetTasksWithTime {
      id: id,
      name: name.to_string(),
      times: times, // 7dayの日毎の時間
    }
  }
}
#[derive(Debug, Serialize, Deserialize)]
pub struct GetTasksWithTimes {
  tasks: Vec<GetTasksWithTime>
}
impl DailyTime {
  pub fn new(start_date: String, time: i64, additions: i64, deletions: i64) -> Self {
    DailyTime {
      start_date: start_date,
      time: time,
      additions: additions,
      deletions: deletions,
    }
  }
}
#[derive(Debug, Serialize, Deserialize)]
pub struct Tasks{
  tasks: Vec<GetTask>,
}
#[derive(Debug, Serialize, Deserialize)]
pub struct  DailyTimes {
  times: Vec<DailyTime>,
}
#[derive(Debug, Serialize, Deserialize)]
pub struct UpdateUrl {
  id: i64,
  url: String
}
#[derive(Debug, Serialize, Deserialize)]
pub struct InsertProject {
  url: String,
  task_id: i64
}
#[derive(Debug, Serialize, Deserialize)]
pub struct GetProject {
  id: i64,
  task_id: i64,
  rep_url: String,
  last_date: String
}
#[derive(Debug, Serialize, Deserialize)]
struct Projects {
  projects: Vec<GetProject>
}
#[derive(Debug, Serialize, Deserialize)]
struct Period {
  head_day: String,
  tail_day: String
}


#[tauri::command]
async fn get_all_tasks(sqlite_pool: State<'_, sqlx::SqlitePool>) -> Result<Tasks, String> {
  let tasks = task::get_all_tasks(&sqlite_pool)
    .await
    .map_err(|e| e.to_string())?;
  Ok(Tasks { tasks })
}
#[tauri::command]
async fn handle_add_time (
  sqlite_pool: State<'_, sqlx::SqlitePool>,
  mut time: InputTime
) -> Result<(), String> {
  time.start_time = time.start_time.replace("/", "-");
  time.end_time = time.end_time.replace("/", "-");
  let start_time = NaiveDateTime::parse_from_str(&time.start_time, "%Y-%m-%d %H:%M:%S").expect("Invalid start_time format");
  let end_time = NaiveDateTime::parse_from_str(&time.end_time, "%Y-%m-%d %H:%M:%S").expect("Invalid end_time format");
  let duration = end_time - start_time;
  time.start_time = start_time.format("%Y-%m-%d %H:%M:%S").to_string();
  time.end_time = end_time.format("%Y-%m-%d %H:%M:%S").to_string();
  time::insert_time(&*sqlite_pool, time, duration.num_seconds())
    .await
    .map_err(|e| e.to_string())?;

  Ok(())
}
#[tauri::command]
async fn handle_add_task (
  sqlite_pool: State<'_, sqlx::SqlitePool>,
  task: InputTask,
) ->  Result<(), String> {
  task::insert_task(&*sqlite_pool, task)
    .await
    .map_err(|e| e.to_string())?;
  Ok(())
}
#[tauri::command]
async fn insert_project(
  sqlite_pool: State<'_, sqlx::SqlitePool>,
  data: InsertProject
) ->  Result<(), String> {
  project::insert_project(&*sqlite_pool, data)
    .await
    .map_err(|e| e.to_string())?;
  Ok(())
}
#[tauri::command]
async fn update_url (
  sqlite_pool: State<'_, sqlx::SqlitePool>,
  data: UpdateUrl
) -> Result<(), String> {
  project::update_url(&*sqlite_pool, data)
  .await
  .map_err(|e| e.to_string())?;
Ok(())
}
#[tauri::command]
async fn delete_project(
  sqlite_pool: State<'_, sqlx::SqlitePool>,
  id: i64
) -> Result<(), String> {
  project::delete_project(&*sqlite_pool, id)
  .await
  .map_err(|e| e.to_string())?;
Ok(())
}
#[tauri::command]
async fn get_all_projects(
  sqlite_pool: State<'_, sqlx::SqlitePool>
) -> Result<Projects, String> {
  let projects = project::get_all_projects(&*sqlite_pool)
    .await
    .map_err(|e| e.to_string())?;
  Ok(Projects{ projects })
}
#[tauri::command]
async fn get_task_with_time(sqlite_pool: State<'_, sqlx::SqlitePool>, period: Period) -> Result<GetTasksWithTimes, String> {
  println!("st:{} end:{}", &period.head_day, &period.tail_day);
  let tasks = task::get_task_with_time(&*sqlite_pool, &period.head_day, &period.tail_day)
    .await
    .map_err(|e| e.to_string())?;
  Ok(GetTasksWithTimes{tasks:tasks})
}
#[tauri::command]
async fn get_daily_time(sqlite_pool: State<'_, sqlx::SqlitePool>, period: Period) -> Result<DailyTimes, String> {
  let times = time::get_daily_time(&*sqlite_pool, &period.head_day, &period.tail_day)
    .await
    .map_err(|e| e.to_string())?;
  Ok(DailyTimes{times: times})
}
#[tauri::command]
async fn get_all_times(sqlite_pool:  State<'_, sqlx::SqlitePool>) -> Result<Times, String> {
  let times = time::get_all_times(&sqlite_pool)
    .await
    .map_err(|e| e.to_string())?;
// じかん関係の変換
  // let data:Vec<GetTime> = times.into_iter().map(|mut v| {
  //   // `start_time`と`end_time`を`&str`として借用してから`NaiveDateTime`にパース
  //   let naive_start_time = NaiveDateTime::parse_from_str(&v.start_time, "%Y/%m/%d %H:%M:%S")
  //       .expect("Failed to parse start time");
  //   let naive_end_time = NaiveDateTime::parse_from_str(&v.end_time, "%Y/%m/%d %H:%M:%S")
  //       .expect("Failed to parse end time");
  //   // ローカルタイムゾーンの`DateTime<Local>`に変換
  //   let datetime_start = Local.from_utc_datetime(&naive_start_time);
  //   let datetime_end = Local.from_utc_datetime(&naive_end_time);
  //   // `DateTime`を`String`に変換して保存
  //   v.start_time = datetime_start.to_string();
  //   v.end_time = datetime_end.to_string();
  //   v
  // }).collect();
  Ok(Times { times:times })
}

fn main() -> Result<(), Box<dyn std::error::Error>> {
  // my_assistant_lib::run()
  use tauri::async_runtime::block_on;

  // データベースのファイルパス等を設定する
  const DATABASE_DIR: &str = "my_asi_db";
  const DATABASE_FILE: &str = "db.sqlite";
  // ユーザのホームディレクトリ直下にデータベースのディレクトリを作成する
  // もし、各OSで標準的に使用されるアプリ専用のデータディレクトリに保存したいなら
  // directoriesクレートの`ProjectDirs::data_dir`メソッドなどを使うとよい
  // https://docs.rs/directories/latest/directories/struct.ProjectDirs.html#method.data_dir
  // let home_dir = directories::UserDirs::new()
  //     .map(|dirs| dirs.home_dir().to_path_buf())
  //     // ホームディレクトリが取得できないときはカレントディレクトリを使う
  //     .unwrap_or_else(|| std::env::current_dir().expect("Cannot access the current directory"));
  // let database_dir = home_dir.join(DATABASE_DIR); // ホームディレクトリではなくなったので書き換え
  // 上記のホームディレクトリ指定からアプリ専用データディレクトリに変更
  let app_dir = ProjectDirs::from("com", "dev", "myassi")
    .ok_or("プロジェクトディレクトリの取得に失敗しました")?;
  let database_dir = app_dir.data_dir();
  let database_file = database_dir.join(DATABASE_FILE);

  // データベースファイルが存在するかチェックする
  // let db_exists = std::fs::metadata(&database_file).is_ok();  // ホームディレクトリ関係で一旦
  let db_exists = database_dir.exists();
  // 存在しないなら、ファイルを格納するためのディレクトリを作成する
  if !db_exists {
    std::fs::create_dir(&database_dir)?;
  }

  // データベースURLを作成する
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
  let sqlite_pool = block_on(data::create_sqlite_pool(&database_url))?;
  
  //  データベースファイルが存在しなかったなら、マイグレーションSQLを実行する
  if !db_exists {
    println!("db作成開始");
    block_on(data::migrate_database(&sqlite_pool))?;
    println!("db作成完了");
  }

  // デバックdb確認
  #[cfg(debug_assertions)]
  if cfg!(debug_assertions) {println!("{}", db_exists);
    block_on(data::show_tables(&sqlite_pool))?;
    block_on(project::get_all_projects(&sqlite_pool))?;
  }
  
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![
      handle_add_time,
      get_all_tasks,
      handle_add_task,
      get_all_projects,
      update_url,
      delete_project,
      insert_project,
      get_all_times,
      get_task_with_time,
      get_daily_time,
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

