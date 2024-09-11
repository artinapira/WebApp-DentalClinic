using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using WebApp_DentalClinic.Models;
using WebApp_DentalClinic.Services;
using WebApp_DentalClinic.ViewModels;

namespace WebApp_DentalClinic.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class KontaktiController : ControllerBase
    {
        public KontaktiServices _kontaktiServices;

        public KontaktiController(KontaktiServices kontaktiServices)
        {
            _kontaktiServices = kontaktiServices;
        }

        [Authorize(Roles = "Patient")]
        [HttpPost("add-kontakti")]
        public async Task<IActionResult> AddKontakti([FromBody] KontaktiVM kontakti)
        {
            var response = await _kontaktiServices.AddKontakti(kontakti);

            if (response.Success ?? false)
            {
                return Ok(response);
            }
            else
            {
                return BadRequest(response);
            }
        }


        [Authorize(Roles = "Patient")]
        [HttpGet("get-all-kontakti")]
        public IActionResult GetAllKontakti()
        {
            var allkontaktet = _kontaktiServices.GetAllKontakti();
            return Ok(allkontaktet);
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("get-kontakti-by-id/{id}")]
        public IActionResult GetSingleKontakti(int kontaktiid)
        {
            var kontakti = _kontaktiServices.GetSingleKontakti(kontaktiid);
            return Ok(kontakti);
        }

        [HttpPut("update-kontakti-by-id/{id}")]
        public IActionResult UpdateKontaktiById(int kontaktiid, [FromBody] KontaktiVM kontakti)
        {
            var updatedkontakti = _kontaktiServices.UpdateKontaktiById(kontaktiid, kontakti);
            return Ok(updatedkontakti);
        }
        [Authorize(Roles = "Admin")]
        [HttpDelete("delete-kontakti-by-id/{id}")]
        public IActionResult DeleteKontakti(int kontaktiid)
        {
            _kontaktiServices.DeleteKontakti(kontaktiid);
            return Ok();
        }
    }
}
