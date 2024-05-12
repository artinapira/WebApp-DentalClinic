using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApp_DentalClinic.Services;
using WebApp_DentalClinic.ViewModels;

namespace WebApp_DentalClinic.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PartnerController : ControllerBase
    {
        public PartnerServices _partnerService;

        public PartnerController(PartnerServices partnerService)
        {
            _partnerService = partnerService;
        }

        [HttpPost("add-partner")]
        public IActionResult AddPartner([FromBody] PartnerVM partner)
        {
            _partnerService.AddPartner(partner);
            return Ok();
        }

        [HttpGet("get-all-partner")]
        public IActionResult GetAllPartners()
        {
            var allpartners = _partnerService.GetAllPartners();
            return Ok(allpartners);
        }

        [HttpGet("get-Partner-by-id/{id}")]
        public IActionResult GetPartnerById(int partnerId)
        {
            var partners = _partnerService.GetPartnersById(partnerId);
            return Ok(partners);
        }

        [HttpPut("update-partner-by-id/{id}")]
        public IActionResult UpdatePartnerById(int partnerId, [FromBody] PartnerVM partner)
        {
            var updatedpartners = _partnerService.UpdatePartnerById(partnerId,partner);
            return Ok(updatedpartners);
        }

        [HttpDelete("delete-partner-by-id/{id}")]
        public IActionResult DeletePartnerById(int partnerId)
        {
            _partnerService.DeletePartnerById(partnerId);
            return Ok();
        }
    }
}
