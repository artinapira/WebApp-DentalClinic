using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebApp_DentalClinic.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Admins",
                columns: table => new
                {
                    AdminId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EmriMbiemri = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Username = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PasswordHash = table.Column<byte[]>(type: "varbinary(max)", nullable: false),
                    PasswordSalt = table.Column<byte[]>(type: "varbinary(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Admins", x => x.AdminId);
                });

            migrationBuilder.CreateTable(
                name: "Departments",
                columns: table => new
                {
                    DepartmentId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Emri = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Pershkrimi = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Departments", x => x.DepartmentId);
                });

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
                name: "Kontaktis",
                columns: table => new
                {
                    KontaktiID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Mesazhi = table.Column<string>(type: "varchar(max)", unicode: false, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Kontaktis", x => x.KontaktiID);
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
                name: "Patients",
                columns: table => new
                {
                    PatientId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EmriMbiemri = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DataLindjes = table.Column<DateOnly>(type: "date", nullable: true),
                    Gjinia = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Username = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PasswordHash = table.Column<byte[]>(type: "varbinary(max)", nullable: false),
                    PasswordSalt = table.Column<byte[]>(type: "varbinary(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Patients", x => x.PatientId);
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
                name: "Dentists",
                columns: table => new
                {
                    DentistId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EmriMbiemri = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Degree = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Orari = table.Column<TimeOnly>(type: "time", nullable: true),
                    Paga = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    DepartmentId = table.Column<int>(type: "int", nullable: false),
                    Username = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PasswordHash = table.Column<byte[]>(type: "varbinary(max)", nullable: false),
                    PasswordSalt = table.Column<byte[]>(type: "varbinary(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Dentists", x => x.DentistId);
                    table.ForeignKey(
                        name: "FK_Dentists_Departments_DepartmentId",
                        column: x => x.DepartmentId,
                        principalTable: "Departments",
                        principalColumn: "DepartmentId",
                        onDelete: ReferentialAction.Cascade);
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
                        onDelete: ReferentialAction.Cascade);
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
                name: "Terminets",
                columns: table => new
                {
                    TerminetId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DataT = table.Column<DateOnly>(type: "date", nullable: true),
                    Ora = table.Column<TimeOnly>(type: "time", nullable: true),
                    Ceshtja = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PatientId = table.Column<int>(type: "int", nullable: false),
                    DentistId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Terminets", x => x.TerminetId);
                    table.ForeignKey(
                        name: "FK_Terminets_Dentists_DentistId",
                        column: x => x.DentistId,
                        principalTable: "Dentists",
                        principalColumn: "DentistId");
                    table.ForeignKey(
                        name: "FK_Terminets_Patients_PatientId",
                        column: x => x.PatientId,
                        principalTable: "Patients",
                        principalColumn: "PatientId",
                        onDelete: ReferentialAction.Cascade);
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
                        onDelete: ReferentialAction.Cascade);
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
                name: "IX_Dentists_DepartmentId",
                table: "Dentists",
                column: "DepartmentId");

            migrationBuilder.CreateIndex(
                name: "IX_KnowledgePartner_PartnersPartnerId",
                table: "KnowledgePartner",
                column: "PartnersPartnerId");

            migrationBuilder.CreateIndex(
                name: "IX_MarketingSherbimeShtese_SherbimeShtesesSherbimeShteseId",
                table: "MarketingSherbimeShtese",
                column: "SherbimeShtesesSherbimeShteseId");

            migrationBuilder.CreateIndex(
                name: "IX_MedicalRecords_PatientId",
                table: "MedicalRecords",
                column: "PatientId");

            migrationBuilder.CreateIndex(
                name: "IX_MedicalRecordTerapia_TerapiasTerapiaId",
                table: "MedicalRecordTerapia",
                column: "TerapiasTerapiaId");

            migrationBuilder.CreateIndex(
                name: "IX_PatientNotes_PatientId",
                table: "PatientNotes",
                column: "PatientId");

            migrationBuilder.CreateIndex(
                name: "IX_Prescriptions_PatientId",
                table: "Prescriptions",
                column: "PatientId");

            migrationBuilder.CreateIndex(
                name: "IX_PrescriptionTerapia_TerapiasTerapiaId",
                table: "PrescriptionTerapia",
                column: "TerapiasTerapiaId");

            migrationBuilder.CreateIndex(
                name: "IX_Terminets_DentistId",
                table: "Terminets",
                column: "DentistId");

            migrationBuilder.CreateIndex(
                name: "IX_Terminets_PatientId",
                table: "Terminets",
                column: "PatientId");

            migrationBuilder.CreateIndex(
                name: "IX_Vlersimett_DentistId",
                table: "Vlersimett",
                column: "DentistId");

            migrationBuilder.CreateIndex(
                name: "IX_Vlersimett_PatientId",
                table: "Vlersimett",
                column: "PatientId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Admins");

            migrationBuilder.DropTable(
                name: "Ankesats");

            migrationBuilder.DropTable(
                name: "DentistInventary");

            migrationBuilder.DropTable(
                name: "DentistKnowledge");

            migrationBuilder.DropTable(
                name: "DentistMarketing");

            migrationBuilder.DropTable(
                name: "KnowledgePartner");

            migrationBuilder.DropTable(
                name: "Kontaktis");

            migrationBuilder.DropTable(
                name: "MarketingSherbimeShtese");

            migrationBuilder.DropTable(
                name: "MedicalRecordTerapia");

            migrationBuilder.DropTable(
                name: "PatientNotes");

            migrationBuilder.DropTable(
                name: "PrescriptionTerapia");

            migrationBuilder.DropTable(
                name: "Terminets");

            migrationBuilder.DropTable(
                name: "Vlersimett");

            migrationBuilder.DropTable(
                name: "Inventaries");

            migrationBuilder.DropTable(
                name: "Knowledges");

            migrationBuilder.DropTable(
                name: "Partners");

            migrationBuilder.DropTable(
                name: "Marketings");

            migrationBuilder.DropTable(
                name: "SherbimeShteses");

            migrationBuilder.DropTable(
                name: "MedicalRecords");

            migrationBuilder.DropTable(
                name: "Prescriptions");

            migrationBuilder.DropTable(
                name: "Terapias");

            migrationBuilder.DropTable(
                name: "Dentists");

            migrationBuilder.DropTable(
                name: "Patients");

            migrationBuilder.DropTable(
                name: "Departments");
        }
    }
}
