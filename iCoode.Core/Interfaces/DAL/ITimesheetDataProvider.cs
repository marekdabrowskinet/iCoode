using System;
using System.Threading.Tasks;
using iCoode.Core.Models.Entities;

namespace iCoode.Core.Interfaces.DAL
{
    public interface ITimesheetDataProvider: ICrud<Timesheet>
    {
        Task<bool> IsExistAsync(DateTime date);
        Task<Timesheet> CreateAsync(DateTime date);
        Task<Timesheet> ReadAsync(DateTime date);
        Task UpdateDayAsync(TimesheetDay day);

    }
}