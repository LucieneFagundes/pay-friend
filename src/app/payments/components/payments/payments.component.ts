import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/core/components/confirm-dialog/confirm-dialog.component';
import { DialogData } from 'src/app/core/models/dialog-data.model';
import { Payment } from 'src/app/core/models/payment.model';
import { PaymentService } from 'src/app/core/services/payment.service';
import * as uuid from 'uuid';
import { NewPaymentComponent } from '../new-payment/new-payment.component';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';

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

  isFiltering: boolean = false;
  searchTerm: string = '';
  private searchSubject: Subject<string> = new Subject<string>();

  pageSize: number = 5;
  currentPage: number = 0;
  totalSize: number = 0;

  constructor(
    private paymentService: PaymentService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getPayments();
    this.searchSubject
      .pipe(debounceTime(600), distinctUntilChanged())
      .subscribe((term: string) => {
        this.handleDelayedSearch(term);
      });
  }


  getPayments(currentPage: number = 0, pageSize: number = 5): void {
    this.paymentService
      .getAll(currentPage + 1, pageSize)
      .subscribe((response) => {
        this.payments = response.body!;
        this.totalSize = Number(response.headers.get('X-Total-Count'));
      });
  }

  handlePageEvent(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;

    if (this.isFiltering) {
      this.paymentService
        .search(this.searchTerm, this.currentPage + 1, this.pageSize)
        .subscribe((response) => {
          this.payments = response.body!;
          this.totalSize = Number(response.headers.get('X-Total-Count'));
        });
    } else {
      this.getPayments(this.currentPage, this.pageSize);
    }
  }

  handleSearch(term: string): void {
    this.searchSubject.next(term);
  }

  handleDelayedSearch(term: string): void {
    this.searchTerm = term;
    if (term.length <= 0) {
      this.getPayments();
      this.isFiltering = false;
    } else {
      this.isFiltering = true;
      this.paymentService
        .search(term, this.currentPage + 1, this.pageSize)
        .subscribe((response) => {
          this.payments = response.body!;
          this.totalSize = Number(response.headers.get('X-Total-Count'));
        });
    }
  }

  handleNewPayment(): void {
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

  handleEditPayment(payment: Payment): void {
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

  handleDeletePayment(payment: Payment): void {
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
