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
            if (await DentistExists(mjeku.Email))
            {
                response.Success = false;
                response.Message = "Mjeku already exists";
                return response;
            }
            auth.CreatePasswordHash(password, out byte[] passwordHash, out byte[] passwordSalt);

            mjeku.PasswordHash = passwordHash;
            mjeku.PasswordSalt = passwordSalt;
            _context.Dentists.Add(mjeku);
            await _context.SaveChangesAsync();
            response.Data = await _context.Dentists.ToListAsync();
            response.Success = true;
            return response;
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

        public async Task<ServiceResponse<string>> Login(string email, string password)
        {
            var response = new ServiceResponse<string>();
            Authentication auth = new Authentication();
            var mjeku = await _context.Dentists.FirstOrDefaultAsync(m => m.Email.ToLower().Equals(email.ToLower()));
            if (mjeku is null)
            {
                response.Success = false;
                response.Message = "Mjeku not found";
            }
            else if (!auth.VerifyPasswordHash(password, mjeku.PasswordHash, mjeku.PasswordSalt))
            {
                response.Success = false;
                response.Message = "Password incorrect";
            }
            else
            {
                response.Success = true;
                response.Message = "Logged in successfully";
                response.Data = CreateToken(mjeku);
            }
            return response;
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
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };

            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
            SecurityToken token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);


        }
    }
}
