using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApp_DentalClinic.Services;
using WebApp_DentalClinic.ViewModels;

namespace WebApp_DentalClinic.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InventaryController : ControllerBase
    {
        public InventaryServices _inventaryService;

        public InventaryController(InventaryServices inventaryService)
        {
            _inventaryService = inventaryService;
        }

        [HttpPost("add-inventari")]
        public IActionResult AddInventari([FromBody] InventaryVM inventary)
        {
            _inventaryService.AddInventari(inventary);
            return Ok();
        }

        [HttpGet("get-all-inventary")]
        public IActionResult GetAllInventary()
        {
            var allinventaries = _inventaryService.GetAllInventary();
            return Ok(allinventaries);
        }

        [HttpGet("get-Item-by-id/{id}")]
        public IActionResult GetItemById(int itemid)
        {
            var inventaries = _inventaryService.GetItemById( itemid);
            return Ok(inventaries);
        }

        [HttpPut("update-item-by-id/{id}")]
        public IActionResult UpdateItemById(int itemid, [FromBody] InventaryVM inventary)
        {
            var updatedItem = _inventaryService.UpdateItemById(itemid, inventary);
            return Ok(updatedItem);
        }

        [HttpDelete("delete-item-by-id/{id}")]
        public IActionResult DeleteItemById(int itemid)
        {
            _inventaryService.DeleteItemById(itemid);
            return Ok();
        }
    }
}
  
