import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentsComponent } from './components/payments/payments.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [PaymentsComponent],
  imports: [CommonModule, MaterialModule],
})
export class PaymentsModule {}
