using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using WebApp_DentalClinic.Models;
using WebApp_DentalClinic.ViewModels;

namespace WebApp_DentalClinic.Services
{
    public class DentistServices
    {
        private AppDbContext _context;
        private readonly IConfiguration _configuration;
        public DentistServices(AppDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        public async Task<ServiceResponse<string>> DeleteDentist(int userId)
        {
            var response = new ServiceResponse<string>();

            var user = await _context.Users.FindAsync(userId);

            if (user == null)
            {
                response.Success = false;
                response.Message = "User not found";
                return response;
            }

            var dentist = await _context.Dentists.FirstOrDefaultAsync(p => p.UserId == userId);
            if (dentist != null)
            {
                _context.Dentists.Remove(dentist);
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            response.Success = true;
            response.Message = "Dentist deleted successfully";
            return response;
        }

        public async Task<ServiceResponse<List<Dentist>?>> GetAllDentists()
        {

            var response = new ServiceResponse<List<Dentist>>();

            var dentist = await _context.Dentists.ToListAsync();

            if (dentist == null)
            {

                response.Success = false;
                response.Message = "Dentist doesnt exists";
                return response;
            }
            response.Success = true;
            response.Message = "Dentist returned";
            response.Data = dentist;
            return response;
        }

        public async Task<Dentist?> GetSingleDentist(int id)
        {
            var dentist = await _context.Dentists.FindAsync(id);
            if (dentist == null)
            {
                return null;
            }
            return dentist;
        }

        public async Task<Dentist> UpdateDentist(int id, DentistVM request)
        {
            var dentist = await _context.Dentists.FindAsync(id);
            if (dentist == null) return null;
            dentist.EmriMbiemri = request.EmriMbiemri;
            dentist.Degree = request.Degree;
            dentist.Orari = request.Orari;
            dentist.Paga = request.Paga;
            dentist.DepartmentId = request.DepartmentId;
            await _context.SaveChangesAsync();

            return dentist;
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
