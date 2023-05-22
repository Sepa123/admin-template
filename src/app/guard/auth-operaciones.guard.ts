import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthOperacionesGuard implements CanActivate {

  constructor(private router:Router,private service: AuthService){}

  rol!:number
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

     if(sessionStorage.getItem("rol") === "13" || sessionStorage.getItem("rol") === "5") {
      console.log("pase por qa")
      return true;
     }

     this.router.navigate(['/404']);

     return false;


  }
  
}
