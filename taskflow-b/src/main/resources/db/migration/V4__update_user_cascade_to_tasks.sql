ALTER TABLE tasks
DROP CONSTRAINT fk_tasks_user;

ALTER TABLE tasks
    ADD CONSTRAINT fk_tasks_user
        FOREIGN KEY (user_id)
            REFERENCES users(id)
            ON DELETE CASCADE;