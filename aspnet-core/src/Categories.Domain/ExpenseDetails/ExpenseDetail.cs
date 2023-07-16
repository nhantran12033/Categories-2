using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Entities.Auditing;

namespace Categories.ExpenseDetails
{
    public class ExpenseDetail: AuditedAggregateRoot<Guid>
    {
        public Guid TripExId { get; set; }
        public string Item { get; set; }
        public string Specification { get; set; }
        public string OriginalCurrency { get; set; }
        public float OriginalUnit { get; set; }
        public float Volume { get; set; }
        public float OriginalAmount { get; set; }
        public float EquivalentInVND { get; set; }
        public string Notes { get; set; }
    }
}
