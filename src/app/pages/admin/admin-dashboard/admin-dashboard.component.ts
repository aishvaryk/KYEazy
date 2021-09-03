import { Breakpoint } from './../../../models/breakpoint.model';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Company } from 'src/app/models/company.model';
import { AdminService } from 'src/app/services/admin/admin.service';
import { CompanyService } from 'src/app/services/company/company.service';
import { Employee } from 'src/app/models/employee.model';
import { ActivatedRoute } from '@angular/router';

import { pieChartData } from 'src/app/models/pieChartData.model';

export interface paginator {
  length: number;
  currentPageIndex: number;
  currentPageSize: number;
  pageSizeOptions: Array<number>;
}

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent implements OnInit {
  public isSmall: any;
  public paginator: paginator;
  public companies: Company[];
  public adminService: AdminService;
  public companyService: CompanyService;
  public employees: Employee[];
  public numOfPendingEmployees: number = 0;
  public numOfAcceptedEmployees: number = 0;
  public companyId: number = 0;
  public companyRoute: any;
  public pieChartData: any;
  public zeroEmployees: any;
  public zeroCompanies: any;

  loading!: boolean;
  constructor(
    public store: Store<{ breakpoint: Breakpoint }>,
    adminService: AdminService,
    companyService: CompanyService
  ) {
    this.store.select('breakpoint').subscribe((breakpoint) => {
      if (breakpoint.isXs) {
        this.isSmall = true;
      } else {
        this.isSmall = false;
      }
    });

    this.paginator = {
      length: 100,
      currentPageSize: 10,
      pageSizeOptions: [5, 10, 25, 100],
      currentPageIndex: 0,
    };
    this.companies = [{}] as Company[];
    this.adminService = adminService;
    this.companyService = companyService;
    this.employees = {} as Employee[];
    this.adminService.getTotalNoOfEmployees().subscribe((response: number) => {
      if (response === 0) {
        this.zeroEmployees = true;
      } else {
        this.zeroEmployees = false;
      }
    });

    this.adminService
      .getNoOfRegisteredEmployees()
      .subscribe((response: number) => (pieChartData[0].value = response));
    this.adminService
      .getNoOfAcceptedEmployees()
      .subscribe((response: number) => (pieChartData[1].value = response));
    this.adminService
      .getNoOfRejectedEmployees()
      .subscribe((response: number) => (pieChartData[2].value = response));
    this.adminService
      .getNoOfPendingEmployees()
      .subscribe((response: number) => (pieChartData[3].value = response));

    Object.assign(this, { pieChartData });
  }

  onViewEmployees(companyId: number) {
    this.companyRoute = '/admin/company/employees/' + companyId;
  }

  ngOnInit(): void {
    this.loading = true;
    this.adminService.getCompanies(5, 1);
    this.adminService.companiesSubject.subscribe((companies) => {
      this.companies = companies;
      this.loading = false;
      if (companies.length === 0) {
        this.zeroCompanies = true;
      } else {
        this.zeroCompanies = false;
      }
    });
  }
  OnPageChange(event: any) {
    this.paginator.currentPageIndex = event.pageIndex;
    this.paginator.currentPageSize = event.pageSize;
  }

  OnSearchSelect() {}
}
