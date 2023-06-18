import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Payment } from 'src/app/core/models/payment.model';
import { stringify } from 'uuid';

@Component({
  selector: 'app-new-payment',
  templateUrl: './new-payment.component.html',
  styleUrls: ['./new-payment.component.scss'],
})
export class NewPaymentComponent {
  form = this.fb.group({
    id: [this.data ? this.data.id : ''],
    name: [
      this.data ? this.data.name : '',
      [Validators.required, Validators.minLength(3)],
    ],
    username: [
      this.data ? this.data.username : '',
      [Validators.required, Validators.minLength(3)],
    ],
    value: [this.data ? this.data.value : '', [Validators.required]],
    date: [
      this.data ? new Date(this.data.date).toISOString().slice(0, -1) : '',
      [Validators.required],
    ],
    title: [this.data ? this.data.title : ''],
  });

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<NewPaymentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Payment
  ) {}

  cancelDialog(): void {
    this.dialogRef.close();
  }
}
