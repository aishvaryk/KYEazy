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
import { Company } from 'src/app/models/company.model';
import { AdminService } from 'src/app/services/admin/admin.service';


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
  public companies:Company[];
  public adminService:AdminService;

  constructor( public store: Store<{ breakpoint: Breakpoint }>, adminService:AdminService ) {
    this.store.select('breakpoint').subscribe((breakpoint) => {
      if (breakpoint.isXs || breakpoint.isSm) {
        this.isSmall = true;
      } else {
        this.isSmall = false;
      }
    })
    this.companies=[{}] as Company[];
    this.adminService=adminService;
  }

  ngOnInit(): void {
    console.log(this.isSmall);

    this.adminService.getCompanies(5,1);
    this.adminService.companiesSubject.subscribe((companies)=>{
      this.companies=companies;
      console.log(this.companies);
    });
  }

  numSequence(n: number): Array<number> {
    return Array(n);
  }

}
