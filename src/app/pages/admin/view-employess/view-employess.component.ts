import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Breakpoint } from './../../../models/breakpoint.model';
import { ActivatedRoute } from '@angular/router';

export interface paginator {
  length: number;
  currentPageIndex: number;
  currentPageSize: number;
  pageSizeOptions: Array<number>;
}

@Component({
  selector: 'app-view-employess',
  templateUrl: './view-employess.component.html',
  styleUrls: ['./view-employess.component.scss']
})
export class ViewEmployessComponent implements OnInit {

  emailFormControl = new FormControl('');
  private observable: any;
  public isSmall: boolean = false;
  public paginator: paginator;

  public filter: string;
  public sortBy: string;
  public search: string;

  verificationStatus: String;
  constructor(private activatedRoute : ActivatedRoute ,public store: Store<{ breakpoint: Breakpoint }>) {
    this.verificationStatus = 'verified';

    this.paginator = {
      length: 100,
      currentPageSize: 10,
      pageSizeOptions: [5, 10, 25, 100],
      currentPageIndex: 0,
    };
    this.filter = '';
    this.sortBy = '';
    this.search = '';
    this.store.select('breakpoint').subscribe((breakpoint: any) => {
      if (breakpoint.isXs || breakpoint.isSm) {
        this.isSmall = true;
      } else {
        this.isSmall = false;
      }
    })
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params) => {
        console.log(params.companyId);
      }
    );
  }

  numSequence(n: number): Array<number> {
    return Array(n);
  }

  OnPageChange(event: any) {
    this.paginator.currentPageIndex = event.pageIndex;
    this.paginator.currentPageSize = event.pageSize;
    console.log(this.paginator);
  }

  OnSortSelect(event: any) {
    console.log(event.value);
    this.sortBy = event.value;
  }

  OnFilterSelect(event: any) {
    console.log(event.value);
    this.filter = event.value;
  }

}
