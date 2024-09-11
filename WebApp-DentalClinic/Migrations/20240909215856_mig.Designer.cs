﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using WebApp_DentalClinic;

#nullable disable

namespace WebApp_DentalClinic.Migrations
{
    [DbContext(typeof(AppDbContext))]
    [Migration("20240909215856_mig")]
    partial class mig
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.8")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("DentistInventary", b =>
                {
                    b.Property<int>("DentistsDentistId")
                        .HasColumnType("int");

                    b.Property<int>("InventoriesInventaryID")
                        .HasColumnType("int");

                    b.HasKey("DentistsDentistId", "InventoriesInventaryID");

                    b.HasIndex("InventoriesInventaryID");

                    b.ToTable("DentistInventary");
                });

            modelBuilder.Entity("DentistKnowledge", b =>
                {
                    b.Property<int>("DentistsDentistId")
                        .HasColumnType("int");

                    b.Property<int>("KnowledgesKnowledgeId")
                        .HasColumnType("int");

                    b.HasKey("DentistsDentistId", "KnowledgesKnowledgeId");

                    b.HasIndex("KnowledgesKnowledgeId");

                    b.ToTable("DentistKnowledge");
                });

            modelBuilder.Entity("DentistMarketing", b =>
                {
                    b.Property<int>("DentistsDentistId")
                        .HasColumnType("int");

                    b.Property<int>("MarketingsMarketingId")
                        .HasColumnType("int");

                    b.HasKey("DentistsDentistId", "MarketingsMarketingId");

                    b.HasIndex("MarketingsMarketingId");

                    b.ToTable("DentistMarketing");
                });

            modelBuilder.Entity("KnowledgePartner", b =>
                {
                    b.Property<int>("KnowledgesKnowledgeId")
                        .HasColumnType("int");

                    b.Property<int>("PartnersPartnerId")
                        .HasColumnType("int");

                    b.HasKey("KnowledgesKnowledgeId", "PartnersPartnerId");

                    b.HasIndex("PartnersPartnerId");

                    b.ToTable("KnowledgePartner");
                });

            modelBuilder.Entity("MarketingSherbimeShtese", b =>
                {
                    b.Property<int>("MarketingsMarketingId")
                        .HasColumnType("int");

                    b.Property<int>("SherbimeShtesesSherbimeShteseId")
                        .HasColumnType("int");

                    b.HasKey("MarketingsMarketingId", "SherbimeShtesesSherbimeShteseId");

                    b.HasIndex("SherbimeShtesesSherbimeShteseId");

                    b.ToTable("MarketingSherbimeShtese");
                });

            modelBuilder.Entity("MedicalRecordTerapia", b =>
                {
                    b.Property<int>("MedicalRecordsMedicalRecordId")
                        .HasColumnType("int");

                    b.Property<int>("TerapiasTerapiaId")
                        .HasColumnType("int");

                    b.HasKey("MedicalRecordsMedicalRecordId", "TerapiasTerapiaId");

                    b.HasIndex("TerapiasTerapiaId");

                    b.ToTable("MedicalRecordTerapia");
                });

            modelBuilder.Entity("PrescriptionTerapia", b =>
                {
                    b.Property<int>("PrescriptionsPrescriptionId")
                        .HasColumnType("int");

                    b.Property<int>("TerapiasTerapiaId")
                        .HasColumnType("int");

                    b.HasKey("PrescriptionsPrescriptionId", "TerapiasTerapiaId");

                    b.HasIndex("TerapiasTerapiaId");

                    b.ToTable("PrescriptionTerapia");
                });

            modelBuilder.Entity("WebApp_DentalClinic.Models.Admin", b =>
                {
                    b.Property<int>("AdminId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("AdminId"));

                    b.Property<string>("EmriMbiemri")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("AdminId");

                    b.HasIndex("UserId");

                    b.ToTable("Admins");
                });

            modelBuilder.Entity("WebApp_DentalClinic.Models.Ankesat", b =>
                {
                    b.Property<int>("AnkesatId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("AnkesatId"));

                    b.Property<string>("Ankesa")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("DentistId")
                        .HasColumnType("int");

                    b.Property<int>("PatientId")
                        .HasColumnType("int");

                    b.HasKey("AnkesatId");

                    b.HasIndex("DentistId");

                    b.HasIndex("PatientId");

                    b.ToTable("Ankesats");
                });

            modelBuilder.Entity("WebApp_DentalClinic.Models.Dentist", b =>
                {
                    b.Property<int>("DentistId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("DentistId"));

                    b.Property<string>("Degree")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("DepartmentId")
                        .HasColumnType("int");

                    b.Property<string>("EmriMbiemri")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<TimeOnly?>("Orari")
                        .HasColumnType("time");

                    b.Property<decimal>("Paga")
                        .HasColumnType("decimal(18,2)");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("DentistId");

                    b.HasIndex("DepartmentId");

                    b.HasIndex("UserId");

                    b.ToTable("Dentists");
                });

            modelBuilder.Entity("WebApp_DentalClinic.Models.Department", b =>
                {
                    b.Property<int>("DepartmentId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("DepartmentId"));

                    b.Property<string>("Emri")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Pershkrimi")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("DepartmentId");

                    b.ToTable("Departments");
                });

            modelBuilder.Entity("WebApp_DentalClinic.Models.Inventary", b =>
                {
                    b.Property<int>("InventaryID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("InventaryID"));

                    b.Property<string>("Emri")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("InventaryID");

                    b.ToTable("Inventaries");
                });

            modelBuilder.Entity("WebApp_DentalClinic.Models.Knowledge", b =>
                {
                    b.Property<int>("KnowledgeId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("KnowledgeId"));

                    b.Property<string>("Pershkrimi")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("KnowledgeId");

                    b.ToTable("Knowledges");
                });

            modelBuilder.Entity("WebApp_DentalClinic.Models.Kontakti", b =>
                {
                    b.Property<int>("KontaktiId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("KontaktiID");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("KontaktiId"));

                    b.Property<string>("Mesazhi")
                        .IsRequired()
                        .IsUnicode(false)
                        .HasColumnType("varchar(max)");

                    b.HasKey("KontaktiId");

                    b.ToTable("Kontaktis");
                });

            modelBuilder.Entity("WebApp_DentalClinic.Models.Marketing", b =>
                {
                    b.Property<int>("MarketingId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("MarketingId"));

                    b.Property<byte[]>("Img")
                        .HasColumnType("varbinary(max)");

                    b.Property<string>("Pershkrimi")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("MarketingId");

                    b.ToTable("Marketings");
                });

            modelBuilder.Entity("WebApp_DentalClinic.Models.MedicalRecord", b =>
                {
                    b.Property<int>("MedicalRecordId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("MedicalRecordId"));

                    b.Property<string>("Diagnoza")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("PatientId")
                        .HasColumnType("int");

                    b.Property<string>("Pershkrimi")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Rezultati")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Simptomat")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("MedicalRecordId");

                    b.HasIndex("PatientId");

                    b.ToTable("MedicalRecords");
                });

            modelBuilder.Entity("WebApp_DentalClinic.Models.Partner", b =>
                {
                    b.Property<int>("PartnerId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("PartnerId"));

                    b.Property<string>("Emri")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Pershkrimi")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("PartnerId");

                    b.ToTable("Partners");
                });

            modelBuilder.Entity("WebApp_DentalClinic.Models.Patient", b =>
                {
                    b.Property<int>("PatientId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("PatientId"));

                    b.Property<DateOnly?>("DataLindjes")
                        .HasColumnType("date");

                    b.Property<string>("EmriMbiemri")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Gjinia")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("PatientId");

                    b.HasIndex("UserId");

                    b.ToTable("Patients");
                });

            modelBuilder.Entity("WebApp_DentalClinic.Models.PatientNote", b =>
                {
                    b.Property<int>("PatientNoteId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("PatientNoteId"));

                    b.Property<int>("PatientId")
                        .HasColumnType("int");

                    b.Property<string>("Pershkrimi")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("PatientNoteId");

                    b.HasIndex("PatientId");

                    b.ToTable("PatientNotes");
                });

            modelBuilder.Entity("WebApp_DentalClinic.Models.Prescription", b =>
                {
                    b.Property<int>("PrescriptionId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("PrescriptionId"));

                    b.Property<string>("Diagnoza")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Medicina")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("PatientId")
                        .HasColumnType("int");

                    b.HasKey("PrescriptionId");

                    b.HasIndex("PatientId");

                    b.ToTable("Prescriptions");
                });

            modelBuilder.Entity("WebApp_DentalClinic.Models.SherbimeShtese", b =>
                {
                    b.Property<int>("SherbimeShteseId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("SherbimeShteseId"));

                    b.Property<decimal?>("Cmimi")
                        .HasColumnType("decimal(18,2)");

                    b.Property<string>("Emri")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Pershkrimi")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("SherbimeShteseId");

                    b.ToTable("SherbimeShteses");
                });

            modelBuilder.Entity("WebApp_DentalClinic.Models.Terapia", b =>
                {
                    b.Property<int>("TerapiaId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("TerapiaId"));

                    b.Property<string>("Emri")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Pershkrimi")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("TerapiaId");

                    b.ToTable("Terapias");
                });

            modelBuilder.Entity("WebApp_DentalClinic.Models.Terminet", b =>
                {
                    b.Property<int>("TerminetId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("TerminetId"));

                    b.Property<string>("Ceshtja")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateOnly?>("DataT")
                        .HasColumnType("date");

                    b.Property<int>("DentistId")
                        .HasColumnType("int");

                    b.Property<TimeOnly?>("Ora")
                        .HasColumnType("time");

                    b.Property<int>("PatientId")
                        .HasColumnType("int");

                    b.HasKey("TerminetId");

                    b.HasIndex("DentistId");

                    b.HasIndex("PatientId");

                    b.ToTable("Terminets");
                });

            modelBuilder.Entity("WebApp_DentalClinic.Models.User", b =>
                {
                    b.Property<int>("UserId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("UserId"));

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<byte[]>("PasswordHash")
                        .IsRequired()
                        .HasColumnType("varbinary(max)");

                    b.Property<byte[]>("PasswordSalt")
                        .IsRequired()
                        .HasColumnType("varbinary(max)");

                    b.Property<int>("UserRole")
                        .HasColumnType("int");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("UserId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("WebApp_DentalClinic.Models.Vlersimet", b =>
                {
                    b.Property<int>("VlersimetId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("VlersimetId"));

                    b.Property<int>("DentistId")
                        .HasColumnType("int");

                    b.Property<int>("PatientId")
                        .HasColumnType("int");

                    b.Property<string>("Sherbimi")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Sjellja")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("VlersimetId");

                    b.HasIndex("DentistId");

                    b.HasIndex("PatientId");

                    b.ToTable("Vlersimett");
                });

            modelBuilder.Entity("DentistInventary", b =>
                {
                    b.HasOne("WebApp_DentalClinic.Models.Dentist", null)
                        .WithMany()
                        .HasForeignKey("DentistsDentistId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("WebApp_DentalClinic.Models.Inventary", null)
                        .WithMany()
                        .HasForeignKey("InventoriesInventaryID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("DentistKnowledge", b =>
                {
                    b.HasOne("WebApp_DentalClinic.Models.Dentist", null)
                        .WithMany()
                        .HasForeignKey("DentistsDentistId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("WebApp_DentalClinic.Models.Knowledge", null)
                        .WithMany()
                        .HasForeignKey("KnowledgesKnowledgeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("DentistMarketing", b =>
                {
                    b.HasOne("WebApp_DentalClinic.Models.Dentist", null)
                        .WithMany()
                        .HasForeignKey("DentistsDentistId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("WebApp_DentalClinic.Models.Marketing", null)
                        .WithMany()
                        .HasForeignKey("MarketingsMarketingId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("KnowledgePartner", b =>
                {
                    b.HasOne("WebApp_DentalClinic.Models.Knowledge", null)
                        .WithMany()
                        .HasForeignKey("KnowledgesKnowledgeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("WebApp_DentalClinic.Models.Partner", null)
                        .WithMany()
                        .HasForeignKey("PartnersPartnerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("MarketingSherbimeShtese", b =>
                {
                    b.HasOne("WebApp_DentalClinic.Models.Marketing", null)
                        .WithMany()
                        .HasForeignKey("MarketingsMarketingId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("WebApp_DentalClinic.Models.SherbimeShtese", null)
                        .WithMany()
                        .HasForeignKey("SherbimeShtesesSherbimeShteseId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("MedicalRecordTerapia", b =>
                {
                    b.HasOne("WebApp_DentalClinic.Models.MedicalRecord", null)
                        .WithMany()
                        .HasForeignKey("MedicalRecordsMedicalRecordId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("WebApp_DentalClinic.Models.Terapia", null)
                        .WithMany()
                        .HasForeignKey("TerapiasTerapiaId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("PrescriptionTerapia", b =>
                {
                    b.HasOne("WebApp_DentalClinic.Models.Prescription", null)
                        .WithMany()
                        .HasForeignKey("PrescriptionsPrescriptionId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("WebApp_DentalClinic.Models.Terapia", null)
                        .WithMany()
                        .HasForeignKey("TerapiasTerapiaId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("WebApp_DentalClinic.Models.Admin", b =>
                {
                    b.HasOne("WebApp_DentalClinic.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("WebApp_DentalClinic.Models.Ankesat", b =>
                {
                    b.HasOne("WebApp_DentalClinic.Models.Dentist", "Dentist")
                        .WithMany("Ankesats")
                        .HasForeignKey("DentistId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("WebApp_DentalClinic.Models.Patient", "Patient")
                        .WithMany("Ankesats")
                        .HasForeignKey("PatientId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Dentist");

                    b.Navigation("Patient");
                });

            modelBuilder.Entity("WebApp_DentalClinic.Models.Dentist", b =>
                {
                    b.HasOne("WebApp_DentalClinic.Models.Department", "Department")
                        .WithMany("Dentists")
                        .HasForeignKey("DepartmentId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("WebApp_DentalClinic.Models.User", "User")
                        .WithMany("Dentists")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Department");

                    b.Navigation("User");
                });

            modelBuilder.Entity("WebApp_DentalClinic.Models.MedicalRecord", b =>
                {
                    b.HasOne("WebApp_DentalClinic.Models.Patient", "Patient")
                        .WithMany("MedicalRecords")
                        .HasForeignKey("PatientId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Patient");
                });

            modelBuilder.Entity("WebApp_DentalClinic.Models.Patient", b =>
                {
                    b.HasOne("WebApp_DentalClinic.Models.User", "User")
                        .WithMany("Patients")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("WebApp_DentalClinic.Models.PatientNote", b =>
                {
                    b.HasOne("WebApp_DentalClinic.Models.Patient", "Patient")
                        .WithMany("PacientNotes")
                        .HasForeignKey("PatientId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Patient");
                });

            modelBuilder.Entity("WebApp_DentalClinic.Models.Prescription", b =>
                {
                    b.HasOne("WebApp_DentalClinic.Models.Patient", "Patient")
                        .WithMany("Prescriptions")
                        .HasForeignKey("PatientId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Patient");
                });

            modelBuilder.Entity("WebApp_DentalClinic.Models.Terminet", b =>
                {
                    b.HasOne("WebApp_DentalClinic.Models.Dentist", "Dentist")
                        .WithMany("Terminets")
                        .HasForeignKey("DentistId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("WebApp_DentalClinic.Models.Patient", "Patient")
                        .WithMany("Terminets")
                        .HasForeignKey("PatientId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Dentist");

                    b.Navigation("Patient");
                });

            modelBuilder.Entity("WebApp_DentalClinic.Models.Vlersimet", b =>
                {
                    b.HasOne("WebApp_DentalClinic.Models.Dentist", "Dentist")
                        .WithMany("Vlersimets")
                        .HasForeignKey("DentistId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("WebApp_DentalClinic.Models.Patient", "Patient")
                        .WithMany("Vlersimets")
                        .HasForeignKey("PatientId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Dentist");

                    b.Navigation("Patient");
                });

            modelBuilder.Entity("WebApp_DentalClinic.Models.Dentist", b =>
                {
                    b.Navigation("Ankesats");

                    b.Navigation("Terminets");

                    b.Navigation("Vlersimets");
                });

            modelBuilder.Entity("WebApp_DentalClinic.Models.Department", b =>
                {
                    b.Navigation("Dentists");
                });

            modelBuilder.Entity("WebApp_DentalClinic.Models.Patient", b =>
                {
                    b.Navigation("Ankesats");

                    b.Navigation("MedicalRecords");

                    b.Navigation("PacientNotes");

                    b.Navigation("Prescriptions");

                    b.Navigation("Terminets");

                    b.Navigation("Vlersimets");
                });

            modelBuilder.Entity("WebApp_DentalClinic.Models.User", b =>
                {
                    b.Navigation("Dentists");

                    b.Navigation("Patients");
                });
#pragma warning restore 612, 618
        }
    }
}
