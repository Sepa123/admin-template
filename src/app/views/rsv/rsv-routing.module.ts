import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { AgregarProductoComponent } from './agregar-producto/agregar-producto.component';
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
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RsvRoutingModule { }
