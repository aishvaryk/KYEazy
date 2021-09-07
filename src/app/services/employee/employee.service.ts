import { Injectable } from '@angular/core';
import { ActionDTO } from 'src/app/models/action.model';
import { Employee } from 'src/app/models/employee.model';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginService } from '../login/login.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  public employee: Employee;
  public updateStatus: ActionDTO;
  public actionDTOSubject: Subject<ActionDTO>;
  public employeeSubject: Subject<Employee>;

  constructor(
    private loginService: LoginService,
    private httpClient: HttpClient
  ) {
    this.employee = {} as Employee;
    this.updateStatus = {} as ActionDTO;
    this.actionDTOSubject = new Subject();
    this.employeeSubject = new Subject();
  }

  login(credentials: any): any {
    return this.loginService.doLogin(credentials);
  }
  getEmployee(employeeId:number)
  {
    return this.httpClient
      .get<Employee>(
        `${environment.backendURL}/employee/${employeeId}`,
    )

  }

  updateProfile(newEmployee: Employee): void {
    this.httpClient
      .patch<ActionDTO>(
        `${environment.backendURL}/employee/update-profile`,
        newEmployee
      )
      .pipe(map((response) => response as ActionDTO))
      .subscribe((results: ActionDTO) => {
        this.updateStatus = results;
        this.actionDTOSubject.next(results);
      });

  }
  updateEmployeeStatus(newEmployee: Employee): void {
    this.httpClient
      .get<ActionDTO>(
        `${environment.backendURL}/employee/update-status/${newEmployee.employeeId}`,

      )
      .pipe(map((response) => response as ActionDTO))
      .subscribe((results: ActionDTO) => {
        this.updateStatus = results;
        this.actionDTOSubject.next(results);
      });
}
  updateEmployeeImage(id: number, image: FormData): void {
    this.httpClient
      .patch<ActionDTO>(
        `${environment.backendURL}/employee/update-captured-image/${id}`,
        image
      )
      .pipe(map((response) => response as ActionDTO))
      .subscribe((results: ActionDTO) => {
        this.updateStatus = results;
        this.actionDTOSubject.next(results);
      });
  }

  updateEmployeeVideo(id: number, video: FormData): void {
    this.httpClient
      .patch<ActionDTO>(
        `${environment.backendURL}/employee/update-video/${id}`,
        video
      )
      .pipe(map((response) => response as ActionDTO))
      .subscribe((results: ActionDTO) => {
        this.updateStatus = results;
        this.actionDTOSubject.next(results);
      });
  }

  updateEmployeeDocument(id: number, document: FormData): void {
    this.httpClient
      .patch<ActionDTO>(
        `${environment.backendURL}/employee/update-document/${id}`,
        document
      )
      .pipe(map((response) => response as ActionDTO))
      .subscribe((results: ActionDTO) => {
        this.updateStatus = results;
        this.actionDTOSubject.next(results);
      });
  }

  viewProfile(employeeId: number): void {
    this.httpClient
      .get(`${environment.backendURL}/employee/view-profile/${employeeId}`)
      .pipe(map((response) => response as Employee))
      .subscribe((results: Employee) => {
        this.employee = results;
        this.employeeSubject.next(this.employee);
      });
  }
}
