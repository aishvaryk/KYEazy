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
import { LoginService } from 'src/app/services/login/login.service';
import { ModalComponent } from '../modal/modal.component';
import {MatSnackBarModule,MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginService:LoginService;
  durationInSeconds=5;
  @Input()
  public type: any;

  @Input()
  public dialog: any;
  public form;
  credentials={
    username:"",
    password:"",
    role:""
  }

  constructor(public snackbar:MatSnackBar,public store: Store<{loggedin: boolean}>, public router: Router,private companyService:CompanyService,private employeeService:EmployeeService,private adminService: AdminService,loginService:LoginService,public errorDialog:MatDialog) {


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
  openSnackBar(message: string, action: string) {
    this.snackbar.open(message,action);
  }
  onSubmit(): void
  {
    this.credentials.username=this.form.value.username;
    this.credentials.password=this.form.value.password

    if(this.form.status === 'INVALID') return;


    if(this.type == "EMPLOYEE_LOGIN") {
      this.credentials.role="EMPLOYEE";
      localStorage.setItem('userType',"EMPLOYEE")
      this.employeeService.login(this.credentials).subscribe(
        (response:any)=>{
         this.loginService.loginUser(response.token,response.id)
         this.router.navigate(['/employee/kyc'])
        },
        (error:any)=>{
          this.openSnackBar("Invalid Employee Credentials","Retry");
        })
    }

    if(this.type == "ADMIN_LOGIN") {
      this.credentials.role="ADMIN";
      localStorage.setItem('userType',"ADMIN")
      this.adminService.login(this.credentials).subscribe(
        (response:any)=>{
         this.loginService.loginUser(response.token,"")
         this.router.navigate(['/admin/dashboard'])
        },
        (error:any)=>{
          this.errorDialog.open(ModalComponent,{
            data: {
              type: "INFORMATION_PROMPTS",
            },
          });

        })
    }


    if(this.type == "COMPANY_LOGIN") {
      this.credentials.role="COMPANY";
      localStorage.setItem('userType',"COMPANY")

      this.companyService.login(this.credentials).subscribe(
        (response:any)=>{
         this.loginService.loginUser(response.token,response.id)
         this.router.navigate(['/company/dashboard'])
        },
        (error:any)=>{
          this.openSnackBar("Invalid Company Credentials","Retry");
        })
    }

    this.dialog.close();
  }
}
