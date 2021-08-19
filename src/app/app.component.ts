import { Component, OnInit } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  mediaSubscriber: any;
  deviceXs: any;

  constructor(public mediaObserver: MediaObserver){}

  ngOnInit() {
    this.mediaSubscriber = this.mediaObserver.asObservable().pipe(
      filter((changes: MediaChange[]) => changes.length > 0),
      map((changes: MediaChange[]) => changes[0]))
      .subscribe((change: MediaChange) => {
        this.deviceXs = change.mqAlias === 'xs' ? true: false;
      });
  }

}
