CREATE TABLE tasks(
    id SERIAL PRIMARY KEY ,
    title VARCHAR(50) NOT NULL ,
    description VARCHAR(500) NOT NULL ,
    completed BOOLEAN NOT NULL 
)