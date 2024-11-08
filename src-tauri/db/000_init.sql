CREATE TABLE IF NOT EXISTS times (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title_id INTEGER NOT NULL,
    start_time TEXT NOT NULL,
    end_time TEXT NOT NULL,
    FOREIGN KEY (title_id) REFERENCES titles (id) ON DELETE CASCADE
);
-- 最後の行にカンマ（,）が含まれているとエラー
CREATE TABLE IF NOT EXISTS titles (
    id INTEGER PRIMARY KEY NOT NULL,
    title TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY NOT NULL,
    title TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS categories_titles(
    categorie_id INTEGER NOT NULL,
    title_id INTEGER NOT NULL,
    PRIMARY KEY (title_id, categorie_id),
    FOREIGN KEY (title_id) REFERENCES titles (id) ON DELETE CASCADE,
    FOREIGN KEY (categorie_id) REFERENCES categories (id) ON DELETE CASCADE
);

-- サンプルデータ挿入
-- INSERT INTO times (id, title, start_time, end_time) VALUES (1, '学習', 202411060930, 2024110601240);
INSERT INTO titles (id, title) VALUES (0, 'my-assistant');
INSERT INTO titles (id, title) VALUES (1, 'backend engineerの為のrust');
INSERT INTO titles (id, title) VALUES (2, 'atcoder');
INSERT INTO categories (id, title) VALUES (0, 'Study');
INSERT INTO categories (id, title) VALUES (1, '制作');
INSERT INTO categories (id, title) VALUES (2, 'アルゴリズム');
INSERT INTO categories_titles (categorie_id, title_id) VALUES (0, 1);
INSERT INTO categories_titles (categorie_id, title_id) VALUES (0, 2);
INSERT INTO categories_titles (categorie_id, title_id) VALUES (1, 0);
INSERT INTO categories_titles (categorie_id, title_id) VALUES (2, 2);
