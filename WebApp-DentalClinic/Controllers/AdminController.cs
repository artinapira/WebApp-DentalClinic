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
        public async Task<ActionResult<List<Admin>>> GetAllAdmins()
        {
            var result = await _adminServices.GetAllAdmins();
            if (result == null)
            {
                return NotFound("Admin not found");
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
        public async Task<ActionResult<List<Admin>>> UpdateAdmin(int id, AdminVM admin)
        {
            var result = await _adminServices.UpdateAdmin(id, admin);

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
        public async Task<ActionResult<List<Admin>>> Login(Login request)
        {
            var response = await _adminServices.Login(request.Email, request.Password);
            if (!(bool)response.Success)
            {
                return BadRequest(response);
            }
            return Ok(response);
        }
    }
}

