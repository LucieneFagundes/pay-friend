import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MaterialModule } from '../material/material.module';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';

const CORE_COMPONENT = [ConfirmDialogComponent, ToolbarComponent];

@NgModule({
  declarations: [CORE_COMPONENT],
  imports: [CommonModule, MaterialModule],
  exports: [CORE_COMPONENT],
})
export class CoreModule {}
