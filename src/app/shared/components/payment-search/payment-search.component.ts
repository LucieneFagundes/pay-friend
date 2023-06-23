import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-payment-search',
  templateUrl: './payment-search.component.html',
  styleUrls: ['./payment-search.component.scss'],
})
export class PaymentSearchComponent {
  @Input() label: string = '';
  @Output() searchEmitter: EventEmitter<string> = new EventEmitter();

  search(term: string): void {
    this.searchEmitter.emit(term);
  }
  cancel(): void {
    this.searchEmitter.emit('');
  }
}
