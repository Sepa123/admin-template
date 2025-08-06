import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Menu } from '../../models/areati/menu.interface'
@Injectable({
  providedIn: 'root'
})

export class SidebarService {
  private sidebarVisible = new BehaviorSubject<boolean>(true);
  private sidebarBackdropVisible = new BehaviorSubject<boolean>(false);
  sidebarVisible$ = this.sidebarVisible.asObservable();

  menuItems: Menu[] = [];

  setMenuItems(items: Menu[]) {
    this.menuItems = items;
    localStorage.setItem('menuItems', JSON.stringify(items));
  }

  getMenuItems(): Menu[] {
    if (this.menuItems.length === 0) {
      const saved = localStorage.getItem('menuItems');
      if (saved) {
        this.menuItems = JSON.parse(saved);
      }
    }
    return this.menuItems;
  }

  sidebarBackdrop$ = this.sidebarBackdropVisible.asObservable();

  toggleSidebar() {
    this.sidebarVisible.next(!this.sidebarVisible.value);
    this.sidebarBackdropVisible.next(!this.sidebarBackdropVisible.value);
  }

  setSidebarVisibility(state: boolean) {
    this.sidebarVisible.next(state);

  }

  setSidebarBackdropVisibility(state: boolean) {
    this.sidebarBackdropVisible.next(state);
    
  }

  private permisos: string  = "";


  setPermisos(permisos : string ) {
    this.permisos = permisos;
  }

  getPermiso(): boolean {

    // this.permisoService.getPermiso() == '1' ? true : false
    return this.permisos  == '1' ? true : false;
  }


  
}