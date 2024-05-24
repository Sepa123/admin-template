import { Component, OnInit,  ElementRef, ViewChild} from '@angular/core';
import { Subscription } from 'rxjs';
import { RutasService } from 'src/app/service/rutas.service';
import { PortalTransyanezService } from "src/app/service/portal-transyanez.service";
import {PedidoCompromisoObligatorio } from 'src/app/models/rutas/pedidoCompromisoObligatorios.interface'
import { FormControl, FormGroup, FormBuilder, Validators,FormArray } from '@angular/forms'
import { ComunasService } from '../../../service/comunas/comunas.service'
import {bancos, formasPago, tipoCuenta, tipoVehiculo,  marcaVehiculo, caracteristicasVehiculo  } from 'src/app/models/enum/bancos.json'
import { Colaborador } from 'src/app/models/transporte/colaborador.interface' 
import { ModalidadDeOperacionesService } from 'src/app/service/modalidad-de-operaciones.service';
import { RazonSocial } from '../../../models/modalidad-de-operaciones.interface';
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent {


  pedidosObligatorios : PedidoCompromisoObligatorio [] = []

  constructor(private service: ModalidadDeOperacionesService,public builder: FormBuilder,private comunaService : ComunasService) { }

  isErrorView : boolean = false
  listaRegiones : any [] = []
  listaComunas : any [] = []
  listaComunasFull : any [] = []

  modalidadOperacion : RazonSocial []= []


  formCO = this.builder.group({
    Id_user : this.builder.control(sessionStorage.getItem("id")?.toString()+"", [Validators.required]),
    Ids_user : this.builder.control(sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+"", [Validators.required]),
    // Documentacion_comercial_banco : this.builder.control("" , [Validators.required]),
    Centro : this.builder.control("" ,[Validators.required] ),
    Region: this.builder.control("" ,[Validators.required] ),
    Descripcion : this.builder.control("", [Validators.required]),
    Id_op :this.builder.control("", )
  })


  ngOnInit() : void {
    this.comunaService.getListaRegiones().subscribe((data : any) => {
      this.listaRegiones = data
    })

    this.comunaService.getListaComunas().subscribe((data : any) => {
      this.listaComunas = data
      this.listaComunasFull = this.listaComunas
      this.formCO.patchValue({
        Region : '1'
      })
    })

    this.service.getRazonesSocial().subscribe((data) => {
      this.modalidadOperacion = data
      this.formCO.patchValue({
        Id_op : 'Seleccione una operación'
      })
    })

    
    // Uso de la función
    // console.log(Fn.validaRut('27962409-2') ? 'Valido' : 'inválido');

  }

  pv : boolean = true

  registrarCO(){
    console.log(this.formCO.value)
    if(this.formCO.valid){
      this.service.agregarCentroOperacion(this.formCO.value).subscribe((data : any) => {
        alert(data.message)
      }, error => alert(error.error.detail))
    }
  }


  /// Modulo Vehiculo


 ngOnDestroy(): void {


  }


  

}