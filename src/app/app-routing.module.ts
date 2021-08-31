import { AllCompaniesComponent } from './pages/admin/all-companies/all-companies.component';
import { AdminAllEmployeesComponent } from './pages/admin/admin-all-employees/admin-all-employees.component';
import { LoginComponent } from './components/login/login.component';
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
import { AuthGuard } from './services/auth.guard';
import { AdminLoginComponent } from './pages/admin/admin-login/admin-login.component';

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
        component: CompanyDashboardComponent,
        canActivate:[AuthGuard]
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
      },
      {
        path: 'employee/profile/:employeeId',
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
        component: AdminDashboardComponent,
        canActivate:[AuthGuard]
      },
      {
        path: 'accepted-kyc',
        component: AcceptedKycComponent,
        canActivate:[AuthGuard]
      },
      {
        path: 'pending-kyc',
        component: PendingKycComponent,
        canActivate:[AuthGuard]
      },
      {
        path: 'rejected-kyc',
        component: RejectedKycComponent,
        canActivate:[AuthGuard]
      },
      {
        path: 'employees/:companyId',
        component: ViewEmployessComponent,
        canActivate:[AuthGuard]
      },
      {
        path: 'employee/profile',
        component: ProfileComponent,
        canActivate:[AuthGuard]

      },
      {
        path: 'login',
        component: AdminLoginComponent
      },
      {
        path: 'all-employees',
        component: AdminAllEmployeesComponent
      },
      {
        path: 'all-companies',
        component: AllCompaniesComponent
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
