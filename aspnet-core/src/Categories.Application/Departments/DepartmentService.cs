using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace Categories.Departments
{
    public class DepartmentService : ApplicationService, IDepartmentAppService
    {
        private readonly IRepository<Department, Guid> _departmentsRepository;
        public DepartmentService(IRepository<Department, Guid> departmentsRepository)
        {
            _departmentsRepository = departmentsRepository;
        }
        public async Task<List<DepartmentDto>> GetListAsync()
        {
            var items = await _departmentsRepository.GetListAsync();
            return items.Select(item => new DepartmentDto
            {
                Id = item.Id,
                Code = item.Code,
                Description = item.Description,
                ImportBy = item.ImportBy,
            }).ToList();
        }
        public async Task<DepartmentDto> CreateListAsync(DepartmentDto departmentDto)
        {
            var items = await _departmentsRepository.GetListAsync();
            Department department = new Department
            {
                Code = departmentDto.Code,
                Description = departmentDto.Description,
                ImportBy = departmentDto.ImportBy,
            };
            await _departmentsRepository.InsertAsync(department);

            var create = new DepartmentDto
            {
                Id = department.Id,
                Code = department.Code,
                Description = department.Description,
                ImportBy = department.ImportBy,
            };
            return create;
        }
        public async Task<DepartmentDto> UpdateListAsync(Guid id, DepartmentDto departmentDto)
        {
            var items = await _departmentsRepository.FindAsync(id);
            items.Code = departmentDto.Code;
            items.Description = departmentDto.Description;
            items.ImportBy = departmentDto.ImportBy;
            var update = await _departmentsRepository.UpdateAsync(items);
            var updateDto = new DepartmentDto
            {
                Id = items.Id,
                Code = items.Code,
                Description = items.Description,
                ImportBy = items.ImportBy,
            };
            return updateDto;
        }
        public async Task DeleteAsync(Guid id)
        {
            await _departmentsRepository.DeleteAsync(id);
        }
    }
}
