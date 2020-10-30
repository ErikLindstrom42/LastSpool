using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Net.Mime;
using System.Threading.Tasks;

namespace LastSpool.Models
{
    public class Note
    {
        public int Id { get; set; }
        [MaxLength(255)]
        public string Content { get; set; }
        public DateTime CreateDateTime { get; set; }
        public int JobId { get; set; }
        public Job Job { get; set; }
    }
}
