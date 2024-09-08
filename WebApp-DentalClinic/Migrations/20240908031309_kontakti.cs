using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebApp_DentalClinic.Migrations
{
    /// <inheritdoc />
    public partial class kontakti : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Kontaktis",
                columns: table => new
                {
                    KontaktiID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Mesazhi = table.Column<string>(type: "varchar(max)", unicode: false, nullable: false),
                    Emri = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    Email = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Kontaktis", x => x.KontaktiID);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Kontaktis");
        }
    }
}
