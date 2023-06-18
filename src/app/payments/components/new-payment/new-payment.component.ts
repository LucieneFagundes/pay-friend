import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Payment } from 'src/app/core/models/payment.model';

@Component({
  selector: 'app-new-payment',
  templateUrl: './new-payment.component.html',
  styleUrls: ['./new-payment.component.scss'],
})
export class NewPaymentComponent {
  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    username: ['', [Validators.required, Validators.minLength(3)]],
    value: ['', [Validators.required]],
    date: ['', [Validators.required]],
    title: [''],
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
