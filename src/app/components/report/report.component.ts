import { Component, Input, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { CompanyService } from 'src/app/services/company/company.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  @Input() employeeId!:number;

  public form;
  public loading!:boolean;
  public reason!:string;


  constructor(public companyService:CompanyService) {
    this.form = new FormGroup({
      reason: new FormControl('', [Validators.required])
    });


  }

  ngOnInit(): void {
  }

  onSubmit(){
    alert("form submit")
    if (this.form.status==='INVALID') {
      return;
    }
    this.reason =this.form.value.reason;
    this.companyService.reportEmployee(this.reason, this.employeeId);
  }
}
