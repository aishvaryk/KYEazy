import { Component, OnDestroy, OnInit } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Breakpoint } from './models/breakpoint.model';
import { update } from './redux/actions/breakpoint.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  mediaSubscriber: any;

  constructor(
    public mediaObserver: MediaObserver,
    public store: Store<{ breakpoint: Breakpoint }>
  ) { }

  ngOnInit() {
    this.mediaSubscriber = this.mediaObserver.asObservable().pipe(
      filter((changes: MediaChange[]) => changes.length > 0),
      map((changes: MediaChange[]) => changes[0]))
      .subscribe((change: MediaChange) => {

        let breakpoint = {} as Breakpoint;

        if (change.mqAlias === 'xs') {
          breakpoint = {
            isXs: true,
            isSm: false,
            isMd: false,
            isLg: false,
            isXl: false,
          }
        }


        if (change.mqAlias === 'sm') {
          breakpoint = {
            isXs: false,
            isSm: true,
            isMd: false,
            isLg: false,
            isXl: false,
          }
        }

        if (change.mqAlias === 'md') {
          breakpoint = {
            isXs: false,
            isSm: false,
            isMd: true,
            isLg: false,
            isXl: false,
          }
        }

        if (change.mqAlias === 'lg') {
          breakpoint = {
            isXs: false,
            isSm: false,
            isMd: false,
            isLg: true,
            isXl: false,
          }
        }

        if (change.mqAlias === 'lg') {
          breakpoint = {
            isXs: false,
            isSm: false,
            isMd: false,
            isLg: false,
            isXl: true,
          }
        }

        this.store.dispatch(update(breakpoint));
      });
  }

  ngOnDestroy(): void {
    this.mediaSubscriber.unsubscribe();
  }

}

   /*this.companyService.register(this.newCompany);
   this.companyService.registeredCompany.subscribe((company)=>{
   this.companyResponse=company;
   console.log(this.companyResponse);
   })*/



