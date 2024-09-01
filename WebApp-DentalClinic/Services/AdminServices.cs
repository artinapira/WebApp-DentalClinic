using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using WebApp_DentalClinic.Models;
using WebApp_DentalClinic.ViewModels;

namespace WebApp_DentalClinic.Services
{
    public class AdminServices
    {
        private AppDbContext _context;
        private readonly IConfiguration _configuration;
        public AdminServices(AppDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        public async Task<ServiceResponse<string>> DeleteAdmin(int userId)
        {
            var response = new ServiceResponse<string>();

            var user = await _context.Users.FindAsync(userId);

            if (user == null)
            {
                response.Success = false;
                response.Message = "User not found";
                return response;
            }

            var admin = await _context.Admins.FirstOrDefaultAsync(p => p.UserId == userId);
            if (admin != null)
            {
                _context.Admins.Remove(admin);
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            response.Success = true;
            response.Message = "Admin deleted successfully";
            return response;
        }

        public async Task<ServiceResponse<List<Admin>?>> GetAllAdmins()
        {

            var response = new ServiceResponse<List<Admin>>();

            var admin = await _context.Admins.ToListAsync();

            if (admin == null)
            {

                response.Success = false;
                response.Message = "Admin doesnt exists";
                return response;
            }
            response.Success = true;
            response.Message = "Admin returned";
            response.Data = admin;
            return response;
        }

        public async Task<Admin?> GetSingleAdmin(int id)
        {
            var admin = await _context.Admins.FindAsync(id);
            if (admin == null)
            {
                return null;
            }
            return admin;
        }

        public async Task<Admin> UpdateAdmin(int id, AdminVM request)
        {
            var admin = await _context.Admins.FindAsync(id);
            if (admin == null) return null;
            admin.EmriMbiemri = request.EmriMbiemri;
            await _context.SaveChangesAsync();

            return admin;
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
