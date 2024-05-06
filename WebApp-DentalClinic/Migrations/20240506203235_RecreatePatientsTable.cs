using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebApp_DentalClinic.Migrations
{
    /// <inheritdoc />
    public partial class RecreatePatientsTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
    name: "Patients",
    columns: table => new
    {
        PatientId = table.Column<int>(type: "int", nullable: false)
            .Annotation("SqlServer:Identity", "1, 1"),
        EmriMbiemri = table.Column<string>(type: "nvarchar(max)", nullable: false),
        DataLindjes = table.Column<DateTime>(type: "datetime2", nullable: true),
        Gjinia = table.Column<string>(type: "nvarchar(max)", nullable: true),
        UserId = table.Column<int>(type: "int", nullable: false)
    },
    constraints: table =>
    {
        table.PrimaryKey("PK_Patients", x => x.PatientId);
        table.ForeignKey(
            name: "FK_Patients_Users_UserId",
            column: x => x.UserId,
            principalTable: "Users",
            principalColumn: "UserId",
            onDelete: ReferentialAction.Cascade);
    });

            migrationBuilder.CreateIndex(
                name: "IX_Patients_UserId",
                table: "Patients",
                column: "UserId");


        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
