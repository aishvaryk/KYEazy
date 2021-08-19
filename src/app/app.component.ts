import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from './models/employee.model';
import { CompanyService } from './services/company/company.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  response: Observable<Employee[]>
  companyService: CompanyService
  constructor(companyService:CompanyService)
  {
    console.log("sadasdjpoq");
    this.companyService=companyService;
    this.response=this.companyService.getCompanies();
    this.response.subscribe((results: Employee[]) => { console.log("inside console"+results); });

  }
  ngOnInit()
  {

  }


}
