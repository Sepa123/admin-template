import { Component } from '@angular/core';
import { RutasService } from 'src/app/service/rutas.service';
import { ClientesTy,RutasTy,RutasTyTemp } from '../../../models/rutas/rutas.interface';


@Component({
  selector: 'app-carga-rutas-manuales',
  templateUrl: './carga-rutas-manuales.component.html',
  styleUrls: ['./carga-rutas-manuales.component.scss']
})
export class CargaRutasManualesComponent {

  private selectedFile: File | null = null;

  today = new Date();

  constructor(private service : RutasService) { }

  
  Clientes_ty: ClientesTy[] = [];

  clienteSeleccionado : number = 0


  // ###### Variables para la tabla de rutas temporales

  cantRutas : number = 0
  procesables: number = 0
  noProcesables: number = 0

  listaRutasTyTemp: RutasTyTemp[] = [];

  visible: boolean = false;


  toggleLiveDemo() {
    this.visible = !this.visible;
  }

  handleLiveDemoChange(event: any) {
    this.visible = event;
  }
  

  ngOnInit(): void {
    // Aquí puedes realizar cualquier inicialización necesaria
    this.service.get_campos_modulo_clientes().subscribe(
      (data) => {
        this.Clientes_ty = data.Clientes_ty;
        // Lógica adicional en caso de éxito.
      }
    )

  }

  nombreArchivo : string = "Ningún archivo seleccionado"


  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    console.log(event.target.files[0].name)
    this.nombreArchivo = event.target.files[0].name
  }

  cancelarTablaTemporal(){
    this.selectedFile = null
    this.nombreArchivo = "Ningún archivo seleccionado"
    this.toggleLiveDemo()
  }

  subirExcelruta() {

    console.log(this.clienteSeleccionado);

    // if(this.clienteSeleccionado == 0){
      
    //   return alert("Seleccione un cliente")
    // }
    const cliente = this.Clientes_ty.filter(cliente => cliente.Id_cliente == this.clienteSeleccionado)[0].Cliente

    if (this.selectedFile) {
      let id_usuario = sessionStorage.getItem('id')+""
      const formData = new FormData();
      formData.append('file', this.selectedFile, this.selectedFile.name);

    
    this.service.get_lista_rutas_manuales_temp(id_usuario).subscribe( data => {
      this.listaRutasTyTemp = data

      console.log(this.listaRutasTyTemp)

      
      this.cantRutas = this.listaRutasTyTemp.length

      this.procesables = this.listaRutasTyTemp.filter(ruta => ruta.Proceder == true).length
      this.noProcesables = this.listaRutasTyTemp.filter(ruta => ruta.Proceder == false).length

      this.toggleLiveDemo()
    })
    
    // this.service.upload_clientes_rutas_manuales(formData,id_usuario,"hela-1020",cliente,this.clienteSeleccionado).subscribe(
    //   (data : any) => {
    //     alert(data.message)
    //     console.log('Archivo subido exitosamente');
    //     // Lógica adicional en caso de éxito.
    //   }
    // )
  }else{
    console.warn('Ningún archivo seleccionado');
    // Lógica adicional en caso de que el usuario no seleccione ningún archivo.
  }
}



  // ##### buscar la lista de rutas 

  fecha_inicio : string = ""
  fecha_fin : string = ""

  listaRutas : RutasTy[] = []


  buscarListaRutas(bloque: string){


    this.service.get_lista_rutas_manuales(this.fecha_inicio,this.fecha_fin,bloque).subscribe( data => {
      this.listaRutas = data

      console.log(data)
    })
    

  }

}
