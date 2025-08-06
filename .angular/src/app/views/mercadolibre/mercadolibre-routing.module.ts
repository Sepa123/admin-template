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
import { NsSupervisoresComponent } from './ns-supervisores/ns-supervisores.component';
import { TestPPUComponent } from './test-ppu/test-ppu.component';
import { PosiblesRutasComponent } from './posibles-rutas/posibles-rutas.component';
import { PermissionGuard } from '../../guard/permission.guard';

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
            canActivate :[PermissionGuard],
            data:{
                title: "Citaciones",
                id_submenu: 37
            }
        },
        {
            path:'supervisores',
            component: ListaSupervisoresComponent,
            canActivate :[PermissionGuard],
            data:{
                title: "supervisores",
                id_submenu: 38
            }
        },
        {
            path:'prefactura',
            component: PrefacturaComponent,
            canActivate :[PermissionGuard],
            data:{
                title: "prefactura",
                id_submenu: 39
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
            canActivate :[PermissionGuard],
            data:{
                title: "Citacion supervisores",
                id_submenu: 40
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
            path:'ns-supervisores',
            component: NsSupervisoresComponent,
            canActivate :[PermissionGuard],
            data:{
                title: "Resumen Supervisores",
                id_submenu: 41
            }
        },
        {
            path:'posibles-rutas',
            component: PosiblesRutasComponent,
            canActivate :[PermissionGuard],
            data:{
                title: "Posibles Rutas",
                id_submenu: 42
            }
        },
        {
            path:'test-ppu',
            component: TestPPUComponent,
            data:{
                title: "Test PPU"
            }
        }
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MercadolibreRoutingModule { }
