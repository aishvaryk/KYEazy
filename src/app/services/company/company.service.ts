import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Employee } from 'src/app/models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  constructor(private httpClient :HttpClient) { }
  getCompanies():
  Observable<Employee[]>{
    return this.httpClient.get('http://localhost:8085/company/employees/1').pipe(map((response) => response as Employee[]));

  }

}

