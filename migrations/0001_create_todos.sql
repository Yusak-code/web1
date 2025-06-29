DROP TABLE IF EXISTS todos;

CREATE TABLE todos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  is_done INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO todos (name, is_done) VALUES
('Belajar HTML', 0),
('Belajar CSS', 0),
('Belajar JavaScript', 0),
('Belajar PHP', 0);
