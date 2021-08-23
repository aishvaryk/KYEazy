import { Injectable } from '@angular/core';
import { ActionDTO } from 'src/app/models/action.model';
import { Employee } from 'src/app/models/employee.model';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  public employee: Employee;
  public updateStatus:ActionDTO;
  public actionDTOSubject:Subject<ActionDTO>;
  public employeeSubject:Subject<Employee>;

  constructor(private httpClient :HttpClient) {
    this.employee={} as Employee;
    this.updateStatus ={} as ActionDTO;
    this.actionDTOSubject=new Subject();
    this.employeeSubject=new Subject();
   }

   updateProfile(newEmployee:Employee): void{
    this.httpClient.patch<ActionDTO>(`http://localhost:8085/employee/update-profile`,newEmployee).pipe(map((response) => response as ActionDTO))
    .subscribe((results: ActionDTO) => {
     // this.employees=results;
        console.log(results);
        this.updateStatus=results;
        this.actionDTOSubject.next(results);

  });
  }

    viewProfile(employeeId:number,pageSize:number,pageNumber:number): void{
    this.httpClient.get(`http://localhost:8085/employee/view-profile/${employeeId}?pageSize=${pageSize}&pageNumber=${pageNumber}`).pipe(map((response) => response as Employee))
    .subscribe((results: Employee) => {
        console.log(results);
        this.employee=results;
        this.employeeSubject.next(this.employee);

  });}
}
