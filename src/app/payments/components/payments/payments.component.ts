import { Component, OnInit } from '@angular/core';
import { Payment } from 'src/app/core/models/payment.model';
import { PaymentService } from 'src/app/core/services/payment.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss'],
})
export class PaymentsComponent implements OnInit {
  payments: Payment[] = [];
  displayedColumns: string[] = ['name', 'title', 'date' ,'value', 'isPayed', 'actions'];

  constructor(private paymentService: PaymentService) {}

  ngOnInit(): void {
    this.getPayments();
  }

  getPayments(): void {
    this.paymentService.getAll().subscribe((pay) => {
      this.payments = pay;
    });
  }
}
