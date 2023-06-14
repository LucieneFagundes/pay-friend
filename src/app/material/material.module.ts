import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


const MODULES = [
  MatButtonModule,
  MatIconModule,
  MatToolbarModule,
];

@NgModule({
  exports: [MODULES],
})
export class MaterialModule {}
