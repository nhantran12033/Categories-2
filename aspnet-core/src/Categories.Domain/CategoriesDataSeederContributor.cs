using Categories.Currencys;
using Categories.Departments;
using Categories.LegalEntitys;
using Categories.Suppliers;
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
        private readonly IRepository<LegalEntity, Guid> _legalEntityRepository;
        private readonly IRepository<Supplier, Guid> _supplierRepository;
        public CategoriesDataSeederContributor(IRepository<VAT, Guid> vatRepository, 
            IRepository<LegalEntity, Guid> legalEntityRepository,
            IRepository<Supplier, Guid> supplierRepository)
        {
            _vatRepository= vatRepository;
            _legalEntityRepository= legalEntityRepository;
            _supplierRepository= supplierRepository;
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
            var legal = await _legalEntityRepository.InsertAsync(
                new LegalEntity
                {
                    Code = "N07",
                    Description = "Navigos Hà Nội",
                    ImportBy = "nhantran12033@gmail.com"
                }, autoSave: true);
            var legal1 = await _legalEntityRepository.InsertAsync(
                new LegalEntity
                {
                    Code = "N08",
                    Description = "Navigos ",
                    ImportBy = "nhantran12033@gmail.com"
                }, autoSave: true);
            var legal2 = await _legalEntityRepository.InsertAsync(
                new LegalEntity
                {
                    Code = "N09",
                    Description = "Hà Nội",
                    ImportBy = "nhantran12033@gmail.com"
                }, autoSave: true);
            await _supplierRepository.InsertAsync(
                new Supplier
                {
                    LegalID = legal.Id,
                    VendorAccount = "VD00000035",
                    VendorName = "Bao Dau Tu (VIR)",
                    VendorHold = "No",
                    BeneficiaryName = "Bao Dau Tu",
                    BeneficiaryAccount = "21210",
                    BeneficiaryBankName = "BIDV - CN Tay Ho",
                    Phone = "0349528312",
                    Email = "nhantran12033@gmail.com",
                    TaxCode = "0304117088",
                    ImportBy = "thanh.nguyen@navigosgroup.com"
                }, autoSave: true);
            await _supplierRepository.InsertAsync(
                new Supplier
                {
                    LegalID = legal1.Id,
                    VendorAccount = "VD00000035",
                    VendorName = "Bao Dau Tu (VIR)",
                    VendorHold = "No",
                    BeneficiaryName = "Bao Dau Tu",
                    BeneficiaryAccount = "21210",
                    BeneficiaryBankName = "BIDV - CN Tay Ho",
                    Phone = "0349528312",
                    Email = "nhantran12033@gmail.com",
                    TaxCode = "0304117088",
                    ImportBy = "thanh.nguyen@navigosgroup.com"
                }, autoSave: true);
            await _supplierRepository.InsertAsync(
                new Supplier
                {
                    LegalID = legal2.Id,
                    VendorAccount = "VD00000035",
                    VendorName = "Bao Dau Tu (VIR)",
                    VendorHold = "No",
                    BeneficiaryName = "Bao Dau Tu",
                    BeneficiaryAccount = "21210",
                    BeneficiaryBankName = "BIDV - CN Tay Ho",
                    Phone = "0349528312",
                    Email = "nhantran12033@gmail.com",
                    TaxCode = "0304117088",
                    ImportBy = "thanh.nguyen@navigosgroup.com"
                }, autoSave: true);
        }
    }

}
