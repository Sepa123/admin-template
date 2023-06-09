import { Component } from '@angular/core';
import { AuthService } from "src/app/service/auth.service"
import { EmailValidator, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ACCESO_ROL } from 'src/app/rolesPermitidos.const';
// import { CookieService } from "ngx-cookie-service"
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private service: AuthService, public builder: FormBuilder, private router: Router) { }

  userdata: any
  resultado!: string;

  loginform=this.builder.group({
    mail:this.builder.control("",[Validators.required, Validators.email]),
    password:this.builder.control("",Validators.required),
  });
  

  proceedLogin(){
    if(this.loginform.valid) {
      this.service.GetUserbyusername(this.loginform.value).subscribe(res => {
        this.userdata = res;
        sessionStorage.setItem('access_token',this.userdata.access_token);
        sessionStorage.setItem('rol_id', this.userdata.rol_id)
        sessionStorage.setItem('server', this.userdata.server )
        const ruta = ACCESO_ROL[this.userdata.rol_id]
        
        console.log(ruta)
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
