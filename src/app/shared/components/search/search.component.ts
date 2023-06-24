import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  @Input() label: string = '';
  @Output() searchEmitter: EventEmitter<string> = new EventEmitter();

  search(term: string): void {
    this.searchEmitter.emit(term);
  }
  cancel(): void {
    this.searchEmitter.emit('');
  }
}
