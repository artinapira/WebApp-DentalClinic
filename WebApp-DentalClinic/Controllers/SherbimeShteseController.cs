using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApp_DentalClinic.Models;
using WebApp_DentalClinic.Services;
using WebApp_DentalClinic.ViewModels;

namespace WebApp_DentalClinic.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SherbimeShteseController : ControllerBase
    {
        public SherbimeShteseServices _sherbimeShteseService;

        public SherbimeShteseController(SherbimeShteseServices sherbimeShteseService)
        {
            _sherbimeShteseService = sherbimeShteseService;
        }

        [HttpPost("add-sherbimeShtese")]
        public IActionResult AddSherbimeShtese([FromBody] SherbimeShteseVM sherbimeShtese)
        {
            _sherbimeShteseService.AddSherbimeShtese(sherbimeShtese);
            return Ok();
        }

        [HttpGet("get-all-sherbimeShtese")]
        public IActionResult GetAllSherbimeShtese()
        {
            var allSherbimeShtese = _sherbimeShteseService.GetAllSherbimeShtese();
            return Ok(allSherbimeShtese);
        }

        [HttpGet("get-sherbimeShtese-by-id/{id}")]
        public IActionResult GetSherbimeShteseById(int id)
        {
            var sherbimeShtese = _sherbimeShteseService.GetSherbimeShteseById(id);
            return Ok(sherbimeShtese);
        }

        [HttpPut("update-sherbimeShtese-by-id/{id}")]
        public IActionResult UpdateSherbimeShteseById(int id, [FromBody] SherbimeShteseVM sherbimeShtese)
        {
            var updatedSherbimeShtese = _sherbimeShteseService.UpdateSherbimeShteseById(id, sherbimeShtese);
            return Ok(updatedSherbimeShtese);
        }

        [HttpDelete("delete-sherbimeShtese-by-id/{id}")]
        public IActionResult DeleteSherbimeShteseById(int id)
        {
            _sherbimeShteseService.DeleteSherbimeShteseById(id);
            return Ok();
        }
    }
}
