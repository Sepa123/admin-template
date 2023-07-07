import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {

  constructor (private router:Router,private service: AuthService) {}

  active!:boolean ;
  rol_user! : string;

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    const token = sessionStorage.getItem("access_token")
    var reqHeader = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+ token
    })
    this.rol_user = sessionStorage.getItem('rol_id')+""

    this.service.verifyUser(reqHeader).subscribe(res => {
      this.active = res.active
      sessionStorage.setItem("rol ", res.rol_id)
      sessionStorage.setItem("id", res.uid)
    })

    if(!token){
      this.router.navigate(["login"])
    return false

  } if(!route.data["roles"].includes(this.rol_user)){
    
    return true;
  } else
  {
    this.router.navigate(["permiso-denegado"])
    console.log("usted no tiene permiso por que tiene este rol",this.rol_user)
    return false
  }
    
  }
  
}
