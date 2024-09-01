using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApp_DentalClinic.Models;
using WebApp_DentalClinic.Services;
using WebApp_DentalClinic.ViewModels;

namespace WebApp_DentalClinic.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        public UserServices _userServices;

        public UserController(UserServices userServices)
        {
            _userServices = userServices;
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("/UsersAll")]
        public async Task<ActionResult<List<User>>> GetAllUsers()
        {


            var result = await _userServices.GetAllUsers();
            if (result == null)
            {
                return NotFound("User not found");
            }
            return Ok(result);
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetSingleUser(int id)
        {
            var result = await _userServices.GetSingleUser(id);
            if (result == null)
            {
                return NotFound("User not found");
            }
            return Ok(result);
        }

        [HttpPost("Patient")]
        public async Task<ActionResult<List<User>>> RegisterPatient(UserPatientVM userPatientVM)
        {
            var result = await _userServices.RegisterPatient(userPatientVM);
            return Ok(result);
        }

        [HttpPost("Admin")]
        public async Task<ActionResult<List<User>>> RegisterAdmin(UserAdminVM userAdminVM)
        {
            var result = await _userServices.RegisterAdmin(userAdminVM);
            return Ok(result);
        }

        [HttpPost("Dentist")]
        public async Task<ActionResult<List<User>>> RegisterDentist(UserDentistVM userDentistVM)
        {
            var result = await _userServices.RegisterDentist(userDentistVM);
            return Ok(result);
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        public async Task<ActionResult<List<User>>> UpdateUser(int id, UserVM user)
        {
            var result = await _userServices.UpdateUser(id, user);

            if (result == null)
            {
                return NotFound("User not found");
            }
            return Ok(result);
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<ActionResult<List<User>>> DeleteUser(int id)
        {
            var result = await _userServices.DeleteUser(id);
            if (result == null) return NotFound("User not found");
            return Ok(result);
        }

        [HttpPost("login")]
        public async Task<ActionResult<List<User>>> Login(Login request)
        {
            var response = await _userServices.Login(request.Email, request.Password);
            if (!(bool)response.Success)
            {
                return BadRequest(response);
            }
            return Ok(response);
        }
    }
}
