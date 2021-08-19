import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  firstName:string = '';
  lastName: string = '';
  isSubmitted: boolean = false;
  employeeForm: any;

  constructor() { }

  ngOnInit(): void {
    this.employeeForm = new FormGroup({
      'firstName': new FormControl(null, Validators.required),
      'lastName': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'contactNumber': new FormControl(null, [Validators.required])
    });
  }

  onSubmit() {
    console.log(this.employeeForm);
  }

  public errorHandling = (control: string, error: string) => {
    return this.employeeForm.controls[control].hasError(error);
  }

  getErrorMessage() {
    if (this.employeeForm.controls['email'].hasError('required')) {
      return 'You must enter a value';
    }

    return this.employeeForm.controls['email'].hasError('errors') ?  '' : 'Not a valid email';
  }

}
