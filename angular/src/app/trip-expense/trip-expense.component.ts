import { ListService } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { TripExpenseDto, TripExpenseService } from '../proxy/trip-expenses';
import { TripInformationDto, TripInformationService } from '../proxy/trips';

@Component({
  selector: 'app-trip-expense',
  templateUrl: './trip-expense.component.html',
  styleUrls: ['./trip-expense.component.scss'],
  providers: [ListService],
})
export class TripExpenseComponent implements OnInit {
  isViewOpen = false;
  data: string;
  tripDto: TripInformationDto[];
  tripExDto: TripExpenseDto[];
  constructor(
    public readonly list: ListService,
    private tripEx: TripExpenseService,
    private trip: TripInformationService,
  ) { }
  View(id: string) {
    this.isViewOpen = true;
    this.trip.getListID(id).subscribe(() => {
      this.data = id
    })
    this.tripEx.getListID(this.data).subscribe(response => {
      this.tripExDto = response;
    })
  }
  ngOnInit(): void {
    this.trip.getTripInformation().subscribe((response) => {
      this.tripDto = response;
    })
    this.tripExDto
    
  }
}
