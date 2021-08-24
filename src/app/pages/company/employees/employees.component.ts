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
  public companyService: CompanyService
  public filter: string;
  public sortBy: string;
  public search: string;
  public employees:Employee[];
  //verificationStatus: String;
  searchText:string;
  constructor(public observer: MediaObserver,companyService:CompanyService) {
    //this.verificationStatus = 'verified';
    this.isSmall = false;
    this.searchText='';
    this.paginator = {
      length: 100,
      currentPageSize: 10,
      pageSizeOptions: [2, 10, 25],
      currentPageIndex: 0,
    };
    this.filter = '';
    this.sortBy = '';
    this.search = '';
    this.companyService=companyService;
    this.employees=[{}] as Employee[];
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
      this.companyService.getEmployees(1,5,1);
      this.companyService.employeesSubject.subscribe((employees)=>{
        this.employees=employees;

         this.paginator.length=Math.floor(this.employees.length/this.paginator.currentPageSize)+2;
         this.paginator.currentPageIndex=1;

        console.log(employees);

      }
      );
  }
  formatImage(img: any): any {

    if (img == null) {
      return null;
    }
    return 'data:image/jpeg;base64,' + img;
  }

  numSequence(n: number): Array<number> {
    return Array(n);
  }

  OnPageChange(event: any) {

   if(event.pageIndex) this.paginator.currentPageIndex = event.pageIndex;

   if(event.pageSize)this.paginator.currentPageSize = event.pageSize;
    let pageIndex=1;
    if(event.pageIndex)
    {
      pageIndex=event.pageSize;
    }

    this.companyService.getEmployees(1,event.pageSize,pageIndex);
      this.companyService.employeesSubject.subscribe((employees)=>{
        this.employees=employees;
        console.log(employees);

      }
      );

  }

  onSearchText(event:any)
  {

    this.searchText=event.target.value;

  }
  OnSearchSelect() {
    console.log(this.searchText);
    this.companyService.getEmployeeByName(1,this.searchText);


//    this.sortBy = event.value;
  }

  OnSortSelect(event: any) {
    console.log(event.value);
    this.sortBy = event.value;
  }

  OnFilterSelect(event: any) {
    console.log(event.value);
    this.filter = event.value;
  }
}
