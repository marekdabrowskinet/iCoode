using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace iCoode.DAL.Migrations
{
    public partial class IC20 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Timesheets",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Date = table.Column<DateTime>(nullable: false),
                    Cost = table.Column<decimal>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Timesheets", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TimesheetDays",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Date = table.Column<DateTime>(nullable: false),
                    TimesheetId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TimesheetDays", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TimesheetDays_Timesheets_TimesheetId",
                        column: x => x.TimesheetId,
                        principalTable: "Timesheets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "TimesheetWorks",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ContractId = table.Column<int>(nullable: true),
                    HoursWorked = table.Column<decimal>(nullable: false),
                    TimesheetDayId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TimesheetWorks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TimesheetWorks_Contracts_ContractId",
                        column: x => x.ContractId,
                        principalTable: "Contracts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_TimesheetWorks_TimesheetDays_TimesheetDayId",
                        column: x => x.TimesheetDayId,
                        principalTable: "TimesheetDays",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_TimesheetDays_TimesheetId",
                table: "TimesheetDays",
                column: "TimesheetId");

            migrationBuilder.CreateIndex(
                name: "IX_TimesheetWorks_ContractId",
                table: "TimesheetWorks",
                column: "ContractId");

            migrationBuilder.CreateIndex(
                name: "IX_TimesheetWorks_TimesheetDayId",
                table: "TimesheetWorks",
                column: "TimesheetDayId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TimesheetWorks");

            migrationBuilder.DropTable(
                name: "TimesheetDays");

            migrationBuilder.DropTable(
                name: "Timesheets");
        }
    }
}
