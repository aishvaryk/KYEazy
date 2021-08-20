import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { EmployeeComponent } from './components/employee/employee.component';
import { ActionDTO } from './models/action.model';
import { Company } from './models/company.model';
import { Employee } from './models/employee.model';
import { AdminService } from './services/admin/admin.service';
import { CompanyService } from './services/company/company.service';
import { EmployeeService } from './services/employee/employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit{





  constructor(){


}
  ngOnInit(){


   /* this.companyService.register(this.newCompany);
    this.companyService.registeredCompany.subscribe((company)=>{
      this.companyResponse=company;
      console.log(this.companyResponse);
      })
  }*/

  }

  }


