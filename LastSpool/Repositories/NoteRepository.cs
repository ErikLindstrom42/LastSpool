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
    public class NoteRepository : BaseRepository
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
                        SELECT n.Id, n.Content, n.CreateDateTime, n.JobId, j.FileName
                        FROM Note n
                        LEFT JOIN Job j on n.JobId = j.Id
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
                        WHERE Id = @Id
                        ORDER BY CreateDateTime DESC;";
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
                                        INSERT INTO Comment (PostId, UserProfileId, Subject, Content, CreateDateTime)
                                        OUTPUT INSERTED.id
                                        VALUES (@PostId, @UserProfileId, @Subject, @Content, @CreateDateTime);";

                    DbUtils.AddParameter(cmd, "@PostId", comment.PostId);
                    DbUtils.AddParameter(cmd, "@UserProfileId", comment.UserProfileId);
                    DbUtils.AddParameter(cmd, "@Subject", comment.Subject);
                    DbUtils.AddParameter(cmd, "@Content", comment.Content);
                    DbUtils.AddParameter(cmd, "@CreateDateTime", comment.CreateDateTime);
                    comment.Id = (int)cmd.ExecuteScalar();

                }
            }
        }

        public void Update(Comment comment)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        UPDATE Comment
                                        SET PostId = @PostId,
                                            UserProfileId = @UserProfileId,
                                            Subject = @Subject,
                                            Content = @Content,
                                            CreateDateTime = @CreateDateTime
                                        WHERE Id = @Id;";

                    DbUtils.AddParameter(cmd, "@PostId", comment.PostId);
                    DbUtils.AddParameter(cmd, "@UserProfileId", comment.UserProfileId);
                    DbUtils.AddParameter(cmd, "@Subject", comment.Subject);
                    DbUtils.AddParameter(cmd, "@Content", comment.Content);
                    DbUtils.AddParameter(cmd, "@CreateDateTime", comment.CreateDateTime);
                    DbUtils.AddParameter(cmd, "@Id", comment.Id);

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
                    cmd.CommandText = "DELETE FROM Comment WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }

    }
}
