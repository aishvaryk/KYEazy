import { ViewEmployessComponent } from './pages/admin/view-employess/view-employess.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { AdminComponent } from './pages/admin/admin.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcceptedKycComponent } from './pages/admin/accepted-kyc/accepted-kyc.component';
import { PendingKycComponent } from './pages/admin/pending-kyc/pending-kyc.component';
import { RejectedKycComponent } from './pages/admin/rejected-kyc/rejected-kyc.component';
import { CompanyDashboardComponent } from './pages/company/company-dashboard/company-dashboard.component';
import { CompanyComponent } from './pages/company/company.component';
import { EmployeesComponent } from './pages/company/employees/employees.component';
import { RegisterComponent } from './pages/company/register/register.component';
import { SignupComponent } from './pages/company/signup/signup.component';
import { KycComponent } from './pages/employee/kyc/kyc.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterEmployeesComponent } from './pages/company/register-employees/register-employees.component';

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
        path: 'register-employees',
        component: RegisterEmployeesComponent
      },
      {
        path: 'signup',
        component: SignupComponent
      },
      {
        path: 'employee/profile',
        component: ProfileComponent
      }
    ]
  },
  {
    path:'admin',
    component: AdminComponent,
    children: [
      {
        path: 'dashboard',
        component: AdminDashboardComponent
      },
      {
        path: 'accepted-kyc',
        component: AcceptedKycComponent
      },
      {
        path: 'pending-kyc',
        component: PendingKycComponent
      },
      {
        path: 'rejected-kyc',
        component: RejectedKycComponent
      },
      {
        path: 'employees/:companyId',
        component: ViewEmployessComponent
      },
      {
        path: 'employee/profile',
        component: ProfileComponent
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
