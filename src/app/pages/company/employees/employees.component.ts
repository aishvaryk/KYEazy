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

export interface paginator {
  length: number;
  currentPageIndex: number;
  currentPageSize: number;
  pageSizeOptions: Array<number>;
}

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
})
export class EmployeesComponent implements OnInit {
  emailFormControl = new FormControl('');
  private observable: any;
  public isSmall: boolean;
  public paginator: paginator;
  public companyService: CompanyService;
  public filter: string;
  public sortBy: string;
  public search: string;
  public employees: Employee[];

  public zeroEmployees: any;

  public loading!:boolean;
  //verificationStatus: String;
  searchText: string;
  constructor(public observer: MediaObserver, companyService: CompanyService) {
    //this.verificationStatus = 'verified';
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
    this.companyService = companyService;
    this.employees = [{}] as Employee[];
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
    let k = localStorage.getItem('Id');

    if(k!=null) {
        this.loading=true;
      this.companyService.getEmployees(parseInt(k),10,1);
      this.loading=false;
    }
    this.companyService.employeesSubject.subscribe((employees) => {
      this.employees = employees;

      this.paginator.length =
        Math.floor(this.employees.length / this.paginator.currentPageSize) + 2;
      this.paginator.currentPageIndex = 1;

      console.log(employees);
    });


    if(k!=null) {
      this.companyService.getCompanyDetails(parseInt(k));
      }
    this.companyService.companySubject.subscribe((company) => {
      console.log(company);
      if (company.numberOfTotalEmployees === 0) {
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
    this.paginator.length =
      Math.floor(this.employees.length / this.paginator.currentPageSize) + 2;
    if (event.pageIndex) this.paginator.currentPageIndex = event.pageIndex;

    if (event.pageSize) this.paginator.currentPageSize = event.pageSize;
    let pageIndex = 1;
    if (event.pageIndex) {
      pageIndex = event.pageSize;
    }
    let k=localStorage.getItem("Id")

    if(k!=null) {
      this.loading=true;
    this.companyService.getEmployees(parseInt(k),event.pageSize,pageIndex);
    this.loading=false;
    }
    this.companyService.employeesSubject.subscribe((employees)=>{
        this.employees=employees;
        console.log(employees);
    })
  }

  onSearchText(event: any) {
    this.searchText = event.target.value;
  }
  OnSearchSelect() {
    console.log(this.searchText);
    let k=localStorage.getItem("Id")

    if(k!=null) {
    this.loading=true;
    this.companyService.getEmployeeByName(parseInt(k),this.searchText);
    this.loading=false;
    }
    this.companyService.employeesSubject.subscribe((employees) => {
      this.employees = employees;
      console.log(employees);
    });
    //    this.sortBy = event.value;
  }

  OnSortSelect(event: any) {
    console.log(event.value);
    this.sortBy = event.value;

    if(this.sortBy==="name"){
      let k=localStorage.getItem("Id")

    if(k!=null) {
    this.loading=true;
    this.companyService.getEmployeesSortedByName(parseInt(k),this.paginator.currentPageSize,this.paginator.currentPageIndex);
    this.loading=false;
    }
    this.companyService.employeesSubject.subscribe((employees)=>{
      this.employees=employees;
      console.log(employees);
    });
  }

  if (this.sortBy === 'date-registration') {
    let k = localStorage.getItem('Id');

    if(k!=null) {
      this.loading=true;
      this.companyService.getEmployeesSortedByDate(parseInt(k),this.paginator.currentPageSize,this.paginator.currentPageIndex);
      this.loading=false;
    }
      this.companyService.employeesSubject.subscribe((employees)=>{
        this.employees=employees;
        console.log(employees);
      });
    }
  }

  OnFilterSelect(event: any) {
    console.log(event.value);
    this.filter = event.value;

    if(this.filter==="verification-failed"){
      console.log("rejected");
      let k=localStorage.getItem("Id")

      if(k!=null) {
        this.loading=true;
      this.companyService.getEmployeesByStatus(parseInt(k),"Rejected",this.paginator.currentPageSize,this.paginator.currentPageIndex);
      this.loading=false;
      }
      this.companyService.employeesSubject.subscribe((employees) => {
        this.employees = employees;
        console.log(employees);
      }
      );}

      if(this.filter==="verification-completed"){
        let k=localStorage.getItem("Id")

        if(k!=null) {
          this.loading=true;
        this.companyService.getEmployeesByStatus(parseInt(k),"Accepted",this.paginator.currentPageSize,this.paginator.currentPageIndex);
        this.loading=false;
        }
        this.companyService.employeesSubject.subscribe((employees)=>{
          this.employees=employees;
          console.log(employees);
        }
        );}

        if(this.filter==="verification-pending"){
          let k=localStorage.getItem("Id")

          if(k!=null) {
          this.loading=true;
          this.companyService.getEmployeesByStatus(parseInt(k),"Pending",this.paginator.currentPageSize,this.paginator.currentPageIndex);
          this.loading=false;
          }
          this.companyService.employeesSubject.subscribe((employees)=>{
            this.employees=employees;
            console.log(employees);
          }
          );}

    if (this.filter === 'verification-pending') {
      let k = localStorage.getItem('Id');

      if (k != null) {
        this.companyService.getEmployeesByStatus(
          parseInt(k),
          'Pending',
          this.paginator.currentPageSize,
          this.paginator.currentPageIndex
        );
      }
      this.companyService.employeesSubject.subscribe((employees) => {
        this.employees = employees;
        console.log(employees);
      });
    }

    if (this.filter === 'all') {
      let k = localStorage.getItem('Id');

      if (k != null) {
        this.companyService.getEmployees(
          parseInt(k),
          this.paginator.currentPageSize,
          this.paginator.currentPageIndex
        );
      }
      this.companyService.employeesSubject.subscribe((employees) => {
        this.employees = employees;
        console.log(employees);
      });
    }
  }
}
