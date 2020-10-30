USE [LastSpool]
GO

SET IDENTITY_INSERT [UserProfile] ON
INSERT INTO [UserProfile] (id, name, email, firebaseUserId)
VALUES (1, 'Erik', 'test@gmail.com', 'bMRKoGrZbYdrk8liei7a4ikju4o2'), (2, 'tester', 'pyropro11@gmail.com', 'WNR9TspVh5Yk3LK48mFLgj5s3jv1');
SET IDENTITY_INSERT [UserProfile] OFF

SET IDENTITY_INSERT [Printer] ON
INSERT INTO [Printer] (id, [name], [description], deviceIdentifier, userProfileId)
VALUES (1, 'ender3', 'slightly modified CR Ender3', 'Printer1', 1),(2, 'Mk3', 'Stock Prusa', 'Printer2', 1)
SET IDENTITY_INSERT [Printer] OFF

SET IDENTITY_INSERT [Job] ON
INSERT INTO [Job] (id, printerId, [image], percentDone, fileName, timeLeft, statusDateTime, completeDateTime, printLength, filamentLength, statusMessage, deviceIdentifier)
VALUES (1, 1, 'html:blank', 100,'first.gcode', 0, '2020-06-17', '2020-06-17', 5000, 100, 'status here', 'Printer1')
SET IDENTITY_INSERT [Job] OFF

SET IDENTITY_INSERT [Note] ON
INSERT INTO [Note] (id, content, createDateTime, jobId)
VALUES (1,'yep, it worked', '2020-06-17', 1)
SET IDENTITY_INSERT [Note] OFF

