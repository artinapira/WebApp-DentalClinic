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
    [Migration("20240506202343_InitialMigration")]
    partial class InitialMigration
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.4")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

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

            modelBuilder.Entity("WebApp_DentalClinic.Models.Patient", b =>
                {
                    b.HasOne("WebApp_DentalClinic.Models.User", "User")
                        .WithMany("Patients")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
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

            modelBuilder.Entity("WebApp_DentalClinic.Models.Dentist", b =>
                {
                    b.Navigation("Terminets");
                });

            modelBuilder.Entity("WebApp_DentalClinic.Models.Department", b =>
                {
                    b.Navigation("Dentists");
                });

            modelBuilder.Entity("WebApp_DentalClinic.Models.Patient", b =>
                {
                    b.Navigation("Terminets");
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
