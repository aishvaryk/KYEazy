import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyDashboardComponent } from './pages/company/company-dashboard/company-dashboard.component';
import { CompanyComponent } from './pages/company/company.component';
import { EmployeesComponent } from './pages/company/employees/employees.component';
import { RegisterComponent } from './pages/company/register/register.component';
import { SignupComponent } from './pages/company/signup/signup.component';
import { KycComponent } from './pages/employee/kyc/kyc.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    path: 'employee/kyc',
    component: KycComponent
  },
  {
    path: 'company',
    component: CompanyComponent,
    children: [
      {
        path: 'dashboard',
        component: CompanyDashboardComponent
      },
      {
        path: 'employees',
        component: EmployeesComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'signup',
        component: SignupComponent
      }
    ]
  },
  {
    path:'',
    component: HomeComponent
  },
  {
    path: '**',
    redirectTo:'/'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
