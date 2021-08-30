import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';

import { MatRadioModule, MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';


import { AppComponent } from './app.component';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ModalComponent } from './components/modal/modal.component';
import { LoginComponent } from './components/login/login.component';
import { SelfieComponent } from './components/selfie/selfie.component';
import { LivelinessComponent } from './components/liveliness/liveliness.component';
import { ReviewComponent } from './components/review/review.component';
import { DetailsComponent } from './components/details/details.component';
import { DocumentsComponent } from './components/documents/documents.component';
import { ProfileComponent } from './components/profile/profile.component';

import { SignupComponent } from './pages/company/signup/signup.component';
import { PendingKycComponent } from './pages/admin/pending-kyc/pending-kyc.component';
import { AcceptedKycComponent } from './pages/admin/accepted-kyc/accepted-kyc.component';
import { RejectedKycComponent } from './pages/admin/rejected-kyc/rejected-kyc.component';
import { HomeComponent } from './pages/home/home.component';
import { EmployeesComponent } from './pages/company/employees/employees.component';
import { KycComponent } from './pages/employee/kyc/kyc.component';
import { RegisterComponent } from './pages/company/register/register.component';
import { EmployeeDashboardComponent } from './pages/employee/employee-dashboard/employee-dashboard.component';
import { CompanyDashboardComponent } from './pages/company/company-dashboard/company-dashboard.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { AdminComponent } from './pages/admin/admin.component';
import { CompanyComponent } from './pages/company/company.component';

import { breakpointReducer } from './redux/reducers/breakpoint.reducer';
import { detailsReducer } from './redux/reducers/details.reducer';
import { documentsReducer } from './redux/reducers/documents.reducer';
import { routeReducer } from './redux/reducers/route.reducer';
import { menuReducer } from './redux/reducers/menu.reducer';


import { ViewEmployessComponent } from './pages/admin/view-employess/view-employess.component';

import { NgxChartsModule } from '@swimlane/ngx-charts';
import { selfieReducer } from './redux/reducers/selfie.reducer';
import { livelinessReducer } from './redux/reducers/liveliness.reducer';
import { AdminLoginComponent } from './pages/admin/admin-login/admin-login.component';
import { AdminAllEmployeesComponent } from './pages/admin/admin-all-employees/admin-all-employees.component';
import { AllCompaniesComponent } from './pages/admin/all-companies/all-companies.component';
import { MaterialModule } from './modules/material/material.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    ModalComponent,
    LoginComponent,
    SignupComponent,
    PendingKycComponent,
    AcceptedKycComponent,
    RejectedKycComponent,
    HomeComponent,
    EmployeesComponent,
    KycComponent,
    RegisterComponent,
    DetailsComponent,
    DocumentsComponent,
    SelfieComponent,
    LivelinessComponent,
    ReviewComponent,
    EmployeeDashboardComponent,
    CompanyDashboardComponent,
    AdminDashboardComponent,
    AdminComponent,
    CompanyComponent,
    EmployeesComponent,
    ViewEmployessComponent,
    ProfileComponent,
    AdminLoginComponent,
    AdminAllEmployeesComponent,
    AllCompaniesComponent
  ],
  imports: [
    StoreModule.forRoot({
      breakpoint: breakpointReducer,
      details: detailsReducer,
      documents: documentsReducer,
      route: routeReducer,
      menu: menuReducer,
      selfie: selfieReducer,
      liveliness: livelinessReducer
    }),
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
     FlexLayoutModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,

    NgxChartsModule,

  ],
  providers: [
    {
      provide: MAT_RADIO_DEFAULT_OPTIONS,
      useValue: { color: 'primary' },
     }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
