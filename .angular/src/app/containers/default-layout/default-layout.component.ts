import { Component, OnInit } from '@angular/core';
import { navItems } from './_nav';
import { ROLES_PERMITIDOS } from '../../rolesPermitidos.const'
import { RolSaveService } from '../../service/rol-save.service'
import { AuthService } from '../../service/auth.service';
import { Menu } from '../../models/areati/menu.interface'
import { SidebarService } from '../../service/sidebar/sidebar.service';



@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./layout.component.scss'],
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

  hiddenBackdrop = false;

  toggleSidebar() {
      this.sidebarService.toggleSidebar();
    }

  isMobileScreen = false;
  checkScreenSize() {
    this.isMobileScreen = window.innerWidth <= 767;
  }
      

  public email = sessionStorage.getItem('mail')
  public usuario = sessionStorage.getItem('usuario')
  navItems : Menu[] = [];
  
  ngOnInit(): void {

    this.navItems = this.sidebarService.getMenuItems();

    if (this.navItems.length === 0) {
      const id_usuario = sessionStorage.getItem('id');
      this.service.listaMenus(id_usuario).subscribe((data: any) => {
        this.navItems = data;
        this.sidebarService.setMenuItems(this.navItems);
      });
    }

    this.checkScreenSize();
    window.addEventListener('resize', () => this.checkScreenSize());


    this.rol = sessionStorage.getItem("rol_id") 
    this.email = sessionStorage.getItem('mail')
  }
  // navItems = navItems;
  public rol = sessionStorage.getItem("rol_id") 

  

  public perfectScrollbarConfig = {
    suppressScrollX: true,
  };
  
  isVisible = true;

  constructor(private rolService : RolSaveService, private service :AuthService, private sidebarService: SidebarService ) {
    this.sidebarService.sidebarVisible$.subscribe(visible => {
      this.isVisible = visible;
    });
    this.sidebarService.sidebarBackdrop$.subscribe(visible => {
      this.hiddenBackdrop = visible;
    });
    this.rol = sessionStorage.getItem("rol_id")
    this.email = sessionStorage.getItem('mail')
    console.log(this.email) 
    
  }

  isToggle : boolean = true

  ok(){
    this.isToggle = !this.isToggle
  }

  activeIndex: number | null = null;

  toggleMenu(index: number) {
    this.activeIndex = this.activeIndex === index ? null : index;
  }


}
