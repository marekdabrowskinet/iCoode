using System;
using System.Collections.Generic;

namespace iCoode.Core.Models.Entities
{
    public class TimesheetDay: DBModel
    {
        public DateTime Date { get; set; }
        public ICollection<TimesheetWork> Works { get; set; }
        public String Comments { get; set; }
    }
}