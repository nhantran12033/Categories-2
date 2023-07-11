using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Categories.Trips
{
    public interface ITripExpenseAppService
    {
        public Task<List<TripInformationDto>> GetTripInformationAsync();
        public Task<TripInformationDto> CreateTripInformationAsync(TripInformationDto dto);
        public Task<List<TripInformationDto>> GetListIDAsync(Guid id);
    }
}
