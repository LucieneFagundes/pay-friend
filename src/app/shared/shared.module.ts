import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { PaginatorComponent } from './components/paginator/paginator.component';

const SHARED_COMPONENTS = [PaginatorComponent];

@NgModule({
  declarations: [SHARED_COMPONENTS],
  imports: [CommonModule, MaterialModule],
  exports: [SHARED_COMPONENTS],
})
export class SharedModule {}
