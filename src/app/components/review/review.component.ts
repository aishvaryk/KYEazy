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
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/services/login/login.service';
import { toBase64String } from '@angular/compiler/src/output/source_map';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
})
export class ReviewComponent implements OnInit {
  @Input() stepper!: MatStepper;
  public employee: Employee;
  public address: Address;
  public details: Details;
  public documents: Documents;
  public selfie: Selfie;
  public liveliness: Liveliness;

  public employeeLoading: any;
  public companyLoading: any;
  public videoLoading: any;
  public imageLoading: any;
  public documentLoading: any;

  constructor(
    public snackbar: MatSnackBar,
    public loginService: LoginService,
    private employeeService: EmployeeService,
    public store: Store<{
      details: Details;
      documents: Documents;
      selfie: Selfie;
      liveliness: Liveliness;
    }>
  ) {
    (this.details = {} as Details),
      (this.documents = {} as Documents),
      (this.selfie = {} as Selfie),
      (this.liveliness = {} as Liveliness);
    this.imageLoading = false;
    this.employeeLoading = false;
    this.videoLoading = false;
    this.companyLoading = false;
    this.documentLoading = false;
    this.employee = {} as Employee;
    this.address = {} as Address;
  }

  ngOnInit(): void {
    this.employeeLoading = true;
    this.store.select('details').subscribe((details) => {
      if (JSON.stringify(details) === '{}') return;
      this.details = details;
      this.employeeLoading = false;
    });

    this.documentLoading = true;
    this.store.select('documents').subscribe((documents) => {
      if (JSON.stringify(documents) === '{}') return;
      this.documents = documents;
      this.documentLoading = false;
    });

    this.imageLoading = true;
    this.store.select('selfie').subscribe((selfie) => {
      if (JSON.stringify(selfie) === '{}') return;
      this.selfie = selfie;
      this.imageLoading = false;
    });

    this.videoLoading = true;
    this.store.select('liveliness').subscribe((liveliness) => {
      if (JSON.stringify(liveliness) === '{}') return;
      this.liveliness = liveliness;
      this.videoLoading = false;
    });
  }

  submitKYC() {
    let k = localStorage.getItem('Id');
    if (k != null) {
      this.employee.employeeId = parseInt(k);
    }

    // Parsing Address
    this.address.streetNumber = this.details.addressLine1;
    this.address.street = this.details.addressLine2;
    this.address.country = this.details.country;
    this.employee.firstName = this.details.firstName;
    this.employee.lastName = this.details.lastName;
    this.employee.contactNumber = this.details.contact;

    if (this.details.gender === 'm') {
      this.employee.gender = 'Male';
    }
    if (this.details.gender === 'f') {
      this.employee.gender = 'Female';
    }

    this.employee.emailID = this.details.email;
    this.employee.address = this.address;
    this.employee.documentNumber = this.documents.documentNumber;
    this.employee.documentType = this.documents.documentType;

    let id = parseInt(localStorage.getItem('Id')!);
    const documentData = new FormData();
    documentData.append('employeeDocument', this.documents.document);
    this.employeeService.updateEmployeeDocument(id, documentData);
    this.employeeService.updateProfile(this.employee);

    const imageData = new FormData();
    imageData.append('profilePicture', this.selfie.image);
    this.employeeService.updateEmployeeImage(id, imageData);

    const videoData = new FormData();
    videoData.append('employeeVideo', this.liveliness.video);
    this.employeeService.updateEmployeeVideo(id, videoData);


    this.employeeService.updateEmployeeStatus(this.employee);

    this.snackbar.open('Sucessfully Submitted', 'Okay');
    this.loginService.logout();
  }
}
