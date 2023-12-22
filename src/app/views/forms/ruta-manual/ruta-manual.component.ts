import { Component } from '@angular/core';
import { RutasService } from 'src/app/service/rutas.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { ProductoPicking } from 'src/app/models/productoPicking.interface';
import * as XLSX from 'xlsx';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop'
// import * as levenshtein from 'fastest-levenshtein';

@Component({
  selector: 'app-ruta-manual',
  templateUrl: './ruta-manual.component.html',
  styleUrls: ['./ruta-manual.component.scss']
})

export class RutaManualComponent {
  isBlockButton: boolean = false
  pedidosIngresados : number = 0
  guardarClicked : boolean = false
  showTable : boolean = false
  Nombre_ruta! : string 
  idUsuario!: string
  idPedido! : string
  idPortal! : string
  arrayRuta! : ProductoPicking []
  arrayRutasIngresados : ProductoPicking[] [] = []
  rutasEnTabla : string [] = []

  posicion : number = 0
  fechaPedido!: string
  model! : NgbDateStruct

  observacionActual : string | null = ""

  isModalOpen: boolean = false
  public visible = false;

  //datos geo
  latitude!: number
  longitud! :number
  latStr!: string
  longStr!: string

  // isDE : boolean = false
  // isDP : boolean = false

  verAlertas : boolean = false

  public visibleLeyenda : boolean = false


  verModalLeyendas(){
    this.visibleLeyenda = !this.visibleLeyenda
  }

  handleLeyendaChange(event: any) {
    this.visibleLeyenda = event;
  }
  

  toggleLiveDemo() {
    this.visible = !this.visible;
  }

  handleLiveDemoChange(event: any) {
    this.visible = event;
  }
  
  openModal(){
    this.isModalOpen = true
  }

  closeModal(){
    this.isModalOpen = false
  }

  verObservacion(obs : string | null){
    if(obs === null || obs === ""){
      this.observacionActual = "Sin observación"
    }else{
      this.observacionActual = obs
    }
    this.toggleLiveDemo()
  }
  public svgContent!: SafeHtml;

  constructor(private service: RutasService, private http: HttpClient, private sanitizer: DomSanitizer) { }

