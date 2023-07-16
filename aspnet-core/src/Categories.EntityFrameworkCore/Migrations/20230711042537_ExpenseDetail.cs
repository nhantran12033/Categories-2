using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Categories.Migrations
{
    /// <inheritdoc />
    public partial class ExpenseDetail : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EquivalentInVND",
                table: "AppTripExpenses");

            migrationBuilder.DropColumn(
                name: "Item",
                table: "AppTripExpenses");

            migrationBuilder.DropColumn(
                name: "Notes",
                table: "AppTripExpenses");

            migrationBuilder.DropColumn(
                name: "OriginalAmount",
                table: "AppTripExpenses");

            migrationBuilder.DropColumn(
                name: "OriginalCurrency",
                table: "AppTripExpenses");

            migrationBuilder.DropColumn(
                name: "OriginalUnit",
                table: "AppTripExpenses");

            migrationBuilder.DropColumn(
                name: "Specification",
                table: "AppTripExpenses");

            migrationBuilder.DropColumn(
                name: "TotalAmount",
                table: "AppTripExpenses");

            migrationBuilder.DropColumn(
                name: "Volume",
                table: "AppTripExpenses");

            migrationBuilder.CreateTable(
                name: "AppExpenseDeTails",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TripExId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Item = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Specification = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    OriginalCurrency = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    OriginalUnit = table.Column<int>(type: "int", nullable: false),
                    Volume = table.Column<int>(type: "int", nullable: false),
                    OriginalAmount = table.Column<int>(type: "int", nullable: false),
                    EquivalentInVND = table.Column<int>(type: "int", nullable: false),
                    Notes = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TotalAmount = table.Column<int>(type: "int", nullable: false),
                    ExtraProperties = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "nvarchar(40)", maxLength: 40, nullable: true),
                    CreationTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatorId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    LastModificationTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifierId = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppExpenseDeTails", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AppExpenseDeTails_AppTripExpenses_TripExId",
                        column: x => x.TripExId,
                        principalTable: "AppTripExpenses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AppExpenseDeTails_TripExId",
                table: "AppExpenseDeTails",
                column: "TripExId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AppExpenseDeTails");

            migrationBuilder.AddColumn<int>(
                name: "EquivalentInVND",
                table: "AppTripExpenses",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Item",
                table: "AppTripExpenses",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Notes",
                table: "AppTripExpenses",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "OriginalAmount",
                table: "AppTripExpenses",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "OriginalCurrency",
                table: "AppTripExpenses",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "OriginalUnit",
                table: "AppTripExpenses",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Specification",
                table: "AppTripExpenses",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "TotalAmount",
                table: "AppTripExpenses",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Volume",
                table: "AppTripExpenses",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
