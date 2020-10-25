using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace LastSpool.Models
{
    public class Job
    {
        public int Id { get; set; }
        public int PrinterId { get; set; }
        [MaxLength(255)]
        public string Image { get; set; }
        public int PercentDone { get; set; }
        [MaxLength(255)]
        public string FileName { get; set; }
        public int TimeLeft { get; set; }
        [MaxLength(255)]
        public string StatusMessage { get; set; }
        public int PrintLength { get; set; }
        public int FilamentLength { get; set; }
        public DateTime StatusTime { get; set; }
        public DateTime CompleteDateTime { get; set; }
        public string deviceIdentifier { get; set; }
        
        public Printer Printer { get; set; }
    }
}
