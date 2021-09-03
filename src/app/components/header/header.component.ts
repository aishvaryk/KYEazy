import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Breakpoint } from 'src/app/models/breakpoint.model';
import { updateMenu } from 'src/app/redux/actions/menu.action';
import { LoginService } from 'src/app/services/loginn/login.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  deviceSmall: any;
  deviceExtraSmall: any;
  isOpen: boolean = false;
  loginService: LoginService;
  isHome: any;
  backendURL = environment.backendURL;
  isAdminLogin: any;

  breakpoint$: Observable<Breakpoint>;

  constructor(
    public store: Store<{
      breakpoint: Breakpoint;
      menu: boolean;
      route: string;
    }>,
    loginService: LoginService
  ) {
    this.breakpoint$ = store.select('breakpoint');
    this.breakpoint$.subscribe((breakpoint) => {
      if (breakpoint.isSm || breakpoint.isXs) {
        this.store.dispatch(updateMenu(false));
        this.deviceSmall = true;
      } else {
        this.deviceSmall = false;
        this.store.dispatch(updateMenu(true));
      }
    });
    this.store.select('menu').subscribe((menu) => (this.isOpen = menu));
    this.loginService = loginService;
    this.store.select('route').subscribe((route) => {
      if (route === '/') this.isHome = true;
      else if (route === '/admin/login') this.isAdminLogin = true;
      else this.isHome = false;
      this.isAdminLogin = false;
    });
  }
  ngOnInit(): void {}

  toggleMenu() {
    this.store.dispatch(updateMenu(!this.isOpen));
  }
  doLogout() {
    this.loginService.logout();
  }
}
