using System;

using System.ComponentModel.DataAnnotations;


namespace LastSpool.Models
{
    public class Job
    {
        public int Id { get; set; }
        public int PrinterId { get; set; }
        [MaxLength(255)]
        public string Image { get; set; }
        [MaxLength(255)]
        public string FileName { get; set; }
        [MaxLength(255)]
        public string StatusMessage { get; set; }
        public int PrintLength { get; set; }
        public int FilamentLength { get; set; }
        public DateTime StatusDateTime { get; set; }
        public string DeviceIdentifier { get; set; }
        
        public Printer Printer { get; set; }
        public UserProfile UserProfile { get; set; }
#nullable enable
        public int? PercentDone { get; set; }
        public int? TimeLeft { get; set; }
        public DateTime? CompleteDateTime { get; set; }
    }
}
