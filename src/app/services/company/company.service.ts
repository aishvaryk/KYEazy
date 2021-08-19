import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private httpClient :HttpClient) { }
  getCompanies():
  Observable<any>{
    return this.httpClient.get('http://localhost:8085/company/employees/1');

  }

}

