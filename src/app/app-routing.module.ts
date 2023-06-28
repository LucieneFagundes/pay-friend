import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentsComponent } from './payments/components/payments/payments.component';
import { LoginComponent } from './auth/components/login/login.component';

const routes: Routes = [
  {path: '', component: PaymentsComponent},
  {path: 'login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
