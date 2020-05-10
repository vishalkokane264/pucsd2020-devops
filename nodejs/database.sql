CREATE USER vishal IDENTIFIED BY 'Vishal@12';

GRANT ALL PRIVILEGES ON *.* to vishal;

DROP DATABASE IF EXISTS userdb;

CREATE DATABASE IF NOT EXISTS userdb;

USE userdb;

CREATE TABLE `user_details`(
	`id` int NOT NULL,
	`name` varchar(20) NOT NULL,
	`age` int NOT NULL,
	`department` varchar(20) NOT NULL,
	`subject` varchar(20) NOT NULL
	)ENGINE=InnoDB DEFAULT CHARSET=utf8;
	
DESCRIBE user_details;
