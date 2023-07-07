import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RegistrarUsuarioService } from 'src/app/service/registrar-usuario.service'
import * as CryptoJS from 'crypto-js'

import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar-usuarios',
  templateUrl: './registrar-usuarios.component.html',
  styleUrls: ['./registrar-usuarios.component.scss']
})
export class RegistrarUsuariosComponent {

  constructor(private service: RegistrarUsuarioService, public builder: FormBuilder, private router: Router) { }

  registerForm = this.builder.group({
    Nombre : this.builder.control("",[Validators.required]),
    Mail : this.builder.control("",[Validators.required, Validators.email]),
    Password: this.builder.control("",[Validators.required, Validators.minLength(6)],),
    Activate: true,
    Rol : 18
  })

  registrarUsuario() {
    // this.asignarRutaForm.patchValue({ asigned_by: this.id_usuario, nombre_ruta : this.nombreRuta });
    if(this.registerForm.valid) {
      alert('Formulario con datos validos')
      const text = this.registerForm.get('Password')?.value

      if (text) {
        const hash = CryptoJS.MD5(text).toString();
        this.registerForm.patchValue({Password : hash.toUpperCase()})
      }

      this.service.registrarNuevoUsuario(this.registerForm.value).subscribe((res) => {
        console.log(res)
        this.registerForm.reset()
      },
      ((error) => {
        alert(error.error.detail)
      }))
    } else {
      alert('Formulario con datos invalidos')
    }
    this.registerForm.reset()
  }
}
