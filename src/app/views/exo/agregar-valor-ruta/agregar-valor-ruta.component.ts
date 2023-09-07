import { Component, Input, Output , EventEmitter} from '@angular/core';
import {PortalTransyanezService} from '../../../service/portal-transyanez.service';
import { TIService } from '../../../service/ti.service';
import { NSBeetrackRango } from '../../../models/nsBeetrackRango.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-valor-ruta',
  templateUrl: './agregar-valor.component.html',
  styleUrls: ['./agregar-valor.component.scss']
})

export class AgregarValorRutaComponent {
  nsBeetrack: NSBeetrackRango[] = [];
  Valor_ruta : number | null = null;
  @Input () mostrarModal : boolean = false;
  myForm: FormGroup;
  //@Output() closeModal = new EventEmitter<void>();
  //@Input() data: any;

  constructor(
    private service: PortalTransyanezService,
    private TIservice: TIService,
    )
      {
        this.myForm = new FormGroup({
          Valor_ruta: new FormControl(null, [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]),
        });
    
  }
 // onCloseModal(): void {
   // this.closeModal.emit();
 // }
  ngOnInit() {
    // Inicializamos el formulario reactivo
    this.myForm = new FormGroup({
      Valor_ruta: new FormControl(null, [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]),
    });
  }
/*
  editarValor(beetrack: NSBeetrackRango) {
    this.mostrarModal = true;
  }
    
  guardarNuevoValor(beetrack: NSBeetrackRango) {
    if (this.myForm.valid) {
      const Valor = this.myForm.get('Valor_ruta').value;
  
      this.TIservice.actualizarValorRuta(beetrack.Id_ruta,Valor).subscribe(
        (respuesta) => {
   
          console.log('Valor de la ruta actualizado exitosamente:', respuesta);
          this.mostrarModal = false;
        },
        (error) => {
 
          console.error('Error al actualizar el valor de la ruta:', error);
       
        }
      );
    } else {
      console.error("Formulario no válido. Por favor, ingrese un valor válido.");
    }
  }
  
  cancelarEdicion() {
    this.mostrarModal= false;
  }
  
  */


  
}