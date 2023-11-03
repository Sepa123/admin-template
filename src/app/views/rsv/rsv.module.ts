import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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

import { ModalModule } from '@coreui/angular';

import { RsvRoutingModule } from './rsv-routing.module';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { AgregarProductoComponent } from './agregar-producto/agregar-producto.component';
import { CrearCargaComponent } from './crear-carga/crear-carga.component';
import { VentasComponent } from './ventas/ventas.component';
import { RecepcionComponent } from './recepcion/recepcion.component';
import { ListarCargaComponent } from './listar-carga/listar-carga.component';
import { InventarioSucursalesComponent } from './inventario-sucursales/inventario-sucursales.component';
import {FiltroUbicacionComponent} from './filtro-ubicacion/filtro-ubicacion.component'
import { ListarPaquetesAbiertosComponent } from './listar-paquetes-abiertos/listar-paquetes.component';
import { UnidadSinEtiquetaComponent } from './sin-etiqueta/unidad-sin-etiqueta.component';
@NgModule({
  declarations: [
    CatalogoComponent,
    AgregarProductoComponent,
    CrearCargaComponent,
    VentasComponent,
    RecepcionComponent,
    ListarCargaComponent,
    InventarioSucursalesComponent,
    FiltroUbicacionComponent,
    ListarPaquetesAbiertosComponent,
    UnidadSinEtiquetaComponent
  ],
  imports: [
    CommonModule,
    RsvRoutingModule,
    ButtonGroupModule,
    ButtonModule,
    CardModule,
    DropdownModule,
    FormModule,
    GridModule,
    ListGroupModule,
    SharedModule,
    FormsModule, ReactiveFormsModule,
    ModalModule
  ]
})
export class RsvModule { }
