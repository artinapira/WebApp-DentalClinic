using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.Filters;
using System.Text.Json.Serialization;
using WebApp_DentalClinic;
using WebApp_DentalClinic.Services;

var builder = WebApplication.CreateBuilder(args);

// Retrieve connection string from appsettings.json
string connectionString = builder.Configuration.GetConnectionString("DentalClinicDatabase");

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(connectionString));

// Add services
builder.Services.AddTransient<UserServices>();
builder.Services.AddTransient<PatientServices>();
builder.Services.AddTransient<DentistServices>();
builder.Services.AddTransient<AdminServices>();
builder.Services.AddTransient<TerminetServices>();
builder.Services.AddTransient<AnkesatServices>();
builder.Services.AddTransient<DepartmentServices>();
builder.Services.AddTransient<MarketingServices>();
builder.Services.AddTransient<InventaryServices>();
builder.Services.AddTransient<KnowledgeServices>();
builder.Services.AddTransient<MedicalRecordServices>();
builder.Services.AddTransient<PartnerServices>();
builder.Services.AddTransient<PatientNoteServices>();
builder.Services.AddTransient<PrescriptionServices>();
builder.Services.AddTransient<SherbimeShteseServices>();
builder.Services.AddTransient<TerapiaServices>();
builder.Services.AddTransient<VlersimetServices>();

builder.Services.AddCors(p => p.AddPolicy("corspolicy", build =>
{
    build.WithOrigins("*").AllowAnyMethod().AllowAnyHeader();
}));

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.Preserve;
    });

// Add JWT authentication
string tokenValue = builder.Configuration.GetSection("AppSettings:Token").Value!;
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(tokenValue)),
        ValidateIssuer = false,
        ValidateAudience = false,
        ValidateLifetime = true
    };
});

// Add Swagger/OpenAPI
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Dental Clinic API", Version = "v1" });

    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "JWT Authorization header using the Bearer scheme",
        Type = SecuritySchemeType.Http,
        Scheme = "bearer"
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] {}
        }
    });
});

var app = builder.Build();

// Enable Swagger UI in Development environment
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Add other middleware and routing

app.UseRouting();
app.UseCors();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();

static void NewMethod()
{
    var secretToken = Guid.NewGuid().ToString();
}