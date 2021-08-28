import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Action } from 'rxjs/internal/scheduler/Action';
import { map } from 'rxjs/operators';
import { ModalComponent } from 'src/app/components/modal/modal.component';

import { ActionDTO } from 'src/app/models/action.model';
import { Company } from 'src/app/models/company.model';
import { Employee } from 'src/app/models/employee.model';
import { exceptionDTO } from 'src/app/models/exceptionDTO.model';
import { LoginService } from '../Login/login.service';
@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  public employees: Employee[];
  public employee: Employee;
  public company:Company;
  public employeesSubject:Subject<Employee[]>;
  public employeeSubject:Subject<Employee>;
  public companySubject:Subject<Company>;
  public actionDTOSubject:Subject<ActionDTO>;
  public registrationStatus:ActionDTO;
  public APIResponse: ActionDTO | exceptionDTO;

  constructor(private loginService: LoginService,private httpClient :HttpClient,public dialog: MatDialog) {
    //this.employees
    this.employees=[];
    this.registrationStatus={} as ActionDTO;
    this.employee={ } as Employee;
    this.employeesSubject=new Subject();
    this.employeeSubject=new Subject();
    this.actionDTOSubject=new Subject();
    this.companySubject=new Subject();
    this.company={ } as Company;
    this.APIResponse={ } as ActionDTO|exceptionDTO;
  }

  login(credentials:any):void
  {
    console.log("Company")
    this.loginService.doLogin(credentials).subscribe(
      (response:any)=>{
       console.log(response.token)
       this.loginService.loginUser(response.token)

      }
      ,
      error=>{
        console.log(error)

      })

  }
  register(newCompany:Company): void{
    this.httpClient.post<ActionDTO | exceptionDTO>(`http://localhost:8085/company/register`,newCompany).pipe(map((response) => response as ActionDTO|exceptionDTO)) .subscribe(
      data => console.log('success', data),
      error =>{console.log(error.message)
        this.dialog.open(ModalComponent,{
            data: {
              type: "COMPANY_REGISTER"
            }
          });
        }
    );


        // console.log(results);
        // if(!results.success)
        // {
        //   this.dialog.open(ModalComponent,{
        //     data: {
        //       type: "COMPANY_REGISTER"
        //     }
        //   });
        // }

}

getEmployees(id:number,pageSize:number,pageNumber:number): void{

    let token=this.loginService.getToken()
    //  var header={
    //     headers:new HttpHeaders({"Authorization":"Bearer "+token,"Access-Control-Allow-Origin": '*'})

    //   };
    var header={headers:new HttpHeaders().set("Authorization","Bearer "+token)
    }
       console.log(header)

    //let header = this.initHeaders();
    //let options = new RequestOptions({ headers: header, method: 'post'});


    this.httpClient.get(`http://localhost:8085/company/employees/${id}?pageSize=${pageSize}&pageNumber=${pageNumber}`,header).pipe(map((response) => response as Employee[]))
    .subscribe((results: Employee[]) => {


        this.employees=results;
        this.employeesSubject.next(this.employees);

});}

registerEmployee(newEmployee:Employee,companyId:number): void{
  this.httpClient.post<ActionDTO>(`http://localhost:8085/company/register-employee/${companyId}`,newEmployee).pipe(map((response) => response as ActionDTO))
  .subscribe((results: ActionDTO) => {
      console.log(results);
      this.registrationStatus=results;
      this.actionDTOSubject.next(results);

});
}


registerEmployees(newEmployee:FormData,companyId:number): void{
  this.httpClient.post<ActionDTO>(`http://localhost:8085/company/register-employees/${companyId}`,newEmployee).pipe(map((response) => response as ActionDTO))
  .subscribe((results: ActionDTO) => {
      console.log(results);
      this.registrationStatus=results;
      this.actionDTOSubject.next(results);

});
}

getEmployeeByName(id:number,name:string): void{
  this.httpClient.get(`http://localhost:8085/company/get-employees-by-name/${id}/${name}`).pipe(map((response) => response as Employee[]))
  .subscribe((results: Employee[]) => {
      console.log(results);
      this.employees=results;
      this.employeesSubject.next(results);

});}



