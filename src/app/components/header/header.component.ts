import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Breakpoint } from 'src/app/models/breakpoint.model';
import { updateMenu } from 'src/app/redux/actions/menu.action';
import { LoginService } from 'src/app/services/Login/login.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  deviceSmall:any;
  isOpen:boolean = false;
  loginService :LoginService;

  breakpoint$: Observable<Breakpoint>;

  constructor(public store: Store<{breakpoint: Breakpoint, menu:boolean}>,loginService:LoginService) {
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
    this.loginService=loginService;
  }
  ngOnInit(): void {
    this.doLogout();
  }

  toggleMenu(){
    this.store.dispatch(updateMenu(!this.isOpen))
  }
  doLogout(){
    this.loginService.logout();

  }
}
