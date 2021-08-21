import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { EmployeeComponent } from 'src/app/components/employee/employee.component';
import { Employee } from 'src/app/models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  public employees: Employee[];
  public employeesChanged:Subject<Employee[]>;

  constructor(private httpClient :HttpClient) {
    //this.employees
    this.employees=[];
    this.employeesChanged=new Subject();

  }


  getEmployees(): void{
    this.httpClient.get("http://localhost:8085/company/employees/1?pageSize=2&pageNumber=2").pipe(map((response) => response as Employee[]))
    .subscribe((results: Employee[]) => {
     // this.employees=results;
        console.log(results);
        this.employees=results;
        this.employeesChanged.next(this.employees);

});
   /*
    this.httpClient.get("http://localhost:8085/company/employees/1").pipe(map((response) => response as Employee[]))
    .subscribe((results: Employee[]) => {
      this.employees=results;
      this.getEmployeesById();
    });
    console.log(this.employees)
*/
 }
 /*
 getAllEmployees(): Observable<Employee[]> {
  return  this.httpClient.get("http://localhost:8085/company/employees/1").pipe(map((response) => response as Employee[]))
}*/
}
