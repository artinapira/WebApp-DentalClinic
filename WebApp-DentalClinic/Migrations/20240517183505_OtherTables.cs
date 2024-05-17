using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebApp_DentalClinic.Migrations
{
    /// <inheritdoc />
    public partial class OtherTables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "InventaryID",
                table: "Dentists",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "KnowledgeId",
                table: "Dentists",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "MarketingId",
                table: "Dentists",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Inventaries",
                columns: table => new
                {
                    InventaryID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Emri = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Inventaries", x => x.InventaryID);
                });

            migrationBuilder.CreateTable(
                name: "Knowledges",
                columns: table => new
                {
                    KnowledgeId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Pershkrimi = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Knowledges", x => x.KnowledgeId);
                });

            migrationBuilder.CreateTable(
                name: "Marketings",
                columns: table => new
                {
                    MarketingId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Img = table.Column<byte[]>(type: "varbinary(max)", nullable: true),
                    Pershkrimi = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Marketings", x => x.MarketingId);
                });

            migrationBuilder.CreateTable(
                name: "Partners",
                columns: table => new
                {
                    PartnerId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Emri = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Pershkrimi = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Partners", x => x.PartnerId);
                });

            migrationBuilder.CreateTable(
                name: "PatientNotes",
                columns: table => new
                {
                    PatientNoteId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Pershkrimi = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PatientId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PatientNotes", x => x.PatientNoteId);
                    table.ForeignKey(
                        name: "FK_PatientNotes_Patients_PatientId",
                        column: x => x.PatientId,
                        principalTable: "Patients",
                        principalColumn: "PatientId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SherbimeShteses",
                columns: table => new
                {
                    SherbimeShteseId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Emri = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Pershkrimi = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Cmimi = table.Column<decimal>(type: "decimal(18,2)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SherbimeShteses", x => x.SherbimeShteseId);
                });

            migrationBuilder.CreateTable(
                name: "Vlersimett",
                columns: table => new
                {
                    VlersimetId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Sherbimi = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Sjellja = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DentistId = table.Column<int>(type: "int", nullable: false),
                    PatientId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Vlersimett", x => x.VlersimetId);
                    table.ForeignKey(
                        name: "FK_Vlersimett_Dentists_DentistId",
                        column: x => x.DentistId,
                        principalTable: "Dentists",
                        principalColumn: "DentistId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Vlersimett_Patients_PatientId",
                        column: x => x.PatientId,
                        principalTable: "Patients",
                        principalColumn: "PatientId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "KnowledgePartner",
                columns: table => new
                {
                    KnowledgesKnowledgeId = table.Column<int>(type: "int", nullable: false),
                    PartnersPartnerId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_KnowledgePartner", x => new { x.KnowledgesKnowledgeId, x.PartnersPartnerId });
                    table.ForeignKey(
                        name: "FK_KnowledgePartner_Knowledges_KnowledgesKnowledgeId",
                        column: x => x.KnowledgesKnowledgeId,
                        principalTable: "Knowledges",
                        principalColumn: "KnowledgeId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_KnowledgePartner_Partners_PartnersPartnerId",
                        column: x => x.PartnersPartnerId,
                        principalTable: "Partners",
                        principalColumn: "PartnerId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "MarketingSherbimeShtese",
                columns: table => new
                {
                    MarketingsMarketingId = table.Column<int>(type: "int", nullable: false),
                    SherbimeShtesesSherbimeShteseId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MarketingSherbimeShtese", x => new { x.MarketingsMarketingId, x.SherbimeShtesesSherbimeShteseId });
                    table.ForeignKey(
                        name: "FK_MarketingSherbimeShtese_Marketings_MarketingsMarketingId",
                        column: x => x.MarketingsMarketingId,
                        principalTable: "Marketings",
                        principalColumn: "MarketingId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_MarketingSherbimeShtese_SherbimeShteses_SherbimeShtesesSherbimeShteseId",
                        column: x => x.SherbimeShtesesSherbimeShteseId,
                        principalTable: "SherbimeShteses",
                        principalColumn: "SherbimeShteseId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Dentists_InventaryID",
                table: "Dentists",
                column: "InventaryID");

            migrationBuilder.CreateIndex(
                name: "IX_Dentists_KnowledgeId",
                table: "Dentists",
                column: "KnowledgeId");

            migrationBuilder.CreateIndex(
                name: "IX_Dentists_MarketingId",
                table: "Dentists",
                column: "MarketingId");

            migrationBuilder.CreateIndex(
                name: "IX_KnowledgePartner_PartnersPartnerId",
                table: "KnowledgePartner",
                column: "PartnersPartnerId");

            migrationBuilder.CreateIndex(
                name: "IX_MarketingSherbimeShtese_SherbimeShtesesSherbimeShteseId",
                table: "MarketingSherbimeShtese",
                column: "SherbimeShtesesSherbimeShteseId");

            migrationBuilder.CreateIndex(
                name: "IX_PatientNotes_PatientId",
                table: "PatientNotes",
                column: "PatientId");

            migrationBuilder.CreateIndex(
                name: "IX_Vlersimett_DentistId",
                table: "Vlersimett",
                column: "DentistId");

            migrationBuilder.CreateIndex(
                name: "IX_Vlersimett_PatientId",
                table: "Vlersimett",
                column: "PatientId");

            migrationBuilder.AddForeignKey(
                name: "FK_Dentists_Inventaries_InventaryID",
                table: "Dentists",
                column: "InventaryID",
                principalTable: "Inventaries",
                principalColumn: "InventaryID");

            migrationBuilder.AddForeignKey(
                name: "FK_Dentists_Knowledges_KnowledgeId",
                table: "Dentists",
                column: "KnowledgeId",
                principalTable: "Knowledges",
                principalColumn: "KnowledgeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Dentists_Marketings_MarketingId",
                table: "Dentists",
                column: "MarketingId",
                principalTable: "Marketings",
                principalColumn: "MarketingId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Dentists_Inventaries_InventaryID",
                table: "Dentists");

            migrationBuilder.DropForeignKey(
                name: "FK_Dentists_Knowledges_KnowledgeId",
                table: "Dentists");

            migrationBuilder.DropForeignKey(
                name: "FK_Dentists_Marketings_MarketingId",
                table: "Dentists");

            migrationBuilder.DropTable(
                name: "Inventaries");

            migrationBuilder.DropTable(
                name: "KnowledgePartner");

            migrationBuilder.DropTable(
                name: "MarketingSherbimeShtese");

            migrationBuilder.DropTable(
                name: "PatientNotes");

            migrationBuilder.DropTable(
                name: "Vlersimett");

            migrationBuilder.DropTable(
                name: "Knowledges");

            migrationBuilder.DropTable(
                name: "Partners");

            migrationBuilder.DropTable(
                name: "Marketings");

            migrationBuilder.DropTable(
                name: "SherbimeShteses");

            migrationBuilder.DropIndex(
                name: "IX_Dentists_InventaryID",
                table: "Dentists");

            migrationBuilder.DropIndex(
                name: "IX_Dentists_KnowledgeId",
                table: "Dentists");

            migrationBuilder.DropIndex(
                name: "IX_Dentists_MarketingId",
                table: "Dentists");

            migrationBuilder.DropColumn(
                name: "InventaryID",
                table: "Dentists");

            migrationBuilder.DropColumn(
                name: "KnowledgeId",
                table: "Dentists");

            migrationBuilder.DropColumn(
                name: "MarketingId",
                table: "Dentists");
        }
    }
}
