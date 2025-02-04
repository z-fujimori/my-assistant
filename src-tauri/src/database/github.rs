use anyhow::{Ok, Result};
use chrono::{DateTime, Utc};
use futures::TryStreamExt;
use reqwest::{self, header::ETAG, Client};
use serde::{Deserialize};
use sqlx::{SqlitePool, Row};

use crate::database::project;

type DbResult<T> = Result<T, Box<dyn std::error::Error>>;

#[derive(Deserialize, Debug)]
struct ApiResps {
	sha: String,
	commit: CommitInfo
}
#[derive(Deserialize, Debug)]
struct CommitInfo {
	committer: AuthorInfo
}
#[derive(Deserialize, Debug)]
struct AuthorInfo {
	name: String,
  date: String
}
#[derive(Deserialize, Debug)]
pub struct CommitData {
	sha: String,
	date: String
}
#[derive(Deserialize, Debug)]
pub struct BranchInfo {
	name: String,
}
#[derive(Debug)]
pub struct Branch {
	id: i64,
	project_id: i64,
	branch_name: String,
	is_working: bool
}
#[derive(Deserialize, Debug)]
pub struct CommitCodeDiff {
	total: i64,
	additions: i64,
	deletions: i64
}
#[derive(Deserialize, Debug)]
pub struct CommitStats {
	stats: CommitCodeDiff
}

pub(crate) async fn check_code_changes(pool: &SqlitePool, task_id: i64) -> Result<()> {
  let projects = project::get_project_belongs_task(pool, task_id).await?;
  for project in &projects {
    println!("url {}",project.rep_url);
    let parts: Vec<&str> = project.rep_url.split('/').collect();
    if let (Some(owner), Some(repo)) = (parts.get(3), parts.get(4)) {
      let prev_date = "2023-02-02T11:43:27Z".to_string();
      let branches = get_activ_branch(owner.to_string(), repo.to_string(), pool, project.id).await?;
			if branches.len() == 1 && branches[0].name == "main" {

			}
			// println!("b: {:?}",branches);
			for b in branches {
				let commit_stats = get_commit_info(owner.to_string(), repo.to_string(), b.name.clone(), prev_date.clone()).await?;
				println!("{}: {:?}", b.name, commit_stats);
			}
    } else {
      println!("GitHubのユーザーとリポジトリが確認できませんでした");
    }
  }

  // let project_branchs = project::get_project_with_branches(pool, 0).await?;
  // println!("プロジェクトブランチ {:?}", project_branchs.branches);
  // github::hello().await?;
	Ok(())
}

pub(crate) async fn get_activ_branch(owner:String, repo:String,pool: &SqlitePool, project_id: i64) -> Result<Vec<BranchInfo>> {
	println!("\nok\n");
	let client = Client::new();
	let url = format!("https://api.github.com/repos/{}/{}/branches", owner, repo);
	let response = client
		.get(url)
		.header(reqwest::header::USER_AGENT, "my-tauri-app")
		// .query(&[("sha", "task_control")])
		.send()
		.await?;
	let mut api_resps: Vec<BranchInfo> = response.json().await?;
	let branches = get_branches(pool, project_id).await?;

	for branch in branches.iter().filter(|b| !b.is_working) {
		api_resps.retain(|b| b.name != branch.branch_name );
	}

  Ok(api_resps)
}

pub(crate) async fn get_branches(pool: &SqlitePool, project_id: i64) -> Result<Vec<Branch>> {
	let mut rows = sqlx::query("SELECT * FROM branches WHERE project_id = ?")
		.bind(project_id)
		.fetch(pool);

	let mut branches:Vec<Branch> = vec![];
	while let Some(row) = rows.try_next().await? {
		let id: i64 = row.try_get("id")?;
		let project_id: i64 = row.try_get("project_id")?;
		let branch_name: String = row.try_get("name")?;
		let is_working: bool = row.try_get("is_working")?;

		branches.push(Branch{id, project_id, branch_name, is_working});
	}
	Ok(branches)
} 

pub(crate) async fn get_commit_info(owner:String, repo:String, branch: String, prev_date:String) -> Result<CommitCodeDiff> {
	let client = Client::new();
	let previous_date: DateTime<Utc> = prev_date.parse().expect("Invalid date format");
	let url = format!("https://api.github.com/repos/{}/{}/commits", owner, repo);
	// let url = "https://api.github.com/repos/z-fujimori/rust_book_keisenki_5/commits";
	// let url = "https://api.github.com/repos/z-fujimori/my-assistant/commits";
	println!("{}", &url);
	let response = client
		.get(url)
		.header(reqwest::header::USER_AGENT, "my-tauri-app")
		.query(&[("sha", branch)])
		.send()
		.await?;
	let api_resps: Vec<ApiResps> = response.json().await?;
	println!("取得完了");
	let commit_datas: Vec<CommitData> = api_resps
		.iter()
		.filter(|res| res.commit.committer.date.clone().parse::<DateTime<Utc>>().expect("Invalid date format") > previous_date )
		.filter(|res| res.commit.committer.name == "GitHub" )
		.map(|res| CommitData{sha: res.sha.clone(), date: res.commit.committer.date.clone()})
		.collect();
	// println!("コミット情報 {:?}", commit_datas);
	// println!("おしまい");
	let mut return_stats = CommitCodeDiff{total: 0, additions: 0, deletions: 0};
	for c in commit_datas {
		let url = format!("https://api.github.com/repos/{}/{}/commits/{}", owner, repo, c.sha);
		let commit_response = client
			.get(url)
			.header(reqwest::header::USER_AGENT, "my-tauri-app")
			.send()
			.await?;
		let commit_stats: CommitStats = commit_response.json().await?;
		return_stats.total += commit_stats.stats.total;
		return_stats.additions += commit_stats.stats.additions;
		return_stats.deletions += commit_stats.stats.deletions;
	}
	Ok(return_stats)
}


