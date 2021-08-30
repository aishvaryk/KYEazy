import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Employee } from 'src/app/models/employee.model';
import { AdminService } from 'src/app/services/admin/admin.service';
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

  @ViewChild('toPlay')
  public toPlay: any;

  constructor(employeeService:EmployeeService,private sanitizer: DomSanitizer,private adminService:AdminService,private activatedRoute:ActivatedRoute) {
    this.employee={} as Employee;
    this.employeeService=employeeService;
    this.employeeId=0;
   }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params) => {

        console.log(params.employeeId);
        this.employeeId=params.employeeId;
      }

    );
    this.employeeService.viewProfile(this.employeeId);
    this.employeeService.employeeSubject.subscribe((employee)=>
    {
      this.employee=employee;
      console.log(this.employee);
    }
    );
    this.adminService.getEmployeeVideo();
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

}
