import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Employee } from 'src/app/models/employee.model';
import { Subject } from 'rxjs';
import { Company } from 'src/app/models/company.model';
import { LoginService } from '../login/login.service';
import { environment } from 'src/environments/environment';
import { CompanyService } from '../company/company.service';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  public employees: Employee[];
  public employee: Employee;
  public companies: Company[];
  public employeeSubject: Subject<Employee>;
  public companiesSubject: Subject<Company[]>;
  public companySubject: Subject<Company[]>;
  public employeeVideoSubject: Subject<ArrayBuffer>;
  public employeesSubject: Subject<Employee[]>;
  public statusSubject: Subject<string>;

  constructor(
    private httpClient: HttpClient,
    private companyService: CompanyService,
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
    this.statusSubject = new Subject();
  }

  login(credentials: any): any {
    return this.loginService.doLogin(credentials);
  }

  viewAllApplications(
    pageSize: number,
    pageNumber: number,
    sort: string,
    filter: string
  ): void {
    this.httpClient
      .get(
        `${environment.backendURL}/admin/view-all-applications?pageSize=${pageSize}&pageNumber=${pageNumber}&sort=${sort}&filter=${filter}`
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

  getEmployeeVideo(username: string) {
    this.httpClient
      .get(`${environment.backendURL}/admin/get-video/${username}`, {
        responseType: 'arraybuffer',
      })
      .subscribe((results: any) => {
        this.employeeVideoSubject.next(results);
      });
  }

  getEmployeeDocument(username: string) {
    this.httpClient
      .get(`${environment.backendURL}/admin/get-document/${username}`, {
        responseType: 'arraybuffer',
      })
      .subscribe((results: any) => {
        this.employeeVideoSubject.next(results);
      });
  }

  acceptEmployee(id: number): void {
    this.httpClient
      .get(`${environment.backendURL}/admin/accept/${id}`)
      .pipe(map((response) => response as Employee))
      .subscribe((results: Employee) => {
        this.statusSubject.next('Accepted');
        this.companyService.getCompanyDetails(results.companyId);
      });
  }
  rejectEmployee(reason: string, employeeId: number): any {
    return this.httpClient
      .patch(`${environment.backendURL}/admin/reject/${employeeId}`, reason)
      .subscribe((results: any) => {
        this.statusSubject.next('Rejected');
        this.companyService.getCompanyDetails(results.companyId);
      });
  }
  getAllEmployeesByName(
    name: string,
    pageSize: number,
    pageNumber: number,
    sort: string,
    filter: string
  ): void {
    this.httpClient
      .get(
        `${environment.backendURL}/admin/get-all-employees-by-name/${name}?pageSize=${pageSize}&pageNumber=${pageNumber}&sort=${sort}&filter=${filter}`
      )
      .pipe(map((response) => response as Employee[]))
      .subscribe((results: Employee[]) => {
        this.employees = results;
        this.employeesSubject.next(results);
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

  getAllCompaniesByName(
    name: string,
    pageSize: number,
    pageNumber: number
  ): void {
    this.httpClient
      .get(
        `${environment.backendURL}/admin/get-all-companies-by-name/${name}?pageSize=${pageSize}&pageNumber=${pageNumber}`
      )
      .pipe(map((response) => response as Company[]))
      .subscribe((results: Company[]) => {
        this.companies = results;
        this.companiesSubject.next(this.companies);
      });
  }

  getSearchedCompaniesSize(name: string) {
    return this.httpClient.get(
      `${environment.backendURL}/admin/get-searched-companies-size/${name}`
    );
  }

  getCompaniesSize() {
    return this.httpClient.get(
      `${environment.backendURL}/admin/get-total-number-of-companies`
    );
  }

  getEmployeesSize(status: string) {
    return this.httpClient.get(
      `${environment.backendURL}/admin/get-employees-size/${status}`
    );
  }

  getSearchedEmployeesSize(name: string, status: string) {
    return this.httpClient.get(
      `${environment.backendURL}/admin/get-searched-employees/${name}/${status}`
    );
  }

  getNoOfEmployees(): any {
    return this.httpClient
      .get(`${environment.backendURL}/admin/get-number-of-employees`)
      .pipe(map((response) => response as number));
  }

  getNoOfAcceptedEmployees(): any {
    return this.httpClient
      .get(`${environment.backendURL}/admin/get-number-of-accepted-employees`)
      .pipe(map((response) => response as number));
  }

  getNoOfRejectedEmployees(): any {
    return this.httpClient
      .get(`${environment.backendURL}/admin/get-number-of-rejected-employees`)
      .pipe(map((response) => response as number));
  }

  getNoOfPendingEmployees(): any {
    return this.httpClient
      .get(`${environment.backendURL}/admin/get-number-of-pending-employees`)
      .pipe(map((response) => response as number));
  }

  getNoOfRegisteredEmployees(): any {
    return this.httpClient
      .get(`${environment.backendURL}/admin/get-number-of-registered-employees`)
      .pipe(map((response) => response as number));
  }

  getTopPerformer(): any {
    return this.httpClient
      .get(`${environment.backendURL}/admin/get-top-performer`)
      .pipe(map((response) => response as Company[]));
  }
}
