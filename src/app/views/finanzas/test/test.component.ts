import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators,FormArray } from '@angular/forms'
import { FinanzasService } from '../../../service/finanzas.service';
import { CurrencyPipe } from '@angular/common';
import { SeleccionesDescuentos, RazonSocial,Patente,Etiqueta, SeleccionOperaciones, Centro ,Descuentos } from '../../../models/finanzas/descuentos.interface'
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
  providers: [CurrencyPipe]
})
export class TestComponent {

  private selectedFile: File | null = null;

  visible : boolean =false 

  pendiente : boolean =false

  listaDescuentos : Descuentos [] =[]
  listaDescuentosFull : Descuentos [] =[]

  toggleLiveDemo() {
    this.visible = !this.visible;

    this.selectedFile = null; // Reiniciar el archivo seleccionado al cerrar el modal
    if (document.getElementById('archivo_pdf')) (document.getElementById('archivo_pdf') as HTMLInputElement).value = '';
  }

  handleLiveDemoChange(event: any) {
    this.visible = event;
  }


  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  uploadFile(id_desc : any) {
    if (this.selectedFile) {

      // this.termino = false
      let id_usuario = sessionStorage.getItem('id')+""
      let ids_usuario = sessionStorage.getItem('server')+'-'+id_usuario
      const formData = new FormData();
      formData.append('file', this.selectedFile, this.selectedFile.name);

      this.service.subirArchivoAdjunto(formData, id_desc).subscribe(
        (data : any) => {

          // Lógica adicional en caso de éxito.
        },
        (error) => {
          console.error('Error al subir el archivo:', error);
          alert('Error al subir el archivo')
      
          // Lógica de manejo de errores.
        }
      );
      
    } else {
      console.warn('Ningún archivo seleccionado');
      // Lógica adicional en caso de que el usuario no seleccione ningún archivo.
    }
  }

  cambiarPendiente(){
    // this.pendiente = !this.pendiente

    this.listaDescuentos = this.listaDescuentosFull.filter((data) => data.Cobrada == this.pendiente )
  }

  seleccionRazonSocial : RazonSocial [] = []
  seleccionPantente : Patente [] = []
  seleccionEtiqueta : Etiqueta [] = []

  seleccionOperaciones : SeleccionOperaciones [] = []
  seleccionCentro : Centro [] = []

  // formDescuentos: FormGroup;
  formDescuentos: FormGroup;

  seleccionaCentro(event : any){
    const id = event.target.value

    console.log(id)

    this.seleccionCentro = this.seleccionOperaciones.filter((data) => data.Id_op == id )[0].Centros

  }


  constructor(private fb:FormBuilder, private service : FinanzasService){

    // this.formDescuentos = this.fb.group({
    //   Id_user : this.fb.control(sessionStorage.getItem("id")?.toString()+"", [Validators.required]),
    //   Ids_user : this.fb.control(sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+"", [Validators.required]),
    //   Monto : this.fb.control(0, [Validators.required] ),
    //   Cant_cuotas : this.fb.control("", [Validators.required] ),
    //   Cuotas : this.fb.array([]),
      
    // })

    this.formDescuentos = this.fb.group({
      Id_user : this.fb.control(sessionStorage.getItem("id")?.toString()+"", [Validators.required]),
      Ids_user : this.fb.control(sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+"", [Validators.required]),
      Fecha_evento : this.fb.control('' ),
      Pantente : this.fb.control(""),
      // Cuotas : this.fb.array([]),
      Razon_social : this.fb.control(""),
      Ruta : this.fb.control(""),
      Etiqueta : this.fb.control(""),
      Descripcion : this.fb.control(""),
      Adjunto : this.fb.control(""),
      Monto : this.fb.control(0, [Validators.required] ),
      Cant_cuotas : this.fb.control("", [Validators.required] ),
      Id_operacion : this.fb.control(""),
      Id_cop : this.fb.control(""),
      Cuotas : this.fb.array([]),
      // etiqueta : this.fb.control("")
    })

  }

  get Cuotas() : FormArray {
    return this.formDescuentos.get("Cuotas") as FormArray
  }

 
  newCuotas(): FormGroup {
    return this.fb.group({
      // Fecha_cobro: Optional[str]
      // Monto: Optional[int]
      Numero_cuota: '',
      Origen: 'Finanzas',
      Cobrada: this.fb.control(false),
      Fecha_comp: this.fb.control("", [Validators.required] ),
      Valor_cuota:'',
      Valor_cuota_formato: ''
    })
  }

  cantCuotas : string = '0'

  removeCarga() {
    // this.arrayCodigosProductos.splice(5,1)
    this.Cuotas.clear()
  }

  obtenerListaDescuentos(fecha_ini:string, fecha_fin:string){
    this.service.obtenerDescuentos(fecha_ini,fecha_fin).subscribe((data) => {
      // console.log(data)
      this.listaDescuentosFull = data
      this.listaDescuentos = data
    })
  }

  agregarCuotas(){

    this.removeCarga()

    const monto = this.formDescuentos.value.Monto 
    console.log(this.formDescuentos.value.Cant_cuotas)

    console.log(typeof(monto))
    if (typeof monto !== "number" || monto == 0 ) {
      return alert('Por favor agregue un monto')
    }

    for (let index = 0; index < parseInt(this.formDescuentos.value.Cant_cuotas); index++) {

      this.Cuotas.push(this.newCuotas());

      this.Cuotas.at(index).patchValue({
        Valor_cuota_formato :  new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(Math.round(monto / this.formDescuentos.value.Cant_cuotas)),
        Valor_cuota: Math.round(monto / this.formDescuentos.value.Cant_cuotas) ,
        Numero_cuota : index + 1
      })
    }
    
  }


