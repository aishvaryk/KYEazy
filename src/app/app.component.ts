import { Component, OnInit } from '@angular/core';
import { CompanyService } from './services/company/company.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  response:any
  companyService: CompanyService
  constructor(companyService:CompanyService)
  {
    this.companyService=companyService;

  }
  ngOnInit()
  {
    this.response=this.companyService.getCompanies();

  }


}
