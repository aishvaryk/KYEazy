import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Employee } from 'src/app/models/employee.model';
import { Subject } from 'rxjs';
import { Company } from 'src/app/models/company.model';
import { LoginService } from '../login/login.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  employees: Employee[];
  public employee: Employee;
  public employeeSubject: Subject<Employee>;
  public companies: Company[];
  public companiesSubject: Subject<Company[]>;
  public companySubject: Subject<Company[]>;
  public employeeVideoSubject: Subject<ArrayBuffer>;
  employeesSubject: Subject<Employee[]>;

  constructor(
    private httpClient: HttpClient,
    private loginService: LoginService
  ) {
    this.employees = [];
    this.employeesSubject = new Subject();
    this.employee = {} as Employee;
    this.employeeSubject = new Subject();
    this.companies = [];
    this.companiesSubject = new Subject();
    this.companySubject = new Subject();
    this.employeeVideoSubject = new Subject();
  }

  login(credentials: any): any {
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

  getEmployeeVideo(username: string) {
    this.httpClient
      .get(`${environment.backendURL}/admin/get-video/${username}`, {
        responseType: 'arraybuffer',
      })
      .subscribe((results: any) => {
        this.employeeVideoSubject.next(results);
      });
  }

  viewAcceptedApplications(pageSize: number, pageNumber: number): void {
    this.httpClient
      .get(
        `${environment.backendURL}/admin/view-accepted-applications?pageSize=${pageSize}&pageNumber=${pageNumber}`
      )
      .pipe(map((response) => response as Employee[]))
      .subscribe((results: Employee[]) => {
        this.employees = results;
        this.employeesSubject.next(this.employees);
      });
  }

  viewRejectedApplications(pageSize: number, pageNumber: number): void {
    this.httpClient
      .get(
        `${environment.backendURL}/admin/view-rejected-applications?pageSize=${pageSize}&pageNumber=${pageNumber}`
      )
      .pipe(map((response) => response as Employee[]))
      .subscribe((results: Employee[]) => {
        this.employees = results;
        this.employeesSubject.next(this.employees);
      });
  }

  viewEmployeeDetails(id: number): void {
    this.httpClient
      .get(`${environment.backendURL}/admin/view-employee-details/${id}`)
      .pipe(map((response) => response as Employee))
      .subscribe((results: Employee) => {
        this.employee = results;
        this.employeeSubject.next(this.employee);
      });
  }

  verifyEmployeeDetails(id: number, status: string): void {
    this.httpClient
      .get(`${environment.backendURL}/admin/verify/${id}/${status}`)
      .pipe(map((response) => response as Employee))
      .subscribe((results: Employee) => {
        this.employee = results;
        this.employeeSubject.next(this.employee);
      });
  }

  getAllEmployeeByName(
    name: string,
    pageSize: number,
    pageNumber: number
  ): void {
    this.httpClient
      .get(
        `${environment.backendURL}/admin/get-all-employees-by-name/${name}?pageSize=${pageSize}&pageNumber=${pageNumber}`
      )
      .pipe(map((response) => response as Employee[]))
      .subscribe((results: Employee[]) => {
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
        `${environment.backendURL}/admin/companies-by-name/${name}?pageSize=${pageSize}&pageNumber=${pageNumber}`
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
        `${environment.backendURL}/admin/get-all-employees-sorted-by-name/?pageSize=${pageSize}&pageNumber=${pageNumber}`
      )
      .pipe(map((response) => response as Employee[]))
      .subscribe((results: Employee[]) => {
        this.employees = results;
        this.employeesSubject.next(this.employees);
      });
  }

  getAllEmployeesSortedByDate(pageSize: number, pageNumber: number): void {
    this.httpClient
      .get(
        `${environment.backendURL}/admin/get-all-employees-sorted-by-date/?pageSize=${pageSize}&pageNumber=${pageNumber}`
      )
      .pipe(map((response) => response as Employee[]))
      .subscribe((results: Employee[]) => {
        this.employees = results;
        this.employeesSubject.next(this.employees);
      });
  }

  viewPendingApplications(pageSize: number, pageNumber: number): void {
    this.httpClient
      .get(
        `${environment.backendURL}/admin/view-pending-applications?pageSize=${pageSize}&pageNumber=${pageNumber}`
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
        `${environment.backendURL}/admin/companies?pageSize=${pageSize}&pageNumber=${pageNumber}`
      )
      .pipe(map((response) => response as Company[]))
      .subscribe((results: Company[]) => {
        this.companies = results;
        this.companiesSubject.next(this.companies);
      });
    }

    getAllEmployeesByStatus(
      status: string,
      pageSize: number,
      pageNumber: number
    ): void {
      this.httpClient
        .get(
          `${environment.backendURL}/admin/all-employees-by-status/${status}?pageSize=${pageSize}&pageNumber=${pageNumber}`
        )
        .pipe(map((response) => response as Employee[]))
        .subscribe((results: Employee[]) => {
          console.log(results);
          this.employees = results;
          this.employeesSubject.next(this.employees);
        });
    }

  getNoOfAcceptedEmployees(): any {
    return this.httpClient
      .get(`${environment.backendURL}/admin/get-number-of-accepted-employee`)
      .pipe(map((response) => response as number));
  }

  getTotalNoOfEmployees(): any {
    return this.httpClient
      .get(`${environment.backendURL}/admin/get-number-of-employee`)
      .pipe(map((response) => response as number));
  }

  getNoOfRejectedEmployees(): any {
    return this.httpClient
      .get(`${environment.backendURL}/admin/get-number-of-rejected-employee`)
      .pipe(map((response) => response as number));
  }
  getNoOfPendingEmployees(): any {
    return this.httpClient
      .get(`${environment.backendURL}/admin/get-number-of-pending-employee`)
      .pipe(map((response) => response as number));
  }
  getNoOfRegisteredEmployees(): any {
    return this.httpClient
      .get(`${environment.backendURL}/admin/get-number-of-registered-employee`)
      .pipe(map((response) => response as number));
  }
}
