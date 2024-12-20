import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators,FormArray } from '@angular/forms'
import { FinanzasService } from 'src/app/service/finanzas.service';

import { SeleccionesDescuentos, RazonSocial,Patente,Etiqueta } from 'src/app/models/finanzas/descuentos.interface'


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent {

  private selectedFile: File | null = null;

  visible : boolean =false 

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

  // formDescuentos: FormGroup;
  formDescuentos: FormGroup;


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
    })
  }

  cantCuotas : string = '0'

  removeCarga() {
    // this.arrayCodigosProductos.splice(5,1)
    this.Cuotas.clear()
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
        Valor_cuota : Math.round(monto / this.formDescuentos.value.Cant_cuotas),
        Numero_cuota : index + 1
      })
    }
    
  }

 


  ngOnInit(){

    this.service.seleccionesDescuentos().subscribe((data) => {
      this.seleccionRazonSocial = data.Razon_social
      this.seleccionPantente = data.Patentes
      this.seleccionEtiqueta = data.Etiquetas
    })

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
