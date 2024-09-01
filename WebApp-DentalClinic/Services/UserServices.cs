using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using WebApp_DentalClinic.Models;
using WebApp_DentalClinic.ViewModels;

namespace WebApp_DentalClinic.Services
{
    public class UserServices
    {
        private AppDbContext _context;
        private readonly IConfiguration _configuration;
        public UserServices(AppDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        public async Task<bool> UserExists(string email)
        {
            if (await _context.Users.AnyAsync(m => m.Email!.ToLower() == email.ToLower()))
            {
                return true;
            }
            return false;
        }

        public async Task<ServiceResponse<List<Patient>>> RegisterPatient(UserPatientVM userPatientVM)
        {
            var response = new ServiceResponse<List<Patient>>();
            Authentication auth = new Authentication();
            if (await UserExists(userPatientVM.User.Email))
            {
                response.Success = false;
                response.Message = "User with this email already exists";
                return response;
            }

            // Create user with patient role
            var user = new User
            {
                Username = userPatientVM.User.Username,
                Email = userPatientVM.User.Email,
                UserRole = Role.Patient
            };

            // Hash the password
            auth.CreatePasswordHash(userPatientVM.User.Password, out byte[] passwordHash, out byte[] passwordSalt);
            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;

            // Add user to database
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            // Create patient entity
            var patient = new Patient
            {
                UserId = user.UserId,
                EmriMbiemri = userPatientVM.Patient.EmriMbiemri,
                DataLindjes = userPatientVM.Patient.DataLindjes,
                Gjinia = userPatientVM.Patient.Gjinia,
                // Add more patient attributes here
            };

            // Add patient to database
            _context.Patients.Add(patient);
            await _context.SaveChangesAsync();

            // Update response
            response.Success = true;
            response.Message = "Patient registered successfully";
            response.Data = await _context.Patients.ToListAsync();

            return response;
        }

        public async Task<ServiceResponse<List<Dentist>>> RegisterDentist(UserDentistVM userDentintVM)
        {
            var response = new ServiceResponse<List<Dentist>>();
            Authentication auth = new Authentication();
            if (await UserExists(userDentintVM.User.Email))
            {
                response.Success = false;
                response.Message = "User with this email already exists";
                return response;
            }

            // Create user with patient role
            var user = new User
            {
                Username = userDentintVM.User.Username,
                Email = userDentintVM.User.Email,
                UserRole = Role.Dentist
            };

            // Hash the password
            auth.CreatePasswordHash(userDentintVM.User.Password, out byte[] passwordHash, out byte[] passwordSalt);
            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;

            // Add user to database
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            // Create patient entity
            var dentist = new Dentist
            {
                UserId = user.UserId,
                EmriMbiemri = userDentintVM.Dentist.EmriMbiemri,
                Degree = userDentintVM.Dentist.Degree,
                Orari = userDentintVM.Dentist.Orari,
                Paga = userDentintVM.Dentist.Paga,
                DepartmentId = userDentintVM.Dentist.DepartmentId,
                // Add more patient attributes here
            };

            // Add patient to database
            _context.Dentists.Add(dentist);
            await _context.SaveChangesAsync();

            // Update response
            response.Success = true;
            response.Message = "Dentist registered successfully";
            response.Data = await _context.Dentists.ToListAsync();

            return response;
        }

        public async Task<ServiceResponse<List<Admin>>> RegisterAdmin(UserAdminVM userAdminVM)
        {
            var response = new ServiceResponse<List<Admin>>();
            Authentication auth = new Authentication();
            if (await UserExists(userAdminVM.User.Email))
            {
                response.Success = false;
                response.Message = "User with this email already exists";
                return response;
            }

            // Create user with patient role
            var user = new User
            {
                Username = userAdminVM.User.Username,
                Email = userAdminVM.User.Email,
                UserRole = Role.Admin
            };

            // Hash the password
            auth.CreatePasswordHash(userAdminVM.User.Password, out byte[] passwordHash, out byte[] passwordSalt);
            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;

            // Add user to database
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            // Create patient entity
            var admin = new Admin
            {
                UserId = user.UserId,
                EmriMbiemri = userAdminVM.Admin.EmriMbiemri,
            };

            // Add patient to database
            _context.Admins.Add(admin);
            await _context.SaveChangesAsync();

            // Update response
            response.Success = true;
            response.Message = "Admin registered successfully";
            response.Data = await _context.Admins.ToListAsync();

            return response;
        }
        public async Task<ServiceResponse<string>> DeleteUser(int userId)
        {
            var response = new ServiceResponse<string>();

            // Find the user by ID
            var user = await _context.Users.FindAsync(userId);

            if (user == null)
            {
                response.Success = false;
                response.Message = "User not found";
                return response;
            }

            // Check if the user is a patient
            var patient = await _context.Patients.FirstOrDefaultAsync(p => p.UserId == userId);
            if (patient != null)
            {
                _context.Patients.Remove(patient); // Remove patient
            }

            // Check if the user is a dentist
            var dentist = await _context.Dentists.FirstOrDefaultAsync(d => d.UserId == userId);
            if (dentist != null)
            {
                _context.Dentists.Remove(dentist); // Remove dentist
            }

            // Remove the user
            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            response.Success = true;
            response.Message = "User deleted successfully";
            return response;
        }

        public async Task<ServiceResponse<List<User>?>> GetAllUsers()
        {

            var response = new ServiceResponse<List<User>>();

            var user = await _context.Users.ToListAsync();

            if (user == null)
            {

                response.Success = false;
                response.Message = "User doesnt exists";
                return response;
            }
            response.Success = true;
            response.Message = "User returned";
            response.Data = user;
            return response;
        }

        public async Task<User?> GetSingleUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return null;
            }
            return user;
        }

        public async Task<User> UpdateUser(int id, UserVM request)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null) return null;
            user.Username = request.Username;
            user.Email = request.Email;
            await _context.SaveChangesAsync();

            return user;
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
