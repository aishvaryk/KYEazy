import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatRadioModule } from '@angular/material/radio';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ModalComponent } from './components/modal/modal.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { SearchComponent } from './components/search/search.component';
import { DashboardComponent } from './pages/employee/dashboard/dashboard.component';
import { ProfileComponent } from './pages/company/profile/profile.component';
import { PendingKycComponent } from './pages/admin/pending-kyc/pending-kyc.component';
import { AcceptedKycComponent } from './pages/admin/accepted-kyc/accepted-kyc.component';
import { RejectedKycComponent } from './pages/admin/rejected-kyc/rejected-kyc.component';
import { HomeComponent } from './pages/home/home.component';
import { EmployeesComponent } from './pages/company/employees/employees.component';
import { KycComponent } from './pages/employee/kyc/kyc.component';
import { RegisterComponent } from './pages/company/register/register.component';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetailsComponent } from './components/details/details.component';
import { DocumentsComponent } from './components/documents/documents.component';
import { SelfieComponent } from './components/selfie/selfie.component';
import { LivelinessComponent } from './components/liveliness/liveliness.component';
import { ReviewComponent } from './components/review/review.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    ModalComponent,
    EmployeeComponent,
    LoginComponent,
    SignupComponent,
    SearchComponent,
    DashboardComponent,
    ProfileComponent,
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
    ReviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatStepperModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatRadioModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
