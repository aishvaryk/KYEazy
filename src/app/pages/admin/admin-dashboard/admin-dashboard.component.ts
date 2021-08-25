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
import { CompanyService } from 'src/app/services/company/company.service';
import { Employee } from 'src/app/models/employee.model';


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
  public companyService:CompanyService;
  public employees:Employee[];
  public numOfPendingEmployees:number=0;
  public numOfAcceptedEmployees:number=0;
  public companyId:number=0;
  public companyRoute:any;

  constructor( public store: Store<{ breakpoint: Breakpoint }>, adminService:AdminService,companyService:CompanyService ) {
    this.store.select('breakpoint').subscribe((breakpoint) => {
      if (breakpoint.isXs || breakpoint.isSm) {
        this.isSmall = true;
      } else {
        this.isSmall = false;
      }
    })
    this.companies=[{}] as Company[];
    this.adminService=adminService;
    this.companyService=companyService;
    this.employees={} as Employee[];
  }

  onViewEmployees(companyId:number)
  {
    console.log(companyId);
    this.companyRoute="/admin/employees/"+companyId;
  }
  ngOnInit(): void {
    console.log(this.isSmall);

    this.adminService.getCompanies(5,1);
    this.adminService.companiesSubject.subscribe((companies)=>{
      this.companies=companies;
      console.log(this.companies);
    });


}


}
