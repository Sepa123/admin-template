import { Component } from '@angular/core';
import { AuthService } from "src/app/service/auth.service"
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { CookieService } from "ngx-cookie-service"
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private service: AuthService, public builder: FormBuilder, private router: Router) { }


  userdata: any

  loginform=this.builder.group({
    mail:this.builder.control("",Validators.required),
    password:this.builder.control("",Validators.required),
  });
  

  proceedLogin(){
    if(this.loginform.valid) {
      this.service.GetUserbyusername(this.loginform.value).subscribe(res => {
        this.userdata = res;
        // this.cookie.set("token", this.userdata.access_token)
        sessionStorage.setItem('access_token',this.userdata.access_token);
        console.log(sessionStorage.getItem("access_token"))
        // sessionStorage.setItem('role',this.result.role);
        console.log(this.userdata)
        this.router.navigate(['dashboard']);

      })
  } else{
    // this.toastr.warning("por favor ingrese datos validos");
      console.log("INGRESE DATPS")
  }

}


}
