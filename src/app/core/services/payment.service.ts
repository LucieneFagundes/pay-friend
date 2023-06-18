import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { env } from 'src/app/environments/environments';
import { Payment } from '../models/payment.model';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private paymentUrl = `${env.baseUrl}/tasks`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Payment[]> {
    return this.http.get<Payment[]>(this.paymentUrl);
  }

  delete(payment: Payment): Observable<any> {
    return this.http.delete<any>(`${this.paymentUrl}/${payment.id}`);
  }

  create(payment: Payment): Observable<Payment> {
    console.log(payment);
    return this.http.post<any>(this.paymentUrl, payment);
  }
}
