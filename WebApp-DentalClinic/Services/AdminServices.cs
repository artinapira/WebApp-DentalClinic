using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
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

            // Check if the admin already exists
            if (await AdminExists(recepsionisti.Email))
            {
                response.Success = false;  // Set Success to false, since the admin already exists
                response.Message = "recepsionisti exists";
                return response;
            }

            // Create password hash and salt
            auth.CreatePasswordHash(password, out byte[] passwordHash, out byte[] passwordSalt);
            recepsionisti.PasswordHash = passwordHash;
            recepsionisti.PasswordSalt = passwordSalt;

            // Automatically generate a refresh token
            recepsionisti.RefreshToken = GenerateRefreshToken();

            // Add admin to the context
            _context.Admins.Add(recepsionisti);
            await _context.SaveChangesAsync();

            // Return all admins
            response.Data = await _context.Admins.ToListAsync();
            response.Success = true;  // Indicate success when the admin is added successfully
            return response;
        }

        // Generate a refresh token
        private string GenerateRefreshToken()
        {
            return Guid.NewGuid().ToString();  // Generate a simple token, can be enhanced later
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
            Recepsionisti.DepartmentId = request.DepartmentId;

            await _context.SaveChangesAsync();
            return await _context.Admins.ToListAsync();


        }

        public async Task<ServiceResponse<LoginResponse>> Login(string email, string password)
        {
            var response = new ServiceResponse<LoginResponse>();
            Authentication auth = new Authentication();
            var admin = await _context.Admins.FirstOrDefaultAsync(m => m.Email.ToLower().Equals(email.ToLower()));

            if (admin == null)
            {
                response.Success = false;
                response.Message = "Admin not found";
                return response;
            }

            if (!auth.VerifyPasswordHash(password, admin.PasswordHash, admin.PasswordSalt))
            {
                response.Success = false;
                response.Message = "Password incorrect";
                return response;
            }

            // Generate Access Token
            string accessToken = CreateToken(admin);

            // Generate Refresh Token
            string refreshToken = CreateRefreshToken();
            admin.RefreshToken = refreshToken;
            admin.RefreshTokenExpiryTime = DateTime.Now.AddDays(1); 

            await _context.SaveChangesAsync(); // Save refresh token in database

            // Return both tokens in response
            response.Data = new LoginResponse
            {
                AccessToken = accessToken,
                RefreshToken = refreshToken
            };
            response.Success = true;
            response.Message = "Login successful";

            return response;
        }

        private string CreateRefreshToken()
        {
            var randomNumber = new byte[64];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(randomNumber);
                return Convert.ToBase64String(randomNumber);
            }
        }


        private string CreateToken(Admin admin)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, admin.AdminId.ToString()),
                new Claim(ClaimTypes.Name, admin.EmriMbiemri),
                new Claim(ClaimTypes.Role, "Admin")
            };

            var appSettingsToken = _configuration.GetSection("AppSettings:Token").Value;
            if (appSettingsToken == null)
            {
                throw new Exception("AppSettings Token is null");
            }

            SymmetricSecurityKey key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(appSettingsToken));
            SigningCredentials creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddMinutes(15), // Access token valid for 15 minutes
                SigningCredentials = creds
            };

            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
            SecurityToken token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }

        public async Task<ServiceResponse<LoginResponse>> RefreshToken(string refreshToken)
        {
            var response = new ServiceResponse<LoginResponse>();

            var admin = await _context.Admins.FirstOrDefaultAsync(a => a.RefreshToken == refreshToken);
            if (admin == null || admin.RefreshTokenExpiryTime < DateTime.Now)
            {
                response.Success = false;
                response.Message = "Invalid or expired refresh token";
                return response;
            }

            // Generate new access token
            string newAccessToken = CreateToken(admin);

            // Optionally, generate a new refresh token for added security
            string newRefreshToken = CreateRefreshToken();
            admin.RefreshToken = newRefreshToken;
            admin.RefreshTokenExpiryTime = DateTime.Now.AddDays(7); // New refresh token valid for 7 more days

            await _context.SaveChangesAsync(); // Update the database

            response.Data = new LoginResponse
            {
                AccessToken = newAccessToken,
                RefreshToken = newRefreshToken
            };
            response.Success = true;
            response.Message = "Token refreshed successfully";

            return response;
        }


    }
}
