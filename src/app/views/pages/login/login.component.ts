import { Component } from '@angular/core';
import { AuthService } from "src/app/service/auth.service"
import { EmailValidator, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RolSaveService } from 'src/app/service/rol-save.service'
import { Router } from '@angular/router';
import { ACCESO_ROL } from 'src/app/rolesPermitidos.const';
import { SidebarService } from '../../../service/sidebar/sidebar.service';
import { Menu } from '../../../models/areati/menu.interface'
// import { CookieService } from "ngx-cookie-service"
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private service: AuthService, public builder: FormBuilder, private router: Router,
              private rolService : RolSaveService, private barService : SidebarService) { }

  userdata: any
  resultado!: string;

  navItems: Menu[] = [];

  loginform=this.builder.group({
    mail:this.builder.control("",[Validators.required, Validators.email]),
    password:this.builder.control("",Validators.required),
  });
  

  proceedLogin(){
    if(this.loginform.valid) {
      this.service.GetUserbyusername(this.loginform.value).subscribe(res => {

        this.userdata = res;

        this.barService.setMenuItems(this.userdata.menu)

        this.rolService.setRol(this.userdata.rol_id)
        sessionStorage.setItem('access_token',this.userdata.access_token);
        sessionStorage.setItem('rol_id', this.userdata.rol_id)
        sessionStorage.setItem('server', this.userdata.server)
        const ruta = ACCESO_ROL[this.userdata.rol_id]
        sessionStorage.setItem('usuario', this.userdata.sub)
        sessionStorage.setItem('mail', this.loginform.value.mail+"")
        sessionStorage.setItem("imagen_perfil", this.userdata.imagen_perfil)

        this.rolService.setUsuario(this.userdata.sub,this.loginform.value.mail+"")
        this.router.navigate([ruta]);
      },
      ((error) => {
        this.resultado = error.error.detail
      }))
      
  } else{
    this.resultado = "Hay datos inválidos en el formulario";
  }

}




}
