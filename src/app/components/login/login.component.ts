import { ThisReceiver } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Input()
  public type: any;

  @Input()
  public dialog: any;
  public form;

  constructor(public store: Store<{loggedin: boolean}>) {

    this.form = new FormGroup({
      username: new FormControl('', [
        Validators.required
      ]),
      password: new FormControl('', [
        Validators.required,
      ])
    });
  }

  ngOnInit(): void {

  }

  onSubmit(): void
  {
    if(this.form.status === 'INVALID') return;

    if(this.type == "EMPLOYEE_LOGIN") {
      localStorage.setItem('userType',"EMPLOYEE")
    }

    if(this.type = "COMPANY_LOGIN") {
      localStorage.setItem('userType',"COMPANY")
    }

    this.dialog.close();
  }


}
