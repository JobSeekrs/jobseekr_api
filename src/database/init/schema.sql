CREATE DATABASE Jobtracker;
USE Jobtracker;

CREATE TABLE `Company` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`userId` INT NOT NULL,
	`name` VARCHAR(255) NOT NULL,
	`description` VARCHAR(10000),
	`notes` VARCHAR(10000),
	`phone` VARCHAR(255),
	`address1` VARCHAR(255),
	`address2` VARCHAR(255),
	`city` VARCHAR(255),
	`state` VARCHAR(255),
	`zip` VARCHAR(255),
	PRIMARY KEY (`id`)
);

CREATE TABLE `Job` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`companyId` INT NOT NULL,
	`name` VARCHAR(255) NOT NULL,
	`description` VARCHAR(10000),
	`notes` VARCHAR(10000),
	`source` VARCHAR(255),
	`status` VARCHAR(255) NOT NULL,
	`priority` INT NOT NULL,
	`deadline` DATETIME,
	`link` VARCHAR(255),
	PRIMARY KEY (`id`)
);

CREATE TABLE `Contact` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`userId` INT NOT NULL,
	`companyId` INT,
	`firstName` VARCHAR(255) NOT NULL,
	`lastName` VARCHAR(255) NOT NULL,
	`title` VARCHAR(255),
	`notes` VARCHAR(2000),
	`email` VARCHAR(255),
	`phone` VARCHAR(255),
	PRIMARY KEY (`id`)
);

CREATE TABLE `Event` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`jobId` INT NOT NULL,
	`contactId` INT,
	`name` VARCHAR(255),
	`notes` VARCHAR(10000),
	`type` VARCHAR(255) NOT NULL,
	`dueDate` DATETIME,
	`timeStamp` DATETIME,
	`notifyOn` DATETIME,
	`notificationType` VARCHAR(255),
	PRIMARY KEY (`id`)
);

CREATE TABLE `Resource` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`eventId` INT NOT NULL,
	`name` VARCHAR(255) NOT NULL,
	`notes` VARCHAR(10000),
	`type` VARCHAR(255) NOT NULL,
	`emailTo` VARCHAR(255),
	`emailFrom` VARCHAR(255),
	`emailSubject` VARCHAR(255),
	`emailBody` VARCHAR(255),
	`linkPath` VARCHAR(255),
	`filePath` VARCHAR(255),
	`file` blob,
	PRIMARY KEY (`id`)
);

CREATE TABLE `User` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`emailLogIn` VARCHAR(255) NOT NULL,
	`firstName` VARCHAR(255) NOT NULL,
	`lastName` VARCHAR(255) NOT NULL,
	`password` VARCHAR(255) NOT NULL,
	PRIMARY KEY (`id`)
);

ALTER TABLE `Company` ADD CONSTRAINT `Company_fk0` FOREIGN KEY (`userId`) REFERENCES `User`(`id`);

ALTER TABLE `Job` ADD CONSTRAINT `Job_fk0` FOREIGN KEY (`companyId`) REFERENCES `Company`(`id`);

ALTER TABLE `Contact` ADD CONSTRAINT `Contact_fk0` FOREIGN KEY (`userId`) REFERENCES `User`(`id`);

ALTER TABLE `Contact` ADD CONSTRAINT `Contact_fk1` FOREIGN KEY (`companyId`) REFERENCES `Company`(`id`);

ALTER TABLE `Event` ADD CONSTRAINT `Event_fk0` FOREIGN KEY (`jobId`) REFERENCES `Job`(`id`);

ALTER TABLE `Event` ADD CONSTRAINT `Event_fk1` FOREIGN KEY (`contactId`) REFERENCES `Contact`(`id`);

ALTER TABLE `Resource` ADD CONSTRAINT `Resource_fk0` FOREIGN KEY (`eventId`) REFERENCES `Event`(`id`);