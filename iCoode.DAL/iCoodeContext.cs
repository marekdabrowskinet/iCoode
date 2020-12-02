using iCoode.Core.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace iCoode.DAL
{
    public class iCoodeContext : DbContext
    {
        private readonly XmlDataProvider xmlDataProvider = new XmlDataProvider();


        public iCoodeContext() : base()
        {

        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql(xmlDataProvider.ConnectionString);
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Contract> Contracts { get; set; }
        public DbSet<Timesheet> Timesheets { get; set; }
        public DbSet<TimesheetDay> TimesheetDays { get; set; }
        public DbSet<TimesheetWork> TimesheetWorks { get; set; }
    }
}