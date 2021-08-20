import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeComponent } from './components/employee/employee.component';
import { Employee } from './models/employee.model';
import { AdminService } from './services/admin/admin.service';
import { CompanyService } from './services/company/company.service';
import { EmployeeService } from './services/employee/employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit{

  employees:Employee[]
  //companyObservable: Observable<Employee>;
  companyService: CompanyService;
  adminService: AdminService;
  employeeService :EmployeeService;

  constructor(companyService:CompanyService,employeeService:EmployeeService,adminService:AdminService){

    this.companyService=companyService;
    this.employeeService=employeeService;
    this.adminService=adminService;
    this.employees=[];

}
  ngOnInit(){


    this.companyService.getEmployees();
    this.companyService.employeesChanged.subscribe((employees)=>{
    this.employees=employees;
  })
  console.log(this.employees);
  /*
  this.companyService.getAllEmployees().subscribe((employees:Employee[])=>{
    console.log(employees);
  })*/


  }


}
