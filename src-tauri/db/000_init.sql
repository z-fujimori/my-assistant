CREATE TABLE IF NOT EXISTS times (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  task_id INTEGER NOT NULL,
  start_time TEXT NOT NULL,
  end_time TEXT NOT NULL,
  FOREIGN KEY (task_id) REFERENCES tasks (id) ON DELETE CASCADE
);
-- 最後の行にカンマ（,）が含まれているとエラー
CREATE TABLE IF NOT EXISTS tasks (
  id INTEGER PRIMARY KEY NOT NULL,
  name TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY NOT NULL,
  name TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS categories_tasks(
  categorie_id INTEGER NOT NULL,
  task_id INTEGER NOT NULL,
  PRIMARY KEY (task_id, categorie_id),
  FOREIGN KEY (task_id) REFERENCES tasks (id) ON DELETE CASCADE,
  FOREIGN KEY (categorie_id) REFERENCES categories (id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS projects (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  rep_url TEXT,
  pull_num INTEGER DEFAULT 0,
  task_id INTEGER NOT NULL,
  FOREIGN KEY (task_id) REFERENCES tasks (id) ON DELETE CASCADE
);

-- サンプルデータ挿入
INSERT INTO tasks (id, name) VALUES (0, 'my-assistant');
INSERT INTO tasks (id, name) VALUES (1, 'backend engineerの為のrust');
INSERT INTO tasks (id, name) VALUES (2, 'atcoder');
INSERT INTO categories (id, name) VALUES (0, 'Study');
INSERT INTO categories (id, name) VALUES (1, '制作');
INSERT INTO categories (id, name) VALUES (2, 'アルゴリズム');
INSERT INTO categories_tasks (categorie_id, task_id) VALUES (0, 1);
INSERT INTO categories_tasks (categorie_id, task_id) VALUES (0, 2);
INSERT INTO categories_tasks (categorie_id, task_id) VALUES (1, 0);
INSERT INTO categories_tasks (categorie_id, task_id) VALUES (2, 2);
