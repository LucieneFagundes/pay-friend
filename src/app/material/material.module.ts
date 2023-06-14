import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';

const MODULES = [
  MatToolbarModule
];

@NgModule({
  exports: [MODULES],
})
export class MaterialModule {}
