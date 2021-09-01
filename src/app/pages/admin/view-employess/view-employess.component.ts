import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Breakpoint } from './../../../models/breakpoint.model';
import { ActivatedRoute } from '@angular/router';
import { CompanyService } from 'src/app/services/company/company.service';
import { Employee } from 'src/app/models/employee.model';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { filter, map } from 'rxjs/operators';

export interface paginator {
  length: number;
  currentPageIndex: number;
  currentPageSize: number;
  pageSizeOptions: Array<number>;
}

@Component({
  selector: 'app-view-employess',
  templateUrl: './view-employess.component.html',
  styleUrls: ['./view-employess.component.scss']
})
export class ViewEmployessComponent implements OnInit {

  emailFormControl = new FormControl('');
  private observable: any;
  public isSmall: boolean = false;
  public paginator: paginator;

  public filter: string;
  public sortBy: string;
  public search: string;
  public companyService: CompanyService;
  public employees:Employee[];
  private companyId:number;

  // verificationStatus: String;
  searchText:string;
  constructor(private activatedRoute:ActivatedRoute,  public observer: MediaObserver,public store: Store<{ breakpoint: Breakpoint }>,companyService:CompanyService) {
    this.searchText='';
    this.companyId=0;
    this.paginator = {
      length: 100,
      currentPageSize: 10,
      pageSizeOptions: [5, 10, 25, 100],
      currentPageIndex: 0,
    };
    this.filter = '';
    this.sortBy = '';
    this.search = '';
    this.store.select('breakpoint').subscribe((breakpoint: any) => {
      if (breakpoint.isXs || breakpoint.isSm) {
        this.isSmall = true;
      } else {
        this.isSmall = false;
      }
    })
    this.companyService=companyService;
    this.employees=[{}] as Employee[];
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params) => {

        console.log(params.companyId);
        this.companyId=params.companyId;
      }

    );
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
    this.companyService.getEmployees(this.companyId,10,1);
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
    if(this.sortBy==="name"){
    this.companyService.getEmployeesSortedByName(1,this.paginator.currentPageSize,this.paginator.currentPageIndex);
    this.companyService.employeesSubject.subscribe((employees)=>{
      this.employees=employees;
      console.log(employees);
    }
    );}

    if(this.sortBy==="date-registration"){
      this.companyService.getEmployeesSortedByDate(1,this.paginator.currentPageSize,this.paginator.currentPageIndex);
      this.companyService.employeesSubject.subscribe((employees)=>{
        this.employees=employees;
        console.log(employees);
      }
      );}

  }


  OnFilterSelect(event: any) {
    console.log(event.value);
    this.filter = event.value;

    if(this.filter==="verification-failed"){
      this.companyService.getEmployeesByStatus(1,"Rejected",this.paginator.currentPageSize,this.paginator.currentPageIndex);
      this.companyService.employeesSubject.subscribe((employees)=>{
        this.employees=employees;
        console.log(employees);
      }
      );}

      if(this.filter==="verification-completed"){
        this.companyService.getEmployeesByStatus(1,"Accepted",this.paginator.currentPageSize,this.paginator.currentPageIndex);
        this.companyService.employeesSubject.subscribe((employees)=>{
          this.employees=employees;
          console.log(employees);
        }
        );}

        if(this.filter==="verification-pending"){
          this.companyService.getEmployeesByStatus(1,"Pending",this.paginator.currentPageSize,this.paginator.currentPageIndex);
          this.companyService.employeesSubject.subscribe((employees)=>{
            this.employees=employees;
            console.log(employees);
          }
          );}

          if(this.filter==="all"){
            this.companyService.getEmployees(1,this.paginator.currentPageSize,this.paginator.currentPageIndex);
            this.companyService.employeesSubject.subscribe((employees)=>{
              this.employees=employees;
              console.log(employees);
            }
            );}

  }

}
