import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Employee } from 'src/app/models/employee.model';
import { CompanyService } from 'src/app/services/company/company.service';

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
  newEmployee:Employee;
  companyService:CompanyService;
  form:any

  constructor(companyService:CompanyService) {
    this.newEmployee={} as Employee;
    this.companyService=companyService;
    this.form = new FormGroup({
      document: new FormControl('', [Validators.required])
    })
   }

  ngOnInit(): void {
    this.employeeForm = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      contactNumber: new FormControl(null, [Validators.required])
    });
  }

  onSubmit() {
    if(this.employeeForm.status === "INVALID") return;
    this.newEmployee.contactNumber=this.employeeForm.value.contactNumber;
    this.newEmployee.firstName=this.employeeForm.value.firstName;
    this.newEmployee.lastName=this.employeeForm.value.lastName;
    this.newEmployee.emailID=this.employeeForm.value.email;
    this.companyService.registerEmployee(this.newEmployee,1);
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
  onChange(event: any) {
    let file = event.target.files[0];
    this.form.patchValue({
      document: file,
    });
  }

  onSave() {
    if(this.form.status === "INVALID") {
      console.log('if m');
      return;
    }
    console.log(this.form.get('document').value);

     const formData =  new FormData()
formData.append('employeeCSV',this.form.get('document').value);

    this.companyService.registerEmployees(formData,1);

  }



}
