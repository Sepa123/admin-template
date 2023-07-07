import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PermissionGuard implements CanActivate {

  rol_user! : string

  constructor(private router : Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    this.rol_user = sessionStorage.getItem('rol_id')+""
    

    if(route.data['roles'].includes(this.rol_user)){
      return true;
    }else
    {
      this.router.navigate(["permiso-denegado"])
      console.log("usted no tiene permiso por que tiene este rol",this.rol_user)
      return false
    }
    
  }
  
}
