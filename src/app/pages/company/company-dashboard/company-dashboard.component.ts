import { Component, OnInit } from '@angular/core';
// import { ChartType, ChartOptions } from 'chart.js';
// import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';

@Component({
  selector: 'app-company-dashboard',
  templateUrl: './company-dashboard.component.html',
  styleUrls: ['./company-dashboard.component.scss']
})
export class CompanyDashboardComponent implements OnInit {

  // public pieChartOptions: ChartOptions = {
  //   responsive: true,
  // };
  // public pieChartLabels: Label[] = [['Pending Employees'], ['Accepted Employees'], 'Rejected Employees'];
  // public pieChartData: SingleDataSet = [30, 50, 20];
  // public pieChartType: ChartType = 'pie';
  // public pieChartLegend = true;
  // public pieChartPlugins = [];

  constructor() {
    //monkeyPatchChartJsTooltip();
    //monkeyPatchChartJsLegend();
  }
  ngOnInit(): void {
  }

}
