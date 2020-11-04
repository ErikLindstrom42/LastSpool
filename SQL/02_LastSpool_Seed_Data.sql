USE [LastSpool]
GO

SET IDENTITY_INSERT [UserProfile] ON
INSERT INTO [UserProfile] (id, name, email, firebaseUserId)
VALUES (1, 'Erik', 'test@gmail.com', 'bMRKoGrZbYdrk8liei7a4ikju4o2'), (2, 'John', 'pyropro11@gmail.com', 'WNR9TspVh5Yk3LK48mFLgj5s3jv1');
SET IDENTITY_INSERT [UserProfile] OFF

SET IDENTITY_INSERT [Printer] ON
INSERT INTO [Printer] (id, [name], [description], deviceIdentifier, userProfileId)
VALUES (1, 'Ender 3', 'Creality Ender3 with BLTouch and Petsfang duct', 'Printer1', 1),(2, 'Mk3', 'Stock Prusa', 'Printer2', 1),(3,'Ender 3 Pro', 'Creality Ender 3 Pro with direct drive mod', 'Printer3',2)
SET IDENTITY_INSERT [Printer] OFF

SET IDENTITY_INSERT [Job] ON
INSERT INTO [Job] (id, printerId, [image], percentDone, fileName, timeLeft, statusDateTime, completeDateTime, printLength, filamentLength, statusMessage, deviceIdentifier)
VALUES (1, 1, 'https://i.pinimg.com/280x280_RS/b1/20/dc/b120dc005bef780f0b77274fc7048fe8.jpg', 100,'benchy.gcode', 0, '2020-06-17', '2020-06-17', 5000, 100, 'status here', 'Printer1'), (2, 1, 'https://i.pinimg.com/280x280_RS/b1/20/dc/b120dc005bef780f0b77274fc7048fe8.jpg', 100,'benchy.gcode', 0, '2020-06-17', '2020-06-17', 5000, 100, 'status here', 'Printer1')
SET IDENTITY_INSERT [Job] OFF

SET IDENTITY_INSERT [Note] ON
INSERT INTO [Note] (id, content, createDateTime, jobId)
VALUES (1,'A little stringy at 200C, increase retraction', '2020-06-17', 1),(2,'A little stringy at 200C, increase retraction', '2020-06-17', 1)
SET IDENTITY_INSERT [Note] OFF

