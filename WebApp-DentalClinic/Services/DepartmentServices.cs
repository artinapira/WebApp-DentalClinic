using WebApp_DentalClinic.Models;
using WebApp_DentalClinic.ViewModels;

namespace WebApp_DentalClinic.Services
{
    public class DepartmentServices
    {
        private AppDbContext _context;
        public DepartmentServices(AppDbContext context)
        {
            _context = context;
        }

        public void AddDepartment(DepartmentVM department)
        {
            var _department = new Department()
            {
                Emri = department.Emri,
                Pershkrimi = department.Pershkrimi

            };
            _context.Departments.Add(_department);
            _context.SaveChanges();
        }

        public List<Department> GetAllDepartments()
        {
            var allDepartments = _context.Departments.ToList();
            return allDepartments;
        }

        public Department GetDepartmentById(int departmentId) => _context.Departments.FirstOrDefault(n => n.DepartmentId == departmentId);

        public Department UpdateDepartmentById(int departmentId, DepartmentVM department)
        {
            var _department = _context.Departments.FirstOrDefault(n => n.DepartmentId == departmentId);
            if (_department != null)
            {
                _department.Emri = department.Emri;
                _department.Pershkrimi = department.Pershkrimi;



                _context.SaveChanges();
            }
            return _department;
        }

        public void DeleteDepartmentById(int departmentId)
        {
            var _department = _context.Departments.FirstOrDefault(n => n.DepartmentId == departmentId);
            if (_department != null)
            {
                _context.Departments.Remove(_department);
                _context.SaveChanges();
            }
        }
    }
}
