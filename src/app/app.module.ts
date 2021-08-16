import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ModalComponent } from './components/modal/modal.component';
import { FilterComponent } from './components/filter/filter.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { CardComponent } from './components/card/card.component';
import { SearchComponent } from './components/search/search.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { CompanyDashboardComponent } from './pages/company-dashboard/company-dashboard.component';
import { EmployeeDashboardComponent } from './pages/employee-dashboard/employee-dashboard.component';
import { DashboardComponent } from './pages/employee/dashboard/dashboard.component';
import { ProfileComponent } from './pages/company/profile/profile.component';
import { PendingKycComponent } from './pages/admin/pending-kyc/pending-kyc.component';
import { AcceptedKycComponent } from './pages/admin/accepted-kyc/accepted-kyc.component';
import { RejectedKycComponent } from './pages/admin/rejected-kyc/rejected-kyc.component';
import { HomeComponent } from './pages/home/home.component';
import { SingleComponent } from './pages/company/register/single/single.component';
import { RegisterComponent } from './pages/company/register/register.component';
import { EmployeesComponent } from './pages/company/employees/employees.component';
import { PersonalDetailsComponent } from './pages/employee/personal-details/personal-details.component';
import { PersonalDocumentsComponent } from './pages/employee/personal-documents/personal-documents.component';
import { ProfilePictureComponent } from './pages/employee/profile-picture/profile-picture.component';
import { LivelinessComponent } from './pages/employee/liveliness/liveliness.component';
import { ImageComponent } from './pages/employee/image/image.component';
import { DocumentsComponent } from './pages/employee/documents/documents.component';
import { DetailsComponent } from './pages/employee/details/details.component';
import { ReviewComponent } from './pages/employee/review/review.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    ModalComponent,
    FilterComponent,
    EmployeeComponent,
    LoginComponent,
    SignupComponent,
    CardComponent,
    SearchComponent,
    AdminDashboardComponent,
    CompanyDashboardComponent,
    EmployeeDashboardComponent,
    DashboardComponent,
    ProfileComponent,
    PendingKycComponent,
    AcceptedKycComponent,
    RejectedKycComponent,
    HomeComponent,
    SingleComponent,
    RegisterComponent,
    EmployeesComponent,
    PersonalDetailsComponent,
    PersonalDocumentsComponent,
    ProfilePictureComponent,
    LivelinessComponent,
    ImageComponent,
    DocumentsComponent,
    DetailsComponent,
    ReviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
