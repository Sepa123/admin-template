import { Component } from '@angular/core';
import { Router } from '@angular/router';
// import { TIService } from 'src/app/service/ti.service';
import { RutasService } from 'src/app/service/rutas.service';
import { NombreRutaService } from 'src/app/service/nombre-ruta.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { ProductoPicking } from 'src/app/models/productoPicking.interface';
import * as XLSX from 'xlsx';
import { Subscription } from 'rxjs';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop'
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-editar-ruta',
  templateUrl: './editar-ruta.component.html',
  styleUrls: ['./editar-ruta.component.scss']
})
export class EditarRutaComponent {

  fechaPedido!: string
  model! : NgbDateStruct

  isLoadingTable : boolean = true
  idRutaEditar! : any
  nombreRutaEditar! : string 
  isBlockButton: boolean = true
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
  observacionAlerta : string = "Transportista rechaza producto"
  tituloObs : string = ""
  observacionActual : string | null = ""

  isModalOpen: boolean = false
  public visible = false;

  public svgContent!: SafeHtml;

  constructor(private service: RutasService, private http: HttpClient, private sanitizer: DomSanitizer, 
              private nombreRutaService : NombreRutaService, private router : Router ) { }

  subAlerta! : Subscription
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

  verAlertaConductor(producto : string, codigo : string){
    this.tituloObs = "Alerta "
    this.observacionActual = "Transportista rechaza producto "
    this.toggleLiveDemo()
  }

  verObservacion(obs : string | null){
    if(obs === null || obs === ""){
      this.observacionActual = "Sin observación"
    }else{
      this.observacionActual = obs
      if(this.observacionActual == this.observacionAlerta){
        this.tituloObs = "Alerta"
      }else{
        this.tituloObs = "Observación"
      }
    }
    this.toggleLiveDemo()
  }

