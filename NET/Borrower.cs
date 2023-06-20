using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain
{
    public class Borrower
    {
        public int Id { get; set; }
        public BaseUser User { get; set; }
        public string SSN { get; set; }
        public LookUp StatusTypes { get; set; }
        public int AnnualIncome { get; set; }
        public BaseLocation Location { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
    }
}