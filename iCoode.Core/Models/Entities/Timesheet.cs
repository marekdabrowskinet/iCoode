using System;
using System.Collections.Generic;

namespace iCoode.Core.Models.Entities
{
    public class Timesheet: DBModel
    {
        public DateTime Date { get; set; }
        public ICollection<TimesheetDay> Days { get; set; }
        public Decimal Cost { get; set; }

    }
}