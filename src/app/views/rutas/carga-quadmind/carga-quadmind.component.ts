import { Component ,AfterViewInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CargaService } from 'src/app/service/carga.service';

@Component({
  selector: 'app-carga-quadmind',
  templateUrl: './carga-quadmind.component.html',
  styleUrls: ['./carga-quadmind.component.scss']
})
export class CargaQuadmindComponent {
  private selectedFile: File | null = null;

  termino : boolean = true

  constructor(private http: HttpClient, private service : CargaService) {}


  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  uploadFile() {

  
    if (this.selectedFile) {

      this.termino = false
      let id_usuario = sessionStorage.getItem('id')+""
      const formData = new FormData();
      formData.append('file', this.selectedFile, this.selectedFile.name);

      this.service.upload_quadmind_manual(formData, id_usuario).subscribe(
        (data : any) => {


          this.termino = data.termino

          alert(data.message)
          console.log('Archivo subido exitosamente');
          // Lógica adicional en caso de éxito.
        },
        (error) => {
          console.error('Error al subir el archivo:', error);
          alert('Error al subir el archivo')
          this.termino = true
          // Lógica de manejo de errores.
        }
      );
      
    } else {
      console.warn('Ningún archivo seleccionado');
      // Lógica adicional en caso de que el usuario no seleccione ningún archivo.
    }
  }

  cargarId(){
    let id_usuario = sessionStorage.getItem('id')+""
    console.log(id_usuario)
    this.service.asignar_ruta_quadmind(Number(id_usuario)).subscribe(data => {
      console.log(data)
    })
  }
}
