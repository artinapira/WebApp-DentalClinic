using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebApp_DentalClinic.Migrations
{
    /// <inheritdoc />
    public partial class lastAddedTables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.CreateTable(
                name: "Ankesats",
                columns: table => new
                {
                    AnkesatId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Ankesa = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DentistId = table.Column<int>(type: "int", nullable: false),
                    PatientId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ankesats", x => x.AnkesatId);
                    table.ForeignKey(
                        name: "FK_Ankesats_Dentists_DentistId",
                        column: x => x.DentistId,
                        principalTable: "Dentists",
                        principalColumn: "DentistId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Ankesats_Patients_PatientId",
                        column: x => x.PatientId,
                        principalTable: "Patients",
                        principalColumn: "PatientId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "DentistInventary",
                columns: table => new
                {
                    DentistsDentistId = table.Column<int>(type: "int", nullable: false),
                    InventoriesInventaryID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DentistInventary", x => new { x.DentistsDentistId, x.InventoriesInventaryID });
                    table.ForeignKey(
                        name: "FK_DentistInventary_Dentists_DentistsDentistId",
                        column: x => x.DentistsDentistId,
                        principalTable: "Dentists",
                        principalColumn: "DentistId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DentistInventary_Inventaries_InventoriesInventaryID",
                        column: x => x.InventoriesInventaryID,
                        principalTable: "Inventaries",
                        principalColumn: "InventaryID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DentistKnowledge",
                columns: table => new
                {
                    DentistsDentistId = table.Column<int>(type: "int", nullable: false),
                    KnowledgesKnowledgeId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DentistKnowledge", x => new { x.DentistsDentistId, x.KnowledgesKnowledgeId });
                    table.ForeignKey(
                        name: "FK_DentistKnowledge_Dentists_DentistsDentistId",
                        column: x => x.DentistsDentistId,
                        principalTable: "Dentists",
                        principalColumn: "DentistId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DentistKnowledge_Knowledges_KnowledgesKnowledgeId",
                        column: x => x.KnowledgesKnowledgeId,
                        principalTable: "Knowledges",
                        principalColumn: "KnowledgeId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DentistMarketing",
                columns: table => new
                {
                    DentistsDentistId = table.Column<int>(type: "int", nullable: false),
                    MarketingsMarketingId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DentistMarketing", x => new { x.DentistsDentistId, x.MarketingsMarketingId });
                    table.ForeignKey(
                        name: "FK_DentistMarketing_Dentists_DentistsDentistId",
                        column: x => x.DentistsDentistId,
                        principalTable: "Dentists",
                        principalColumn: "DentistId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DentistMarketing_Marketings_MarketingsMarketingId",
                        column: x => x.MarketingsMarketingId,
                        principalTable: "Marketings",
                        principalColumn: "MarketingId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "MedicalRecords",
                columns: table => new
                {
                    MedicalRecordId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Pershkrimi = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Simptomat = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Diagnoza = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Rezultati = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PatientId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MedicalRecords", x => x.MedicalRecordId);
                    table.ForeignKey(
                        name: "FK_MedicalRecords_Patients_PatientId",
                        column: x => x.PatientId,
                        principalTable: "Patients",
                        principalColumn: "PatientId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Prescriptions",
                columns: table => new
                {
                    PrescriptionId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Diagnoza = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Medicina = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PatientId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Prescriptions", x => x.PrescriptionId);
                    table.ForeignKey(
                        name: "FK_Prescriptions_Patients_PatientId",
                        column: x => x.PatientId,
                        principalTable: "Patients",
                        principalColumn: "PatientId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Terapias",
                columns: table => new
                {
                    TerapiaId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Emri = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Pershkrimi = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Terapias", x => x.TerapiaId);
                });

            migrationBuilder.CreateTable(
                name: "MedicalRecordTerapia",
                columns: table => new
                {
                    MedicalRecordsMedicalRecordId = table.Column<int>(type: "int", nullable: false),
                    TerapiasTerapiaId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MedicalRecordTerapia", x => new { x.MedicalRecordsMedicalRecordId, x.TerapiasTerapiaId });
                    table.ForeignKey(
                        name: "FK_MedicalRecordTerapia_MedicalRecords_MedicalRecordsMedicalRecordId",
                        column: x => x.MedicalRecordsMedicalRecordId,
                        principalTable: "MedicalRecords",
                        principalColumn: "MedicalRecordId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_MedicalRecordTerapia_Terapias_TerapiasTerapiaId",
                        column: x => x.TerapiasTerapiaId,
                        principalTable: "Terapias",
                        principalColumn: "TerapiaId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PrescriptionTerapia",
                columns: table => new
                {
                    PrescriptionsPrescriptionId = table.Column<int>(type: "int", nullable: false),
                    TerapiasTerapiaId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PrescriptionTerapia", x => new { x.PrescriptionsPrescriptionId, x.TerapiasTerapiaId });
                    table.ForeignKey(
                        name: "FK_PrescriptionTerapia_Prescriptions_PrescriptionsPrescriptionId",
                        column: x => x.PrescriptionsPrescriptionId,
                        principalTable: "Prescriptions",
                        principalColumn: "PrescriptionId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PrescriptionTerapia_Terapias_TerapiasTerapiaId",
                        column: x => x.TerapiasTerapiaId,
                        principalTable: "Terapias",
                        principalColumn: "TerapiaId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Ankesats_DentistId",
                table: "Ankesats",
                column: "DentistId");

            migrationBuilder.CreateIndex(
                name: "IX_Ankesats_PatientId",
                table: "Ankesats",
                column: "PatientId");

            migrationBuilder.CreateIndex(
                name: "IX_DentistInventary_InventoriesInventaryID",
                table: "DentistInventary",
                column: "InventoriesInventaryID");

            migrationBuilder.CreateIndex(
                name: "IX_DentistKnowledge_KnowledgesKnowledgeId",
                table: "DentistKnowledge",
                column: "KnowledgesKnowledgeId");

            migrationBuilder.CreateIndex(
                name: "IX_DentistMarketing_MarketingsMarketingId",
                table: "DentistMarketing",
                column: "MarketingsMarketingId");

            migrationBuilder.CreateIndex(
                name: "IX_MedicalRecords_PatientId",
                table: "MedicalRecords",
                column: "PatientId");

            migrationBuilder.CreateIndex(
                name: "IX_MedicalRecordTerapia_TerapiasTerapiaId",
                table: "MedicalRecordTerapia",
                column: "TerapiasTerapiaId");

            migrationBuilder.CreateIndex(
                name: "IX_Prescriptions_PatientId",
                table: "Prescriptions",
                column: "PatientId");

            migrationBuilder.CreateIndex(
                name: "IX_PrescriptionTerapia_TerapiasTerapiaId",
                table: "PrescriptionTerapia",
                column: "TerapiasTerapiaId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Ankesats");

            migrationBuilder.DropTable(
                name: "DentistInventary");

            migrationBuilder.DropTable(
                name: "DentistKnowledge");

            migrationBuilder.DropTable(
                name: "DentistMarketing");

            migrationBuilder.DropTable(
                name: "MedicalRecordTerapia");

            migrationBuilder.DropTable(
                name: "PrescriptionTerapia");

            migrationBuilder.DropTable(
                name: "MedicalRecords");

            migrationBuilder.DropTable(
                name: "Prescriptions");

            migrationBuilder.DropTable(
                name: "Terapias");

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
    }
}
