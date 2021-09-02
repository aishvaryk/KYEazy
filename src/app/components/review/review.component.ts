import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, Input, OnInit } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { Store } from '@ngrx/store';
import { Address } from 'src/app/models/address.model';

import { Breakpoint } from 'src/app/models/breakpoint.model';
import { Details } from 'src/app/models/details.model';
import { Documents } from 'src/app/models/documents.model';
import { Employee } from 'src/app/models/employee.model';
import { Liveliness } from 'src/app/models/liveliness.model';
import { Selfie } from 'src/app/models/selfie.model';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import {MatSnackBarModule,MatSnackBar} from '@angular/material/snack-bar';
import { LoginService } from 'src/app/services/Login/login.service';
import { toBase64String } from '@angular/compiler/src/output/source_map';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {
  employee: Employee
  address: Address
  @Input() stepper!:MatStepper;
  details:Details
  documents:Documents
  selfie:Selfie
  liveliness:Liveliness


  constructor(
    public snackbar:MatSnackBar,
    public loginService:LoginService,
    private employeeService :EmployeeService,
    public store: Store<{
      details: Details,
      documents: Documents,
      selfie: Selfie,
      liveliness: Liveliness,
    }>) {
      this.details ={} as Details,
      this.documents={} as Documents,
      this.selfie={} as Selfie,
      this.liveliness={} as Liveliness


    this.store.select('details').subscribe((details) => this.details=details);
    this.store.select('documents').subscribe((documents) => this.documents=documents);
    this.store.select('selfie').subscribe((selfie) => this.selfie=selfie);
    this.store.select('liveliness').subscribe((liveliness) =>this.liveliness=liveliness);
      this.employee={} as Employee;
      this.address ={} as Address;
  }

  ngOnInit(): void {
  }
  openSnackBar(message: string, action: string) {

    this.snackbar.open(message,action);
  }


addEmployee()
{
  let k=localStorage.getItem("Id");
  if(k!=null)
  {
  this.employee.employeeId=parseInt(k);
  }
  this.address.streetNumber=this.details.addressLine1;
  this.address.street=this.details.addressLine2;
  this.address.country=this.details.country;
  this.employee.firstName=this.details.firstName;
  this.employee.lastName=this.details.lastName;
  this.employee.contactNumber=this.details.contact;

  if(this.details.gender==="m"){
    this.employee.gender="Male";
  }
  if(this.details.gender==="f"){
    this.employee.gender="Female";
  }
  this.employee.emailID=this.details.email;
  this.employee.address=this.address;
  this.employee.documentNumber=this.documents.documentNumber;
  this.employee.documentType=this.documents.documentType;


  let id=parseInt(localStorage.getItem("Id")!);
    const documentData =  new FormData()
      documentData.append('employeeDocument',this.documents.document);
      this.employeeService.updateEmployeeDocument(id,documentData)



  this.employeeService.updateProfile(this.employee);
    const imageData =  new FormData()
      imageData.append('profilePicture',this.selfie.image);
  this.employeeService.updateEmployeeImage(id,imageData)
  const videoData =  new FormData()
  videoData.append('employeeVideo',this.liveliness.video);
this.employeeService.updateEmployeeVideo(id,videoData)



  this.openSnackBar("Sucessfully Submitted","Okay");
  this.loginService.logout();


}
}
