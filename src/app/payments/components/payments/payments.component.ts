import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Payment } from 'src/app/core/models/payment.model';
import { PaymentService } from 'src/app/core/services/payment.service';
import { NewPaymentComponent } from '../new-payment/new-payment.component';
import * as uuid from 'uuid';
import { DialogData } from 'src/app/core/models/dialog-data.model';
import { ConfirmDialogComponent } from 'src/app/core/components/confirm-dialog/confirm-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss'],
})
export class PaymentsComponent implements OnInit {

  payments: Payment[] = [];
  displayedColumns: string[] = [
    'name',
    'title',
    'date',
    'value',
    'isPayed',
    'actions',
  ];

  pageSize = 5;
  currentPage = 1;
  totalSize = 0

  constructor(
    private paymentService: PaymentService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getPayments();
  }

  handlePage(e: any) {

    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;

    this.getPayments(this.currentPage, this.pageSize)
  }

  // TODO : Incluir total de registros na paginação
  getPayments(currentPage = 0, pageSize = 5): void {
    this.paymentService
      .getWithPage(currentPage +1 ,pageSize)
      .subscribe((pay) => {
        this.payments = pay;
        this.totalSize = this.payments.length + 1;

      });
  }

  openNewPayment(): void {
    const dialogRef = this.dialog.open(NewPaymentComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.valid) {
        const payment: Payment = {
          id: uuid.v4(),
          name: result.value.name,
          username: result.value.username,
          value: result.value.value,
          date: new Date(result.value.date),
          title: result.value.title,
          isPayed: false,
        };
        this.paymentService.create(payment).subscribe(() => this.getPayments());
      }
    });
  }

  openEditPayment(payment: Payment): void {
    const dialogRef = this.dialog.open(NewPaymentComponent, {
      data: payment,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.valid) {
        const payment: Payment = {
          id: result.value.id,
          name: result.value.name,
          username: result.value.username,
          value: result.value.value,
          date: new Date(result.value.date),
          title: result.value.title,
          isPayed: false,
        };
        this.paymentService.save(payment).subscribe(() => this.getPayments());
      }
    });
  }

  deletePayment(payment: Payment): void {
    const dialogData: DialogData = {
      cancelText: 'Cancelar',
      confirmText: 'Apagar',
      content: `Deseja apagar o pagamento de "${payment.name}"`,
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: dialogData,
      width: '300px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.paymentService.delete(payment).subscribe(() => {
          this.getPayments();
        });
      }
    });
  }
}
