CREATE TABLE IF NOT EXISTS times (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  task_id INTEGER NOT NULL,
  start_time TEXT NOT NULL,
  end_time TEXT NOT NULL,
  work_time INTEGER NOT NULL,
  additions INTEGER DEFAULT 0,
  deletions INTEGER DEFAULT 0,
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
CREATE TABLE IF NOT EXISTS branchs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  isWorking boolean,
  project_id INTEGER NOT NULL,
  FOREIGN KEY (project_id) REFERENCES projects (id) ON DELETE CASCADE
);
-- CREATE TABLE IF NOT EXISTS tiers (
--   id INTEGER PRIMARY KEY AUTOINCREMENT,
--   num INTEGER NOT NULL,
--   upper_lim boolean NOT NULL
-- );
-- CREATE TABLE IF NOT EXISTS tasks_tiers (
--   task_id INTEGER NOT NULL,
--   tier_id INTEGER NOT NULL,
--   position INTEGER NOT NULL,
--   FOREIGN KEY (task_id) REFERENCES tasks (id) ON DELETE CASCADE,
--   FOREIGN KEY (tier_id) REFERENCES tiers (id) ON DELETE CASCADE
-- );
-- CREATE TABLE IF NOT EXISTS app_state (
--   id INTEGER PRIMARY KEY AUTOINCREMENT,
--   page_state TEXT NOT NULL
-- );

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
INSERT INTO projects (id, rep_url, task_id) VALUES (0, "https://github.com/z-fujimori/rust_book_keisenki_5", 1);
INSERT INTO projects (id, rep_url, task_id) VALUES (1, "https://github.com/z-fujimori/rust_book_library_7", 1);
-- INSERT INTO tiers (id, num, upper_lim) VALUES (0, 0, true);
-- INSERT INTO tiers (id, num, upper_lim) VALUES (1, 1, true);
-- INSERT INTO tiers (id, num, upper_lim) VALUES (2, 2, true);
-- INSERT INTO tiers (id, num, upper_lim) VALUES (3, 3, false);
-- INSERT INTO tasks_tiers (task_id, tier_id, position) VALUES (0, 0, 1);
-- INSERT INTO tasks_tiers (task_id, tier_id, position) VALUES (1, 1, 1);
-- INSERT INTO tasks_tiers (task_id, tier_id, position) VALUES (2, 3, 1);
-- INSERT INTO app_state (id, page_state) VALUES (0, "timememo");

INSERT INTO times (id, task_id, start_time, end_time, work_time, additions, deletions) VALUES (0, 0, '2024-10-24 08:00:00', '2024-10-24 10:00:00', 7200, 110, 60);
INSERT INTO times (id, task_id, start_time, end_time, work_time, additions, deletions) VALUES (1, 0, '2024-10-25 12:00:00', '2024-10-25 14:00:00', 7200, 90, 30);
INSERT INTO times (id, task_id, start_time, end_time, work_time, additions, deletions) VALUES (2, 1, '2024-10-27 19:00:00', '2024-10-27 21:00:00', 7200, 11, 61);
INSERT INTO times (id, task_id, start_time, end_time, work_time, additions, deletions) VALUES (3, 0, '2024-10-27 22:30:00', '2024-10-27 23:30:00', 3600, 50, 10);
INSERT INTO times (id, task_id, start_time, end_time, work_time, additions, deletions) VALUES (4, 0, '2024-12-05 23:30:00', '2024-12-05 23:45:00', 900, 50, 10);