  obtenerFechaActual(): string {
    const fecha = new Date();
    const year = fecha.getFullYear().toString();
    const month = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const day = fecha.getDate().toString().padStart(2, '0');
  
    return year + month + day;
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

  CambiarDE(index : number, index_producto : number){
    this.arrayRutasIngresados[index][index_producto].DE = !this.arrayRutasIngresados[index][index_producto].DE;
    console.log(this.arrayRutasIngresados)
  }
  CambiarDP(index : number, index_producto : number){
    this.arrayRutasIngresados[index][index_producto].DP = !this.arrayRutasIngresados[index][index_producto].DP;
    console.log(this.arrayRutasIngresados)
  }

  ngOnInit() {
    this.loadSvg()  
    
    const fecha = new Date();

    let fechaFormateada = fecha.toISOString().split('T')[0];

    this.fechaPedido = fechaFormateada

    this.idUsuario = sessionStorage.getItem("id")+""
    this.nombreRutaEditar = this.nombreRutaService.getCodigo()
    // this.nombreRutaEditar= '03152-1190-20231219'
    this.service.get_ruta_by_nombre_ruta(this.nombreRutaEditar).subscribe((data) => {
      this.arrayRuta = data
      this.idRutaEditar = this.arrayRuta[0].Id_ruta
      this.fechaPedido = this.arrayRuta[0].Fecha_ruta+""
      const agrupadoPorPosicion : any = {};
      data.forEach((elemento) => {

        if(elemento.TOC || elemento.Sistema || elemento.Alerta_conductor){
          this.verAlertas = true
        }
        // Obtenemos la posición del elemento
        const posicion = elemento["Posicion"];
        elemento["Estado"] = elemento["Estado"] === "Entregado" ? true : false
        elemento["Provincia"] =  elemento["Provincia"] === null  ? 'Otro' : elemento["Provincia"]

        
        // elemento["DP"] = false
        // Si la posición no está present e en el objeto agrupadoPorPosicion,
        // la inicializamos como un array vacío

        if (!agrupadoPorPosicion.hasOwnProperty(posicion)) {
            agrupadoPorPosicion[posicion] = [];
        }
    
        // Agregamos el elemento actual al array correspondiente a su posición
        agrupadoPorPosicion[posicion].push(elemento);

        this.pedidosIngresados = posicion

        
    });
    
    // Convertimos el objeto en un array de arrays
    const arrayDeArray : ProductoPicking [] [] = Object.values(agrupadoPorPosicion);
    
    // Imprimimos el resultado
    console.log( "Array de array",arrayDeArray);

    arrayDeArray.forEach(array => {
      this.arrayRutasIngresados.push(array)
    });

      
    this.calcularDiferencias(this.arrayRuta)

    this.getAlertaConductor(this.nombreRutaEditar)

      // this.arrayRutasIngresados.unshift(this.arrayRuta)
      this.isLoadingTable = false
      console.log(this.idRutaEditar)
      console.log(this.arrayRutasIngresados)
    })

    

  }
 //2906175306

  eliminaFila(index : number, arrayRuta : ProductoPicking []){  

    console.log(index + 1)
    console.log(arrayRuta)
    let isSeguro = confirm("¿Seguro que desea eliminar estos productos?");
    if (!isSeguro) return console.log("no esta seguro")

    let lista = arrayRuta.map((ruta) => ruta.Codigo_pedido).join(',')
    const body = {
      nombre_ruta : this.nombreRutaEditar,
      lista : lista
    }

    console.log(body)

    this.service.eliminar_productos_por_fila(body).subscribe((data : any ) => {
      this.arrayRutasIngresados.splice(index,1)
      if(data.mostrar == true) {
        alert(data.message)
      }
    })
  }


  getAlertaConductor(nombre_ruta: string){
    let carga_actual 
    this.subAlerta = this.service.alerta_conductor_rutas(nombre_ruta).subscribe(data => {
      this.arrayRutasIngresados.map(objeto =>{
        objeto.map(producto=>{
          carga_actual = data.find( carga => carga.Codigo_producto == producto.Codigo_producto && carga.Descripcion == producto.Descripcion_producto)
          producto.Alerta_conductor = carga_actual?.Alerta_conductor

          if(producto.TOC || producto.Sistema || producto.Alerta_conductor){
            this.verAlertas = true
          }
          console.log(this.verAlertas)
        })
      })
    })
  }

  todosEnRuta(): boolean {
    console.log(this.arrayRutasIngresados)
    if (this.arrayRutasIngresados.length === 0){
      return this.isBlockButton = false
    }
    return this.isBlockButton = true;
  }
  
  // todosEnRuta(): boolean {
  //   console.log(this.arrayRutasIngresados)
  //   if (this.arrayRutasIngresados.length === 0){
  //     return this.isBlockButton = false
  //   }
  //   for (const subArray of this.arrayRutasIngresados) {
  //     for (const item of subArray) {
  //       if (item.Pistoleado == false) {
  //         return this.isBlockButton = false;
  //       }
  //     }
  //   }
  //   return this.isBlockButton = true;
  // }

  getRuta(pedido: string) {
    var resultado = pedido.replace(/'/g, "-").trim().toUpperCase()
    
    resultado = resultado.replace(/-(\d+)/, "");

    if(this.rutasEnTabla.includes(resultado)) {
      this.idPedido = ""
      return alert("Este pedido ya fue ingresado")
    }
    
    this.idUsuario = sessionStorage.getItem("id")+""
    const fechaActual = this.obtenerFechaActual();
    this.Nombre_ruta = sessionStorage.getItem("id") + "-"+fechaActual
    
    this.service.get_rutas_manual(resultado).subscribe((data) => { 
      this.arrayRuta = data.map(objeto => {
        this.idPedido = ""

        if(objeto.TOC || objeto.Sistema || objeto.Alerta_conductor){
          this.verAlertas = true
        }
        return { ...objeto,
            DE : false,
            DP : false,
            Estado_entrega : objeto.Estado === "NO SACAR A RUTA" ? "Cancelado" : objeto.Estado,
            Estado : objeto.Estado === "Entregado" ? true : false,
            Id_ruta : this.idRutaEditar,
            Nombre_ruta: this.nombreRutaEditar, 
            Created_by: this.idUsuario ,
            Id_tabla: resultado,
            Provincia : objeto.Provincia == null ? 'Otro' : objeto.Provincia
          };
      });

      console.log(this.arrayRutasIngresados.some((array) => array[0].Codigo_pedido === this.arrayRuta[0].Codigo_pedido))
      if (this.arrayRutasIngresados.some((array) => array[0].Codigo_pedido === this.arrayRuta[0].Codigo_pedido)) 
      return alert("Este producto ya fue ingresado")
      
      this.calcularDiferencias(this.arrayRuta)
      this.arrayRutasIngresados.unshift(this.arrayRuta)


      this.arrayRutasIngresados.forEach((array, i) => {
        array.forEach(ruta => {
          ruta.Posicion = i + 1
        })
      })
      console.log(this.arrayRutasIngresados)
      this.pedidosIngresados = this.arrayRutasIngresados.length
      this.rutasEnTabla.push(resultado)
      this.todosEnRuta()
      
    },
    ((error) => {
      this.idPedido = ""
      alert(error.error.detail)
    }))
    console.log(this.arrayRutasIngresados)
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
    console.log(cod_producto)
    let isSeguro = confirm("¿Seguro que desea eliminar esta producto?");
    if (!isSeguro) return console.log("no esta seguro")

    this.service.delete_producto_ruta_activa(cod_producto, this.nombreRutaEditar).subscribe((data : any) => {
      alert(data.message)
    },
    ((error) => {
      alert(error.error.detail)
    }))
    
      const id_tabla = this.arrayRutasIngresados[index][index_producto].Id_tabla ;
      this.arrayRutasIngresados[index].splice(index_producto,1)

      if(this.arrayRutasIngresados[index].length == 0) {
        
        // console.log()
        this.arrayRutasIngresados.splice(index, 1);
        this.rutasEnTabla = this.rutasEnTabla.filter( pedido => pedido != id_tabla)

      }
      this.pedidosIngresados = this.arrayRutasIngresados.length
      this.arrayRutasIngresados = this.arrayRutasIngresados.filter(subArray => subArray.length > 0);
      this.pedidosIngresados = this.arrayRutasIngresados.length

      this.arrayRutasIngresados.forEach((array, i) => {
        array.forEach(ruta => {
          ruta.Posicion = i + 1
        })
      })

      this.todosEnRuta()
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
      
      // fila.push(producto.Codigo_cliente, producto.Nombre, producto.Calle,producto.Ciudad, producto.Provincia,
      //           producto.Latitud, producto.Longitud, producto.Telefono,producto.Email, producto.Codigo_pedido,
      //           producto.Fecha_pedido, producto.Operacion, producto.Codigo_producto,producto.Descripcion_producto, producto.Cantidad_producto,
      //           producto.Peso, producto.Volumen, producto.Dinero, producto.Duracion_min, producto.Ventana_horaria_1,
      //           producto.Ventana_horaria_2, producto.Notas, producto.Agrupador,producto.Email_remitentes, producto.Eliminar_pedido,
      //           producto.Vehiculo, producto.Habilidades); 
    
      // datos.push(fila);
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

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.arrayRutasIngresados, event.previousIndex, event.currentIndex);

    this.arrayRutasIngresados.forEach((array, i) => {
      array.forEach(ruta => {
        ruta.Posicion = i + 1
      })
    })

  }

  agregarRutaExistente() {
    // console.log(this.arrayRutasIngresados)
    // this.arrayRutasIngresados.pop()
    if (this.model === undefined) {
      console.log("La fecha es",this.fechaPedido)
    }else {
      this.fechaPedido = `${this.model.year}-${this.model.month.toString().padStart(2, '0')}-${this.model.day.toString().padStart(2, '0')}`;
      console.log("La fecha es",this.fechaPedido)
    }

    console.log(this.arrayRutasIngresados)
    if (this.arrayRutasIngresados.length === 0){
      alert("No se han ingresado producto nuevos a la ruta")
      this.router.navigate(['/picking/rutas-activas']);
    }


    let isSeguro = confirm("¿Seguro que desea guardar esta ruta?");
    if (!isSeguro) return console.log("no esta seguro")


    // alert(this.fechaPedido)
    this.guardarClicked = true
      this.service.insert_ruta_existente_activa(this.fechaPedido,this.arrayRutasIngresados).subscribe((response : any) => {
        // console.log(response)
        alert(response.message)
        this.guardarClicked = true
        this.router.navigate(['/picking/rutas-activas']);
      },
      (error) => {
        alert(error.error.detail)
        // console.log(error)
        // Maneja el error de manera adecuada
      }
      )

    // this.pedidosIngresados = 0
    // this.arrayRutasIngresados = []
    // this.idPedido = ""
    // this.rutasEnTabla = []

    this.isBlockButton = false

    // this.todosEnRuta()
  }

  ngOnDestroy(): void {
    // Cancelar la suscripción al destruir el componente

    this.subAlerta.unsubscribe();
  }
}

