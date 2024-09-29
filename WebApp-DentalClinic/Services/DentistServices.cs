using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
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

        public async Task<bool> DentistExists(string email)
        {
            if (await _context.Dentists.AnyAsync(m => m.Email.ToLower() == email.ToLower()))
            {
                return true;
            }
            return false;
        }

        public async Task<ServiceResponse<List<Dentist>?>> AddDentist(Dentist mjeku, string password)
        {
            var response = new ServiceResponse<List<Dentist>>();
            Authentication auth = new Authentication();

            // Check if the dentist already exists
            if (await DentistExists(mjeku.Email))
            {
                response.Success = false;
                response.Message = "Mjeku already exists";
                return response;
            }

            // Create password hash and salt
            auth.CreatePasswordHash(password, out byte[] passwordHash, out byte[] passwordSalt);
            mjeku.PasswordHash = passwordHash;
            mjeku.PasswordSalt = passwordSalt;

            // Automatically generate and assign a refresh token
            mjeku.RefreshToken = GenerateRefreshToken();

            // Add the dentist to the database
            _context.Dentists.Add(mjeku);
            await _context.SaveChangesAsync();

            // Return the list of dentists
            response.Data = await _context.Dentists.ToListAsync();
            response.Success = true;
            return response;
        }

        private string GenerateRefreshToken()
        {
            // Generate a secure random token, using GUID as an example
            return Guid.NewGuid().ToString();
        }



        public async Task<ServiceResponse<List<Dentist>?>> DeleteDentist(int id)

        {
            var response = new ServiceResponse<List<Dentist>>();
            var Mjeku = await _context.Dentists.FindAsync(id);
            if (Mjeku == null)
            {
                return null;
            }
            _context.Dentists.Remove(Mjeku);
            await _context.SaveChangesAsync();
            response.Success = true;
            response.Message = "Mjeku returned";
            response.Data = await _context.Dentists.ToListAsync();
            return response;
        }

        public async Task<ServiceResponse<List<Dentist>?>> GetAllDentist()
        {

            var response = new ServiceResponse<List<Dentist>>();

            var mjeku = await _context.Dentists.ToListAsync();

            if (mjeku == null)
            {

                response.Success = false;
                response.Message = "Mjeku doesnt exists";
                return response;
            }
            response.Success = true;
            response.Message = "Mjeku returned";
            response.Data = mjeku;
            return response;
        }

        public async Task<Dentist?> GetSingleDentist(int id)
        {
            var Mjeku = await _context.Dentists.FindAsync(id);
            if (Mjeku == null)
            {
                return null;
            }
            return Mjeku;
        }

        public async Task<Dentist> UpdateDentist(int id, Dentist request)
        {
            var Mjeku = await _context.Dentists.FindAsync(id);
            if (Mjeku == null) return null;
            Mjeku.EmriMbiemri = request.EmriMbiemri;
            Mjeku.Degree = request.Degree;
            Mjeku.Orari = request.Orari;
            Mjeku.Paga = request.Paga;
            Mjeku.Username = request.Username;
            Mjeku.Email = request.Email;
            Mjeku.DepartmentId = request.DepartmentId;
            await _context.SaveChangesAsync();
            return Mjeku;


        }

        public IEnumerable<Dentist> SearchByName(string name)
        {
            // If the name is empty or null, return all patients
            if (string.IsNullOrEmpty(name))
            {
                return _context.Dentists.ToList();
            }

            // Search patients by partial name match (case insensitive)
            return _context.Dentists
                           .Where(p => p.EmriMbiemri.ToLower().Contains(name.ToLower()))
                           .ToList();
        }

        public async Task<ServiceResponse<LoginResponse>> Login(string email, string password)
        {
            var response = new ServiceResponse<LoginResponse>();
            Authentication auth = new Authentication();
            var mjeku = await _context.Dentists.FirstOrDefaultAsync(m => m.Email.ToLower().Equals(email.ToLower()));

            if (mjeku is null)
            {
                response.Success = false;
                response.Message = "Mjeku not found";
                return response;
            }

            if (!auth.VerifyPasswordHash(password, mjeku.PasswordHash, mjeku.PasswordSalt))
            {
                response.Success = false;
                response.Message = "Password incorrect";
                return response;
            }

            // Generate Access Token
            string accessToken = CreateToken(mjeku);

            // Generate Refresh Token
            string refreshToken = CreateRefreshToken();
            mjeku.RefreshToken = refreshToken;
            mjeku.RefreshTokenExpiryTime = DateTime.Now.AddDays(7); // Token valid for 7 days

            await _context.SaveChangesAsync(); // Save refresh token to the database

            // Return both tokens to the client
            response.Data = new LoginResponse
            {
                AccessToken = accessToken,
                RefreshToken = refreshToken
            };
            response.Success = true;
            response.Message = "Logged in successfully";

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


        private string CreateToken(Dentist mjeku)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, mjeku.DentistId.ToString()),
                new Claim(ClaimTypes.Name, mjeku.EmriMbiemri),
                new Claim(ClaimTypes.Role, "Dentist")
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
                Expires = DateTime.Now.AddMinutes(15), // Short-lived access token (15 min)
                SigningCredentials = creds
            };

            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
            SecurityToken token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }

        public async Task<ServiceResponse<LoginResponse>> RefreshToken(string refreshToken)
        {
            var response = new ServiceResponse<LoginResponse>();

            var mjeku = await _context.Dentists.FirstOrDefaultAsync(d => d.RefreshToken == refreshToken);
            if (mjeku == null || mjeku.RefreshTokenExpiryTime < DateTime.Now)
            {
                response.Success = false;
                response.Message = "Invalid or expired refresh token";
                return response;
            }

            // Generate a new access token
            string newAccessToken = CreateToken(mjeku);

            // Optionally, generate a new refresh token (for better security)
            string newRefreshToken = CreateRefreshToken();
            mjeku.RefreshToken = newRefreshToken;
            mjeku.RefreshTokenExpiryTime = DateTime.Now.AddDays(1); 

            await _context.SaveChangesAsync(); // Update database

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
