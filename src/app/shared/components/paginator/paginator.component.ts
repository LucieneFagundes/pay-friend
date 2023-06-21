import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { CustomPaginator } from './custom-paginator.configuration';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
  providers: [{ provide: MatPaginatorIntl, useValue: CustomPaginator() }],
})
export class PaginatorComponent {
  @Input() length: number = 0;
  @Input() pageSize: number = 5;
  @Input() pageIndex: number = 0;
  @Output() pageEvent: EventEmitter<PageEvent> = new EventEmitter();

  setCurrentPage(event: PageEvent) {
    this.pageEvent.emit(event);
  }
}
