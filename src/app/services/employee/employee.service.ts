import { Injectable } from '@angular/core';
import { ActionDTO } from 'src/app/models/action.model';
import { Employee } from 'src/app/models/employee.model';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginService } from '../Login/login.service';
import {MatSnackBarModule,MatSnackBar} from '@angular/material/snack-bar';
import { SnackbarComponent } from 'src/app/components/snackbar/snackbar.component';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  public employee: Employee;
  public updateStatus:ActionDTO;
  public actionDTOSubject:Subject<ActionDTO>;
  public employeeSubject:Subject<Employee>;

  constructor(private loginService: LoginService,private httpClient :HttpClient) {
    this.employee={} as Employee;
    this.updateStatus ={} as ActionDTO;
    this.actionDTOSubject=new Subject();
    this.employeeSubject=new Subject();
   }

   login(credentials:any):any
   {

     console.log("Company")
     return this.loginService.doLogin(credentials);

   }
   updateProfile(newEmployee:Employee): void{
    this.httpClient.patch<ActionDTO>(`${environment.backendURL}/employee/update-profile`,newEmployee).pipe(map((response) => response as ActionDTO))
    .subscribe((results: ActionDTO) => {
     // this.employees=results;
        console.log(results);
        this.updateStatus=results;
        this.actionDTOSubject.next(results);

  });
  }

    viewProfile(employeeId:number): void{
    this.httpClient.get(`${environment.backendURL}/employee/view-profile/${employeeId}`).pipe(map((response) => response as Employee))
    .subscribe((results: Employee) => {
        console.log(results);
        this.employee=results;
        this.employeeSubject.next(this.employee);

  });}
}
