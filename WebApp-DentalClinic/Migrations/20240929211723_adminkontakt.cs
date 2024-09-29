using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebApp_DentalClinic.Migrations
{
    /// <inheritdoc />
    public partial class adminkontakt : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "PatientId",
                table: "Kontaktis",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "DepartmentId",
                table: "Admins",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Kontaktis_PatientId",
                table: "Kontaktis",
                column: "PatientId");

            migrationBuilder.CreateIndex(
                name: "IX_Admins_DepartmentId",
                table: "Admins",
                column: "DepartmentId");

            migrationBuilder.AddForeignKey(
                name: "FK_Admins_Departments_DepartmentId",
                table: "Admins",
                column: "DepartmentId",
                principalTable: "Departments",
                principalColumn: "DepartmentId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Kontaktis_Patients_PatientId",
                table: "Kontaktis",
                column: "PatientId",
                principalTable: "Patients",
                principalColumn: "PatientId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Admins_Departments_DepartmentId",
                table: "Admins");

            migrationBuilder.DropForeignKey(
                name: "FK_Kontaktis_Patients_PatientId",
                table: "Kontaktis");

            migrationBuilder.DropIndex(
                name: "IX_Kontaktis_PatientId",
                table: "Kontaktis");

            migrationBuilder.DropIndex(
                name: "IX_Admins_DepartmentId",
                table: "Admins");

            migrationBuilder.DropColumn(
                name: "PatientId",
                table: "Kontaktis");

            migrationBuilder.DropColumn(
                name: "DepartmentId",
                table: "Admins");
        }
    }
}
