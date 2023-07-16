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
    }
}
