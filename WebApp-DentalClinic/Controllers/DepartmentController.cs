using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApp_DentalClinic.Services;
using WebApp_DentalClinic.ViewModels;

namespace WebApp_DentalClinic.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentController : ControllerBase
    {
        public DepartmentServices _departmentService;

        public DepartmentController(DepartmentServices departmentService)
        {
            _departmentService = departmentService;
        }

        [HttpPost("add-department")]
        public IActionResult AddDepartment([FromBody] DepartmentVM department)
        {
            _departmentService.AddDepartment(department);
            return Ok();
        }

        [HttpGet("get-all-departments")]
        public IActionResult GetAllDepartments()
        {
            var alldepartments = _departmentService.GetAllDepartments();
            return Ok(alldepartments);
        }

        [HttpGet("get-Department-by-id/{id}")]
        public IActionResult GetDepartmentById(int departmentId)
        {
            var departmens = _departmentService.GetDepartmentById(departmentId);
            return Ok(departmens);
        }

        [HttpPut("update-department-by-id/{id}")]
        public IActionResult UpdateDepartmentById(int departmentId, [FromBody] DepartmentVM department)
        {
            var updatedDepartment = _departmentService.UpdateDepartmentById(departmentId, department);
            return Ok(updatedDepartment);
        }

        [HttpDelete("delete-department-by-id/{id}")]
        public IActionResult DeleteDepartmentById(int departmentId)
        {
            _departmentService.DeleteDepartmentById(departmentId);
            return Ok();
        }
    }
}
