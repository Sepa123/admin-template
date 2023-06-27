import { Component } from '@angular/core';
import { interval,Observable, Subscription  } from 'rxjs';
import { navItems, navItemsOp , navItemsTra ,navItemsAll } from './_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
})
export class DefaultLayoutComponent {

  // navItems = navItems;
  rol = sessionStorage.getItem("rol") 

  // roll = this.rol == "5" ? 5 : this.rol == "13" ? 13 : 14

  navItems = navItems
  navItemsTra = navItemsTra
  navItemsOp = navItemsOp

  public perfectScrollbarConfig = {
    suppressScrollX: true,
  };

  // sub! : Subscription

  // ngOnInit(){

  //   // console.log(this.rol)
  //   if(this.rol === "5") {
  //     this.navItems = navItemsAll[0][5];
  //   }
  //   if(this.rol === "13")  {
  //     this.navItems = navItemsAll[0][13]
  //     console.log("Jefe operaciones")
  //   }
  //   if(this.rol === "14")  {
  //     this.navItems = navItemsAll[0][14]
  //     console.log("jefe transporte")
  //   }
  // }

  constructor() {}
}
