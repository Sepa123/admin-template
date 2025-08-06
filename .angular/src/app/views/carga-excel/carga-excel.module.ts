import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CargaExcelRoutingModule } from './carga-excel-routing.module';
import { EasyCdComponent } from './easy-cd/easy-cd.component';


@NgModule({
  declarations: [
    EasyCdComponent
  ],
  imports: [
    CommonModule,
    CargaExcelRoutingModule
  ]
})
export class CargaExcelModule { }
