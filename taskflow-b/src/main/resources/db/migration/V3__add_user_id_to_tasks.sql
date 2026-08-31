ALTER TABLE tasks
    ADD COLUMN user_id INTEGER;

ALTER TABLE tasks
    ADD CONSTRAINT fk_tasks_user
        FOREIGN KEY (user_id)
            REFERENCES users(id);