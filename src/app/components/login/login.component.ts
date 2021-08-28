import { ThisReceiver } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AdminService } from 'src/app/services/admin/admin.service';
import { CompanyService } from 'src/app/services/company/company.service';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { LoginService } from 'src/app/services/Login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginService:LoginService;
  @Input()
  public type: any;

  @Input()
  public dialog: any;
  public form;
  credentials={
    username:"",
    password:""
  }

  constructor(public store: Store<{loggedin: boolean}>, public router: Router,private companyService:CompanyService,private employeeService:EmployeeService,private adminService: AdminService,loginService:LoginService) {


    this.form = new FormGroup({
      username: new FormControl('', [
        Validators.required
      ]),
      password: new FormControl('', [
        Validators.required,
      ])
    });
    this.loginService=loginService;
  }

  ngOnInit(): void {

  }

  onSubmit(): void
  {
    this.credentials.username=this.form.value.username;
    this.credentials.password=this.form.value.password

    if(this.form.status === 'INVALID') return;

    if(this.type == "EMPLOYEE_LOGIN") {
      localStorage.setItem('userType',"EMPLOYEE")
      this.employeeService.login(this.credentials).subscribe(
        (response:any)=>{
         console.log(response.token)
         this.loginService.loginUser(response.token)
         this.router.navigate(['/employee/kyc'])
        },
        (error:any)=>{
          console.log(error)

        })
    }

    if(this.type == "COMPANY_LOGIN") {
      localStorage.setItem('userType',"COMPANY")
      this.companyService.login(this.credentials).subscribe(
        (response:any)=>{
         console.log(response.token)
         this.loginService.loginUser(response.token)
         this.router.navigate(['/company/dashboard'])
        },
        (error:any)=>{
          console.log(error)

        })
    }



    this.dialog.close();
  }


}
