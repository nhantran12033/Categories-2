using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Entities.Auditing;

namespace Categories.Trips
{
    public class Trip: AuditedAggregateRoot<Guid>
    {
        public string OperaterName { get; set; }
        public string RequestNumber { get; set; }
        public DateTime RequestedDate { get; set; }
        public string BusinessType { get; set; }
        public Guid LegalID { get; set; }
        public Guid DepartmentID { get; set; }
        public Guid ExpenseCodeID { get; set; }
        public string VerifierUsername { get; set; }
        public string VerifierName { get; set; }
        public string Notes { get; set; }
        public float totalAmount { get; set; }

    }

}
