import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Breakpoint } from 'src/app/models/breakpoint.model';
import { updateMenu } from 'src/app/redux/actions/menu.action';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  deviceSmall:any;
  isOpen:boolean = false;


  breakpoint$: Observable<Breakpoint>;

  constructor(public store: Store<{breakpoint: Breakpoint, menu:boolean}>) {
    this.breakpoint$ = store.select('breakpoint');
    this.breakpoint$.subscribe((breakpoint) => {
      if (breakpoint.isSm||breakpoint.isXs ) {
        this.store.dispatch(updateMenu(false))
        this.deviceSmall=true;
      } else {
        this.deviceSmall=false;
        this.store.dispatch(updateMenu(true))
      }
    });

    this.store.select('menu').subscribe((menu)=> this.isOpen=menu);
  }

  ngOnInit(): void {
  }

  toggleMenu(){
    this.store.dispatch(updateMenu(!this.isOpen))
    console.log(this.isOpen)
  }

}