  visibleActualizacion : boolean =false 


  toggleActualizacion() {
    this.visibleActualizacion = !this.visibleActualizacion;
  }

  handleActualizacion(event: any) {
    this.visibleActualizacion = event;
  }



  cobrado : boolean = false
  oc_cobro : string = ''
  id_detalle : number = 0

  cambiarEstadoCobro(){
    this.cobrado = !this.cobrado
  }

  DescuentoSeleccionado : Descuentos [] = []

  mostrarActualizacion(id_desc : number, cobrado : boolean, oc_cobro : string, dcto : Descuentos){

    this.DescuentoSeleccionado = [dcto]

    this.id_detalle = id_desc
    this.cobrado = cobrado
    this.oc_cobro = oc_cobro

    // oc_cobrod




    this.toggleActualizacion()

  }


  actualizarDetalle(){

    const data = {
      Id_detalle : this.id_detalle,
      Cobrado : this.cobrado,
      Oc_cobro : this.oc_cobro
    }

    this.service.actualizarDescuento(data).subscribe((data) => {

      this.listaDescuentosFull.map((data => {
        if (data.Id == this.id_detalle){
          data.Cobrada = this.cobrado
          data.Oc_cobro = this.oc_cobro
        }
      }))

      this.listaDescuentos = this.listaDescuentosFull

      // this.listaDescuentos.map((data => {
      //   if (data.Id == this.id_detalle){
      //     data.Cobrada = this.cobrado
      //     data.Oc_cobro = this.oc_cobro
      //   }
      // }))

      this.toggleActualizacion()
    })

    console.log(data)


  }

 
  fecha_ini : string = ""
  fecha_fin : string = ""


  currentDate : string = ''
  minDate : string = ''
  maxDate : string = ''

  rol =   sessionStorage.getItem("rol_id")+''


  obtenerFechas(){
    let hoy = new Date();

    let año = hoy.getFullYear();
    let mes = ("0" + (hoy.getMonth() + 1)).slice(-2); // Los meses comienzan en 0
    let día = ("0" + hoy.getDate()).slice(-2);

    this.currentDate = `${año}-${mes}-${día}`;

    hoy.setDate(hoy.getDate() - 4);

    let minAño = hoy.getFullYear();
    let minMes = ("0" + (hoy.getMonth() + 1)).slice(-2); // Los meses comienzan en 0
    let MinDía = ("0" + hoy.getDate()).slice(-2);
    this.minDate = `${minAño}-${minMes}-${MinDía}`;
  }

  ngOnInit(){

    this.obtenerFechas()

    this.service.seleccionesDescuentos().subscribe((data) => {
      this.seleccionRazonSocial = data.Razon_social
      this.seleccionPantente = data.Patentes
      this.seleccionEtiqueta = data.Etiquetas
    })

    this.service.seleccionesOperaciones().subscribe((data) => {
      console.log(data)
      this.seleccionOperaciones = data
    })

    // this.obtenerListaDescuentos('20240301','20250326')

  }

  guardarCuotas(){


    if (this.formDescuentos.valid){

      


      this.service.guardarDescuento(this.formDescuentos.value).subscribe((data) => {
        
      })
      // this.service.
      alert('felicudaes')
    }else{
      alert('Falta ingresar datos')
    }
  }
  

  guardar(){




    if (this.formDescuentos.valid){


      this.service.guardarDescuento(this.formDescuentos.value).subscribe((data : any) => {

        this.formDescuentos.reset()

        this.formDescuentos.patchValue({
          Id_user : sessionStorage.getItem("id")?.toString()+"",
          Ids_user : sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+"",
        })

        this.uploadFile(data.id)


        alert(data.message)

      })
      
    }else{
      alert('Falta ingresar datos')
    }
  }



DescargarNS(){
    const datos: any[][] = [[]];

    datos.push([
      'Fecha Cobro',
      'Ingresado Por',
       'Operación',
      'Centro Operación',
      'Ppu',
      'Razón Social',
      'Cuota',
      'Valor Cuota',
      'Total',
      'Etiqueta',
      'Descripción',
      'Cobrada',
      'Oc cobro',
      'Fecha evento',

    ])

    this.listaDescuentosFull.forEach((desc) => {
        const fila: any[] = [];

        fila.push(desc.Fecha_cobro,desc.Ingresado_por,desc.Operacion,desc.Centro_operacion,desc.Ppu,desc.Razon_social,desc.Cuota,desc.Valor_cuenta,desc.Total,
          desc.Etiqueta,desc.Descripcion,desc.Cobrada,desc.Oc_cobro,desc.Fecha_evento); 

        datos.push(fila);
      });

    let date = new Date();
    const fechaActual = date.toISOString().split('T')[0];
    // Crea un libro de Excel a partir de los datos
    const libroExcel: XLSX.WorkBook = XLSX.utils.book_new();
    const hoja: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(datos);
    XLSX.utils.book_append_sheet(libroExcel, hoja, 'Hoja1');

    // Descarga el archivo Excel `Quadminds_Manual_${fechaActual}.xlsx` 
    
    const nombreArchivo = `Lista-descuentos-${fechaActual}.xlsx`;
    // Nombre del archivo Excel a descargar 
    XLSX.writeFile(libroExcel, nombreArchivo);
  }


  descargarArchivoAdjunto(name_file : string){
    this.service.descargarArchivoAdjunto(name_file).subscribe((data : any) => {
      const blob = new Blob([data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;

      name_file = name_file.split('/')[name_file.split('/').length - 1]
      a.download = name_file;
      a.click();
      window.URL.revokeObjectURL(url);
    })
  }
  
}
