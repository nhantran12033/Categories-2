using Categories.Departments;
using Categories.ExpenseCodes;
using Categories.LegalEntitys;
using Categories.Trips;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace Categories.TripExpenses
{
    public class TripExpenseService: ApplicationService, ITripExpenseAppService
    {
        private readonly IRepository<TripExpense, Guid> _TripExpenseRepository;
        private readonly IRepository<Trip, Guid> _TripRepository;

        public TripExpenseService(IRepository<TripExpense, Guid> TripExpenseRepository,
            IRepository<Trip,Guid> TripRepository)
            
        {

            _TripExpenseRepository = TripExpenseRepository;
            _TripRepository = TripRepository;
        }

        public async Task<TripExpenseDto> CreateTripAsync(string notes,TripExpenseDto dto)
        {
            var tripInf = await _TripRepository.GetListAsync();
            TripExpense tripExpense = new TripExpense
            {
                TripId = (Guid)tripInf.FirstOrDefault(d => d.Notes == notes)?.Id,
                Purpose = dto.Purpose,
                Destination = dto.Destination,
                CheckinTime = dto.CheckinTime,
                CheckoutTime = dto.CheckoutTime,
                TotalNights = dto.TotalNights,
                Item = dto.Item,
                Specification = dto.Specification,
                OriginalAmount = dto.OriginalAmount,
                OriginalCurrency = dto.OriginalCurrency,
                OriginalUnit = dto.OriginalUnit,
                Volume = dto.Volume,
                EquivalentInVND = dto.EquivalentInVND,
                Notes = dto.Notes,
                TotalAmount = dto.TotalAmount
            };
            var item = await _TripExpenseRepository.InsertAsync(tripExpense);
            var create = new TripExpenseDto
            {
                Id = item.Id,
                Purpose = item.Purpose,
                Destination = item.Destination,
                CheckinTime = item.CheckinTime,
                CheckoutTime = item.CheckoutTime,
                TotalNights = item.TotalNights,
                Item = item.Item,
                Specification = item.Specification,
                OriginalAmount = item.OriginalAmount,
                OriginalCurrency = item.OriginalCurrency,
                OriginalUnit = item.OriginalUnit,
                Volume = item.Volume,
                EquivalentInVND = item.EquivalentInVND,
                Notes = item.Notes,
                TotalAmount = item.TotalAmount
            };
            return create;
        }

        public async Task<List<TripExpenseDto>> GetListAsync()
        {
            var list = await _TripExpenseRepository.GetListAsync();
            return list.Select(x => new TripExpenseDto
            {
                Id = x.Id,
                Purpose = x.Purpose,
                Destination = x.Destination,
                CheckinTime = x.CheckinTime,
                CheckoutTime = x.CheckoutTime,
                TotalNights = x.TotalNights,
                Item = x.Item,
                Specification =x.Specification,
                OriginalAmount = x.OriginalAmount,
                OriginalCurrency = x.OriginalCurrency,
                OriginalUnit = x.OriginalUnit,
                Volume = x.Volume,
                EquivalentInVND = x.EquivalentInVND,
                Notes = x.Notes,
                TotalAmount = x.TotalAmount
            }).ToList();
        }
        public async Task<List<TripExpenseDto>> GetListIDAsync(Guid id)
        {
            var tripEx = await _TripExpenseRepository.GetListAsync();
            var trip = await _TripRepository.GetListAsync();
            return tripEx.Where(b => b.TripId.Equals(id)).Select(b => new TripExpenseDto
            {
                Id = b.Id,
                Purpose = b.Purpose,
                Destination = b.Destination,
                CheckinTime = b.CheckinTime,
                CheckoutTime = b.CheckoutTime,
                TotalNights = b.TotalNights,
                Item = b.Item,
                Specification = b.Specification,
                OriginalAmount = b.OriginalAmount,
                OriginalCurrency = b.OriginalCurrency,
                OriginalUnit = b.OriginalUnit,
                Volume = b.Volume,
                EquivalentInVND = b.EquivalentInVND,
                Notes = b.Notes,
                TotalAmount = b.TotalAmount
            }).ToList();
        }
    }
}
