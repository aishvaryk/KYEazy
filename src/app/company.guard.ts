import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './services/Login/login.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyGuard implements CanActivate {

  constructor(private loginService:LoginService,private router: Router)
{

}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.loginService.isLoggedIn() && localStorage.getItem("userType")==="COMPANY") return true;
      this.router.navigate(['/']);
    return false;

}
}
