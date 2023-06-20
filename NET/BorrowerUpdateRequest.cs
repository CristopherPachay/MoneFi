﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests
{
    public class BorrowerUpdateRequest : BorrowerAddRequest, IModelIdentifier
    {
        [Required]
        [Range(1, int.MaxValue)]
        public int Id { get; set; }
    }
}
