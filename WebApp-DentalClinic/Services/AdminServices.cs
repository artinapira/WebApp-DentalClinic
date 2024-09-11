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

        public async Task<bool> AdminExists(string email)
        {
            if (await _context.Admins.AnyAsync(m => m.Email!.ToLower() == email.ToLower()))
            {
                return true;
            }
            return false;
        }


        public async Task<ServiceResponse<List<Admin>?>> AddAdmin(Admin recepsionisti, string password)
        {

            var response = new ServiceResponse<List<Admin>>();
            Authentication auth = new Authentication();
            if (await AdminExists(recepsionisti.Email))
            {
                response.Success = true;
                response.Message = "recepsionisti exists";
                return response;
            }
            auth.CreatePasswordHash(password, out byte[] passwordHash, out byte[] passwordSalt);

            recepsionisti.PasswordHash = passwordHash;
            recepsionisti.PasswordSalt = passwordSalt;
            _context.Admins.Add(recepsionisti);
            await _context.SaveChangesAsync();
            response.Data = await _context.Admins.ToListAsync();
            return response;
        }
        public async Task<ServiceResponse<List<Admin>?>> DeleteAdmin(int id)
        {
            var response = new ServiceResponse<List<Admin>>();
            var Recepsionisti = await _context.Admins.FindAsync(id);
            if (Recepsionisti == null)
            {
                return null;
            }
            _context.Admins.Remove(Recepsionisti);
            await _context.SaveChangesAsync();
            response.Success = true;
            response.Message = "Admin returned";
            response.Data = await _context.Admins.ToListAsync();
            return response;
        }

        public async Task<ServiceResponse<List<Admin>?>> GetAllAdmin()
        {

            var response = new ServiceResponse<List<Admin>>();

            var Recepsionisti = await _context.Admins.ToListAsync();

            if (Recepsionisti == null)
            {

                response.Success = false;
                response.Message = "Admin doesnt exists";
                return response;
            }
            response.Success = true;
            response.Message = "Admin returned";
            response.Data = Recepsionisti;
            return response;
        }


        public async Task<Admin?> GetSingleAdmin(int id)
        {
            var Recepsionisti = await _context.Admins.FindAsync(id);
            if (Recepsionisti == null)
            {
                return null;
            }
            return Recepsionisti;
        }

        public async Task<List<Admin>?> UpdateAdmin(int id, Admin request)
        {
            var Recepsionisti = await _context.Admins.FindAsync(id);
            if (Recepsionisti == null) return null;
            Recepsionisti.EmriMbiemri = request.EmriMbiemri;
            Recepsionisti.Username = request.Username;
            Recepsionisti.Email = request.Email;

            await _context.SaveChangesAsync();
            return await _context.Admins.ToListAsync();


        }

        public async Task<ServiceResponse<string>> Login(string email, string password)
        {
            var response = new ServiceResponse<string>();
            Authentication auth = new Authentication();
            var recepsionisti = await _context.Admins.FirstOrDefaultAsync(m => m.Email.ToLower().Equals(email.ToLower()));
            if (recepsionisti is null)
            {
                response.Success = false;
                response.Message = "recepsionisti not found";

            }
            else if (!auth.VerifyPasswordHash(password, recepsionisti.PasswordHash, recepsionisti.PasswordSalt))
            {
                response.Success = false;
                response.Message = "Password incorrect";
            }
            else
            {

                response.Success = true;
                response.Message = "Logged in successfully";
                response.Data = CreateToken(recepsionisti);
            }
            return response;
        }

        private string CreateToken(Admin recepsionisti)
        {

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, recepsionisti.AdminId.ToString()),
                new Claim(ClaimTypes.Name, recepsionisti.EmriMbiemri),
                new Claim(ClaimTypes.Role, "Admin")

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
