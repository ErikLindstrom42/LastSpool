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
    public class PrinterRepository : BaseRepository, IPrinterRepository
    {
        public PrinterRepository(IConfiguration configuration) : base(configuration) { }

        public Printer GetPrinterById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, Name, DeviceIdentifier, Description, UserProfileId
                        FROM Printer
                        WHERE Id = @Id";
                    cmd.Parameters.AddWithValue("@Id", id);
                    var reader = cmd.ExecuteReader();

                    Printer printer = null;
                    if (reader.Read())
                    {
                        printer = new Printer()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name"),
                            DeviceIdentifier = DbUtils.GetString(reader, "DeviceIdentifier"),
                            Description = DbUtils.GetString(reader, "Description"),
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                        };
                    }
                    reader.Close();
                    return printer;
                }
            }
        }
        public Printer GetPrinterByDeviceIdentifier(string deviceIdentifier)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, Name, DeviceIdentifier, Description, UserProfileId
                        FROM Printer
                        WHERE DeviceIdentifier = @deviceIdentifier";
                    cmd.Parameters.AddWithValue("@deviceIdentifier", deviceIdentifier);
                    var reader = cmd.ExecuteReader();

                    Printer printer = null;
                    if (reader.Read())
                    {
                        printer = new Printer()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name"),
                            DeviceIdentifier = DbUtils.GetString(reader, "DeviceIdentifier"),
                            Description = DbUtils.GetString(reader, "Description"),
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                        };
                    }
                    reader.Close();
                    return printer;
                }
            }
        }
    }

}
