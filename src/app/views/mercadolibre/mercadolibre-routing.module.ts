import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InfoMercadoLibreComponent } from './info-mercado-libre/info-mercado-libre.component';


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
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MercadolibreRoutingModule { }
