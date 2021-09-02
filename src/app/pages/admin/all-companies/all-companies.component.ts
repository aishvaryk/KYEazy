import { Component, OnInit } from '@angular/core';
import { Breakpoint } from './../../../models/breakpoint.model';
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
  selector: 'app-all-companies',
  templateUrl: './all-companies.component.html',
  styleUrls: ['./all-companies.component.scss'],
})
export class AllCompaniesComponent implements OnInit {
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
  public searchText: any = "";
  public loading: boolean;

  constructor(
    public store: Store<{ breakpoint: Breakpoint }>,
    adminService: AdminService,
    companyService: CompanyService
  ) {
    this.loading = false;
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
  }

  onViewEmployees(companyId: number) {
    this.companyRoute = '/admin/employees/' + companyId;
  }

  ngOnInit(): void {

    this.loading = true
    this.adminService.getCompanies(5, 1);
    this.adminService.companiesSubject.subscribe((companies) => {
      this.companies = companies;
      this.loading = false;
    });
  }

  OnPageChange(event: any) {
    this.paginator.currentPageIndex = event.pageIndex;
    this.paginator.currentPageSize = event.pageSize;
  }


  onSearchText(event:any) {
    this.searchText=event.target.value;
  }

  OnSearchSelect() {
    this.adminService.getAllCompanyByName(this.searchText,10,1);
    this.adminService.employeesSubject.subscribe((employees)=>{
            this.employees=employees;
          }
          );

  }
}
