CREATE TABLE IF NOT EXISTS times (
    id INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    start_time INTEGER NOT NULL,
    end_time INTEGER NOT NULL
);
-- 最後の行にカンマ（,）が含まれているとエラー

-- サンプルデータ挿入
INSERT INTO times (id, title, start_time, end_time) VALUES (1, '学習', 202411060930, 2024110601240);
