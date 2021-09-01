import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Color, NgxChartsModule } from '@swimlane/ngx-charts';
import { Company } from 'src/app/models/company.model';
import { Employee } from 'src/app/models/employee.model';
import { CompanyService } from 'src/app/services/company/company.service';
import { pieChartData } from 'src/app/models/pieChartData.model';
import { Breakpoint } from 'src/app/models/breakpoint.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
// import { ChartType, ChartOptions } from 'chart.js';
// import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';

@Component({
  selector: 'app-company-dashboard',
  templateUrl: './company-dashboard.component.html',
  styleUrls: ['./company-dashboard.component.scss'],
})
export class CompanyDashboardComponent implements OnInit {
  public companyService: CompanyService;
  public employees: Employee[];
  public company: Company;
  public isSmall: any;
  public zeroEmployees: any;

  breakpoint$: Observable<Breakpoint>;
  chartView: any = [400, 300];
  legendView: any = [300, 300];
  pieChartData: any;

  // options
  gradient: boolean = true;
  showAdvanceLegend: boolean = true;

  showNormalLegend: boolean = false;
  showLabels: boolean = true;
  isDoughnut: boolean = false;

  legendPosition: any = 'below';
  colorScheme: any = {
    domain: ['slategrey', 'green', 'red', '#FC9A1D'],
  };

  constructor(
    public store: Store<{ breakpoint: Breakpoint }>,
    companyService: CompanyService
  ) {
    this.breakpoint$ = store.select('breakpoint');
    this.breakpoint$.subscribe((breakpoint) => {
      if (breakpoint.isXs) {
        this.isSmall = true;

        this.chartView = [340, 300];
      } else {
        this.isSmall = false;
        this.chartView = [400, 300];
      }
    });

    this.companyService = companyService;
    this.employees = [{}] as Employee[];
    this.company = {} as Company;
    console.log(pieChartData);
    this.companyService.getCompanyDetails(1);
    this.companyService.companySubject.subscribe((company) => {
      this.company = company;
      if (this.company.numberOfTotalEmployees === 0) {
        this.zeroEmployees = true;
      } else {
        this.zeroEmployees = false;
      }
      console.log(pieChartData,"pehle");
      console.log(this.company.numberOfTotalEmployees);
      pieChartData[0].value =
        this.company.numberOfTotalEmployees -
        this.company.numberOfAcceptedEmployees -
        this.company.numberOfRejectedEmployees -
        this.company.numberOfPendingEmployees;
      pieChartData[1].value = this.company.numberOfAcceptedEmployees;
      pieChartData[2].value = this.company.numberOfRejectedEmployees;
      pieChartData[3].value = this.company.numberOfPendingEmployees;
      console.log(pieChartData);
      Object.assign(this, { pieChartData });
    });
  }

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
  ngOnInit(): void {
    this.companyService.getEmployeesSortedByDate(1, 2, 1);
    this.companyService.employeesSubject.subscribe((employees) => {
      this.employees = employees;
      console.log(employees);
    });
  }
  formatImage(img: any): any {
    if (img == null) {
      return null;
    }
    return 'data:image/jpeg;base64,' + img;
  }
}
