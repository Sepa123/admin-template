import { Component } from '@angular/core';
import { RsvService } from 'src/app/service/rsv.service'
import { CatalogoRSV,ColoresRSV } from 'src/app/models/catalogoRSV.iterface';

@Component({
  selector: 'app-unidad-sin-etiqueta',
  templateUrl: './unidad-sin-etiqueta.component.html',
  styleUrls: ['./unidad-sin-etiqueta.component.scss']
})
export class UnidadSinEtiquetaComponent {

  catalogoRSV: CatalogoRSV [] = []

    constructor ( private service: RsvService){}

    obtenerCatalogo(){
        this.service.get_unidades_sin_etiqueta_rsv().subscribe((data) => {
          this.catalogoRSV = data
          console.log(this.catalogoRSV, "catalogo")
        })
      }

      ngOnInit(){

        this.obtenerCatalogo()
      }

}
