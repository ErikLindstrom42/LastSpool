using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LastSpool.Models;
using LastSpool.Utils;
using System.Security.Cryptography;

namespace LastSpool.Repositories
{
    public class JobRepository : BaseRepository, IJobRepository
    {
        public JobRepository(IConfiguration configuration) : base(configuration) { }

        public List<Job> GetJobsByPrinterId(int printerId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT j.Id, j.PrinterId, j.Image, j.PercentDone, j.FileName, j.TimeLeft, j.StatusDateTime, j.StatusMessage, j.CompleteDateTime, j.PrintLength, j.FilamentLength,
                                p.Name AS PrinterName, p.DeviceIdentifier, p.Description, p.UserProfileId
                        FROM Job j
                        LEFT JOIN Printer p ON j.PrinterId = p.Id
                        LEFT JOIN UserProfile up ON p.UserProfileId = up.Id
                        WHERE j.PrinterId = @PrinterId
                        ORDER BY j.Id DESC;";
                    cmd.Parameters.AddWithValue("@PrinterId", printerId);
                    var reader = cmd.ExecuteReader();
                    var jobs = new List<Job>();
                    while (reader.Read())
                    {
                        jobs.Add(new Job()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            PrinterId = DbUtils.GetInt(reader, "PrinterId"),
                            Image = DbUtils.GetString(reader, "Image"),
                            PercentDone = DbUtils.GetNullableInt(reader, "PercentDone"),
                            FileName = DbUtils.GetString(reader, "FileName"),
                            TimeLeft = DbUtils.GetNullableInt(reader, "TimeLeft"),
                            PrintLength = DbUtils.GetInt(reader, "PrintLength"),
                            FilamentLength = DbUtils.GetInt(reader, "FilamentLength"),
                            StatusDateTime = DbUtils.GetDateTime(reader, "StatusDateTime"),
                            StatusMessage = DbUtils.GetString(reader, "StatusMessage"),
                            CompleteDateTime = DbUtils.GetNullableDateTime(reader, "CompleteDateTime"),
                            Printer = new Printer()
                            {
                                Id = DbUtils.GetInt(reader, "PrinterId"),
                                Name = DbUtils.GetString(reader, "PrinterName"),
                                DeviceIdentifier = DbUtils.GetString(reader, "DeviceIdentifier"),
                                Description = DbUtils.GetString(reader, "Description"),
                                UserProfileId = DbUtils.GetInt(reader, "UserProfileId")
                            }
                        });
                    }
                    reader.Close();
                    return jobs;
                }
            }
        }
        public Job GetJobById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT j.Id, j.PrinterId, j.Image, j.PercentDone, j.FileName, j.TimeLeft, j.StatusDateTime, j.StatusMessage, j.CompleteDateTime, j.PrintLength, j.FilamentLength,
                                p.Name AS PrinterName, p.DeviceIdentifier, p.Description, p.UserProfileId
                        FROM Job j
                        LEFT JOIN Printer p ON j.PrinterId = p.Id
                        WHERE j.Id = @Id
                        ORDER BY j.Id DESC;";
                    cmd.Parameters.AddWithValue("@Id", id);
                    var reader = cmd.ExecuteReader();

                    Job job = null;
                    if (reader.Read())
                    {
                        job = new Job()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            PrinterId = DbUtils.GetInt(reader, "PrinterId"),
                            Image = DbUtils.GetString(reader, "Image"),
                            PercentDone = DbUtils.GetNullableInt(reader, "PercentDone"),
                            FileName = DbUtils.GetString(reader, "FileName"),
                            TimeLeft = DbUtils.GetNullableInt(reader, "TimeLeft"),
                            PrintLength = DbUtils.GetInt(reader, "PrintLength"),
                            DeviceIdentifier = DbUtils.GetString(reader, "DeviceIdentifier"),
                            FilamentLength = DbUtils.GetInt(reader, "FilamentLength"),
                            StatusDateTime = DbUtils.GetDateTime(reader, "StatusDateTime"),
                            StatusMessage = DbUtils.GetString(reader, "StatusMessage"),
                            CompleteDateTime = DbUtils.GetNullableDateTime(reader, "CompleteDateTime"),
                            Printer = new Printer()
                            {
                                Id = DbUtils.GetInt(reader, "PrinterId"),
                                Name = DbUtils.GetString(reader, "PrinterName"),
                                DeviceIdentifier = DbUtils.GetString(reader, "DeviceIdentifier"),
                                Description = DbUtils.GetString(reader, "Description"),
                                UserProfileId = DbUtils.GetInt(reader, "UserProfileId")
                            }
                        };
                    }
                    reader.Close();
                    return job;
                }
            }
        }


        public void Add(Job job)
        {

            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Job
                       (printerId, [Image], percentDone, fileName, timeLeft, statusDateTime, printLength, filamentLength, statusMessage, deviceIdentifier, completeDateTime)
                        OUTPUT INSERTED.id
                        VALUES (@PrinterId, @Image, @PercentDone, @FileName, @TimeLeft, @StatusDateTime, @PrintLength, @FilamentLength, @StatusMessage, @DeviceIdentifier, @CompleteDateTime)";
                    DbUtils.AddParameter(cmd, "@PrinterId", job.PrinterId);
                    DbUtils.AddParameter(cmd, "@Image", job.Image);
                    DbUtils.AddParameter(cmd, "@PercentDone", job.PercentDone);
                    DbUtils.AddParameter(cmd, "@FileName", job.FileName);
                    DbUtils.AddParameter(cmd, "@TimeLeft", job.TimeLeft);
                    DbUtils.AddParameter(cmd, "@StatusDateTime", job.StatusDateTime);
                    DbUtils.AddParameter(cmd, "@PrintLength", job.PrintLength);
                    DbUtils.AddParameter(cmd, "@FilamentLength", job.FilamentLength);
                    DbUtils.AddParameter(cmd, "@StatusMessage", job.StatusMessage);
                    DbUtils.AddParameter(cmd, "@DeviceIdentifier", job.DeviceIdentifier);
                    DbUtils.AddParameter(cmd, "@CompleteDateTime", job.CompleteDateTime);
                    job.Id = (int)cmd.ExecuteScalar();
                }
            }

        }

        public void Update(Job job)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Job
                        SET PrinterId = @PrinterId,
                            Image = @Image,
                            PercentDone = @PercentDone,
                            FileName = @FileName,
                            TimeLeft = @TimeLeft,
                            StatusDateTime = @StatusDateTime,
                            CompleteDateTime = @CompleteDateTime,
                            PrintLength = @PrintLength,
                            FilamentLength = @FilamentLength,
                            StatusMessage = @StatusMessage
                        WHERE Id = @Id;";
                    DbUtils.AddParameter(cmd, "@PrinterId", job.PrinterId);
                    DbUtils.AddParameter(cmd, "@Image", job.Image);
                    DbUtils.AddParameter(cmd, "@PercentDone", job.PercentDone);
                    DbUtils.AddParameter(cmd, "@FileName", job.FileName);
                    DbUtils.AddParameter(cmd, "@TimeLeft", job.TimeLeft);
                    DbUtils.AddParameter(cmd, "@StatusDateTime", job.StatusDateTime);
                    DbUtils.AddParameter(cmd, "@CompleteDateTime", job.CompleteDateTime);
                    DbUtils.AddParameter(cmd, "@PrintLength", job.PrintLength);
                    DbUtils.AddParameter(cmd, "@FilamentLength", job.FilamentLength);
                    DbUtils.AddParameter(cmd, "@StatusMessage", job.StatusMessage);
                    DbUtils.AddParameter(cmd, "@Id", job.Id);

                    cmd.ExecuteNonQuery();

                }
            }
        }
        public void Delete(int jobId)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "DELETE FROM Note WHERE jobId = @jobId";
                    DbUtils.AddParameter(cmd, "@jobId", jobId);
                    cmd.ExecuteNonQuery();
                }
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "DELETE FROM Job WHERE Id = @jobId";
                    DbUtils.AddParameter(cmd, "@jobId", jobId);
                    cmd.ExecuteNonQuery();
                }
            }
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="printerId"></param>
        /// <returns>The last job for a given printer</returns>
        public Job GetLastPrinterJob(int printerId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT TOP 1 j.Id, j.PrinterId, j.Image, j.PercentDone, j.FileName, j.TimeLeft, j.StatusDateTime, j.StatusMessage, j.CompleteDateTime, j.PrintLength, j.FilamentLength,
                        p.Name AS PrinterName, p.DeviceIdentifier, p.Description, p.UserProfileId
                        FROM Job j 
                        LEFT JOIN Printer p ON j.PrinterId = p.Id
                        LEFT JOIN UserProfile up ON p.userProfileId = up.Id
                        WHERE p.Id = @printerId
                        ORDER BY statusDateTime DESC";
                    DbUtils.AddParameter(cmd, "@printerId", printerId);
                    var reader = cmd.ExecuteReader();

                    Job job = null;
                    if (reader.Read())
                    {
                        job = new Job()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            PrinterId = DbUtils.GetInt(reader, "PrinterId"),
                            Image = DbUtils.GetString(reader, "Image"),
                            PercentDone = DbUtils.GetNullableInt(reader, "PercentDone"),
                            FileName = DbUtils.GetString(reader, "FileName"),
                            TimeLeft = DbUtils.GetNullableInt(reader, "TimeLeft"),
                            PrintLength = DbUtils.GetInt(reader, "PrintLength"),
                            FilamentLength = DbUtils.GetInt(reader, "FilamentLength"),
                            StatusDateTime = DbUtils.GetDateTime(reader, "StatusDateTime"),
                            StatusMessage = DbUtils.GetString(reader, "StatusMessage"),
                            CompleteDateTime = DbUtils.GetNullableDateTime(reader, "CompleteDateTime")

                        };
                    }
                    reader.Close();
                    return job;
                }
            }
        }
        public Job GetLastUserJob(int userId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT TOP 1 j.Id, j.PrinterId, j.Image, j.PercentDone, j.FileName, j.TimeLeft, j.StatusDateTime, j.StatusMessage, j.CompleteDateTime, j.PrintLength, j.FilamentLength,
                        p.Name AS PrinterName, p.DeviceIdentifier, p.Description, p.UserProfileId
                        FROM Job j 
                        LEFT JOIN Printer p ON j.PrinterId = p.Id
                        LEFT JOIN UserProfile up ON p.userProfileId = up.Id
                        WHERE up.Id = @userId
                        ORDER BY statusDateTime DESC";
                    DbUtils.AddParameter(cmd, "@userId", userId);
                    var reader = cmd.ExecuteReader();

                    Job job = null;
                    if (reader.Read())
                    {
                        job = new Job()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            PrinterId = DbUtils.GetInt(reader, "PrinterId"),
                            Image = DbUtils.GetString(reader, "Image"),
                            PercentDone = DbUtils.GetNullableInt(reader, "PercentDone"),
                            FileName = DbUtils.GetString(reader, "FileName"),
                            TimeLeft = DbUtils.GetNullableInt(reader, "TimeLeft"),
                            PrintLength = DbUtils.GetInt(reader, "PrintLength"),
                            FilamentLength = DbUtils.GetInt(reader, "FilamentLength"),
                            StatusDateTime = DbUtils.GetDateTime(reader, "StatusDateTime"),
                            StatusMessage = DbUtils.GetString(reader, "StatusMessage"),
                            CompleteDateTime = DbUtils.GetNullableDateTime(reader, "CompleteDateTime"),

                        };
                    }
                    reader.Close();
                    return job;
                }
            }
        }
        public Job GetLastJob()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT TOP 1 j.Id, j.PrinterId, j.Image, j.PercentDone, j.FileName, j.TimeLeft, j.StatusDateTime, j.StatusMessage, j.CompleteDateTime, j.PrintLength, j.FilamentLength,
                        p.Name AS PrinterName, p.DeviceIdentifier, p.Description, p.UserProfileId
                        FROM Job j 
                        LEFT JOIN Printer p ON j.PrinterId = p.Id
                        LEFT JOIN UserProfile up ON p.userProfileId = up.Id
                        ORDER BY statusDateTime DESC";

                    var reader = cmd.ExecuteReader();

                    Job job = null;
                    if (reader.Read())
                    {
                        job = new Job()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            PrinterId = DbUtils.GetInt(reader, "PrinterId"),
                            Image = DbUtils.GetString(reader, "Image"),
                            PercentDone = DbUtils.GetNullableInt(reader, "PercentDone"),
                            FileName = DbUtils.GetString(reader, "FileName"),
                            TimeLeft = DbUtils.GetNullableInt(reader, "TimeLeft"),
                            PrintLength = DbUtils.GetInt(reader, "PrintLength"),
                            FilamentLength = DbUtils.GetInt(reader, "FilamentLength"),
                            StatusDateTime = DbUtils.GetDateTime(reader, "StatusDateTime"),
                            StatusMessage = DbUtils.GetString(reader, "StatusMessage"),
                            CompleteDateTime = DbUtils.GetNullableDateTime(reader, "CompleteDateTime"),

                        };
                    }
                    reader.Close();
                    return job;
                }
            }
        }
    }
}
