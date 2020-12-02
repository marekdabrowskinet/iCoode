using Microsoft.EntityFrameworkCore.Migrations;

namespace iCoode.DAL.Migrations
{
    public partial class AddedCommentsToWorkDay : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Comments",
                table: "TimesheetDays",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Comments",
                table: "TimesheetDays");
        }
    }
}
