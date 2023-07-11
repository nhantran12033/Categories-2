using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Categories.Migrations
{
    /// <inheritdoc />
    public partial class TotalAmount : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "TotalAmount",
                table: "AppTripExpenses",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TotalAmount",
                table: "AppTripExpenses");
        }
    }
}
