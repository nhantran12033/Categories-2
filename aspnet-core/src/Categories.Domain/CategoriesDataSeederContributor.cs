using Categories.Departments;
using Categories.LegalEntitys;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Data;
using Volo.Abp.DependencyInjection;
using Volo.Abp.Domain.Repositories;

namespace Categories
{
    public class CategoriesDataSeederContributor: IDataSeedContributor, ITransientDependency
    {
        private readonly IRepository<LegalEntity> _legalentityRepository;
        private readonly IRepository<Department> _departmentRepository;
        public CategoriesDataSeederContributor(IRepository<LegalEntity> legalentityRepository, IRepository<Department> departmentRepository)
        {
            _legalentityRepository = legalentityRepository;
            _departmentRepository = departmentRepository;
        }
        public async Task SeedAsync(DataSeedContext context)
        {
            if(await _legalentityRepository.GetCountAsync() <= 0)
            {
                await _legalentityRepository.InsertAsync(
                    new LegalEntity
                    {
                        Code = "N01",
                        Description = "Navigos HCM",
                        ImportBy = "thanh.nguyen@navigosgroup.com"
                    }, autoSave: true
                );
                await _legalentityRepository.InsertAsync(
                   new LegalEntity
                   {
                        Code = "N06",
                        Description = "Nguon Luc Viet",
                        ImportBy = "ha.nguyen@navigosgroup.com",
                   }, autoSave: true
                );
            }
            if(await _departmentRepository.GetCountAsync() <= 0)
            {
                await _departmentRepository.InsertAsync(
                    new Department
                    {
                        Code = "02_01",
                        Description = "NS South",
                        ImportBy = "",
                    }, autoSave: true
                );
                await _departmentRepository.InsertAsync(
                    new Department
                    {
                        Code = "02_02",
                        Description = "NS North",
                        ImportBy = "",
                    }, autoSave: true
                );
            }
        }
    }

}
