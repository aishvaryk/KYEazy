import { Component, OnInit } from '@angular/core';

import { MediaChange, MediaObserver } from '@angular/flex-layout';

import { filter, map } from 'rxjs/operators';

import { Subscription } from 'rxjs';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  private observable: any;
  public isSmall: boolean;
  public sidenavOpen: boolean;
  verificationStatus:String;

  constructor(public observer: MediaObserver) {
    this.verificationStatus = "verified";
    this.sidenavOpen = true;
    this.isSmall = false;

   }

  ngOnInit(): void {
    this.observable = this.observer.asObservable().pipe(
      filter((changes: MediaChange[]) => changes.length > 0),
      map((changes: MediaChange[]) => changes[0])
    ).subscribe((change: MediaChange) => {
      if (change.mqAlias === 'xs'|| change.mqAlias === 'sm' ) {
        this.isSmall = true;
        this.sidenavOpen = false;
      } else {
        this.isSmall = false;
        this.sidenavOpen = true;
      }
    });
  }

}
