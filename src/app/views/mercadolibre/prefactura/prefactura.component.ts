import { Component, OnInit,  ElementRef, ViewChild} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RazonSocial } from 'src/app/models/modalidad-de-operaciones.interface';
import { CentroOperacion } from 'src/app/models/operacion/centroOperacion.interface';
import { ModalidadDeOperacionesService } from 'src/app/service/modalidad-de-operaciones.service';
import { RegistrarUsuarioService } from 'src/app/service/registrar-usuario.service'
import { MeliService } from 'src/app/service/meli.service'
import { Prefactura } from "src/app/models/meli/prefactura.interface"
@Component({
  selector: 'app-prefactura',
  templateUrl: './prefactura.component.html',
  styleUrls: ['./prefactura.component.scss']
})
export class PrefacturaComponent {
  private selectedFile: File | null = null;
  ListaPrefacturaFull : Prefactura [] =[]
  ListaPrefactura : Prefactura [] =[]

  termino : boolean = true
  error! : number  
  codigosErroneos : string [] = []
  message : string = ""

  contador : number = 1
  regionSeleccionada: string = 'Todas'
  comunas!: string [];
  comunasSeleccionadas: string[] = [];

  arrCodProducto : string [] = [] 

  arrDescripcion : string [] = []

  tiendas : string [] = ['/sportex','/electrolux','/retiro_tienda','/easy_opl','/easy_cd']

  tiendaActual : string  = ""
  loadingQuadmind: boolean = true 

  loadQuadmindFull: boolean = true 


  constructor(private service: MeliService) { }

  ngOnInit(){
    this.service.getDatosPrefactura().subscribe((data) =>{ 
      this.ListaPrefacturaFull = data

      this.ListaPrefactura = data
    })
  }

  
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  uploadFile() {
    if (this.selectedFile) {

      this.termino = false
      let id_usuario = sessionStorage.getItem('id')+""
      let ids_usuario = sessionStorage.getItem('server')+'-'+id_usuario
      const formData = new FormData();
      formData.append('file', this.selectedFile, this.selectedFile.name);

      this.service.subirExcelPrefactura(formData, id_usuario,ids_usuario).subscribe(
        (data : any) => {
          this.termino = data.termino
          this.error = data.error
          if ( this.error == 1){
            this.codigosErroneos = data.codigos.split(',')
          }
          this.message = data.message
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

  

}