getEmployeesWithPendingKYC(id:number,pageSize:number,pageNumber:number): void{
  this.httpClient.get(`http://localhost:8085/company/get-employees-with-pending-kyc/${id}?pageSize=${pageSize}&pageNumber=${pageNumber}`).pipe(map((response) => response as Employee[]))
  .subscribe((results: Employee[]) => {
      console.log(results);
      this.employees=results;
      this.employeesSubject.next(this.employees);

});}

getRegisteredEmployees(id:number,pageSize:number,pageNumber:number): void{
  this.httpClient.get(`http://localhost:8085/company/get-registered-employee/${id}?pageSize=${pageSize}&pageNumber=${pageNumber}`).pipe(map((response) => response as Employee[]))
  .subscribe((results: Employee[]) => {
      console.log(results);
      this.employees=results;
      this.employeesSubject.next(this.employees);

});}

getEmployeesWithRejectedKYC(id:number,pageSize:number,pageNumber:number): void{
  this.httpClient.get(`http://localhost:8085/company/get-employees-with-rejected-kyc/${id}?pageSize=${pageSize}&pageNumber=${pageNumber}`).pipe(map((response) => response as Employee[]))
  .subscribe((results: Employee[]) => {
      console.log(results);
      this.employees=results;
      this.employeesSubject.next(this.employees);

});}

getEmployeesByDateOfApplication(id:number,date:string,pageSize:number,pageNumber:number): void{
  this.httpClient.get(`http://localhost:8085/company/get-employees-by-date-of-application/${id}/${date}?pageSize=${pageSize}&pageNumber=${pageNumber}`).pipe(map((response) => response as Employee[]))
  .subscribe((results: Employee[]) => {
      console.log(results);
      this.employees=results;
      this.employeesSubject.next(this.employees);

});}

getEmployeesByStatus(companyId:number,status:string,pageSize:number,pageNumber:number): void{
  this.httpClient.get(`http://localhost:8085/company/employees-by-status/${companyId}/${status}?pageSize=${pageSize}&pageNumber=${pageNumber}`).pipe(map((response) => response as Employee[]))
  .subscribe((results: Employee[]) => {
      console.log(results);
      this.employees=results;
      this.employeesSubject.next(this.employees);

});}

getEmployeesSortedByName(id:number,pageSize:number,pageNumber:number): void{
  this.httpClient.get(`http://localhost:8085/company/get-employees-sorted-by-name/${id}?pageSize=${pageSize}&pageNumber=${pageNumber}`).pipe(map((response) => response as Employee[]))
  .subscribe((results: Employee[]) => {
      console.log(results);
      this.employees=results;
      this.employeesSubject.next(this.employees);

});}

getEmployeesSortedByDate(id:number,pageSize:number,pageNumber:number): void{
  this.httpClient.get(`http://localhost:8085/company/get-employees-sorted-by-date/${id}?pageSize=${pageSize}&pageNumber=${pageNumber}`).pipe(map((response) => response as Employee[]))
  .subscribe((results: Employee[]) => {
      console.log(results);
      this.employees=results;
      this.employeesSubject.next(this.employees);

});}

getCompanyDetails(id:number): void{
  this.httpClient.get(`http://localhost:8085/company/get-company-details/${id}`).pipe(map((response) => response as Company))
  .subscribe((results: Company) => {
      console.log(results);
      this.companySubject.next(results);

});}

updateProfile(newCompany:Company): void{
  this.httpClient.patch<ActionDTO>(`http://localhost:8085/company/update-profile`,newCompany).pipe(map((response) => response as ActionDTO))
  .subscribe((results: ActionDTO) => {
   // this.employees=results;
      console.log(results);
      this.registrationStatus=results;
      this.actionDTOSubject.next(results);

});
}

initHeaders(): Headers {
  var headers = new Headers();
  let token = this.loginService.getToken();
  if (token !== null) {
     headers.append('Authorization','Bearer '+token);
  }
  headers.append('Pragma', 'no-cache');
  headers.append('Content-Type', 'application/json');
  headers.append('Access-Control-Allow-Origin', '*');
  return headers;
 }


   /*
    this.httpClient.get("http://localhost:8085/company/employees/1").pipe(map((response) => response as Employee[]))
    .subscribe((results: Employee[]) => {
      this.employees=results;
      this.getEmployeesById();
    });
    console.log(this.employees)
*/

 /*
 getAllEmployees(): Observable<Employee[]> {
  return  this.httpClient.get("http://localhost:8085/company/employees/1").pipe(map((response) => response as Employee[]))
}*/
}
