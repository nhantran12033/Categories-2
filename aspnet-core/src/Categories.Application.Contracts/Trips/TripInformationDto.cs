using System;
using System.Collections.Generic;
using System.Text;

namespace Categories.Trips
{
    public class TripInformationDto
    {
        public Guid Id { get; set; }
        public string OperaterName { get; set; }
        public string RequestNumber { get; set; }
        public DateTime RequestedDate { get; set; }
        public string BusinessType { get; set; }
        public string LegalEntity { get; set; }
        public string Department { get; set; }
        public string ExpenseCode { get; set; }
        public string VerifierUsername { get; set; }
        public string VerifierName { get; set; }
        public string Notes { get; set; }
        public float totalAmount { get; set; }
    }
}
