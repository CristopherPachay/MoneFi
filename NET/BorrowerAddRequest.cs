using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sabio.Models.Domain;

namespace Sabio.Models.Requests
{
    public class BorrowerAddRequest
    {
        [Required]
        [MaxLength(20)]
        public string SSN { get; set; }
        [Required]
        public int StatusId { get; set; }
        [Required]
        [Range(1, int.MaxValue)]
        public int AnnualIncome { get; set; }
        [Required]
        public int LocationId { get; set; }
    }
}
