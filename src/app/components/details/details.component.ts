import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Details } from 'src/app/models/details.model';
import { Employee } from 'src/app/models/employee.model';
import { setDetails } from 'src/app/redux/actions/details.action';
import { EmployeeService } from 'src/app/services/employee/employee.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  form: any;
  employee:Employee
  isReadOnly=false


  constructor(private employeeService:EmployeeService,public store: Store<{ details: Details }>) {
    this.employee={} as Employee;
    this.form=new FormGroup({
      firstName: new FormControl(null, Validators.required),
        lastName: new FormControl(null, Validators.required),
        gender: new FormControl(null, Validators.required),
        contact: new FormControl(null, Validators.required),
        email: new FormControl(null, [Validators.required, Validators.email]),
        addressLine1: new FormControl(null, Validators.required),
        addressLine2: new FormControl(null),
        city: new FormControl(null, Validators.required),
        state: new FormControl(null, Validators.required),
        country: new FormControl(null, Validators.required),

    });
  }

  ngOnInit(): void {

    this.employeeService.viewProfile(1);
    this.employeeService.employeeSubject.subscribe((employee)=>{
      console.log(employee.firstName)
      this.employee=employee;
      console.log(this.employee.firstName)
      this.form = new FormGroup({
        firstName: new FormControl({value:this.employee.firstName,disabled:true}, Validators.required),
        lastName: new FormControl({value:this.employee.lastName,disabled:true}, Validators.required),
        gender: new FormControl("m", Validators.required),
        contact: new FormControl({value:this.employee.contactNumber,disabled:true}, Validators.required),
        email: new FormControl({value:this.employee.employeeId,disabled:true}, [Validators.required, Validators.email]),
        addressLine1: new FormControl(null, Validators.required),
        addressLine2: new FormControl(null),
        city: new FormControl(null, Validators.required),
        state: new FormControl(null, Validators.required),
        country: new FormControl(null, Validators.required)

      });
      console.log(this.form)
      console.log(this.isReadOnly)
      this.isReadOnly=true;
      console.log(this.isReadOnly)
  })

  }

  onSave() {
    let details = {} as Details;
    details.firstName = this.form.getRawValue().firstName;
    details.lastName = this.form.getRawValue().lastName;
    details.gender = this.form.value.gender;
    details.addressLine1 = this.form.value.addressLine1;
    details.addressLine2 = this.form.value.addressLine2;
    details.city = this.form.value.city;
    details.contact = this.form.getRawValue().contact;
    details.state = this.form.value.state;
    details.country = this.form.value.country;
    details.email=this.form.getRawValue().email;
    this.store.dispatch(setDetails(details));
  }

}
