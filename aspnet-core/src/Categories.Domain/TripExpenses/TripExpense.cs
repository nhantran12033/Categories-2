using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Entities.Auditing;

namespace Categories.TripExpenses
{
    public class TripExpense : AuditedAggregateRoot<Guid>
    {
        public string Purpose { get; set; }
        public Guid TripId { get; set; }
        public string Destination { get; set; }
        public DateTime CheckinTime { get; set; }
        public DateTime CheckoutTime { get; set; }
        public int TotalNights { get; set; }
    }
}
