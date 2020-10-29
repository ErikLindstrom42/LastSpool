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
    public class NoteRepository : BaseRepository, INoteRepository
    {
        public NoteRepository(IConfiguration configuration) : base(configuration) { }



        public List<Note> GetNotesByJobId(int jobId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {

                    cmd.CommandText = @"
                        SELECT n.Id, n.Content, n.CreateDateTime, n.JobId, j.FileName, j.PrinterId, p.UserProfileId
                        FROM Note n
                        LEFT JOIN Job j on n.JobId = j.Id
                        LEFT JOIN Printer p on j.printerId = p.Id
                        WHERE JobId = @JobId
                        ORDER BY CreateDateTime DESC;";
                    cmd.Parameters.AddWithValue("@JobId", jobId);

                    var reader = cmd.ExecuteReader();

                    var notes = new List<Note>();
                    while (reader.Read())
                    {
                        notes.Add(new Note()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            JobId = DbUtils.GetInt(reader, "JobId"),
                            Content = DbUtils.GetString(reader, "Content"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                            Job = new Job()
                            {
                                FileName = DbUtils.GetString(reader, "FileName"),
                                PrinterId = DbUtils.GetInt(reader, "PrinterId"),
                                Printer = new Printer()
                                {
                                    UserProfileId = DbUtils.GetInt(reader, "UserProfileId")
                                }

                            }


                        });
                    }
                    reader.Close();
                    return notes;
                }
            }
        }

        public Note GetNoteById(int id)

        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT n.Id, n.Content, n.CreateDateTime, n.JobId, j.FileName
                        FROM Note n
                        LEFT JOIN Job j on n.JobId = j.Id
                        WHERE n.Id = @Id
                        ORDER BY n.CreateDateTime DESC;";
                    cmd.Parameters.AddWithValue("@Id", id);

                    var reader = cmd.ExecuteReader();

                    Note note = null;
                    if (reader.Read())
                    {
                        note = new Note()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            JobId = DbUtils.GetInt(reader, "JobId"),
                            Content = DbUtils.GetString(reader, "Content"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                        };
                    }
                    reader.Close();
                    return note;
                }
            }
        }
        public void Add(Note note)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        INSERT INTO Note (JobId, Content, CreateDateTime)
                                        OUTPUT INSERTED.id
                                        VALUES (@JobId, @Content, @CreateDateTime);";

                    DbUtils.AddParameter(cmd, "@JobId", note.JobId);
                    DbUtils.AddParameter(cmd, "@Content", note.Content);
                    DbUtils.AddParameter(cmd, "@CreateDateTime", note.CreateDateTime);
                    note.Id = (int)cmd.ExecuteScalar();

                }
            }
        }

        public void Update(Note note)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        UPDATE Note
                                        SET JobId = @JobId,
                                            Content = @Content,
                                            CreateDateTime = @CreateDateTime
                                        WHERE Id = @Id;";

                    DbUtils.AddParameter(cmd, "@JobId", note.JobId);
                    DbUtils.AddParameter(cmd, "@Content", note.Content);
                    DbUtils.AddParameter(cmd, "@CreateDateTime", note.CreateDateTime);
                    DbUtils.AddParameter(cmd, "@Id", note.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Delete(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "DELETE FROM Note WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }

    }
}
