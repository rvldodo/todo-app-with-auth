CREATE DATABASE nodelogin;

USE nodelogin;

CREATE TABLE "users" (
    "id" serial NOT NULL,
    "first_name" varchar(255) NOT NULL,
    "last_name" varchar(255) NOT NULL,
    "username" varchar(255) NOT NULL,
    "email" varchar(255) NOT NULL,
    "password" varchar(255) NOT NULL,
    PRIMARY KEY ("id"),
    UNIQUE ("username"),
    UNIQUE ("email")
);

CREATE TABLE "users_test" (
    "id" serial NOT NULL,
    "name" varchar(255) NOT NULL,
    "email" varchar(255) NOT NULL,
    "password" varchar(255) NOT NULL,
    PRIMARY KEY ("id"),
    UNIQUE ("email")
);