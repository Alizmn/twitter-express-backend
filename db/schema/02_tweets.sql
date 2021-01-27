DROP TABLE IF EXISTS tweets CASCADE;
CREATE TABLE tweets(
    id SERIAL PRIMARY KEY NOT NULL,
    tweet VARCHAR(255) NOT NULL,
    edited BOOLEAN NOT NULL DEFAULT FALSE,
    deleted BOOLEAN NOT NULL DEFAULT FALSE,
    user_id INTEGER REFERENCES users(id)
);