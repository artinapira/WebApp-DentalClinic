using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebApp_DentalClinic.Migrations
{
    /// <inheritdoc />
    public partial class newChange : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Terminets_Dentists_DentistId",
                table: "Terminets");

            migrationBuilder.AlterColumn<int>(
                name: "DentistId",
                table: "Terminets",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "StafiId",
                table: "Terminets",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddForeignKey(
                name: "FK_Terminets_Dentists_DentistId",
                table: "Terminets",
                column: "DentistId",
                principalTable: "Dentists",
                principalColumn: "DentistId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Terminets_Dentists_DentistId",
                table: "Terminets");

            migrationBuilder.DropColumn(
                name: "StafiId",
                table: "Terminets");

            migrationBuilder.AlterColumn<int>(
                name: "DentistId",
                table: "Terminets",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Terminets_Dentists_DentistId",
                table: "Terminets",
                column: "DentistId",
                principalTable: "Dentists",
                principalColumn: "DentistId");
        }
    }
}
