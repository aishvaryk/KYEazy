import { Component, OnInit, Output, ViewChild } from '@angular/core';
import {
  FormControl,
} from '@angular/forms';
import { CompanyService } from 'src/app/services/company/company.service';
import { Employee } from 'src/app/models/employee.model';
import { ActivatedRoute } from '@angular/router';
import { Company } from 'src/app/models/company.model';
import { Breakpoint } from 'src/app/models/breakpoint.model';
import { Store } from '@ngrx/store';
import { Paginator } from 'src/app/models/paginator.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import {  EventEmitter } from '@angular/core';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
})
export class EmployeesComponent implements OnInit {
  emailFormControl = new FormControl('');
  public paginator: Paginator;
  public isSmall: boolean;
  public companyService: CompanyService;
  public filter: string;
  public sortBy: string;
  public employees: Employee[];
  public companyId: any;
  public company: Company;
  public zeroEmployees: any;
  public loading!: boolean;
  searchText: string;
  currentUser!: string;

  @ViewChild('matPaginator') matPaginator!: MatPaginator

  constructor(
    public store: Store<{ breakpoint: Breakpoint; route: string }>,
    companyService: CompanyService,
    public activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,

  ) {
    this.isSmall = false;
    this.searchText = '';
    this.filter = 'all';
    this.sortBy = 'dateTimeOfApplication';
    this.companyService = companyService;
    this.employees = [{}] as Employee[];
    this.companyId = 0;
    this.company = {} as Company;
    this.paginator = {} as Paginator;
    this.paginator.pageSizeOptions = [ 1,2,5,10,15,20,25];
    this.paginator.currentPageIndex = 0;
    this.paginator.currentPageSize = 5;

  }

  ngOnInit(): void {

    this.companyService.reportedSubject.subscribe((response)=>{
      this.companyService.getEmployees(
        this.companyId,

        this.paginator.currentPageSize,
        this.paginator.currentPageIndex + 1,
        this.sortBy,
        this.filter
      );

    })
    this.activatedRoute.params.subscribe((params) => {
      this.companyId = params.companyId;
      if(params.companyId == undefined)
      {
        let k=localStorage.getItem("Id");
        if (k!=null) this.companyId= parseInt(k)
      }

    });

    this.store.select('breakpoint').subscribe((change: Breakpoint) => {
      if (change.isXs) {
        this.isSmall = true;
      } else {
        this.isSmall = false;
      }
    });

    this.store.select('route').subscribe((route: string) => {
      if (route.substring(1, 4) === 'com') this.currentUser = 'company';
      else this.currentUser = 'admin';
    });

    this.companyService.getEmployees(this.companyId, 5, 1,this.sortBy,this.filter);
    this.companyService.employeesSubject.subscribe((employees) => {
      console.log(employees);
      if (this.searchText) {
        if (employees.length == 0) {
          this.snackBar.open('No Employees Found', "Retry");
          return;
        }
        this.companyService.getSearchedEmployeesSize(
          this.companyId,
          this.searchText,
          this.sortBy,
          this.filter,
          ).subscribe((res: any) => {
          this.matPaginator.length = res;
        })
      }
      this.employees = employees;
    });

    this.companyService.getCompanyDetails(this.companyId);
    this.companyService.companySubject.subscribe((company) => {
      this.company = company;
      this.paginator.length = company.numberOfTotalEmployees;
      if (company.numberOfTotalEmployees === 0) {
        this.zeroEmployees = true;
      } else {
        this.zeroEmployees = false;
      }
    });
  }
rekyc(s:any)
{
  console.log(s)
  this.companyService.reKyc(s).subscribe((response:any)=>{
  this.companyService.getEmployees(
    this.companyId,
    this.paginator.currentPageSize,
    this.paginator.currentPageIndex + 1,
    this.sortBy,
    this.filter
  )});

}


  OnPageChange(event: any) {
    this.paginator.currentPageIndex = event.pageIndex;
    this.paginator.currentPageSize = event.pageSize;
    if(this.searchText.trim().length === 0 ) {
      this.companyService.getEmployees(
        this.companyId,
        this.paginator.currentPageSize,
        this.paginator.currentPageIndex + 1,
        this.sortBy,
        this.filter,
      );
    }
    else {
      this.companyService.getEmployeesByName(
        this.companyId,
        this.searchText,
        this.paginator.currentPageSize,
        this.paginator.currentPageIndex + 1,
        this.sortBy,
        this.filter
      );
    }
  }

  onSearchText(event: any) {
    this.searchText = event.target.value;
  }

  OnSearchSelect() {
    if (this.searchText.trim().length === 0) {
      this.matPaginator.pageIndex = 0;
      this.matPaginator.length = this.company.numberOfTotalEmployees;
      this.companyService.getEmployees(
        this.companyId,
        5,
        1,
        this.sortBy,
        this.filter,
      );
    } else {
      this.matPaginator.pageIndex = 0;
      this.companyService.getEmployeesByName(
        this.companyId,
        this.searchText,
        5,
        1,
        this.sortBy,
        this.filter
      );
    }
  }

  OnSortSelect(event: any) {
    this.sortBy = event.value;
      this.matPaginator.pageIndex = 0;
      this.matPaginator.length = this.company.numberOfTotalEmployees;
      this.companyService.getEmployees(
        this.companyId,
        5,
        1,
        this.sortBy,
        this.filter,
      );
  }

  OnFilterSelect(event: any) {
    this.filter = event.value;
    this.matPaginator.pageIndex = 0;
    this.matPaginator.length = this.company.numberOfTotalEmployees;
    this.companyService.getEmployees(
      this.companyId,
      5,
      1,
      this.sortBy,
      this.filter,
    );
  }
}
