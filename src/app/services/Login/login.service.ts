import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient:HttpClient,private router: Router) { }

  doLogin(credentials:any)
  {
   return this.httpClient.post(`${environment.backendURL}/token`,credentials)


  }

  setUserId(id:string)
  {
  localStorage.setItem("Id",id);
  }

  getToken()
  {
    return localStorage.getItem("token")
  }

  loginUser(token:string,id :string)
  {
    localStorage.setItem("token",token);
    localStorage.setItem("Id",id);
    return true;
  }

  isLoggedIn()
  {
    let token=localStorage["token"];
    if(token==null || token==undefined || token==="")
    {
      return false
    }
    return true
  }

  logout()
  {
    localStorage.removeItem("token");
    localStorage.removeItem("Id");
    this.router.navigate(['/']);
  }
}
