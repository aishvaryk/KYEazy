import { Component, OnInit } from '@angular/core';

import { MediaChange, MediaObserver } from '@angular/flex-layout';

import { filter, map } from 'rxjs/operators';

import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';

export interface paginator {
  length: number;
  currentPageIndex: number;
  currentPageSize: number;
  pageSizeOptions: Array<number>;
}

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
})
export class EmployeesComponent implements OnInit {
  emailFormControl = new FormControl('');
  private observable: any;
  public isSmall: boolean;
  public paginator: paginator;

  public filter: string;
  public sortBy: string;
  public search: string;

  verificationStatus: String;
  constructor(public observer: MediaObserver) {
    this.verificationStatus = 'verified';
    this.isSmall = false;
    this.paginator = {
      length: 100,
      currentPageSize: 10,
      pageSizeOptions: [5, 10, 25, 100],
      currentPageIndex: 0,
    };
    this.filter = '';
    this.sortBy = '';
    this.search = '';
  }

  ngOnInit(): void {
    this.observable = this.observer
      .asObservable()
      .pipe(
        filter((changes: MediaChange[]) => changes.length > 0),
        map((changes: MediaChange[]) => changes[0])
      )
      .subscribe((change: MediaChange) => {
        if (change.mqAlias === 'xs') {
          this.isSmall = true;
        } else {
          this.isSmall = false;
        }
      });
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
