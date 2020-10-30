using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace LastSpool.Models
{
    public class IncomingJob
    {
        public int Id { get; set; }
        public int PrinterId { get; set; }
        [MaxLength(255)]
        public string Image { get; set; }
        [MaxLength(255)]
        public string FileName { get; set; }
        [MaxLength(255)]
        public string StatusMessage { get; set; }
        public double PrintLength { get; set; }
        public double FilamentLength { get; set; }
        public double StatusTime { get; set; }
        public string DeviceIdentifier { get; set; }

        public Printer Printer { get; set; }
#nullable enable
        public int? TimeLeft { get; set; }
        public double? PercentDone { get; set; }
        public string? CompleteDateTime { get; set; }
    }
}

