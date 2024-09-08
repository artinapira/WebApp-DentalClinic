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

        [Authorize(Roles = "Pacienti")]
        [HttpPost("add-kontakti")]
        public IActionResult AddKontakti([FromBody] KontaktiVM kontakti)
        {
            _kontaktiServices.AddKontakti(kontakti);
            return Ok();
        }

        [Authorize(Roles = "Admin")]
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
