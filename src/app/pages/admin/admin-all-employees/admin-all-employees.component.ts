import { AdminService } from './../../../services/admin/admin.service';
import { Component, OnInit } from '@angular/core';

import { MediaChange, MediaObserver } from '@angular/flex-layout';

import { filter, map } from 'rxjs/operators';

import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';

import { Employee } from 'src/app/models/employee.model';

export interface paginator {
  length: number;
  currentPageIndex: number;
  currentPageSize: number;
  pageSizeOptions: Array<number>;
}

@Component({
  selector: 'app-admin-all-employees',
  templateUrl: './admin-all-employees.component.html',
  styleUrls: ['./admin-all-employees.component.scss'],
})
export class AdminAllEmployeesComponent implements OnInit {
  emailFormControl = new FormControl('');
  private observable: any;
  public isSmall: boolean;
  public paginator: paginator;
  public adminService: AdminService;
  public filter: string;
  public sortBy: string;
  public search: string;
  public employees: Employee[];
  public loading!: boolean;
  public zeroEmployees: any;
  searchText: string;
  constructor(public observer: MediaObserver, adminService: AdminService) {
    this.isSmall = false;
    this.searchText = '';
    this.paginator = {
      length: 100,
      currentPageSize: 10,
      pageSizeOptions: [2, 10, 25],
      currentPageIndex: 0,
    };
    this.filter = '';
    this.sortBy = '';
    this.search = '';
    this.adminService = adminService;
    this.employees = [{}] as Employee[];
    this.adminService.getTotalNoOfEmployees().subscribe((response: number) => {
      if (response === 0) {
        this.zeroEmployees = true;
      } else {
        this.zeroEmployees = false;
      }
    });
  }

  ngOnInit(): void {
    this.observable = this.observer
      .asObservable()
      .pipe(
        filter((changes: MediaChange[]) => changes.length > 0),
        map((changes: MediaChange[]) => changes[0])
      )
      .subscribe((change: MediaChange) => {
        if (change.mqAlias === 'xs') {
          this.isSmall = true;
        } else {
          this.isSmall = false;
        }
      });
    this.loading = true;
    this.adminService.viewAllApplications(10, 1);
    this.adminService.employeesSubject.subscribe((employees) => {
      this.employees = employees;

      this.paginator.length =
        Math.floor(this.employees.length / this.paginator.currentPageSize) + 2;
      this.paginator.currentPageIndex = 1;

      this.loading = false;
    });
  }

  formatImage(img: any): any {
    if (img == null) {
      return null;
    }
    return 'data:image/jpeg;base64,' + img;
  }

  OnPageChange(event: any) {
    this.paginator.length =
      Math.floor(this.employees.length / this.paginator.currentPageSize) + 2;
    if (event.pageIndex) this.paginator.currentPageIndex = event.pageIndex;

    if (event.pageSize) this.paginator.currentPageSize = event.pageSize;
    let pageIndex = 1;
    if (event.pageIndex) {
      pageIndex = event.pageSize;
    }
    this.loading = true;
    this.adminService.viewAllApplications(event.pageSize, pageIndex);
    this.adminService.employeesSubject.subscribe((employees) => {
      this.employees = employees;
      this.loading = false;
    });
  }

  onSearchText(event: any) {
    this.searchText = event.target.value;
  }
  OnSearchSelect() {
    this.loading = true;
    this.adminService.getAllEmployeeByName(
      this.searchText,
      this.paginator.currentPageSize,
      this.paginator.currentPageIndex
    );
    this.adminService.employeesSubject.subscribe((employees) => {
      this.employees = employees;
      this.loading = false;
    });
  }

  OnSortSelect(event: any) {
    this.sortBy = event.value;

    if (this.sortBy === 'name') {
      this.loading = true;
      this.adminService.getAllEmployeesSortedByName(
        this.paginator.currentPageSize,
        this.paginator.currentPageIndex
      );
      this.adminService.employeesSubject.subscribe((employees) => {
        this.employees = employees;
        this.loading = false;
      });
    }

    if (this.sortBy === 'date-registration') {
      this.loading = true;
      this.adminService.getAllEmployeesSortedByDate(
        this.paginator.currentPageSize,
        this.paginator.currentPageIndex
      );
      this.adminService.employeesSubject.subscribe((employees) => {
        this.employees = employees;
        console.log(employees);
        this.loading = false;
      });
    }
  }

  OnFilterSelect(event: any) {
    console.log(event.value);
    this.filter = event.value;
    if (this.filter === 'verification-failed') {
      this.adminService.getAllEmployeesByStatus(
        'Rejected',
        this.paginator.currentPageSize,
        this.paginator.currentPageIndex
      );
      this.adminService.employeesSubject.subscribe((employees) => {
        this.employees = employees;
        console.log(employees);
      });
    }
    if (this.filter === 'verification-completed') {
      this.adminService.getAllEmployeesByStatus('Accepted', 10, 1);
      this.adminService.employeesSubject.subscribe((employees) => {
        this.employees = employees;
        console.log(employees);
      });
    }
    if (this.filter === 'verification-pending') {
      // this.paginator.currentPageSize,this.paginator.currentPageIndex
      this.adminService.getAllEmployeesByStatus('Pending', 10, 1);
      this.adminService.employeesSubject.subscribe((employees) => {
        this.employees = employees;
        console.log(employees);
      });
    }
    if (this.filter === 'all') {
      this.adminService.viewAllApplications(10, 1);
      this.adminService.employeesSubject.subscribe((employees) => {
        this.employees = employees;
        console.log(employees);
      });
    }
  }
}
