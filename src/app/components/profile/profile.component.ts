import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/services/employee/employee.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public employee:Employee;
  public employeeService:EmployeeService;
  private employeeId:number;

  constructor(employeeService:EmployeeService,private activatedRoute:ActivatedRoute) {
    this.employee={} as Employee;
    this.employeeService=employeeService;
    this.employeeId=0;
   }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params) => {

        console.log(params.employeeId);
        this.employeeId=params.employeeId;
      }

    );
    this.employeeService.viewProfile(this.employeeId);
    this.employeeService.employeeSubject.subscribe((employee)=>
    {
      this.employee=employee;
      console.log(this.employee);
    }
    );
  }

}
