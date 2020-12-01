using System;

namespace iCoode.Core.Models.Entities
{
    public class TimesheetWork: DBModel
    {
        public Contract Contract { get; set; }
        public Decimal HoursWorked { get; set; }
    }
}