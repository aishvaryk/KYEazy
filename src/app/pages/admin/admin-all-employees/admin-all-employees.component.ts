import { AdminService } from './../../../services/admin/admin.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormControl,
} from '@angular/forms';
import { Employee } from 'src/app/models/employee.model';
import { Store } from '@ngrx/store';
import { Breakpoint } from 'src/app/models/breakpoint.model';
import { Paginator } from 'src/app/models/paginator.model';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-admin-all-employees',
  templateUrl: './admin-all-employees.component.html',
  styleUrls: ['./admin-all-employees.component.scss'],
})
export class AdminAllEmployeesComponent implements OnInit {

  @ViewChild('matPaginator') matPaginator!: MatPaginator
  public emailFormControl = new FormControl('');
  public isSmall: boolean;
  public paginator!: Paginator;
  public adminService: AdminService;
  public filter: string;
  public sortBy: string;
  public search: string;
  public employees: Employee[];
  public loading!: boolean;
  public zeroEmployees: any;
  public searchText: string;

  constructor(
    adminService: AdminService,
    public store: Store<{breakpoint: Breakpoint}>
    ) {
    this.isSmall = false;
    this.searchText = '';
    this.filter = 'all';
    this.sortBy = 'dateTimeOfApplication';
    this.search = '';
    this.adminService = adminService;
    this.employees = [{}] as Employee[];
    this.paginator = {} as Paginator;
    this.paginator.currentPageIndex = 0;
    this.paginator.currentPageSize = 5;
    this.paginator.pageSizeOptions = [1, 2, 5, 10, 15, 20, 25];

  }


  ngOnInit(): void {
    //this.loading = true;
    this.adminService.viewAllApplications(
      5,
      1,
      this.sortBy,
      this.filter,
      );

    this.store.select('breakpoint').subscribe((breakpoint) => {
      if (breakpoint.isXs) {
        this.isSmall = true;
      } else {
        this.isSmall = false;
      }
    });

    this.adminService.employeesSubject.subscribe((employees) => {
      this.employees = employees;
    });

    this.adminService.getNoOfEmployees().subscribe((response: number) => {
      this.paginator.length = response;
      if (response === 0) {
        this.zeroEmployees = true;
      } else {
        this.zeroEmployees = false;
      }
    });

  }

  formatImage(img: any): any {
    if (img == null) {
      return null;
    }
    return 'data:image/jpeg;base64,' + img;
  }

  OnPageChange(event: any) {
    //this.loading = true;
    this.paginator.currentPageIndex = event.pageIndex;
    this.paginator.currentPageSize = event.pageSize;
  }

  onSearchText(event: any) {
    this.searchText = event.target.value;
  }

  OnSearchSelect() {
    if (this.searchText.trim().length === 0) {
      this.matPaginator.pageIndex = 0;
      // this.matPaginator.length = this.company.numberOfTotalEmployees;
      this.adminService.viewAllApplications(
        5,
        1,
        this.sortBy,
        this.filter,
      );
    } else {
      this.matPaginator.pageIndex = 0;
      // this.matPaginator.length = this.company.numberOfTotalEmployees;
      this.adminService.getAllEmployeesByName(
        this.searchText,
        5,
        1,
        this.sortBy,
        this.filter
      );
    }
  }

  OnSortSelect(event: any) {
    this.matPaginator.pageIndex = 0;
    // this.matPaginator.length = this.company.numberOfTotalEmployees;
    this.adminService.viewAllApplications(
      5,
      1,
      this.sortBy,
      this.filter
    );
  }

  OnFilterSelect(event: any) {
    this.filter = event.value;
    this.matPaginator.pageIndex = 0;
    // this.matPaginator.length = this.company.numberOfTotalEmployees;
    this.adminService.viewAllApplications(
      5,
      1,
      this.sortBy,
      this.filter,
    );
  }

}
