create database if not exists albums;
use Albums;
CREATE TABLE IF NOT EXISTS users(
    id INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Email VARCHAR(255) NOT NULL,
    Password VARCHAR(255) NOT NULL,
    role varchar(255) default "user"
);


insert into users(Name,Email,Password,role) 
values  ("admin","admin@gmail.com","12345","admin");

CREATE TABLE albums (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    genre VARCHAR(255),
    artist VARCHAR(255),
    coverImage VARCHAR(255),
    releaseYear INT,
    rating INT
);


CREATE TABLE Songs (
    song_id VARCHAR(255) PRIMARY KEY,
    album_id INT,
    song_name varchar(255),
    FOREIGN KEY (album_id) REFERENCES Albums(songsid)
);
