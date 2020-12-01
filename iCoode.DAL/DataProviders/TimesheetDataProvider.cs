using iCoode.Core.Interfaces.DAL;
using iCoode.Core.Models.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace iCoode.DAL.DataProviders
{
    public class TimesheetDataProvider : DataProviderBase<Timesheet>, ITimesheetDataProvider
    {
        public async Task<bool> IsExistAsync(DateTime date)
        {
            return await context.Timesheets.AnyAsync(t => t.Date.Month == date.Month && t.Date.Year == date.Year);
        }

        public async Task<Timesheet> CreateAsync(DateTime date)
        {
            var timesheet = new Timesheet();
            timesheet.Date = date;
            timesheet.Cost = 0;
            timesheet.Days = new List<TimesheetDay>();
            int daysInMonth = DateTime.DaysInMonth(date.Year, date.Month);
            for (int i = 1; i <= daysInMonth; i++)
            {
                var day = new TimesheetDay
                {
                    Works = new List<TimesheetWork>(),
                    Date = new DateTime(timesheet.Date.Year, timesheet.Date.Month, i)
                };
                timesheet.Days.Add(day);
            }

            await context.Timesheets.AddAsync(timesheet);
            await context.SaveChangesAsync();
            return timesheet;
        }

        public async Task<Timesheet> ReadAsync(DateTime date)
        {
            return await context.Timesheets.
                Include(t => t.Days).ThenInclude(td => td.Works).ThenInclude(w => w.Contract).
                FirstOrDefaultAsync(t => t.Date.Month == date.Month && t.Date.Year == date.Year);
        }

        public async Task UpdateDayAsync(TimesheetDay day)
        {
            var currentDay = await context.TimesheetDays.Include(td => td.Works).FirstOrDefaultAsync(td => td.Id == day.Id);
            if (currentDay != null)
            {
                currentDay.Comments = day.Comments;
                if (currentDay.Works.Count > 0)
                {
                    var worksToRemove = currentDay.Works.Where(w => !day.Works.Select(c => c.Id).Contains(w.Id))
                        .Select(w => w.Id);
                    var worksToAdd = day.Works.Where(w => !currentDay.Works.Select(c => c.Id).Contains(w.Id))
                        .Select(w => w.Id);

                    await context.TimesheetWorks.Where(tw => worksToRemove.Contains(tw.Id)).ForEachAsync(work =>
                    {
                        currentDay.Works.Remove(work);
                    });
                    await context.TimesheetWorks.Where(tw => worksToAdd.Contains(tw.Id)).ForEachAsync(work =>
                    {
                        currentDay.Works.Add(work);
                    });
                }
                else
                {
                    foreach (var work in day.Works)
                    {
                        currentDay.Works.Add(work); 
                    }
                }

                await context.SaveChangesAsync();
            }
        }
    }
}