import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { barChartData } from 'src/app/models/barChartData.model';
import { Breakpoint } from 'src/app/models/breakpoint.model';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
})
export class BarChartComponent implements OnInit {

  barChartData!: any[];
  view: any = [900, 400];


  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = true;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Companies';
  showYAxisLabel: boolean = true;
  yAxisLabel: string = 'Employees';
  legendTitle: string = 'Status';
  showDataLabel:boolean = false;
  legendPosition:any="right";

  colorScheme:any = {
    domain: ['slategrey', 'green', 'red', '#FC9A1D'],
  };

  constructor( public store: Store<{ breakpoint: Breakpoint}>) {
    this.store.select('breakpoint').subscribe((change: Breakpoint) => {
      if (change.isXs) {
        this.legendPosition="below";
        this.view = [300,200];
        this.showYAxisLabel=false;
      } else if (change.isSm){
        this.view = [600,300];
        this.legendPosition="below";
        this.showYAxisLabel=true;
      }
      else if (change.isMd){
        this.view = [700,400];
        this.legendPosition="right";
        this.showYAxisLabel=true;
      }
      else {
        this.view = [900,400];
        this.legendPosition="right";
        this.showYAxisLabel=true;
      }
    });

    Object.assign(this, { barChartData });
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

  ngOnInit(): void {}
}
