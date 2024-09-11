using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using WebApp_DentalClinic.Models;
using WebApp_DentalClinic.ViewModels;

namespace WebApp_DentalClinic.Services
{
    public class PatientServices
    {
        private AppDbContext _context;
        private readonly IConfiguration _configuration;

        public PatientServices(AppDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        public async Task<bool> PatientExists(string email)
        {
            if (await _context.Patients.AnyAsync(m => m.Email!.ToLower() == email.ToLower()))
            {
                return true;
            }
            return false;
        }

        public async Task<ServiceResponse<List<Patient>?>> AddPatient(Patient pacienti, string password)
        {

            var response = new ServiceResponse<List<Patient>>();
            Authentication auth = new Authentication();
            if (await PatientExists(pacienti.Email))
            {
                response.Success = true;
                response.Message = "pacienti already exists";
                return response;
            }
            auth.CreatePasswordHash(password, out byte[] passwordHash, out byte[] passwordSalt);

            pacienti.PasswordHash = passwordHash;
            pacienti.PasswordSalt = passwordSalt;
            _context.Patients.Add(pacienti);
            await _context.SaveChangesAsync();
            response.Data = await _context.Patients.ToListAsync();
            return response;
        }
        public async Task<List<Patient>?> DeletePatient(int id)
        {
            var pacienti = await _context.Patients.FindAsync(id);
            if (pacienti == null)
            {
                return null;
            }

            _context.Patients.Remove(pacienti);
            await _context.SaveChangesAsync();
            return await _context.Patients.ToListAsync();
        }

        public async Task<List<Patient>> GetAllPatient()
        {
            var pacientat = await _context.Patients.ToListAsync();
            return pacientat;
        }

        public async Task<Patient?> GetSinglePatient(int id)
        {
            var pacienti = await _context.Patients.FindAsync(id);
            if (pacienti == null)
            {
                return null;
            }
            return pacienti;
        }

        public async Task<Patient> UpdatePatient(int id, Patient request)
        {
            var pacienti = await _context.Patients.FindAsync(id);
            if (pacienti == null) return null;
            pacienti.EmriMbiemri = request.EmriMbiemri;
            pacienti.DataLindjes = request.DataLindjes;
            pacienti.Gjinia = request.Gjinia;
            pacienti.Username = request.Username;
            pacienti.Email = request.Email;
            await _context.SaveChangesAsync();
            return pacienti;



        }

        public async Task<ServiceResponse<string>> Login(string email, string password)
        {
            var response = new ServiceResponse<string>();
            Authentication auth = new Authentication();
            var pacienti = await _context.Patients.FirstOrDefaultAsync(m => m.Email.ToLower().Equals(email.ToLower()));
            if (pacienti is null)
            {
                response.Success = false;
                response.Message = "pacienti not found";
            }
            else if (!auth.VerifyPasswordHash(password, pacienti.PasswordHash, pacienti.PasswordSalt))
            {
                response.Success = false;
                response.Message = "Password incorrect";
            }
            else
            {
                response.Data = CreateToken(pacienti);
                response.Success = true;
                response.Message = "Login Successful.";
            }
            return response;
        }

        private string CreateToken(Patient pacienti)
        {

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, pacienti.PatientId.ToString()),
                new Claim(ClaimTypes.Name, pacienti.EmriMbiemri),
                new Claim(ClaimTypes.Role, "Patient")

            };

            var appSettingsToken = _configuration.GetSection("AppSettings:Token").Value;
            if (appSettingsToken is null)
            {
                throw new Exception("Appsettings token is null");
            }

            SymmetricSecurityKey key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(appSettingsToken));
            SigningCredentials creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };

            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
            SecurityToken token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);


        }
    }
}
