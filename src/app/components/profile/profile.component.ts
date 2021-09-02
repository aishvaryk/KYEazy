import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
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
import { livelinessReducer } from 'src/app/redux/reducers/liveliness.reducer';
import { AdminService } from 'src/app/services/admin/admin.service';
import { CompanyService } from 'src/app/services/company/company.service';
import { EmployeeService } from 'src/app/services/employee/employee.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit,AfterViewInit {
  public employee:Employee;
  public employeeService:EmployeeService;
  private employeeId:number;
  public address:Address;
  public company:Company;
  public companyService:CompanyService;
  public isReview:any;
  public adminService:AdminService;
  public isAdminPage:boolean;
  public isPending:boolean;
  fileURL=""

  @Input() stepper!:MatStepper;
  @ViewChild('toImage')
  public toImage:any
  @ViewChild('toPlay')
  public toPlay: any;
  employeeImage: any

ngAfterViewInit()
{
  this.store.select('liveliness').subscribe((liveliness) =>{
    if(!liveliness.video) return;
     let blob = new Blob([liveliness.video], { type:"video/mp4"});
      let url = window.URL.createObjectURL(blob);
      this.toPlay.nativeElement.src = url;
    });

    this.store.select('selfie').subscribe((selfie)=>{
      if(!selfie.image) return;
      let blob = new Blob([selfie.image], { type:"image/png"});
      let url = window.URL.createObjectURL(blob);
        this.toImage.nativeElement.src=url
    });
}

  constructor(employeeService:EmployeeService,
    private activatedRoute:ActivatedRoute,
    companyService:CompanyService,
    public store: Store<{route: string,details: Details,
    documents: Documents,selfie: Selfie,liveliness: Liveliness}>,adminService:AdminService) {

      this.employee={} as Employee;
    this.employeeService=employeeService;
    this.employeeId=0;
    this.isAdminPage=false;
    this.isPending=false;

    this.address={} as Address;
    this.company={} as Company;
    this.companyService=companyService;
    this.adminService=adminService;

      this.store.select('route').subscribe((route)=> {
        if( route === "/employee/kyc") {
          this.isReview=true;
          this.store.select('details').subscribe((details) =>
          {
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
            var file = new Blob([documents.document], {type: 'application/pdf'});
            var fileURL = URL.createObjectURL(file);
            this.fileURL=fileURL;
          });
        }
        else if(route.substring(1,4) ==='adm'){
        this.isAdminPage=true;
        }
        else {
          this.isReview=false;
        }
      })

      this.adminService.employeeSubject.subscribe((employee)=>
      {
        this.employee=employee;
        this.address=this.employee.address;
        if(this.employee.status==="Pending")
        {
          this.isPending=true;
        }
        else{
          this.isPending=false;
        }
        this.companyService.getCompanyDetails(this.employee.companyId);
        this.companyService.companySubject.subscribe((company)=>
        {
          this.company=company;
        }
        )
      }
      );
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
        this.employeeId=params.employeeId;
      }
    );

    this.adminService.viewEmployeeDetails(this.employeeId);

    this.adminService.employeeSubject.subscribe((employee)=>
    {
      this.employee=employee;
      this.address=this.employee.address;
      this.companyService.getCompanyDetails(this.employee.companyId);
      this.adminService.getEmployeeVideo(this.employee.username);
    }
    );

    this.companyService.companySubject.subscribe((company)=>
    {
      this.company=company;
    }
    )

    this.adminService.employeeVideoSubject.subscribe((video: any)=>{
      let blob = new Blob([video], { type:"video/mp4"});
      let url = window.URL.createObjectURL(blob);
      this.employee.employeeVideo=url;
      this.toPlay.nativeElement.src = url;
  })


  }
  }

  formatImage(img: any): any {

    if (img == null) {
      return null;
    }
    return 'data:image/jpeg;base64,' + img;
  }

  viewDocument(){
    window.open(this.fileURL);
  }

  }
