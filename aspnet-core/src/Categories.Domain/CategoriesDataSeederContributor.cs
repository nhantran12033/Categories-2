using Categories.Currencys;
using Categories.Departments;
using Categories.LegalEntitys;
using Categories.VATs;
using System;
using System.Threading.Tasks;
using Volo.Abp.Data;
using Volo.Abp.DependencyInjection;
using Volo.Abp.Domain.Repositories;

namespace Categories
{
    public class CategoriesDataSeederContributor: IDataSeedContributor, ITransientDependency
    {
        private readonly IRepository<VAT, Guid> _vatRepository;
        public CategoriesDataSeederContributor(IRepository<VAT, Guid> vatRepository)
        {
            _vatRepository = vatRepository;
        }
        public async Task SeedAsync(DataSeedContext context)
        {
            if (await _vatRepository.GetCountAsync() <= 0)
            {
                await _vatRepository.InsertAsync(
                    new VAT
                    {
                        VATs = 5,
                        VATAxCode = 5,
                        Description = "5",
                        Modified = new DateTime(2023, 9, 12),
                        ModifiedBy = "123"
                    }, autoSave: true);
            }
        }
    }

}
