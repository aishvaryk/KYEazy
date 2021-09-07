import { Component, OnInit, ViewChild } from '@angular/core';
import { Breakpoint } from './../../../models/breakpoint.model';
import { Store } from '@ngrx/store';
import { Company } from 'src/app/models/company.model';
import { AdminService } from 'src/app/services/admin/admin.service';
import { Employee } from 'src/app/models/employee.model';
import { Paginator } from 'src/app/models/paginator.model';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-all-companies',
  templateUrl: './all-companies.component.html',
  styleUrls: ['./all-companies.component.scss'],
})
export class AllCompaniesComponent implements OnInit {
  public isSmall: any;
  public paginator: Paginator;
  public companies: Company[];
  public adminService: AdminService;
  public employees: Employee[];
  public numOfPendingEmployees: number = 0;
  public numOfAcceptedEmployees: number = 0;
  public companyId: number = 0;
  public companyRoute: any;
  public searchText: any = '';
  public companiesLoading: boolean
  public numberOfCompaniesLoading: boolean;
  public zeroCompanies: any;
  public totalC: any;

  @ViewChild('matPaginator') matPaginator!: MatPaginator

  constructor(
    public store: Store<{ breakpoint: Breakpoint }>,
    adminService: AdminService,
    private snackBar: MatSnackBar,
  ) {
    this.companiesLoading = false;
    this.numberOfCompaniesLoading = false;
    this.adminService = adminService;
    this.paginator = {} as Paginator;
    this.companies = [{}] as Company[];
    this.employees = {} as Employee[];
    this.paginator.currentPageIndex = 0;
    this.paginator.currentPageSize = 5;
    this.paginator.pageSizeOptions = [1, 2, 5, 10, 15, 20, 25];
  }

  onViewEmployees(companyId: number) {
    this.companyRoute = '/admin/company/employees/' + companyId;
  }

  ngOnInit(): void {

    this.adminService.getCompanies(5, 1);

    this.store.select('breakpoint').subscribe((breakpoint) => {
      if (breakpoint.isXs) {
        this.isSmall = true;
      } else {
        this.isSmall = false;
      }
    });

    //this.companiesLoading = true;
    this.adminService.companiesSubject.subscribe((companies) => {

      if (this.searchText) {
        if (companies.length == 0) {
          this.snackBar.open('No Companies Found', "Retry");
          return;
        }
        this.adminService.getSearchedCompaniesSize(this.searchText).subscribe((res: any) => {
          this.matPaginator.length = res;
        })
      }

      console.log(companies);

      this.companies = companies;
      //this.companiesLoading = false;
      if (companies.length === 0) {
        this.zeroCompanies = true;
      } else {
        this.zeroCompanies = false;
      }

    });

    // this.numberOfCompaniesLoading = true;
    this.adminService.getCompaniesSize().subscribe((res: any) => {
      this.paginator.length = res;
      this.totalC = res;
      // this.numberOfCompaniesLoading = false;
    });

  }

  OnPageChange(event: any) {
    this.paginator.currentPageIndex = event.pageIndex;
    this.paginator.currentPageSize = event.pageSize;
    //this.companiesLoading = true;
    if (this.searchText.length === 0) this.adminService.getCompanies(this.paginator.currentPageSize, this.paginator.currentPageIndex + 1);
    else this.adminService.getAllCompaniesByName(this.searchText, this.paginator.currentPageSize, this.paginator.currentPageIndex + 1)
  }

  onSearchText(event: any) {
    this.searchText = event.target.value;
  }

  OnSearchSelect() {
    if (this.searchText.trim().length === 0) {
      this.matPaginator.pageIndex = 0;
      this.matPaginator.length = this.totalC;
      this.adminService.getCompanies(5, 1);
    } else {
      this.matPaginator.pageIndex = 0;
      this.adminService.getAllCompaniesByName(this.searchText, 5, 1);
    }
  }

}
