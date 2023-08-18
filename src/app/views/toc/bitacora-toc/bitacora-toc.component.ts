import { Component } from '@angular/core';
import { TocService } from 'src/app/service/toc.service'
import { FormControl, FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms'
import { ProductoToc } from 'src/app/models/productosToc.interface';
import { ComunasService } from 'src/app/service/comunas/comunas.service';
import { Subestados } from 'src/app/models/subestados.interface';
import { Codigo1 } from 'src/app/models/Codigos1.interface';
import { ObservacionTOC } from 'src/app/models/ObservacionesTOC.interface';

@Component({
  selector: 'app-bitacora-toc',
  templateUrl: './bitacora-toc.component.html',
  styleUrls: ['./bitacora-toc.component.scss']
})
export class BitacoraTocComponent {

  producto! : ProductoToc

  isSubmitDisabled : boolean = false

  isErrorView = false;

  listaRegiones : any [] = []
  listaComunas : any [] = []
  listaComunasFull : any [] = []

  listaSubestados : Subestados [] = []
  listaCodigos1 : Codigo1 [] = []

  listaObservaciones : ObservacionTOC [] = []

  constructor (private service :TocService,public builder: FormBuilder, private comunaService : ComunasService,) {}

  form = this.builder.group({
    Codigo_producto : this.builder.control(""),
    Fecha : this.builder.control("", [Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)]),
    PPU : this.builder.control(""),
    Guia: this.builder.control(""),
    Cliente : this.builder.control(""),
    Region : this.builder.control("", [Validators.required]),
    Comuna : this.builder.control("", [Validators.required]),
    Estado : this.builder.control(""),  
    Subestado : this.builder.control(""),  
    Driver : this.builder.control(""),  
    Nombre_cliente : this.builder.control(""),
    Fecha_compromiso : this.builder.control("", [Validators.required, Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)]),
    Direccion_correcta : this.builder.control(""),
    Comuna_correcta : this.builder.control("Puente Alto", [Validators.required]),
    Fecha_reprogramada : this.builder.control("", [Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)]),
    Observacion : this.builder.control(""),
    Subestado_esperado : this.builder.control(""), 
    Id_transyanez : this.builder.control(1, [Validators.required]),
    Ids_transyanez : this.builder.control("Ids_transyanez", [Validators.required]),
    Id_usuario : this.builder.control(sessionStorage.getItem("id")?.toString()+"", [Validators.required]),
    Ids_usuario : this.builder.control(sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+"", [Validators.required]),
    Alerta : this.builder.control(false, [Validators.required]),
    Codigo1 : this.builder.control(0),
    Codigo1Str: this.builder.control("")
  })

  ngOnInit(){
    this.comunaService.getListaRegiones().subscribe((data : any) => {
      this.listaRegiones = data
    })

    this.comunaService.getListaComunas().subscribe((data : any) => {
      this.listaComunas = data
      this.listaComunasFull = this.listaComunas
    })

    this.service.buscar_subestados().subscribe((data) => {
      this.listaSubestados = data
    })

    this.service.buscar_codigos1().subscribe((data) => {
      this.listaCodigos1 = data
    })

    this.observacionesUsuario(sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+"")

  }

  BuscarProducto(){
    const cod_producto : any = this.form.value.Codigo_producto
    this.service.buscar_producto_toc(cod_producto).subscribe((data) => {
      this.producto = data
      // const regionSeleccionada = this.listaComunasFull.filter(comuna => this.producto.Comuna == comuna.Nombre_comuna)[0].Id_region
      // console.log(regionSeleccionada)
      this.form.patchValue({
        Fecha : this.producto.Fecha,
        PPU : this.producto.Patente,
        Guia : this.producto.Guia,
        Cliente : this.producto.Cliente,
        Region : this.producto.Region,
        Estado : this.producto.Estado,
        Subestado : this.producto.Subestado,
        Driver : this.producto.Usuario_movil,
        Nombre_cliente : this.producto.Nombre_cliente,
        Fecha_compromiso : this.producto.Fecha_compromiso,
        Comuna :this.producto.Comuna,
        Comuna_correcta :this.producto.Comuna

      })
      // console.log(this.producto)
    },((error) => {
       alert(error.error.detail)
    }))
  }

  buscarComunas(event: any){
    const selectedRegionId = event.target.value;
    console.log('Región seleccionada:', selectedRegionId);
    this.listaComunas = this.listaComunasFull.filter( comuna => comuna.Id_region == selectedRegionId )
  }

  reiniciar(){
    this.form.reset()

    this.form.patchValue({
      Id_transyanez : 1,
      Ids_transyanez :"Ids_transyanez",
      Id_usuario : sessionStorage.getItem("id")?.toString()+"",
      Ids_usuario : sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+"",
      Alerta : false,
      Codigo1 : 0,
      Codigo1Str : ""
    })

    this.isErrorView = false

  }

  observacionesUsuario(id_usuario : string){
    this.service.buscar_observaciones_usuario(id_usuario).subscribe((data) => {
      this.listaObservaciones = data
    })
  }

  registrar(){
    this.isErrorView = false

    if(this.form.value.Fecha_reprogramada  == "" ) {
      this.form.patchValue({ Fecha_reprogramada : null})
    }
    console.log(this.form.value)
    if(this.form.valid){
      this.service.insert_bitacora_toc(this.form.value).subscribe((data : any) => {
        alert(data.message)
        this.form.reset();
  
        this.form.patchValue({
          Comuna_correcta : "Puente Alto",
          Id_transyanez : 1,
          Ids_transyanez :"Ids_transyanez",
          Id_usuario : sessionStorage.getItem("id")?.toString()+"",
          Ids_usuario : sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+"",
          Alerta : false,
          Codigo1 : 0
        })

        this.observacionesUsuario(sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+"")
      }, ((error) => {
        alert(error)
        this.form.patchValue({
          Comuna_correcta : "Puente Alto",
          Id_transyanez : 1,
          Ids_transyanez :"Ids_transyanez",
          Id_usuario : sessionStorage.getItem("id")?.toString()+"",
          Ids_usuario : sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+"",
          Alerta : false,
          Codigo1 : 0
        })
      }))
    }else{
      this.isErrorView = true
      alert("Hay datos incorrectos")
    }
  }
}
