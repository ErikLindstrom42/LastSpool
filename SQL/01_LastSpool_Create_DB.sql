USE [master]
GO

IF db_id('LastSpool') IS NULL
	CREATE DATABASE LastSpool
GO

USE [LastSpool]
GO

DROP TABLE IF EXISTS [Note]
DROP TABLE IF EXISTS [Job]
DROP TABLE IF EXISTS [Printer]
DROP TABLE IF EXISTS [UserProfile]
GO



CREATE TABLE [UserProfile] (
  [id] integer PRIMARY KEY IDENTITY,
  [userName] nvarchar(50),
  [email] nvarchar(255),
  [firebaseUserId] nvarchar(28),
  [image] nvarchar(255),
  CONSTRAINT UQ_firebaseUserId UNIQUE(firebaseUserId)
)
GO
CREATE TABLE [Printer] (
  [id] integer PRIMARY KEY IDENTITY,
  [name] nvarchar(50),
  [description] nvarchar(255),
  [deviceIdentifier] nvarchar(50),
  [userProfileId] integer,
  CONSTRAINT FK_Printer_UserProfile FOREIGN KEY (userProfileId) REFERENCES UserProfile(id)
)
GO

CREATE TABLE [Job] (
  [id] integer IDENTITY PRIMARY KEY NOT NULL,
  [printerId] integer NOT NULL,
  [image] nvarchar(255),
  [percentDone] integer,
  [fileName] nvarchar(255),
  [timeLeft] integer,
  [statusTime] datetime,
  [statusMessage] nvarchar(255),
  [completeDateTime] datetime,
  [printLength] integer,
  [filamentLength] integer,
  CONSTRAINT FK_Job_Printer FOREIGN KEY (printerId) REFERENCES Printer(id)
)
GO


CREATE TABLE [Note] (
  [id] integer PRIMARY KEY IDENTITY,
  [content] nvarchar(255),
  [createDateTime] datetime,
  [jobId] integer,
  CONSTRAINT FK_Note_Job FOREIGN KEY (jobId) REFERENCES Job(id)
)
GO

--ALTER TABLE [Printer] ADD FOREIGN KEY ([userProfileId]) REFERENCES [UserProfile] ([id])
--GO

--ALTER TABLE [Job] ADD FOREIGN KEY ([printerId]) REFERENCES [Printer] ([id])
--GO

--ALTER TABLE [Note] ADD FOREIGN KEY ([jobId]) REFERENCES [Job] ([id])
--GO

