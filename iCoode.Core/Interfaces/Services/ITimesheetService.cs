using System;
using System.Threading.Tasks;
using iCoode.Core.Models.Entities;

namespace iCoode.Core.Interfaces.Services
{
    public interface ITimesheetService
    {
        Task<Timesheet> ReadAsync(DateTime date);
        Task<bool> IsExistAsync(DateTime date);
        Task<Timesheet> CreateAsync(DateTime date);
        Task UpdateDayAsync(TimesheetDay day);
    }
}