// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-admin-dashboard',
//   templateUrl: './admin-dashboard.component.html',
//   styleUrls: ['./admin-dashboard.component.scss']
// })
// export class AdminDashboardComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }

import { Breakpoint } from './../../../models/breakpoint.model';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';


export interface paginator {
  length: number;
  currentPageIndex: number;
  currentPageSize: number;
  pageSizeOptions: Array<number>;
}

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  public isSmall: any;

  constructor( public store: Store<{ breakpoint: Breakpoint }> ) {
    this.store.select('breakpoint').subscribe((breakpoint) => {
      if (breakpoint.isXs || breakpoint.isSm) {
        this.isSmall = true;
      } else {
        this.isSmall = false;
      }
    })
  }

  ngOnInit(): void {
    console.log(this.isSmall);
  }

  numSequence(n: number): Array<number> {
    return Array(n);
  }

}
