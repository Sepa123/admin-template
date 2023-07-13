import { Component } from '@angular/core';
// import { TIService } from 'src/app/service/ti.service';
import { RutasService } from 'src/app/service/rutas.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { ProductoPicking } from 'src/app/models/productoPicking.interface';
import * as XLSX from 'xlsx';
import * as levenshtein from 'fastest-levenshtein';


@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent {
  isBlockButton: boolean = false
  pedidosIngresados : number = 0
  guardarClicked : boolean = false
  showTable : boolean = false
  Nombre_ruta! : string 
  idUsuario!: string
  idPedido! : string

  arrayRuta! : ProductoPicking []
  arrayRutasIngresados : ProductoPicking[] [] = []
  rutasEnTabla : string [] = []

  public svgContent!: SafeHtml;

  constructor(private service: RutasService, private http: HttpClient, private sanitizer: DomSanitizer) { }

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

  ngOnInit() {
    this.loadSvg()
  }
 //2906175306
  
  todosEnRuta(): boolean {
    console.log(this.arrayRutasIngresados)
    if (this.arrayRutasIngresados.length === 0){
      return this.isBlockButton = false
    }
    for (const subArray of this.arrayRutasIngresados) {
      for (const item of subArray) {
        if (item.Pistoleado == "f") {
          return this.isBlockButton = false;
        }
      }
    }
    return this.isBlockButton = true;
  }

  getRuta(pedido: string) {
    var resultado = pedido.replace(/'/g, "-").trim().toUpperCase()
    
    resultado = resultado.replace(/-(\d+)/, "");


    // const distanciaMinima = 1; // Definir la distancia mínima aceptable1
    // const codigoDuplicado = this.rutasEnTabla.find(codigo => levenshtein.distance(resultado, codigo) <= distanciaMinima);

    // if (codigoDuplicado) {
    //   this.idPedido = ""
    //   return alert("Este producto ya fue ingresado")
    // } else {
    //   console.log('Código válido');
    // }
    if(this.rutasEnTabla.includes(resultado)) {
      this.idPedido = ""
      return alert("Este pedido ya fue ingresado")
    }

    // for (let i = 0; i < this.rutasEnTabla.length; i++) {
    //   for (let j = i + 1; j < this.rutasEnTabla.length; j++) {
    //     const distance = LevenshteinDistance(this.rutasEnTabla[i], this.rutasEnTabla[j]);
    //     console.log(`Distancia entre "${this.rutasEnTabla[i]}" y "${this.rutasEnTabla[j]}": ${distance}`);
    //   }
    // }
    
    this.idUsuario = sessionStorage.getItem("id")+""
    const fechaActual = this.obtenerFechaActual();
    this.Nombre_ruta = sessionStorage.getItem("id") + "-"+fechaActual
    
    this.service.get_rutas_manual(resultado).subscribe((data) => { 
      this.arrayRuta = data.map(objeto => {
        this.idPedido = ""
        return { ...objeto,
             Estado : objeto.Estado === "Entregado" ? true : false,
             Nombre_ruta: this.Nombre_ruta, Created_by: this.idUsuario ,
             Id_tabla: resultado};
      });

      console.log(this.arrayRutasIngresados.some((array) => array[0].Codigo_pedido === this.arrayRuta[0].Codigo_pedido))
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

    let body = { "cod_producto": cod_producto }
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
  
  // function eliminarObjetoPorId(array, idAEliminar) {
  //   const nuevoArray = array.map(subArray => {
  //     return subArray.filter(objeto => objeto.id !== idAEliminar);
  //   });
  deleteData(index:number, cod_producto : string,cod_pedido :string, index_producto : number) {
      // this.arrayRutasIngresados = this.arrayRutasIngresados.filter((_, i) => i !== index);
      // this.arrayRutasIngresados = this.arrayRutasIngresados.map((ruta) => {
      //   this.rutasEnTabla = this.rutasEnTabla.filter( pedido => pedido != cod_producto)
      //   this.arrayRutasIngresados[index].splice(index_producto, 1);
      //   return ruta.filter((producto,index) => index !== index_producto)
      // })
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

  agregarRutas() {
    // console.log(this.arrayRutasIngresados)
    
    if (this.arrayRutasIngresados.length === 0){
      return alert("No se han ingresado rutas")
    }


    // this.pedidosIngresados = 0
    // this.arrayRutasIngresados = []
    // this.idPedido = ""
    // this.rutasEnTabla = []

    this.isBlockButton = false

    // this.todosEnRuta()
  }
}
