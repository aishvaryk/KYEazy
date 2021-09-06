import { Breakpoint } from './../../../models/breakpoint.model';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Company } from 'src/app/models/company.model';
import { AdminService } from 'src/app/services/admin/admin.service';
import { pieChartData } from 'src/app/models/pie-chart-data.model';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent implements OnInit {
  public isSmall: any;
  public companies: Company[];
  public adminService: AdminService;
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
  ) {

    this.store.select('breakpoint').subscribe((breakpoint) => {
      if (breakpoint.isXs) {
        this.isSmall = true;
      } else {
        this.isSmall = false;
      }
    });

    this.companies = [{}] as Company[];
    this.adminService = adminService;
    this.adminService.getNoOfEmployees().subscribe((response: number) => {
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
    this.adminService.getCompanies(2, 1);
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

}
