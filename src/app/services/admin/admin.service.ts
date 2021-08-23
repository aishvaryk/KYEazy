import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Employee } from 'src/app/models/employee.model';
import { Subject } from 'rxjs';
import { Byte } from '@angular/compiler/src/util';
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  employees:Employee[];
  public employee: Employee;
  public employeeSubject:Subject<Employee>;

  employeesSubject:Subject<Employee[]>
    constructor(private httpClient:HttpClient ) {
    this.employees=[]
    this.employeesSubject=new Subject();
    this.employee={ } as Employee;
    this.employeeSubject=new Subject();

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

}
