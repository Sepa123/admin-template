import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InfoMercadoLibreComponent } from './info-mercado-libre/info-mercado-libre.component';
import { CitacionesComponent } from './citaciones/citaciones.component';
import { ListaSupervisoresComponent } from './lista-supervisores/lista-supervisores.component';
import { PrefacturaComponent } from './prefactura/prefactura.component';
import { PrefacturaMensualComponent } from './prefactura-mensual/prefactura-mensual.component';
import { SeguimientoDiarioComponent } from './seguimiento-diario/seguimiento-diario.component';
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
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MercadolibreRoutingModule { }
