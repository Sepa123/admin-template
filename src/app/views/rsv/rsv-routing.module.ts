import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { AgregarProductoComponent } from './agregar-producto/agregar-producto.component';
import { CrearCargaComponent } from './crear-carga/crear-carga.component';
import { VentasComponent } from './ventas/ventas.component';
import { RecepcionComponent } from './recepcion/recepcion.component';
import { ListarCargaComponent } from './listar-carga/listar-carga.component';
import { InventarioSucursalesComponent } from './inventario-sucursales/inventario-sucursales.component';
import { UbicacionComponent } from './ubicacion/ubicacion.component';
import { FiltroUbicacionComponent } from './filtro-ubicacion/filtro-ubicacion.component';
import { ListaVentasComponent } from './lista-ventas/lista-ventas.component';
import { ListarPaquetesAbiertosComponent } from './listar-paquetes-abiertos/listar-paquetes-abiertos.component';
import { MantenedorComponent } from './mantenedor/mantenedor.component';
import {UnidadSinEtiquetaComponent} from './unidad-sin-etiqueta/unidad-sin-etiqueta.component'
import { ArmarVentaComponent } from './armar-venta/armar-venta.component';
import { ReporteEtiquetasComponent } from './reporte-etiquetas/reporte-etiquetas.component';

const routes: Routes = [
  {
    path:'',
    data : {
      title: "RSV"
    },
    children : [
      {
        path : 'catalogo',
        component : CatalogoComponent,
        data : {
          title : "Catalogo"
        }
      },
      {
        path : 'agregar-producto',
        component : AgregarProductoComponent,
        data : {
          title : "Agregar producto"
        }
      },
      {
        path : 'crear-carga',
        component : CrearCargaComponent,
        data : {
          title : "Agregar producto"
        }
      },
      {
        path : 'ventas',
        component : VentasComponent,
        data : {
          title : "Ventas"
        } 
      },
      {
        path : 'recepcion',
        component : RecepcionComponent,
        data : {
          title : "Recepción"
        } 
      },
      {
        path : 'listar-carga',
        component : ListarCargaComponent,
        data : {
          title : "Recepción"
        } 
      },
      {
        path : 'inventario-sucursal',
        component : InventarioSucursalesComponent,
        data : {
          title : "Inventario Sucursal"
        } 
      },
      {
        path : 'ubicacion-producto',
        component : UbicacionComponent,
        data : {
          title : "Inventario Sucursal"
        }
      },
      {
        path : 'filtro-ubicacion',
        component : FiltroUbicacionComponent,
        data : {
          title : "Ubicacion"
        } 
      },
      {
        path : 'lista-venta',
        component : ListaVentasComponent,
        data : {
          title : "Lista Ventas"
        } 
      },
      {
        path : 'listar-paquetes',
        component : ListarPaquetesAbiertosComponent,
        data : {
          title : "Lista Paquetes"
        } 
      },
      {
        path : 'mantenedor',
        component : MantenedorComponent,
        data : {
          title : "Mantenedor"
        } 
      },
      {
        path: 'unidad-sin-etiqueta',
        component: UnidadSinEtiquetaComponent,
        data:{
          title: "Unidades Sin Etiqueta"
        }
      },
      {
        path: 'armar-venta',
        component: ArmarVentaComponent,
        data:{
          title: "Armar venta"
        }
      },
      {
        path: 'reporte-etiquetas',
        component: ReporteEtiquetasComponent,
        data:{
          title: "Reporte etiquetas"
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RsvRoutingModule { }
