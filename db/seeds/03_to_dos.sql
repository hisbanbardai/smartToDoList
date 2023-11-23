  -- id SERIAL PRIMARY KEY NOT NULL,
  -- name VARCHAR(255) NOT NULL,
  -- category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
  -- user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  -- created_at TIMESTAMP NOT NULL,
  -- due_date DATE,
  -- completed_at TIMESTAMP,
  -- is_complete BOOLEAN DEFAULT FALSE,
  -- priority INTEGER,
  -- tagged_user INTEGER REFERENCES users(id) ON DELETE CASCADE

INSERT INTO to_dos (name, category_id, user_id, created_at, due_date, completed_at, is_complete, priority, tagged_user) VALUES ('Barbie', 1, 2, CURRENT_TIMESTAMP, '2023-12-31', NULL, FALSE, NULL, 3);
INSERT INTO to_dos (name, category_id, user_id, created_at, due_date, completed_at, is_complete, priority, tagged_user) VALUES ('Imanishi Japanese Kitchen', 2, 1, CURRENT_TIMESTAMP, NULL, NULL, FALSE, 2, NULL);
INSERT INTO to_dos (name, category_id, user_id, created_at, due_date, completed_at, is_complete, priority, tagged_user) VALUES ('Scott Pilgrim Takes Off', 1, 2, '2022-01-01 10:00:00', NULL, '2023-11-22', TRUE, NULL, NULL);
