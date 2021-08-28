import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Employee } from 'src/app/models/employee.model';
import { Subject } from 'rxjs';
import { Byte } from '@angular/compiler/src/util';
import { Company } from 'src/app/models/company.model';
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  employees:Employee[];
  public employee: Employee;
  public employeeSubject:Subject<Employee>;
  public companies:Company[];
  public companiesSubject:Subject<Company[]>;
  public companySubject:Subject<Company[]>;

  employeesSubject:Subject<Employee[]>
    constructor(private httpClient:HttpClient ) {
    this.employees=[]
    this.employeesSubject=new Subject();
    this.employee={ } as Employee;
    this.employeeSubject=new Subject();
    this.companies=[]
    this.companiesSubject=new Subject();
    this.companySubject=new Subject();
  }
  login():void
  {
    console.log("Admin")
  }
  viewAllApplications(pageSize:number,pageNumber:number):void{
    this.httpClient.get(`http://localhost:8085/admin/view-all-applications?pageSize=${pageSize}&pageNumber=${pageNumber}`).pipe(map((response) => response as Employee[]))
    .subscribe((results: Employee[]) => {
      this.employees=results;
        this.employeesSubject.next(this.employees);

  });
}
  viewPendingApplications(pageSize:number,pageNumber:number):void{
    this.httpClient.get(`http://localhost:8085/admin/view-pending-applications?pageSize=${pageSize}&pageNumber=${pageNumber}`).pipe(map((response) => response as Employee[]))
    .subscribe((results: Employee[]) => {
      this.employees=results;
        this.employeesSubject.next(this.employees);

  });
}
viewAcceptedApplications(pageSize:number,pageNumber:number):void{
  this.httpClient.get(`http://localhost:8085/admin/view-accepted-applications?pageSize=${pageSize}&pageNumber=${pageNumber}`).pipe(map((response) => response as Employee[]))
  .subscribe((results: Employee[]) => {
    this.employees=results;
      this.employeesSubject.next(this.employees);

});
}
viewRejectedApplications(pageSize:number,pageNumber:number):void{
  this.httpClient.get(`http://localhost:8085/admin/view-rejected-applications?pageSize=${pageSize}&pageNumber=${pageNumber}`).pipe(map((response) => response as Employee[]))
  .subscribe((results: Employee[]) => {
    this.employees=results;
      this.employeesSubject.next(this.employees);

});
}
viewEmployeeDetails(id:number):void{
  this.httpClient.get(`http://localhost:8085/admin/view-employee-details/${id}`).pipe(map((response) => response as Employee))
  .subscribe((results: Employee) => {
    this.employee=results;
      this.employeeSubject.next(this.employee);

});
}
verifyEmployeeDetails(id:number,status:string):void{
  this.httpClient.get(`http://localhost:8085/admin/verify/${id}/${status}`).pipe(map((response) => response as Employee))
  .subscribe((results: Employee) => {
    this.employee=results;
      this.employeeSubject.next(this.employee);

});
}

getCompanies(pageSize:number,pageNumber:number):void{
  this.httpClient.get(`http://localhost:8085/admin/companies?pageSize=${pageSize}&pageNumber=${pageNumber}`).pipe(map((response) => response as Company[]))
  .subscribe((results: Company[]) => {
    this.companies=results;
      this.companiesSubject.next(this.companies);

});
}

}
