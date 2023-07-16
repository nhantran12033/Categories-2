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

        public async Task<TripExpenseDto> CreateTripAsync(string notes, List<TripExpenseDto> dtos)
        {
            var tripInf = await _TripRepository.GetListAsync();
            var tripId = tripInf.FirstOrDefault(d => d.Notes == notes)?.Id;

            var tripExpenses = dtos.Select(dto => new TripExpense
            {
                TripId = (Guid)tripId,
                Purpose = dto.Purpose,
                Destination = dto.Destination,
                CheckinTime = dto.CheckinTime,
                CheckoutTime = dto.CheckoutTime,
                TotalNights = dto.TotalNights,
            }).ToList();

            await _TripExpenseRepository.InsertManyAsync(tripExpenses);
            var createdItems = await _TripExpenseRepository.GetListAsync();
            var createdItem = createdItems.FirstOrDefault();
            var create =  new TripExpenseDto
            {
                Id = createdItem.Id,
                Purpose = createdItem.Purpose,
                Destination = createdItem.Destination,
                CheckinTime = createdItem.CheckinTime,
                CheckoutTime = createdItem.CheckoutTime,
                TotalNights = createdItem.TotalNights,
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
               
            }).ToList();
        }
    }
}
