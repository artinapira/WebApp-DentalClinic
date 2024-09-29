using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using WebApp_DentalClinic.Models;
using WebApp_DentalClinic.Services;
using WebApp_DentalClinic.ViewModels;

namespace WebApp_DentalClinic.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        public AdminServices _adminServices;

        public AdminController(AdminServices adminServices)
        {
            _adminServices = adminServices;
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("/AdminAll")]
        public async Task<ActionResult<List<Admin>>> GetAllAdmin()
        {
            var result = await _adminServices.GetAllAdmin();
            if (result == null)
            {
                return NotFound("No admin was found");
            }
            return Ok(result);
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("/AdminProfile")]
        public async Task<ActionResult<Admin>> GetAdminProfile()
        {
            int id = int.Parse(User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)!.Value);

            return await _adminServices.GetSingleAdmin(id);
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("{id}")]
        public async Task<ActionResult<Admin>> GetSingleAdmin(int id)
        {
            var result = await _adminServices.GetSingleAdmin(id);
            if (result == null)
            {
                return NotFound("Admin not found");
            }
            return Ok(result);
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        public async Task<ActionResult<List<Admin>>> UpdateAdmin(int id, AdminVM recepsionisti)
        {

            var result = await _adminServices.UpdateAdmin(id, new Admin
            {
                EmriMbiemri = recepsionisti.EmriMbiemri,
                Username = recepsionisti.Username,
                Email = recepsionisti.Email,
                DepartmentId = recepsionisti.DepartmentId,

            });
            if (result == null)
            {
                return NotFound("Admin not found");
            }
            return Ok(result);
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Admin>>> DeleteAdmin(int id)
        {
            var result = await _adminServices.DeleteAdmin(id);
            if (result == null) return NotFound("Admin not found");
            return Ok(result);
        }

        [HttpPost("login")]
        public async Task<ActionResult<ServiceResponse<LoginResponse>>> Login(Login request)
        {
            var response = await _adminServices.Login(request.Email, request.Password);
            if (!(bool)response.Success)
            {
                return BadRequest(response);
            }
            return Ok(response);
        }
        [HttpPost("refresh-token")]
        public async Task<ActionResult<ServiceResponse<LoginResponse>>> RefreshToken([FromBody] string refreshToken)
        {
            var response = await _adminServices.RefreshToken(refreshToken);
            if (!(bool)response.Success)
            {
                return Unauthorized(response);
            }
            return Ok(response);
        }




        [HttpPost]
        public async Task<ActionResult<List<Admin>>> AddAdmin(AdminVM recepsionisti)
        {
            var result = await _adminServices.AddAdmin(
                 new Admin
                 {
                     EmriMbiemri = recepsionisti.EmriMbiemri,
                     Username = recepsionisti.Username,
                     Email = recepsionisti.Email,
                     DepartmentId = recepsionisti.DepartmentId,


                 }
                 , recepsionisti.Password);
            return Ok(result);
        }

    }
}

