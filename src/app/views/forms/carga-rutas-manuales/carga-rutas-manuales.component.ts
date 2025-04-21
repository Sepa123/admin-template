import { Component } from '@angular/core';
import { RutasService } from 'src/app/service/rutas.service';


@Component({
  selector: 'app-carga-rutas-manuales',
  templateUrl: './carga-rutas-manuales.component.html',
  styleUrls: ['./carga-rutas-manuales.component.scss']
})
export class CargaRutasManualesComponent {

  private selectedFile: File | null = null;

  constructor(private service : RutasService) { }


  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  subirExcelruta() {

    console.log(this.selectedFile);

    if (this.selectedFile) {
      let id_usuario = sessionStorage.getItem('id')+""
      const formData = new FormData();
      formData.append('file', this.selectedFile, this.selectedFile.name);
    
    this.service.upload_clientes_rutas_manuales(formData,1020,"hela-1020").subscribe(
      (data : any) => {
        alert(data.message)
        console.log('Archivo subido exitosamente');
        // Lógica adicional en caso de éxito.
      }
    )
  }else{
    console.warn('Ningún archivo seleccionado');
    // Lógica adicional en caso de que el usuario no seleccione ningún archivo.
  }
}

}
