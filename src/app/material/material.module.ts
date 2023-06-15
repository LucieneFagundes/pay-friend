import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';

const MODULES = [
  MatButtonModule,
  MatIconModule,
  MatTableModule,
  MatToolbarModule,
];

@NgModule({
  exports: [MODULES],
})
export class MaterialModule {}
