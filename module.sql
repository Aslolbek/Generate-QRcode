CREATE DATABASE authqrcode;

\c authqrcode;


CREATE TABLE USERS(
    id SERIAL PRIMARY KEY not null,
    username varchar,
    password varchar,
    email varchar,
    crate_at timestamp with time zone Default CURRENT_TIMESTAMP
);