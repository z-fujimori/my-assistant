use anyhow::Result;
use reqwest::{self, Client};

pub(crate) async fn hello() -> Result<()> {
    println!("\nok\n");
    let client = Client::new(); // 1
    let url = "https://zipcloud.ibsnet.co.jp/api/search";
    let response = client
        .get(url)
        .query(&[("zipcode", "1000002")])
        .send()
        .await?; // 2
    let body = response.text().await?; // 3
    println!("{}", body);
    Ok(())
}