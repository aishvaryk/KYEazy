import { AdminService } from './../../../services/admin/admin.service';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
} from '@angular/forms';
import { Employee } from 'src/app/models/employee.model';
import { Store } from '@ngrx/store';
import { Breakpoint } from 'src/app/models/breakpoint.model';
import { Paginator } from 'src/app/models/paginator.model';


@Component({
  selector: 'app-admin-all-employees',
  templateUrl: './admin-all-employees.component.html',
  styleUrls: ['./admin-all-employees.component.scss'],
})
export class AdminAllEmployeesComponent implements OnInit {
  emailFormControl = new FormControl('');
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
    this.filter = '';
    this.sortBy = '';
    this.search = '';
    this.adminService = adminService;
    this.employees = [{}] as Employee[];

  }

  ngOnInit(): void {

    //this.loading = true;

    this.adminService.viewAllApplications(5, 1);

    this.store.select('breakpoint').subscribe((breakpoint) => {
      if (breakpoint.isXs) {
        this.isSmall = true;
      } else {
        this.isSmall = false;
      }
    });

    this.adminService.employeesSubject.subscribe((employees) => {
      this.employees = employees;
      //this.loading = false;
    });

    this.adminService.getTotalNoOfEmployees().subscribe((response: number) => {
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
    this.loading = true;
    this.adminService.viewAllApplications(event.pageSize, 1);
  }

  onSearchText(event: any) {
    this.searchText = event.target.value;
  }

  OnSearchSelect() {
    this.loading = true;
    let k=localStorage.getItem("Id");
    if(k!=null){
    this.adminService.getAllEmployeesByName(
      parseInt(k),
      this.searchText,
      this.paginator.currentPageSize,
      this.paginator.currentPageIndex
    );
    }
  }

  OnSortSelect(event: any) {
    this.sortBy = event.value;
    let k=localStorage.getItem("Id");
    if(k!=null){
    if (this.sortBy === 'name') {
      this.loading = true;
      this.adminService.getAllEmployeesSortedByName(
        parseInt(k),
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
        parseInt(k),

        this.paginator.currentPageSize,
        this.paginator.currentPageIndex
      );
      this.adminService.employeesSubject.subscribe((employees) => {
        this.employees = employees;
        this.loading = false;
      });
    }
  }
  }

  OnFilterSelect(event: any) {
    this.filter = event.value;
    if (this.filter === 'verification-failed') {
      this.adminService.getAllEmployeesByStatus('Rejected',this.paginator.currentPageSize,this.paginator.currentPageIndex);
    }
    if (this.filter === 'verification-completed') {
      this.adminService.getAllEmployeesByStatus('Accepted', 10, 1);
    }
    if (this.filter === 'verification-pending') {
      this.adminService.getAllEmployeesByStatus('Pending', 10, 1);
    }
    if (this.filter === 'all') {
      this.adminService.viewAllApplications(10, 1);
    }
  }
}
