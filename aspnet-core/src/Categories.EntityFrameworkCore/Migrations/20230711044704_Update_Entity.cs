using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Categories.Migrations
{
    /// <inheritdoc />
    public partial class UpdateEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TotalAmount",
                table: "AppExpenseDeTails");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<float>(
                name: "TotalAmount",
                table: "AppExpenseDeTails",
                type: "real",
                nullable: false,
                defaultValue: 0f);
        }
    }
}
