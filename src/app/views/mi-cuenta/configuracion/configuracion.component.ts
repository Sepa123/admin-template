import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RegistrarUsuarioService } from 'src/app/service/registrar-usuario.service'

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.scss']
})
export class ConfiguracionComponent {
  constructor(private service: RegistrarUsuarioService, public builder: FormBuilder) { }
  rol =   sessionStorage.getItem('rol_id')+''
  id =   sessionStorage.getItem('id')+''
  server = sessionStorage.getItem('server')+''
  nombre_usuario = sessionStorage.getItem('usuario')+''
  mail = sessionStorage.getItem('mail')+''

  editarForm = this.builder.group({
    Telefono : this.builder.control(""),
    Fecha_nacimiento : this.builder.control(""),
    Direccion: this.builder.control(""),
  })
  
  passForm = this.builder.group({
    Password_antigua : this.builder.control("", [Validators.required ,Validators.minLength(6)]),
    Password_nueva : this.builder.control("",  [Validators.required,Validators.minLength(6)]),
    Password_repetida: this.builder.control("",  [Validators.required,Validators.minLength(6)]),
  })

  isErrorView : boolean = false
  isModalOpen: boolean = false
  public visible = false;

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

  ngOnInit(){
    
    this.service.getDatosUsuario(this.id,this.server).subscribe((data : any) => {
      console.log(data)

      this.editarForm.patchValue({
        Telefono : data.Telefono,
        Fecha_nacimiento : data.Fecha_nacimiento,
        Direccion : data.Direccion
      })

    })
  }

  editarDatos() {
    alert('esad')
  }

  isPasswordHidden: boolean = true;
  isPassNuevaHidden: boolean = true;
  isPassRepetHidden: boolean = true;
  togglePassword() {
    this.isPasswordHidden = !this.isPasswordHidden;
    const passwordField = document.getElementById('pass_antigua') as HTMLInputElement;
    
    if (this.isPasswordHidden) {
      passwordField.type = 'password';
    } else {
      passwordField.type = 'text';
    }
  }

  togglePass_nueva() {
    this.isPassNuevaHidden = !this.isPassNuevaHidden;
    const passwordField = document.getElementById('pass_nueva') as HTMLInputElement;
    
    if (this.isPassNuevaHidden) {
      passwordField.type = 'password';
    } else {
      passwordField.type = 'text';
    }
  }

  togglePass_repetida() {
    this.isPassRepetHidden = !this.isPassRepetHidden;
    const passwordField = document.getElementById('pass_repetida') as HTMLInputElement;
    
    if (this.isPassRepetHidden) {
      passwordField.type = 'password';
    } else {
      passwordField.type = 'text';
    }
  }


  actualizarPassword(){
    this.isErrorView = false
    if(this.passForm.valid){
      console.log(this.passForm.value)
      if(this.passForm.value.Password_nueva !== this.passForm.value.Password_repetida){
        this.isErrorView = true
      } else{
        alert('contraseña aCTUALIZADA CORRECTAMENTE')
        this.isErrorView = false
      }  
    }else {
      this.isErrorView = true
    }
    
  }
}
