import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators,FormArray } from '@angular/forms'
import { FinanzasService } from '../../../service/finanzas.service';

import { SeleccionesDescuentos, RazonSocial,Patente,Etiqueta, SeleccionOperaciones, Centro ,Descuentos } from '../../../models/finanzas/descuentos.interface'


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent {

  private selectedFile: File | null = null;

  visible : boolean =false 

  listaDescuentos : Descuentos [] =[]

  toggleLiveDemo() {
    this.visible = !this.visible;
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

  cambiarEstadoCobro(){
    this.cobrado = !this.cobrado
  }

  mostrarActualizacion(id_desc : number, cobrado : boolean, oc_cobro : string){


    this.cobrado = cobrado
    this.oc_cobro = oc_cobro

    // oc_cobrod


    this.toggleActualizacion()

  }


  actualizarDetalle(){
    
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
        
        this.uploadFile(data.id)


        alert(data.message)

      })
      
    }else{
      alert('Falta ingresar datos')
    }
  }
  
}
