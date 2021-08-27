import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Color, NgxChartsModule } from '@swimlane/ngx-charts';
import { Company } from 'src/app/models/company.model';
import { Employee } from 'src/app/models/employee.model';
import { CompanyService } from 'src/app/services/company/company.service';
import { pieChartData } from 'src/app/models/pieChartData.model';
// import { ChartType, ChartOptions } from 'chart.js';
// import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';

@Component({
  selector: 'app-company-dashboard',
  templateUrl: './company-dashboard.component.html',
  styleUrls: ['./company-dashboard.component.scss']
})
export class CompanyDashboardComponent implements OnInit {
  // public companyService: CompanyService;
  // public employees:Employee[];
  // public company:Company;
  view: any = [800, 500];
  pieChartData:any;

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;

  colorScheme :any = {
    domain: ['#5AA454', '#A10A28', '#C7B42C']
  };

  constructor(companyService:CompanyService) {
    pieChartData[0].value=3;
      pieChartData[1].value=4;
      pieChartData[2].value=6;
    // this.companyService=companyService;
    // this.employees=[{}] as Employee[];
    // this.company={} as Company;
    // console.log(pieChartData);
    // this.companyService.getCompanyDetails(1);
    // this.companyService.companySubject.subscribe((company)=>{
    //   this.company=company;
    //   pieChartData[0].value=this.company.numberOfAcceptedEmployees;
    //   pieChartData[1].value=this.company.numberOfRejectedEmployees;
    //   pieChartData[2].value=this.company.numberOfPendingEmployees;


      // Object.assign(this, {pieChartData} );
    // }
    // );

    Object.assign(this, {pieChartData} );
    console.log(pieChartData);

  }

  onSelect(data:any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data:any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data:any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
  ngOnInit(): void {

  }

}
