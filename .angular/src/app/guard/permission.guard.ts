import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Menu } from '../models/areati/menu.interface';
import { SidebarService } from '../service/sidebar/sidebar.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionGuard implements CanActivate {

  rol_user! : string
  user_id! : string
  isFabianLara: string = ""

  navItems : Menu[] = [];

  constructor(private router : Router,private SidebarService: SidebarService){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    this.rol_user = sessionStorage.getItem('rol_id')+""
    this.user_id = sessionStorage.getItem('id')+""

    this.navItems = this.SidebarService.getMenuItems();

    if (route.data['id_submenu'] !== undefined) {
      // console.log("encuntre id submenu" )
      // console.log("id_submenu", route.data['id_submenu']);
      // console.log(this.navItems.find((item) => item.id === route.data['id'])?.submenus)
      // console.log("datos route data", this.navItems.find((item) => item.id === route.data['id'])?.submenus.some((submenu) => submenu.id_submenu === route.data['id_submenu'].toString()));

      if (this.navItems.find((item) => item.id === route.data['id'])?.submenus.some((submenu) => submenu.id_submenu === route.data['id_submenu'].toString())) {
        // console.log("tiene permiso para el submenu",this.navItems.find((item) => item.id === route.data['id'])?.submenus.find((submenu) => submenu.id_submenu === route.data['id_submenu'].toString())?.permiso)
        this.SidebarService.setPermisos(this.navItems.find((item) => item.id === route.data['id'])?.submenus.find((submenu) => submenu.id_submenu === route.data['id_submenu'].toString())?.permiso || "2");
        return true
      }else{
        this.router.navigate(["permiso-denegado"])
        return false
      }
    }
    if(route.data['id_submenu'] === undefined && this.navItems.find((item) => item.id === route.data['id']) !== undefined) {
      return true;
    }else
    {
      this.router.navigate(["permiso-denegado"])
      return false
    }


    /// version anterior de permisos
    // console.log("datos route",route.data['id'])
    

    // if(route.data['roles'].includes(this.rol_user)){
    //   return true;
    // }else
    // {
    //   this.router.navigate(["permiso-denegado"])
    //   console.log("usted no tiene permiso por que tiene este rol",this.rol_user)
    //   return false
    // }
    
  }
  
}
