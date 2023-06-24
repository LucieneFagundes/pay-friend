import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { SearchComponent } from './components/search/search.component';

const SHARED_COMPONENTS = [PaginatorComponent, SearchComponent];

@NgModule({
  declarations: [SHARED_COMPONENTS],
  imports: [CommonModule, MaterialModule],
  exports: [SHARED_COMPONENTS],
})
export class SharedModule {}
