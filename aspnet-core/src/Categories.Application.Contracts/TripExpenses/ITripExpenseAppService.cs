using Categories.Trips;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;

namespace Categories.TripExpenses
{
    public interface ITripExpenseAppService
    {
        public Task<TripExpenseDto> CreateTripAsync(string TripInfID,List<TripExpenseDto> dtos);
        public Task<List<TripExpenseDto>> GetListAsync();
        public Task<List<TripExpenseDto>> GetListIDAsync(Guid id);
    }
}
