import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InfoMercadoLibreComponent } from './info-mercado-libre/info-mercado-libre.component';
import { CitacionesComponent } from './citaciones/citaciones.component';
import { ListaSupervisoresComponent } from './lista-supervisores/lista-supervisores.component';
import { PrefacturaComponent } from './prefactura/prefactura.component';
import { PrefacturaMensualComponent } from './prefactura-mensual/prefactura-mensual.component';
import { SeguimientoDiarioComponent } from './seguimiento-diario/seguimiento-diario.component';
import { PrefacturaDiariaComponent } from './prefactura-diaria/prefactura-diaria.component';
import { CitacionesActivasComponent } from './citaciones-activas/citaciones-activas.component';
import { CitacionSupervisoresComponent } from './citacion-supervisores/citacion-supervisores.component';
import { VentaOTraspasoDeVehiculoComponent } from './venta-o-traspaso-de-vehiculo/venta-o-traspaso-de-vehiculo.component';

const routes: Routes = [
  {
    path: '',
    data:{
        title: "mercadolibre"
    },
    children:[
        {
            path:'info-mercado-libre',
            component: InfoMercadoLibreComponent,
            data:{
                title: "Informacion"
            }
        },
        {
            path:'citaciones',
            component: CitacionesComponent,
            data:{
                title: "Citaciones"
            }
        },
        {
            path:'supervisores',
            component: ListaSupervisoresComponent,
            data:{
                title: "supervisores"
            }
        },
        {
            path:'prefactura',
            component: PrefacturaComponent,
            data:{
                title: "prefactura"
            }
        },
        {
            path:'prefactura-diaria',
            component: PrefacturaDiariaComponent,
            data:{
                title: "prefactura"
            }
        },
        {
            path:'prefactura-mensual',
            component: PrefacturaMensualComponent,
            data:{
                title: "prefactura"
            }
        },
        {
            path:'seguimiento-diario',
            component: SeguimientoDiarioComponent,
            data:{
                title: "prefactura"
            }
        },
        {
            path:'citacion-supervisores',
            component: CitacionSupervisoresComponent,
            data:{
                title: "Citaciones"
            }
        },
        {
            path:'citaciones-activas',
            component: CitacionesActivasComponent,
            data:{
                title: "Citaciones"
            }
        },
        {
            path:'venta-o-traspaso-de-vehiculo',
            component: VentaOTraspasoDeVehiculoComponent,
            data:{
                title: "Venta/traspaso de Vehiculo"
            }
        },
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MercadolibreRoutingModule { }
