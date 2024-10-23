import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { MainCampos, Comuna,TipoVehiculo,Region,GiroFactura,Paise,Tipo } from 'src/app/models//transporte/trabajemos.interface'
import { TrabajemosService } from 'src/app/service/trabajemos.service';
import { FormControl, FormGroup, FormBuilder, Validators,FormArray } from '@angular/forms'
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent{

  constructor(private service : TrabajemosService,public builder: FormBuilder,){}


  stars: boolean[] = [];

  isErrorView : boolean = false
  Comuna : Comuna [] = []
  listaComunasFull  : Comuna [] =[]
  TipoVehiculo : TipoVehiculo [] = []
  Region : Region [] = []
  GiroFactura : GiroFactura [] = []
  Paises : Paise [] = []
  TipoCar : Tipo [] = []
  TipoAdd : Tipo [] = []

 //// Form

 form = this.builder.group({
  Nombre_contacto: this.builder.control("", [Validators.required]),
  Apellido: this.builder.control("", [Validators.required]),
  Telefono: this.builder.control("", [Validators.pattern(/^\+?\d{7,15}$/)]),
  Pais: this.builder.control("", [Validators.required]),
  Correo: this.builder.control("", [Validators.required, Validators.email]),
  Region: this.builder.control("", [Validators.required]),
  Comuna: this.builder.control("", [Validators.required]),
  Cant_vehiculos: this.builder.control("", [Validators.required]),
  Ppu: this.builder.control("", [Validators.required, Validators.maxLength(6)]),
  Tipo_vehiculo: this.builder.control("", [Validators.required]),
  Tipo_carroceria: this.builder.control("", [Validators.required]),
  Tipo_adicionales: this.builder.control("", [Validators.required]),
  Metros_cubicos: this.builder.control("", [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]),
  Inicio_actividades_factura: this.builder.control(true, [Validators.required]),
  Giro: this.builder.control("1", [Validators.required])
});

  ngOnInit(){
    this.service.get_campos_registro().subscribe((data) => {
      this.Comuna = data.Comuna
      this.listaComunasFull = data.Comuna
      this.TipoVehiculo = data.Tipo_vehiculo
      this.Region = data.Region
      this.GiroFactura = data.Giro_factura
      this.Paises = data.Paises
      this.TipoCar = data.Tipo_carroceria
      this.TipoAdd = data.Tipo_adicionales
    })
  }

  CodigoTelefono : string = '+54'

  seleccionarPais(){

    this.CodigoTelefono = this.Paises.filter(p => p.Id.toString() == this.form.value.Pais )[0].Cod_telefono
    this.form.patchValue({
      Telefono : this.CodigoTelefono
    })
  }

  

  buscarComunas(event: any){
    const selectedRegionId = event.target.value;
    this.Comuna = this.listaComunasFull.filter( comuna => comuna.Id_region == selectedRegionId )
    this.form.patchValue({
      Comuna : this.Comuna[0].Id_comuna
    })
  }

  registrar(){
    this.isErrorView = false

    if(this.form.valid){
      
      /// aque va la api que realiza el registro

      this.service.registrar_externos(this.form.value).subscribe((data : any) => {
          alert(data.message)
      })
    }else{
      this.isErrorView = true
    }

  }

}
