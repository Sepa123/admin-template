import { Component,Input,Output ,EventEmitter} from '@angular/core';
import { TocService } from 'src/app/service/toc.service'
import { FormControl, FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms'
import { ComunasService } from 'src/app/service/comunas/comunas.service';
import { Codigo1 } from 'src/app/models/Codigos1.interface';
import { Subestados } from 'src/app/models/subestados.interface';
import { AlertaExistenteTOC } from 'src/app/models/editarTOC.interface';

@Component({
  selector: 'app-editar-toc',
  templateUrl: './editar-toc.component.html',
  styleUrls: ['./editar-toc.component.scss']
})
export class EditarTocComponent {
  @Input() alerta: AlertaExistenteTOC [] = [];
  @Input() codigoTY: string = "" ;
  @Output() funcionEjecutada = new EventEmitter<void>();

  constructor( private service : TocService, public builder : FormBuilder, private comunaService : ComunasService){

  }

  listaRegiones : any [] = []
  listaRegionesFull : any [] = []
  listaComunas : any [] = []
  listaComunasFull : any [] = []

  listaSubestados : Subestados [] = []
  listaCodigos1 : Codigo1 [] = []

  formEditarTOC = this.builder.group({
    Observacion : this.builder.control(""),
    Subestado_esperado : this.builder.control(""), 
    Direccion_correcta: this.builder.control(""),  
    Comuna_correcta : this.builder.control(""),  
    Fecha_reprogramada : this.builder.control(""), 
    Codigo1Str : this.builder.control(""), 
    // Id_transyanez : this.builder.control(this.codigoTY, [Validators.required]),
    Ids_transyanez : this.builder.control("this.codigoTY", [Validators.required]),
    // Id_usuario : this.builder.control(sessionStorage.getItem("id")?.toString()+"", [Validators.required]),
    // Ids_usuario : this.builder.control(sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+"", [Validators.required]),
    Alerta : this.builder.control(false),
    Origen : this.builder.control("TOC/Editar")
  })

  

  alertaExistente(){
    this.formEditarTOC.patchValue({
      Alerta : this.alerta[0].Alerta,
      Observacion : this.alerta[0].Observacion
    })
  }
  
  ngOnInit(){
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
    // this.service.buscar_alerta_by_ids_transyanez(this.codigoTY).subscribe(data => {
    //   console.log(data)
    // })

    // alert(this.codigoTY)

  }

  editarTOC(){

    console.log(this.alerta)
    console.log(this.formEditarTOC.value)
    // if(this.formEditarTOC.valid){
    //   this.service.editar_alerta_toc(this.formEditarTOC.value).subscribe((data : any) => {
    //     alert(data.message)
    //   })

      
    // }
  }

}

