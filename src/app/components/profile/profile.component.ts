import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Address } from 'src/app/models/address.model';
import { Company } from 'src/app/models/company.model';
import { Details } from 'src/app/models/details.model';
import { Documents } from 'src/app/models/documents.model';
import { Employee } from 'src/app/models/employee.model';
import { Liveliness } from 'src/app/models/liveliness.model';
import { Selfie } from 'src/app/models/selfie.model';
import { AdminService } from 'src/app/services/admin/admin.service';
import { CompanyService } from 'src/app/services/company/company.service';
import { EmployeeService } from 'src/app/services/employee/employee.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public employee:Employee;
  public employeeService:EmployeeService;
  private employeeId:number;
  public address:Address;
  public company:Company;
  public companyService:CompanyService;
  public isReview:any;
  public adminService:AdminService;

  @ViewChild('toPlay')
  public toPlay: any;

  constructor(employeeService:EmployeeService,private activatedRoute:ActivatedRoute,companyService:CompanyService,public store: Store<{route: string,details: Details,
    documents: Documents,selfie: Selfie,liveliness: Liveliness,}>,adminService:AdminService) {
    this.employee={} as Employee;
    this.employeeService=employeeService;
    this.employeeId=0;
    this.address={} as Address;
    this.company={} as Company;
    this.companyService=companyService;
    this.adminService=adminService;
      this.store.select('route').subscribe((route)=> {
        if( route === "/employee/kyc") {
          this.isReview=true;
          console.log(this.isReview);
          this.store.select('details').subscribe((details) =>
          {
           console.log(details,"inside profile review");
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
          });
          this.store.select('documents').subscribe((documents) =>{
            this.employee.documentType=documents.documentType;
            this.employee.documentNumber=documents.documentNumber;
          });
          this.store.select('selfie').subscribe((selfie) => console.log(selfie));
          this.store.select('liveliness').subscribe((liveliness) => console.log(liveliness));
        }
        else {
          this.isReview=false;
        }
      })
   }
   AcceptEmployee(){
     this.adminService.verifyEmployeeDetails(this.employee.employeeId,"Accepted");
   }
   RejectEmployee(){
    this.adminService.verifyEmployeeDetails(this.employee.employeeId,"Rejected");
   }

  ngOnInit(): void {
    if(!this.isReview){
    this.activatedRoute.params.subscribe(
      (params) => {

        // console.log(params.employeeId);
        this.employeeId=params.employeeId;
      }

    );
    this.employeeService.viewProfile(this.employeeId);
    this.employeeService.employeeSubject.subscribe((employee)=>
    {
      this.employee=employee;
      this.address=this.employee.address;
      console.log(this.employee);
      console.log(this.address);
      console.log(this.employee.username);
      this.companyService.getCompanyDetails(this.employee.companyId);
      this.companyService.companySubject.subscribe((company)=>
      {
        this.company=company;
        console.log(company);
      }
      )
      this.adminService.getEmployeeVideo(this.employee.username);
    this.adminService.employeeVideoSubject.subscribe((video)=>{
      console.log(video)

   //  this.employee.employeeVideo=video;
      let blob = new Blob([video], { type:"video/mp4"});
        let url = window.URL.createObjectURL(blob);
        this.employee.employeeVideo=url;

        this.toPlay.nativeElement.src = url;

       // this.sanitizer.bypassSecurityTrustResourceUrl(url);


    })

    }
    );

  }
  }

  formatImage(img: any): any {

    if (img == null) {
      return null;
    }
    return 'data:image/jpeg;base64,' + img;
  }

}
