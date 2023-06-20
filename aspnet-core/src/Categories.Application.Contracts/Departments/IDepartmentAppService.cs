using Categories.LegalEntitys;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Categories.Departments
{
    public interface IDepartmentAppService
    {
        public Task<List<DepartmentDto>> GetListAsync();
        public Task<DepartmentDto> CreateListAsync(DepartmentDto legalEntity);
        public Task<DepartmentDto> UpdateListAsync(Guid id, DepartmentDto legalEntity);
        public Task DeleteAsync(Guid id);
    }
}
