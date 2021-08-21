import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Breakpoint } from 'src/app/models/breakpoint.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  deviceXs: any;

  isHamOpen: boolean =  false;

  breakpoint$: Observable<Breakpoint>;

  constructor(public store: Store<{breakpoint: Breakpoint}>) {
    this.breakpoint$ = store.select('breakpoint');
    this.breakpoint$.subscribe((breakpoint) => this.deviceXs=breakpoint.isXs);
  }

  ngOnInit(): void {
  }

}
