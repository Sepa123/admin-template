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

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    const token = sessionStorage.getItem("access_token")
    var reqHeader = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+ token
    })

    this.service.verifyUser(reqHeader).subscribe(res => {
      this.active = res.active
      sessionStorage.setItem("rol", res.rol_id)
      sessionStorage.setItem("id", res.uid)
    })

    if(!token ){
      
      this.router.navigate(["login"])

    return false
  } 
    return true;
  }
  
}
