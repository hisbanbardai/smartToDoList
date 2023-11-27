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

INSERT INTO to_dos (name, category_id, user_id, created_at, due_date, completed_at, is_complete, priority, tagged_user) VALUES ('Scott Pilgrim Takes Off', 1, 1, '2022-01-01 10:00:00', NULL, '2023-11-22', TRUE, NULL, 2);
INSERT INTO to_dos (name, category_id, user_id, created_at, due_date, completed_at, is_complete, priority, tagged_user) VALUES ('Barbie', 1, 2, CURRENT_TIMESTAMP, '2023-12-31', NULL, FALSE, NULL, 3);
INSERT INTO to_dos (name, category_id, user_id, created_at, due_date, completed_at, is_complete, priority, tagged_user) VALUES ('Blue Beetle', 1, 3, CURRENT_TIMESTAMP, '2023-12-31', NULL, FALSE, NULL, NULL);

INSERT INTO to_dos (name, category_id, user_id, created_at, due_date, completed_at, is_complete, priority, tagged_user) VALUES ('Imanishi Japanese Kitchen', 2, 1, CURRENT_TIMESTAMP, NULL, NULL, FALSE, 2, NULL);
INSERT INTO to_dos (name, category_id, user_id, created_at, due_date, completed_at, is_complete, priority, tagged_user) VALUES ('Biryani', 2, 2, '2021-01-01 10:00:00', NULL, NULL, FALSE, NULL, NULL);
INSERT INTO to_dos (name, category_id, user_id, created_at, due_date, completed_at, is_complete, priority, tagged_user) VALUES ('Sushi', 2, 3, CURRENT_TIMESTAMP, NULL, NULL, FALSE, NULL, 1);

INSERT INTO to_dos (name, category_id, user_id, created_at, due_date, completed_at, is_complete, priority, tagged_user) VALUES ('A Brief History of Everything', 3, 1, CURRENT_TIMESTAMP, NULL, NULL, FALSE, NULL, NULL);
INSERT INTO to_dos (name, category_id, user_id, created_at, due_date, completed_at, is_complete, priority, tagged_user) VALUES ('Twilight', 3, 2, CURRENT_TIMESTAMP, NULL, NULL, FALSE, NULL, NULL);
INSERT INTO to_dos (name, category_id, user_id, created_at, due_date, completed_at, is_complete, priority, tagged_user) VALUES ('Jane Eyre', 3, 3, CURRENT_TIMESTAMP, NULL, NULL, FALSE, NULL, NULL);

INSERT INTO to_dos (name, category_id, user_id, created_at, due_date, completed_at, is_complete, priority, tagged_user) VALUES ('Gloves', 4, 1, CURRENT_TIMESTAMP, '2023-12-05', NULL, FALSE, 3, NULL);
INSERT INTO to_dos (name, category_id, user_id, created_at, due_date, completed_at, is_complete, priority, tagged_user) VALUES ('Cat food', 4, 2, CURRENT_TIMESTAMP, NULL, NULL, FALSE, NULL, NULL);
INSERT INTO to_dos (name, category_id, user_id, created_at, due_date, completed_at, is_complete, priority, tagged_user) VALUES ('Bose speaker', 4, 3, CURRENT_TIMESTAMP, NULL, NULL, FALSE, 1, NULL);
