import { Component, OnInit } from '@angular/core';

import { MediaChange, MediaObserver } from '@angular/flex-layout';

import { filter, map } from 'rxjs/operators';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
  emailFormControl = new FormControl('');

  verificationStatus:String;
  private observable: any;
  public isSmall: boolean;
  public flexDirection: String;
  public fxLayoutAlign:String;
  public fxContainerLayoutAlign: String;

  constructor(public observer: MediaObserver) {
    this.verificationStatus = "verified";
    this.flexDirection = "row";
    this.isSmall = false;
    this.fxLayoutAlign = "space-between center";
    this.fxContainerLayoutAlign = "center";

   }

  ngOnInit(): void {
    this.observable = this.observer.asObservable().pipe(
      filter((changes: MediaChange[]) => changes.length > 0),
      map((changes: MediaChange[]) => changes[0])
    ).subscribe((change: MediaChange) => {
      if (change.mqAlias === 'xs') {
        this.isSmall = true;
        this.flexDirection = "column";
        this.fxLayoutAlign = "space-between start";

        this.fxContainerLayoutAlign = "space-around center";
      } else {
        this.isSmall = false;
        this.flexDirection = "row";

        this.fxContainerLayoutAlign = "center";
        this.fxLayoutAlign = "space-between center";
      }
    });
  }

  numSequence(n: number): Array<number> {
    return Array(n);
  }

  OnPageChange(event:any) {
    console.log(event);
  }

}
