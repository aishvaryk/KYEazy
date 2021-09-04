import { Component, OnInit } from '@angular/core';

import { MediaChange, MediaObserver } from '@angular/flex-layout';

import { filter, map } from 'rxjs/operators';

import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { CompanyService } from 'src/app/services/company/company.service';
import { Employee } from 'src/app/models/employee.model';
import { ActivatedRoute } from '@angular/router';
import { Company } from 'src/app/models/company.model';
import { Breakpoint } from 'src/app/models/breakpoint.model';
import { Store } from '@ngrx/store';
import { paginator } from '../../admin/all-companies/all-companies.component';
import { Paginator } from 'src/app/models/paginator.model';

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
  public search: string;
  public employees: Employee[];
  public companyId: any;
  public company: Company;
  public zeroEmployees: any;
  public loading!: boolean;
  searchText: string;
  currentUser!: string;

  constructor(
    public store: Store<{ breakpoint: Breakpoint; route: string }>,
    companyService: CompanyService,
    public activatedRoute: ActivatedRoute
  ) {
    this.isSmall = false;
    this.searchText = '';
    this.filter = '';
    this.sortBy = '';
    this.search = '';
    this.companyService = companyService;
    this.employees = [{}] as Employee[];
    this.companyId = 0;
    this.company = {} as Company;
    this.paginator = {} as Paginator;
  }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe((params) => {
      this.companyId = params.companyId;
      if(params.companyId==undefined)
      {
        let k=localStorage.getItem("Id");
        if(k!=null)this.companyId= parseInt(k)
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

    this.companyService.getEmployees(this.companyId, 5, 1);
    this.companyService.employeesSubject.subscribe((employees) => {
      this.employees = employees;
    });

    this.companyService.getCompanyDetails(this.companyId);
    this.companyService.companySubject.subscribe((company) => {
      this.company = company;
      this.paginator.length = company.numberOfTotalEmployees;
      this.paginator.currentPageIndex = 0;
      this.paginator.currentPageSize = 5;
      this.paginator.pageSizeOptions = [ 1,2,5,10,15,20,25];

      if (company.numberOfTotalEmployees === 0) {
        this.zeroEmployees = true;
      } else {
        this.zeroEmployees = false;
      }
    });
  }

  OnPageChange(event: any) {

    this.paginator.currentPageIndex = event.pageIndex;
    this.paginator.currentPageSize = event.pageSize;
    this.companyService.getEmployees(
      this.companyId,
      this.paginator.currentPageSize,
      this.paginator.currentPageIndex + 1
    );
  }

  onSearchText(event: any) {
    this.searchText = event.target.value;
  }

  OnSearchSelect() {
    this.companyService.getEmployeeByName(
      this.companyId,
      this.searchText,
      this.paginator.currentPageSize,
      this.paginator.currentPageIndex + 1
    );
  }

  OnSortSelect(event: any) {
    this.sortBy = event.value;

    if (this.sortBy === 'name') {
      this.companyService.getEmployeesSortedByName(
        this.companyId,
        this.paginator.currentPageSize,
        this.paginator.currentPageIndex + 1
      );
    }

    if (this.sortBy === 'date-registration') {
      this.companyService.getEmployeesSortedByDate(
        this.companyId,
        this.paginator.currentPageSize,
        this.paginator.currentPageIndex + 1
      );
    }
  }

  OnFilterSelect(event: any) {
    this.filter = event.value;

    if (this.filter === 'verification-failed') {
      this.companyService.getEmployeesByStatus(
        this.companyId,
        'Rejected',
        this.paginator.currentPageSize,
        this.paginator.currentPageIndex + 1
      );
    }

    if (this.filter === 'verification-completed') {
      this.companyService.getEmployeesByStatus(
        this.companyId,
        'Accepted',
        this.paginator.currentPageSize,
        this.paginator.currentPageIndex + 1
      );
    }

    if (this.filter === 'verification-pending') {
      this.companyService.getEmployeesByStatus(
        this.companyId,
        'Pending',
        this.paginator.currentPageSize,
        this.paginator.currentPageIndex + 1
      );
    }

    if (this.filter === 'verification-pending') {
      this.companyService.getEmployeesByStatus(
        this.companyId,
        'Pending',
        this.paginator.currentPageSize,
        this.paginator.currentPageIndex + 1
      );
    }

    if (this.filter === 'all') {
      this.companyService.getEmployees(
        this.companyId,
        this.paginator.currentPageSize,
        this.paginator.currentPageIndex + 1
      );
    }
  }
}
