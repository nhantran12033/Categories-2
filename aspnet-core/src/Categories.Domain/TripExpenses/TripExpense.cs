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
        public string Item { get; set; }
        public string Specification { get; set; }
        public string OriginalCurrency { get; set; }
        public int OriginalUnit { get; set; }
        public int Volume { get; set; }
        public int OriginalAmount { get; set; }
        public int EquivalentInVND { get; set; }
        public string Notes { get; set; }
        public int TotalAmount { get; set; }
    }
}
