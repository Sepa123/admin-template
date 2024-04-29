import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { DocsComponentsModule } from '@docs-components/docs-components.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { ModalModule } from '@coreui/angular';
import {
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  DropdownModule,
  FormModule,
  GridModule,
  ListGroupModule,
  SharedModule
} from '@coreui/angular';
import { InfoMercadoLibreComponent } from './info-mercado-libre/info-mercado-libre.component';
import { MercadolibreRoutingModule } from './mercadolibre-routing.module';


@NgModule({
  declarations: [
    InfoMercadoLibreComponent,
    
  ],
  imports: [
    CommonModule,
    MercadolibreRoutingModule,
    ButtonGroupModule,
    ButtonModule,
    CardModule,
    DropdownModule,
    FormModule,
    GridModule,
    ListGroupModule,
    SharedModule
    
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MercadolibreModule { }
