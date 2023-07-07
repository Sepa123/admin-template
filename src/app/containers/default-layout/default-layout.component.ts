import { Component, OnInit } from '@angular/core';
import { interval,Observable, Subscription  } from 'rxjs';
import { navItems, navItemsOp , navItemsTra ,navItemsTest } from './_nav';
import { ROLES_PERMITIDOS } from 'src/app/rolesPermitidos.const'

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
})
export class DefaultLayoutComponent implements OnInit {

  public roles_permitidos = ROLES_PERMITIDOS

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

  constructor() {
    this.rol = sessionStorage.getItem("rol_id") 
  }
  
}
