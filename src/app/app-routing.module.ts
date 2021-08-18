import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KycComponent } from './pages/employee/kyc/kyc.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    path: 'employee/kyc',
    component: KycComponent
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
