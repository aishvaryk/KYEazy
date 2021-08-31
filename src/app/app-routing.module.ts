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
import { AdminLoginComponent } from './pages/admin/admin-login/admin-login.component';
import { CompanyGuard } from './company.guard';
import { AdminGuard } from './admin.guard';
import { EmployeeGuard } from './employee.guard';

const routes: Routes = [
  {
    path: 'employee/kyc',
    component: KycComponent,
    canActivate: [EmployeeGuard]
  },
  {
    path: 'company',
    component: CompanyComponent,

    children: [
      {
        path: 'dashboard',
        component: CompanyDashboardComponent,
        canActivate: [CompanyGuard]

      },
      {
        path: 'employees',
        component: EmployeesComponent,
        canActivate: [CompanyGuard]
      },
      {
        path: 'register',
        component: RegisterComponent,
        canActivate: [CompanyGuard]
      },

      {
        path: 'signup',
        component: SignupComponent
      },
      {
        path: 'employee/profile/:employeeId',
        component: ProfileComponent,
        canActivate: [CompanyGuard]
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
       // canActivate: [AdminGuard]
      },
      {
        path: 'accepted-kyc',
        component: AcceptedKycComponent,
        //canActivate: [AdminGuard]
        },
      {
        path: 'pending-kyc',
        component: PendingKycComponent,
        //canActivate: [AdminGuard]

      },
      {
        path: 'rejected-kyc',
        component: RejectedKycComponent,
        //canActivate: [AdminGuard]

      },
      {
        path: 'employees/:companyId',
        component: ViewEmployessComponent,
        //canActivate: [AdminGuard]

      },
      {
        path: 'employee/profile',
        component: ProfileComponent,
        //canActivate: [AdminGuard]


      },
      {
        path: 'login',
        component: AdminLoginComponent
      },
      {
        path: 'all-employees',
        component: AdminAllEmployeesComponent,
        //canActivate: [AdminGuard]
      },
      {
        path: 'all-companies',
        component: AllCompaniesComponent,
        //canActivate: [AdminGuard]
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
