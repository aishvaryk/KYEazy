import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Address } from 'src/app/models/address.model';

import { Breakpoint } from 'src/app/models/breakpoint.model';
import { Details } from 'src/app/models/details.model';
import { Documents } from 'src/app/models/documents.model';
import { Employee } from 'src/app/models/employee.model';
import { Liveliness } from 'src/app/models/liveliness.model';
import { Selfie } from 'src/app/models/selfie.model';
import { EmployeeService } from 'src/app/services/employee/employee.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {
  employee: Employee
  address: Address

  constructor(
    private employeeService :EmployeeService,
    public store: Store<{
      details: Details,
      documents: Documents,
      selfie: Selfie,
      liveliness: Liveliness,
    }>) {
    this.store.select('details').subscribe((details) => console.log(details));
    this.store.select('documents').subscribe((documents) => console.log(documents));
    this.store.select('selfie').subscribe((selfie) => console.log(selfie));
    this.store.select('liveliness').subscribe((liveliness) => console.log(liveliness));
      this.employee={} as Employee;
      this.address ={} as Address;
  }

  ngOnInit(): void {
  }
addEmployee()
{
  console.log("adddddd")
  this.store.select('details').subscribe((details) =>{
  this.employee.employeeId=1;
  this.address.streetNumber=details.addressLine1;
  this.address.street=details.addressLine2;
  this.address.country=details.country;
  this.employee.firstName=details.firstName;
  this.employee.lastName=details.lastName;
  this.employee.contactNumber=details.contact;
  if(details.gender==="m"){
    this.employee.gender="Male";
  }
  if(details.gender==="f"){
    this.employee.gender="Female";
  }
  this.employee.emailID=details.email;
  this.employee.address=this.address;

  this.employeeService.updateProfile(this.employee);
});
}
}
