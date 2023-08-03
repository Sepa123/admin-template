import { Component, OnInit } from '@angular/core';
import { interval,Observable, Subscription  } from 'rxjs';
import { navItems, navItemsOp , navItemsTra ,navItemsTest } from './_nav';
import { ROLES_PERMITIDOS } from 'src/app/rolesPermitidos.const'
import { RolSaveService } from '../../service/rol-save.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
})
export class DefaultLayoutComponent implements OnInit {

  public roles_permitidos = ROLES_PERMITIDOS

  // para cambiar los colores del sidebar
  public vars = {
    '--cui-sidebar-brand-bg': '#858484', 
    '--cui-sidebar-bg': '#858484',
    '--cui-sidebar-nav-link-color': 'white',
    '--cui-sidebar-nav-link-icon-color': 'white',
    '--cui-sidebar-toggler-bg' : '#858484',
  }

  public email = sessionStorage.getItem('mail')
  public usuario = sessionStorage.getItem('usuario')
  
  ngOnInit(): void {
    this.rol = sessionStorage.getItem("rol_id") 

  }
  // navItems = navItems;
  public rol = sessionStorage.getItem("rol_id") 

  navItems = navItems

  navItemsTest = navItemsTest

  navItemsOp = navItemsOp

  navItemsTra = navItemsTra

  public perfectScrollbarConfig = {
    suppressScrollX: true,
  };

  constructor(private rolService : RolSaveService) {
    this.rol = sessionStorage.getItem("rol_id") 
  }

  // public email = this.rolService.getEmail()
  // public usuario = this.rolService.getUsuario()

  isToggle : boolean = true

  ok(){
    this.isToggle = !this.isToggle
  }
  
}
