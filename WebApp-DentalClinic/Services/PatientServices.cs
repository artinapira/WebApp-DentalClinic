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

        public async Task<ServiceResponse<string>> DeletePatient(int userId)
        {
            var response = new ServiceResponse<string>();

            var user = await _context.Users.FindAsync(userId);

            if (user == null)
            {
                response.Success = false;
                response.Message = "User not found";
                return response;
            }

            var patient = await _context.Patients.FirstOrDefaultAsync(p => p.UserId == userId);
            if (patient != null)
            {
                _context.Patients.Remove(patient); 
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            response.Success = true;
            response.Message = "User deleted successfully";
            return response;
        }

        public async Task<ServiceResponse<List<Patient>?>> GetAllPatients()
        {

            var response = new ServiceResponse<List<Patient>>();

            var patient = await _context.Patients.ToListAsync();

            if (patient == null)
            {

                response.Success = false;
                response.Message = "Patient doesnt exists";
                return response;
            }
            response.Success = true;
            response.Message = "Patient returned";
            response.Data = patient;
            return response;
        }

        public async Task<Patient?> GetSinglePatient(int id)
        {
            var patient = await _context.Patients.FindAsync(id);
            if (patient == null)
            {
                return null;
            }
            return patient;
        }

        public async Task<Patient> UpdatePatient(int id, PatientVM request)
        {
            var patient = await _context.Patients.FindAsync(id);
            if (patient == null) return null;
            patient.EmriMbiemri = request.EmriMbiemri;
            patient.DataLindjes = request.DataLindjes;
            patient.Gjinia = request.Gjinia;
            await _context.SaveChangesAsync();

            return patient;
        }

        public async Task<ServiceResponse<string>> Login(string email, string password)
        {
            var response = new ServiceResponse<string>();
            Authentication auth = new Authentication();
            var user = await _context.Users.FirstOrDefaultAsync(m => m.Email.ToLower().Equals(email.ToLower()));
            if (user is null)
            {
                response.Success = false;
                response.Message = "user not found";
            }
            else if (!auth.VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
            {
                response.Success = false;
                response.Message = "Password incorrect";
            }
            else
            {
                response.Success = true;
                response.Message = "Logged in successfully";
                response.Data = CreateToken(user);
                response.Success = true;
                response.Message = "Logged in successfully";
            }
            return response;
        }

        private string CreateToken(User user)
        {

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.UserId.ToString()),
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Role, user.UserRole.ToString())

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
