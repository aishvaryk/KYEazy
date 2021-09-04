import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { ActionDTO } from 'src/app/models/action.model';
import { Company } from 'src/app/models/company.model';
import { Employee } from 'src/app/models/employee.model';
import { exceptionDTO } from 'src/app/models/exceptionDTO.model';
import { LoginService } from '../login/login.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  public employees: Employee[];
  public employee: Employee;
  public company: Company;
  public employeesSubject: Subject<Employee[]>;
  public employeeSubject: Subject<Employee>;
  public companySubject: Subject<Company>;
  public actionDTOSubject: Subject<ActionDTO>;
  public registrationStatus: ActionDTO;
  public APIResponse: ActionDTO | exceptionDTO;

  constructor(
    private loginService: LoginService,
    private httpClient: HttpClient,
    public dialog: MatDialog
  ) {
    this.employees = [];
    this.registrationStatus = {} as ActionDTO;
    this.employee = {} as Employee;
    this.employeesSubject = new Subject();
    this.employeeSubject = new Subject();
    this.actionDTOSubject = new Subject();
    this.companySubject = new Subject();
    this.company = {} as Company;
    this.APIResponse = {} as ActionDTO | exceptionDTO;
  }

  login(credentials: any): any {
    return this.loginService.doLogin(credentials);
  }

  register(newCompany: Company): any {
    return this.httpClient
      .post<ActionDTO | exceptionDTO>(
        `${environment.backendURL}/company/register`,
        newCompany
      )
      .pipe(map((response) => response as Company | exceptionDTO));
  }

  getEmployees(id: number, pageSize: number, pageNumber: number): void {
    let token = this.loginService.getToken();
    this.httpClient
      .get(
        `${environment.backendURL}/company/employees/${id}?pageSize=${pageSize}&pageNumber=${pageNumber}`
      )
      .pipe(map((response) => response as Employee[]))
      .subscribe((results: Employee[]) => {
        this.employees = results;
        this.employeesSubject.next(this.employees);
      });
  }

  registerEmployee(newEmployee: Employee, companyId: number): any {
    return this.httpClient
      .post<ActionDTO | exceptionDTO>(
        `${environment.backendURL}/company/register-employee/${companyId}`,
        newEmployee
      )
      .pipe(map((response) => response as ActionDTO));
  }

  registerEmployees(newEmployee: FormData, companyId: number): void {
    this.httpClient
      .post<ActionDTO>(
        `${environment.backendURL}/company/register-employees/${companyId}`,
        newEmployee
      )
      .pipe(map((response) => response as ActionDTO))
      .subscribe((results: ActionDTO) => {
        this.registrationStatus = results;
        this.actionDTOSubject.next(results);
      });
  }

  getEmployeeByName(id: number, name: string,pageSize:number,pageNumber:number): void {
    this.httpClient
      .get(
        `${environment.backendURL}/company/get-employees-by-name/${id}/${name}?pageSize=${pageSize}&pageNumber=${pageNumber}`
      )
      .pipe(map((response) => response as Employee[]))
      .subscribe((results: Employee[]) => {
        this.employees = results;
        this.employeesSubject.next(results);
      });
    }

  getEmployeesByStatus(
    companyId: number,
    status: string,
    pageSize: number,
    pageNumber: number
  ): void {
    this.httpClient
      .get(
        `${environment.backendURL}/company/employees-by-status/${companyId}/${status}?pageSize=${pageSize}&pageNumber=${pageNumber}`
      )
      .pipe(map((response) => response as Employee[]))
      .subscribe((results: Employee[]) => {
        this.employees = results;
        this.employeesSubject.next(this.employees);
      });
  }

  getEmployeesSortedByName(
    id: number,
    pageSize: number,
    pageNumber: number
  ): void {
    this.httpClient
      .get(
        `${environment.backendURL}/company/get-employees-sorted-by-name/${id}?pageSize=${pageSize}&pageNumber=${pageNumber}`
      )
      .pipe(map((response) => response as Employee[]))
      .subscribe((results: Employee[]) => {
        this.employees = results;
        this.employeesSubject.next(this.employees);
      });
  }

  getEmployeesSortedByDate(
    id: number,
    pageSize: number,
    pageNumber: number
  ): void {
    this.httpClient
      .get(
        `${environment.backendURL}/company/get-employees-sorted-by-date/${id}?pageSize=${pageSize}&pageNumber=${pageNumber}`
      )
      .pipe(map((response) => response as Employee[]))
      .subscribe((results: Employee[]) => {
        this.employees = results;
        this.employeesSubject.next(this.employees);
      });
  }

  getCompanyDetails(id: number): void {
    this.httpClient
      .get(`${environment.backendURL}/company/get-company-details/${id}`)
      .pipe(map((response) => response as Company))
      .subscribe((results: Company) => {
        this.companySubject.next(results);
      });
  }

  uploadIcon(id:number, icon:FormData) {
    return this.httpClient.patch<ActionDTO>(`${environment.backendURL}/company/icon/{id}`,icon).pipe(map((response) => response as ActionDTO))
  }

  updateProfile(newCompany: Company): void {
    this.httpClient
      .patch<ActionDTO>(
        `${environment.backendURL}/company/update-profile`,
        newCompany
      )
      .pipe(map((response) => response as ActionDTO))
      .subscribe((results: ActionDTO) => {
        this.registrationStatus = results;
        this.actionDTOSubject.next(results);
      });
  }

  reportEmployee(message: string, employeeId: number): void {
    this.httpClient
      .post<Employee[]>(
        `${environment.backendURL}/company/report-employee/${employeeId}`,
        message
      )
      .pipe(map((response) => response as Employee[])).subscribe((employees: Employee[])=>
      {
        this.employees = employees;
        this.employeesSubject.next(this.employees);
      });
  }
}
