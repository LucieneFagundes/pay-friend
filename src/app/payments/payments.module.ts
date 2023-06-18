import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentsComponent } from './components/payments/payments.component';
import { MaterialModule } from '../material/material.module';
import { NewPaymentComponent } from './components/new-payment/new-payment.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [PaymentsComponent, NewPaymentComponent],
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
})
export class PaymentsModule {}
