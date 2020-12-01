using System;
using System.Linq;
using System.Threading.Tasks;
using iCoode.Core.Interfaces.DAL;
using iCoode.Core.Interfaces.Services;
using iCoode.Core.Models.Entities;

namespace iCoode.Core.Services
{
    public class TimesheetService: ITimesheetService
    {
        private ITimesheetDataProvider _timesheetDataProvider;

        public TimesheetService(ITimesheetDataProvider timesheetDataProvider)
        {
            _timesheetDataProvider = timesheetDataProvider;
        }

        public async Task<Timesheet> ReadAsync(DateTime date)
        {
            var timesheet = await _timesheetDataProvider.ReadAsync(date);
            CalculateTimesheetCost(timesheet);
            return timesheet;
        }

        public async Task<bool> IsExistAsync(DateTime date)
        {
            var result = await _timesheetDataProvider.IsExistAsync(date);
            if (date.Month == DateTime.Now.Month && !result)
            {
                await CreateAsync(date);
                return true;
            }

            return result;
        }

        public async Task<Timesheet> CreateAsync(DateTime date)
        {
            return await _timesheetDataProvider.CreateAsync(date);
        }

        public async Task UpdateDayAsync(TimesheetDay day)
        {
            await _timesheetDataProvider.UpdateDayAsync(day);
        }

        private void CalculateTimesheetCost(Timesheet timesheet)
        {
            decimal sum = 0;
            foreach (var timesheetDay in timesheet.Days)
            {
                foreach (var dayWork in timesheetDay.Works)
                {
                    sum += (dayWork.HoursWorked * dayWork.Contract.HourlyRate);
                }
            }

            timesheet.Cost = sum;
        }
    }
}