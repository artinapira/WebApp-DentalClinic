using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApp_DentalClinic.Services;
using WebApp_DentalClinic.ViewModels;

namespace WebApp_DentalClinic.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MarketingController : ControllerBase
    {
        public MarketingServices _marketingService;

        public MarketingController(MarketingServices marketingService)
        {
            _marketingService = marketingService;
        }

        [HttpPost("add-marketing")]
        public IActionResult AddMarketing([FromBody] MarketingVM marketing)
        {
            _marketingService.AddMarketing(marketing);
            return Ok();
        }

        [HttpGet("get-all-marketing")]
        public IActionResult GetAllMarketing()
        {
            var allMarketing = _marketingService.GetAllMarketing();
            return Ok(allMarketing);
        }

        [HttpGet("get-marketing-by-id/{id}")]
        public IActionResult GetMarketingById(int id)
        {
            var marketing = _marketingService.GetMarketingById(id);
            return Ok(marketing);
        }

        [HttpPut("update-marketing-by-id/{id}")]
        public IActionResult UpdateMarketingById(int id, [FromBody] MarketingVM marketing)
        {
            var updatedMarketing = _marketingService.UpdateMarketingById(id, marketing);
            return Ok(updatedMarketing);
        }

        [HttpDelete("delete-marketing-by-id/{id}")]
        public IActionResult DeleteMarketingById(int id)
        {
            _marketingService.DeleteMarketingById(id);
            return Ok();
        }
    }
}
