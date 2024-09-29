using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
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

            // Check if the patient already exists
            if (await PatientExists(pacienti.Email))
            {
                response.Success = false;  // Set Success to false, since the patient already exists
                response.Message = "pacienti already exists";
                return response;
            }

            // Create password hash and salt
            auth.CreatePasswordHash(password, out byte[] passwordHash, out byte[] passwordSalt);
            pacienti.PasswordHash = passwordHash;
            pacienti.PasswordSalt = passwordSalt;

            // Automatically generate a refresh token
            pacienti.RefreshToken = GenerateRefreshToken();

            // Add patient to the context
            _context.Patients.Add(pacienti);
            await _context.SaveChangesAsync();

            // Return all patients
            response.Data = await _context.Patients.ToListAsync();
            response.Success = true;  // Indicate success when the patient is added successfully
            return response;
        }

        // Generate a refresh token
        private string GenerateRefreshToken()
        {
            return Guid.NewGuid().ToString();  // Generate a simple token, can be enhanced later
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
        public IEnumerable<Patient> SearchByName(string name)
        {
            // If the name is empty or null, return all patients
            if (string.IsNullOrEmpty(name))
            {
                return _context.Patients.ToList();
            }

            // Search patients by partial name match (case insensitive)
            return _context.Patients
                           .Where(p => p.EmriMbiemri.ToLower().Contains(name.ToLower()))
                           .ToList();
        }


        public async Task<ServiceResponse<LoginResponse>> Login(string email, string password)
        {
            var response = new ServiceResponse<LoginResponse>();
            Authentication auth = new Authentication();
            var pacienti = await _context.Patients.FirstOrDefaultAsync(m => m.Email.ToLower().Equals(email.ToLower()));

            if (pacienti is null)
            {
                response.Success = false;
                response.Message = "Pacienti not found";
                return response;
            }

            if (!auth.VerifyPasswordHash(password, pacienti.PasswordHash, pacienti.PasswordSalt))
            {
                response.Success = false;
                response.Message = "Password incorrect";
                return response;
            }

            // Generate Access Token
            string accessToken = CreateToken(pacienti);

            // Generate Refresh Token
            string refreshToken = CreateRefreshToken();
            pacienti.RefreshToken = refreshToken;
            pacienti.RefreshTokenExpiryTime = DateTime.Now.AddDays(1); 

            await _context.SaveChangesAsync(); // Save the refresh token to the database

            // Return both tokens to the client
            response.Data = new LoginResponse
            {
                AccessToken = accessToken,
                RefreshToken = refreshToken
            };
            response.Success = true;
            response.Message = "Login successful";

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
                Expires = DateTime.Now.AddMinutes(15), // Short-lived access token (15 min)
                SigningCredentials = creds
            };

            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
            SecurityToken token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
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

        public async Task<ServiceResponse<LoginResponse>> RefreshToken(string refreshToken)
        {
            var response = new ServiceResponse<LoginResponse>();

            var pacienti = await _context.Patients.FirstOrDefaultAsync(p => p.RefreshToken == refreshToken);
            if (pacienti == null || pacienti.RefreshTokenExpiryTime < DateTime.Now)
            {
                response.Success = false;
                response.Message = "Invalid or expired refresh token";
                return response;
            }

            // Generate a new access token
            string newAccessToken = CreateToken(pacienti);

            // Optionally, generate a new refresh token (for better security)
            string newRefreshToken = CreateRefreshToken();
            pacienti.RefreshToken = newRefreshToken;
            pacienti.RefreshTokenExpiryTime = DateTime.Now.AddDays(7); // Renew for another 7 days

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
