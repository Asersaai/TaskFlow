
CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(270) NOT NULL UNIQUE ,
    password varchar(270) NOT NULL,
    role VARCHAR(20) NOT NULL
);