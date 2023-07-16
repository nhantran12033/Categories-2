using Categories.ExpenseDetail;
using Categories.TripExpenses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Specifications;

namespace Categories.ExpenseDetails
{
    public class ExpenseDetailService: IApplicationService, IExpenseDetailAppService
    {
        private readonly IRepository<ExpenseDetail, Guid> _expenseDetailIRepository;
        private readonly IRepository<TripExpense, Guid> _tripExpenseIRepository;
        public ExpenseDetailService(IRepository<ExpenseDetail, Guid> expenseDetailIRepository,
            IRepository<TripExpense, Guid> tripExpenseIRepository)
        {
            _expenseDetailIRepository = expenseDetailIRepository;
            _tripExpenseIRepository= tripExpenseIRepository;
        }

        public async Task<ExpenseDetailDto> CreateListAsync(int total, List<ExpenseDetailDto> dtos)
        {
            var tripEx = await _tripExpenseIRepository.GetListAsync();
            var tripExId = tripEx.FirstOrDefault(b => b.TotalNights == total)?.Id;

            var expenseDetails = dtos.Select(dto => new ExpenseDetail
            {
                TripExId = (Guid)tripExId,
                Item = dto.Item,
                Specification = dto.Specification,
                OriginalCurrency = dto.OriginalCurrency,
                OriginalUnit = dto.OriginalUnit,
                Volume = dto.Volume,
                OriginalAmount = dto.OriginalAmount,
                EquivalentInVND = dto.EquivalentInVND,
                Notes = dto.Notes
            }).ToList();

            await _expenseDetailIRepository.InsertManyAsync(expenseDetails);

            var createdItems = await _expenseDetailIRepository.GetListAsync();
            var createdItem = createdItems.FirstOrDefault();

            var create = new ExpenseDetailDto
            {
                Item = createdItem.Item,
                Specification = createdItem.Specification,
                OriginalCurrency = createdItem.OriginalCurrency,
                OriginalUnit = createdItem.OriginalUnit,
                Volume = createdItem.Volume,
                OriginalAmount = createdItem.OriginalAmount,
                EquivalentInVND = createdItem.EquivalentInVND,
                Notes = createdItem.Notes
            };

            return create;
        }

        public Task<List<ExpenseDetailDto>> GetListAsync()
        {
            throw new NotImplementedException();
        }
    }
}