  obtenerFechaActual(): string {
    const fecha = new Date();
    const year = fecha.getFullYear().toString();
    const month = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const day = fecha.getDate().toString().padStart(2, '0');
  
    return year + month + day;
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.arrayRutasIngresados, event.previousIndex, event.currentIndex);
  }


  getLocation(): any {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.showPosition(position)

      });
    } else {
      console.log("Localización no disponible");
    }
  }
  showPosition(position: any): any{
        this.latitude = position.coords.latitude
        this.longitud= position.coords.longitude 
       this.latStr = this.latitude.toString()
        this.longStr = this.longitud.toString()

    console.log("Longitud : " , this.longStr, "latitud :", this.latStr)
  }


  calcularDiferencias(arrayRuta : ProductoPicking []) {
    const fechaActual = new Date();
    arrayRuta.forEach(item => {
      const fecha = new Date(item.Fecha_pedido);
      const diferencia = fecha.getTime() - fechaActual.getTime();
      const diferenciaDias = Math.ceil(diferencia / (1000 * 60 * 60 * 24));
      item.Diferencias_dias = diferenciaDias;
    });
  }

  ngOnInit() {

    this.getLocation()
    this.loadSvg()

    this.idPortal = sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+""
    const fecha = new Date();

    let fechaFormateada = fecha.toISOString().split('T')[0];

    this.fechaPedido = fechaFormateada
  }
 //2906175306
  
  todosEnRuta(): boolean {
    console.log(this.arrayRutasIngresados)
    if (this.arrayRutasIngresados.length === 0){
      return this.isBlockButton = false
    }
    return this.isBlockButton = true;
  }

  getRuta(pedido: string) {
    var resultado = pedido.replace(/'/g, "-").trim().toUpperCase()
    resultado = resultado.replace(/-(\d+)/, "");

    
    console.log(resultado)

    if(this.rutasEnTabla.includes(resultado)) {
      this.idPedido = ""
      return alert("Este pedido ya fue ingresado")
    }
    
    this.idUsuario = sessionStorage.getItem("id")+""
    const fechaActual = this.obtenerFechaActual();
    this.Nombre_ruta = sessionStorage.getItem("id") + "-"+fechaActual

    console.log(this.Nombre_ruta)

    // this.idPortal = sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+""

    const body = {
      "id_usuario" : sessionStorage.getItem('id')+"",
      "cliente" : "",
      "n_guia" : resultado,
      "cod_pedido" : resultado,
      "cod_producto" : resultado,
      "ids_usuario" : this.idPortal,
      "latitud" : this.latStr,
      "longitud" : this.longStr
      // "cod_sku" : sku
    }
    
    console.log(this.arrayRutasIngresados.length)
    this.service.get_rutas_manual(body).subscribe((data) => { 
      this.posicion = this.arrayRutasIngresados.length + 1
      this.arrayRuta = data.map(objeto => {
        this.idPedido = ""
        console.log(objeto.Provincia)

        if(objeto.TOC || objeto.Sistema){
          this.verAlertas = true
        }
        
        return { ...objeto,
             DE : false,
             DP : false,
             Estado : objeto.Estado === "NO SACAR A RUTA" ? "Cancelado" : objeto.Estado,
             Nombre_ruta: this.Nombre_ruta, Created_by: this.idUsuario ,
             Id_tabla: resultado,
             Provincia : objeto.Provincia == null ? 'Otro' : objeto.Provincia
            };
      });

      if (this.arrayRutasIngresados.some((array) => array[0].Codigo_pedido === this.arrayRuta[0].Codigo_pedido)) 
      return alert("Este producto ya fue ingresado")
      
      this.calcularDiferencias(this.arrayRuta)
      this.arrayRutasIngresados.unshift(this.arrayRuta)
      this.pedidosIngresados = this.arrayRutasIngresados.length
      this.rutasEnTabla.push(resultado)
      this.todosEnRuta()
    },
    ((error) => {
      this.idPedido = ""
      alert(error.error.detail)
    }))

    this.todosEnRuta()
  }

  loadSvg() {
    this.http
      .get('assets/svg/icons8-delete-30.svg', { responseType: 'text' })
      .subscribe((svg: string) => {
        this.svgContent = this.sanitizer.bypassSecurityTrustHtml(svg);
      });
  }
  
  cambiarTicket(arrayRutaIndex: number, objectIndex: number, cod_producto: string) {
    this.arrayRutasIngresados[arrayRutaIndex][objectIndex].Pistoleado = "t";

    this.idPortal = sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+""

    const body = {
      "id_usuario" : sessionStorage.getItem('id')+"",
      "cliente" : this.arrayRutasIngresados[arrayRutaIndex][objectIndex].Notas,
      "n_guia" : cod_producto,
      "cod_pedido" : cod_producto,
      "cod_producto" : cod_producto,
      "ids_usuario" : this.idPortal
      // "cod_sku" : sku
    }

    this.service.update_estado_producto(cod_producto, body).subscribe((response : any) => {
        console.log(response.message)
        this.todosEnRuta()
    },(error) => {
      console.log(error)
      // alert(error)
    }
    )
    this.todosEnRuta()
  }
  
  cambiarTicketRutasNoActivas(arrayRutaIndex: number, objectIndex: number, valor: string) {
    this.arrayRutasIngresados[arrayRutaIndex][objectIndex].En_ruta = "t";
    // this.todosEnRuta()
  }
  
  deleteData(index:number, cod_producto : string,cod_pedido :string, index_producto : number) {
      const id_tabla = this.arrayRutasIngresados[index][index_producto].Id_tabla ;
      this.arrayRutasIngresados[index].splice(index_producto,1)

      if(this.arrayRutasIngresados[index].length == 0) {
        
        // console.log()
        this.arrayRutasIngresados.splice(index, 1);
        this.rutasEnTabla = this.rutasEnTabla.filter( pedido => pedido != id_tabla)

      }
      this.pedidosIngresados = this.arrayRutasIngresados.length
      // console.log("pedidos ingresados", this.pedidosIngresados)
      // console.log(this.rutasEnTabla)
      
      // console.log(this.rutasEnTabla)
      this.arrayRutasIngresados = this.arrayRutasIngresados.filter(subArray => subArray.length > 0);
      this.pedidosIngresados = this.arrayRutasIngresados.length
      this.todosEnRuta()
      // console.log(this.arrayRutasIngresados)
  }


  downloadExcel() : void{
    // Agrega una fila vacía al principio de los datos

    if (this.arrayRutasIngresados.length === 0){
      return alert("No se han ingresado rutas")
    }
    const datos: any[][] = [[]];

    datos.push(["Código del Cliente","Nombre","Calle y Número","Ciudad","Provincia/Estado","Latitud","Longitud","Teléfono con código de país",
                "Email","Código de Pedido","Fecha de Pedido","Operación E/R","Código de Producto","Descripción del Producto","Cantidad de Producto","Peso", 
                "Volumen","Dinero","Duración min","Ventana horaria 1","Ventana horaria 2","Notas","Agrupador",
                "Email de Remitentes","Eliminar Pedido Si - No - Vacío","Vehículo","Habilidades"])

    this.arrayRutasIngresados.forEach((arrays) => {
      arrays.forEach(producto => {
        const fila: any[] = [];
        fila.push(producto.Codigo_cliente, producto.Nombre, producto.Calle,producto.Ciudad, producto.Provincia,
                producto.Latitud, producto.Longitud, producto.Telefono,producto.Email, producto.Codigo_pedido,
                producto.Fecha_pedido, producto.Operacion, producto.Codigo_producto,producto.Descripcion_producto, producto.Cantidad_producto,
                producto.Peso, producto.Volumen, producto.Dinero, producto.Duracion_min, producto.Ventana_horaria_1,
                producto.Ventana_horaria_2, producto.Notas, producto.Agrupador,producto.Email_remitentes, producto.Eliminar_pedido,
                producto.Vehiculo, producto.Habilidades); 
        datos.push(fila);
      });
      
    });

    let date = new Date();
    const fechaActual = date.toISOString().split('T')[0];
    // Crea un libro de Excel a partir de los datos
    const libroExcel: XLSX.WorkBook = XLSX.utils.book_new();
    const hoja: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(datos);
    XLSX.utils.book_append_sheet(libroExcel, hoja, 'Hoja1');

    // Descarga el archivo Excel `Quadminds_Manual_${fechaActual}.xlsx` 
    
    const nombreArchivo = `Beetrack-${fechaActual}.xlsx`;
    // Nombre del archivo Excel a descargar 
    XLSX.writeFile(libroExcel, nombreArchivo);

    this.pedidosIngresados = 0
    this.arrayRutasIngresados = []
    this.idPedido = ""
    this.rutasEnTabla = []

    this.guardarClicked = false
  }

  CambiarDE(index : number, index_producto : number){
    this.arrayRutasIngresados[index][index_producto].DE = !this.arrayRutasIngresados[index][index_producto].DE;
  }
  CambiarDP(index : number, index_producto : number){
    this.arrayRutasIngresados[index][index_producto].DP = !this.arrayRutasIngresados[index][index_producto].DP;
  }

  agregarRutas(dateObj : any) {
    // console.log(this.arrayRutasIngresados)

    if (dateObj === undefined) {
      console.log("La fecha es",this.fechaPedido)
    }else {
      this.fechaPedido = `${dateObj.year}-${dateObj.month.toString().padStart(2, '0')}-${dateObj.day.toString().padStart(2, '0')}`;
      console.log("La fecha es",this.fechaPedido)
    }
    
    if (this.arrayRutasIngresados.length === 0){
      return alert("No se han ingresado rutas")
    }

    // this.arrayRutasIngresados.map(array => {
    //   console.log(array)
    // })

    // this.guardarClicked = true
      this.service.insert_rutas_manual(this.arrayRutasIngresados, this.fechaPedido).subscribe((response : any) => {
        // console.log(response)
        alert(response.message)
        this.guardarClicked = true
      },
      (error) => {
        alert(error.error.detail)
        return this.isBlockButton = true
        // console.log(error)
        // Maneja el error de manera adecuada
      }
      )

    console.log(this.arrayRutasIngresados)
    this.isBlockButton = false

    // this.todosEnRuta()
  }
}


