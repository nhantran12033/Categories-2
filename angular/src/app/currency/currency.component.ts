
import { ListService } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { CurrencyDto, CurrencyService } from '../proxy/currencys';
@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss'],
  providers: [ListService]
})

export class CurrencyComponent implements OnInit {
  data: CurrencyDto[]
  constructor(
    private list: ListService,
    private cur: CurrencyService
  ) { }
  ngOnInit() {
    this.cur.getList().subscribe((response) => {
      this.data = response
    })
  }
  Delete(id: string) {
    this.cur.delete(id).subscribe((response) => {

    })
  }
}

