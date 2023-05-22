import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthTransporteGuard implements CanActivate {

  constructor(private router:Router,private service: AuthService){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if(sessionStorage.getItem("rol") === "14" || sessionStorage.getItem("rol") === "8" || sessionStorage.getItem("rol") === "5") {

        return true;

       }
  
       this.router.navigate(['/404']);
  
       return false;
  }
  
}
