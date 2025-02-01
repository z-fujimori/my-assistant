use anyhow::Result;
use chrono::{DateTime, Utc};
use reqwest::{self, Client};
use serde::Deserialize;

#[derive(Deserialize, Debug)]
struct ApiResps {
    sha: String,
    commit: CommitInfo
}
#[derive(Deserialize, Debug)]
struct CommitInfo {
    author: AuthorInfo
}
#[derive(Deserialize, Debug)]
struct AuthorInfo {
    date: String
}
#[derive(Deserialize, Debug)]
pub struct CommitData {
    sha: String,
    date: String
}

pub(crate) async fn hello() -> Result<()> {
    println!("\nok\n");
    let client = Client::new();
    let previous_date: DateTime<Utc> = "2024-12-21T11:43:27Z".parse().expect("Invalid date format");
    let url = "https://api.github.com/repos/z-fujimori/my-assistant/commits";
    let response = client
        .get(url)
        .header(reqwest::header::USER_AGENT, "my-tauri-app")
        .query(&[("sha", "task_control")])
        .send()
        .await?;
    let api_resps: Vec<ApiResps> = response.json().await?;
    let commit_datas: Vec<CommitData> = api_resps
        .iter()
        .filter(|res| previous_date < res.commit.author.date.clone().parse::<DateTime<Utc>>().expect("Invalid date format"))
        .map(|res| CommitData{sha: res.sha.clone(), date: res.commit.author.date.clone()})
        .collect();
    println!("{:?}", commit_datas);
    Ok(())
}