import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Employee } from 'src/app/models/employee.model';
import { Subject } from 'rxjs';
import { Byte } from '@angular/compiler/src/util';
import { Company } from 'src/app/models/company.model';
import { LoginService } from '../Login/login.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminService {

  employees: Employee[];
  public employee: Employee;
  public employeeSubject:Subject<Employee>;
  public companies:Company[];
  public companiesSubject:Subject<Company[]>;
  public companySubject:Subject<Company[]>;
  public employeeVideoSubject:Subject<ArrayBuffer>;
  employeesSubject:Subject<Employee[]>

    constructor(private httpClient:HttpClient,private loginService: LoginService ) {

    this.employees=[]
    this.employeesSubject=new Subject();
    this.employee={ } as Employee;
    this.employeeSubject=new Subject();
    this.companies=[]
    this.companiesSubject=new Subject();
    this.companySubject=new Subject();
    this.employeeVideoSubject=new Subject();
  }
  login(credentials:any):any
  {

    console.log("Company")
    return this.loginService.doLogin(credentials);

  }
  viewAllApplications(pageSize: number, pageNumber: number): void {
    this.httpClient
      .get(
        `${environment.backendURL}/admin/view-all-applications?pageSize=${pageSize}&pageNumber=${pageNumber}`
      )
      .pipe(map((response) => response as Employee[]))
      .subscribe((results: Employee[]) => {
        this.employees = results;
        this.employeesSubject.next(this.employees);
      });
  }



getEmployeeVideo(username:string)
{
  this.httpClient.get(`http://localhost:8085/admin/get-video/${username}`,{responseType:"arraybuffer"})
  .subscribe((results:any)=>
  {

    //let blob = new Blob([data], { type: type});
    //let url = window.URL.createObjectURL(blob);
    console.log(results);
    this.employeeVideoSubject.next(results)
  })
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
  })}
  getAllEmployeeByName(name: string, pageSize: number, pageNumber: number): void {
    // in url do I have to provide pagesize and page number
    this.httpClient
      .get(
        `http://localhost:8085/admin/get-all-employees-by-name/${name}?pageSize=${pageSize}&pageNumber=${pageNumber}`
      )
      .pipe(map((response) => response as Employee[]))
      .subscribe((results: Employee[]) => {
        console.log(results);
        this.employees = results;
        this.employeesSubject.next(results);
      });
  }

  getAllCompanyByName(
    name: string,
    pageSize: number,
    pageNumber: number
  ): void {
    this.httpClient
      .get(
        `http://localhost:8085/admin/companies-by-name/${name}?pageSize=${pageSize}&pageNumber=${pageNumber}`
      )
        .pipe(map((response) => response as Company[]))
        .subscribe((results: Company[]) => {
          this.companies = results;
          this.companiesSubject.next(this.companies);
        });
  }

  getAllEmployeesSortedByName(pageSize: number, pageNumber: number): void {
    this.httpClient
      .get(
        `http://localhost:8085/admin/get-all-employees-sorted-by-name/?pageSize=${pageSize}&pageNumber=${pageNumber}`
      )
      .pipe(map((response) => response as Employee[]))
      .subscribe((results: Employee[]) => {
        console.log(results);
        this.employees = results;
        this.employeesSubject.next(this.employees);
      });
  }

  getAllEmployeesSortedByDate(pageSize: number, pageNumber: number): void {
    this.httpClient
      .get(
        `http://localhost:8085/admin/get-all-employees-sorted-by-date/?pageSize=${pageSize}&pageNumber=${pageNumber}`
      )
      .pipe(map((response) => response as Employee[]))
      .subscribe((results: Employee[]) => {
        console.log(results);
        this.employees = results;
        this.employeesSubject.next(this.employees);
      });
  }

  viewPendingApplications(pageSize: number, pageNumber: number): void {
    this.httpClient
      .get(
        `http://localhost:8085/admin/view-pending-applications?pageSize=${pageSize}&pageNumber=${pageNumber}`
      )
      .pipe(map((response) => response as Employee[]))
      .subscribe((results: Employee[]) => {
        this.employees = results;
        this.employeesSubject.next(this.employees);
      });
  }

  getCompanies(pageSize: number, pageNumber: number): void {
    this.httpClient
      .get(
        `http://localhost:8085/admin/companies?pageSize=${pageSize}&pageNumber=${pageNumber}`
      )
      .pipe(map((response) => response as Company[]))
      .subscribe((results: Company[]) => {
        this.companies = results;
        this.companiesSubject.next(this.companies);
      });
    }
}
