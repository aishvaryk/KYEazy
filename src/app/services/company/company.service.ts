import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Action } from 'rxjs/internal/scheduler/Action';
import { map } from 'rxjs/operators';

import { ActionDTO } from 'src/app/models/action.model';
import { Company } from 'src/app/models/company.model';
import { Employee } from 'src/app/models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  public employees: Employee[];
  public employee: Employee;
  public company:Company;
  public employeesSubject:Subject<Employee[]>;
  public employeeSubject:Subject<Employee>;
  public companySubject:Subject<Company>;
  public actionDTOSubject:Subject<ActionDTO>;
  public registrationStatus:ActionDTO;

  constructor(private httpClient :HttpClient) {
    //this.employees
    this.employees=[];
    this.registrationStatus={} as ActionDTO;
    this.employee={ } as Employee;
    this.employeesSubject=new Subject();
    this.employeeSubject=new Subject();
    this.actionDTOSubject=new Subject();
    this.companySubject=new Subject();
    this.company={ } as Company;

  }

  register(newCompany:Company): void{
    this.httpClient.post<ActionDTO>(`http://localhost:8085/company/register`,newCompany).pipe(map((response) => response as ActionDTO))
    .subscribe((results: ActionDTO) => {
     // this.employees=results;
        console.log(results);
        this.registrationStatus=results;
        this.actionDTOSubject.next(results);

  });
}

  getEmployees(id:number,pageSize:number,pageNumber:number): void{
    this.httpClient.get(`http://localhost:8085/company/employees/${id}?pageSize=${pageSize}&pageNumber=${pageNumber}`).pipe(map((response) => response as Employee[]))
    .subscribe((results: Employee[]) => {
     // this.employees=results;
        console.log(results);
        this.employees=results;
        this.employeesSubject.next(this.employees);

});}

registerEmployee(newEmployee:Employee,companyId:number): void{
  this.httpClient.post<ActionDTO>(`http://localhost:8085/company/register-employee/${companyId}`,newEmployee).pipe(map((response) => response as ActionDTO))
  .subscribe((results: ActionDTO) => {
      console.log(results);
      this.registrationStatus=results;
      this.actionDTOSubject.next(results);

});
}

getEmployeeByName(id:number,name:string): void{
  this.httpClient.get(`http://localhost:8085/company/get-employees-by-name/${id}/${name}`).pipe(map((response) => response as Employee))
  .subscribe((results: Employee) => {
      console.log(results);
      this.employee=results;
      this.employeeSubject.next(results);

});}

getEmployeesWithPendingKYC(id:number,pageSize:number,pageNumber:number): void{
  this.httpClient.get(`http://localhost:8085/company/get-employees-with-pending-kyc/${id}?pageSize=${pageSize}&pageNumber=${pageNumber}`).pipe(map((response) => response as Employee[]))
  .subscribe((results: Employee[]) => {
      console.log(results);
      this.employees=results;
      this.employeesSubject.next(this.employees);

});}

getRegisteredEmployees(id:number,pageSize:number,pageNumber:number): void{
  this.httpClient.get(`http://localhost:8085/company/get-registered-employee/${id}?pageSize=${pageSize}&pageNumber=${pageNumber}`).pipe(map((response) => response as Employee[]))
  .subscribe((results: Employee[]) => {
      console.log(results);
      this.employees=results;
      this.employeesSubject.next(this.employees);

});}

getEmployeesWithRejectedKYC(id:number,pageSize:number,pageNumber:number): void{
  this.httpClient.get(`http://localhost:8085/company/get-employees-with-rejected-kyc/${id}?pageSize=${pageSize}&pageNumber=${pageNumber}`).pipe(map((response) => response as Employee[]))
  .subscribe((results: Employee[]) => {
      console.log(results);
      this.employees=results;
      this.employeesSubject.next(this.employees);

});}

getEmployeesByDateOfApplication(date:string,pageSize:number,pageNumber:number): void{
  this.httpClient.get(`http://localhost:8085/company/get-employees-by-date-of-application/${date}?pageSize=${pageSize}&pageNumber=${pageNumber}`).pipe(map((response) => response as Employee[]))
  .subscribe((results: Employee[]) => {
      console.log(results);
      this.employees=results;
      this.employeesSubject.next(this.employees);

});}

getEmployeesByStatus(companyId:number,status:string,pageSize:number,pageNumber:number): void{
  this.httpClient.get(`http://localhost:8085/company/employees-by-status/${companyId}/${status}?pageSize=${pageSize}&pageNumber=${pageNumber}`).pipe(map((response) => response as Employee[]))
  .subscribe((results: Employee[]) => {
      console.log(results);
      this.employees=results;
      this.employeesSubject.next(this.employees);

});}

getEmployeesSortedByName(pageSize:number,pageNumber:number): void{
  this.httpClient.get(`http://localhost:8085/company/get-employees-sorted-by-name?pageSize=${pageSize}&pageNumber=${pageNumber}`).pipe(map((response) => response as Employee[]))
  .subscribe((results: Employee[]) => {
      console.log(results);
      this.employees=results;
      this.employeesSubject.next(this.employees);

});}

getCompanyDetails(id:number): void{
  this.httpClient.get(`http://localhost:8085/company/get-company-details/${id}`).pipe(map((response) => response as Company))
  .subscribe((results: Company) => {
      console.log(results);
      this.companySubject.next(results);

});}

updateProfile(newCompany:Company): void{
  this.httpClient.patch<ActionDTO>(`http://localhost:8085/company/update-profile`,newCompany).pipe(map((response) => response as ActionDTO))
  .subscribe((results: ActionDTO) => {
   // this.employees=results;
      console.log(results);
      this.registrationStatus=results;
      this.actionDTOSubject.next(results);

});
}



   /*
    this.httpClient.get("http://localhost:8085/company/employees/1").pipe(map((response) => response as Employee[]))
    .subscribe((results: Employee[]) => {
      this.employees=results;
      this.getEmployeesById();
    });
    console.log(this.employees)
*/

 /*
 getAllEmployees(): Observable<Employee[]> {
  return  this.httpClient.get("http://localhost:8085/company/employees/1").pipe(map((response) => response as Employee[]))
}*/
}
