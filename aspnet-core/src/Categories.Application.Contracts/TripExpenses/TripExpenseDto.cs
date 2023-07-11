using System;
using System.Collections.Generic;
using System.Text;

namespace Categories.TripExpenses
{
    public class TripExpenseDto
    {
        public Guid Id { get; set; }
        public string Purpose { get; set; }
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
