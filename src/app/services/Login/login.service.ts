import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient:HttpClient) { }
  doLogin(credentials:any)
  {
   return this.httpClient.post(`http://localhost:8085/token`,credentials)


  }
  getToken()
  {
    return localStorage.getItem("token")
  }
  loginUser(token:string)
  {
    localStorage.setItem("token",token);
    return true;
  }
  isLoggedIn()
  {
    let token=localStorage.getItem("token");
    if(token==null || token==undefined || token==="")
    {
      return false
    }
    return true
  }
  logout()
  {
    localStorage.removeItem("token");
  }
}
