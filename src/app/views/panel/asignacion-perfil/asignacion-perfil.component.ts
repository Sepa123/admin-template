import { Component } from '@angular/core';
import { PanelService } from '../../../service/panel.service';
import { Menu,ListaMenu, ListaUsuarios} from '../../../models/panel/panel.interface';
import { parse } from 'path';

@Component({
  selector: 'app-asignacion-perfil',
  templateUrl: './asignacion-perfil.component.html',
  styleUrls: ['./asignacion-perfil.component.scss']
})
export class AsignacionPerfilComponent {

  constructor(private service: PanelService) { }


  rolSeleccionado: number = 0

  selectorPerfil: Menu[] = [];

  listaUsuarios: ListaUsuarios[] = [];
  listaUsuariosFull: ListaUsuarios[] = [];

  perfilSeleccionado: ListaMenu [] = []
  perfilSeleccionadoFull: ListaMenu [] = []

  private id_colaborador: number = 0;

  ngOnInit() {
    // Initialization logic can go here


    this.service.get_lista_pefiles().subscribe((data) => {
      // console.log(data);
      this.selectorPerfil = data;
      this.perfilSeleccionadoFull = this.selectorPerfil[0].menus;

      this.perfilSeleccionado = this.selectorPerfil[0].menus;
      
      // Handle the data as needed
    })

    this.service.get_lista_usuarios().subscribe((data) => {
      // console.log(data);
      // Handle the data as needed
      this.listaUsuarios = data;
      this.listaUsuariosFull = data;
    })  
  }


  checkboxChange(event: any, menu: ListaMenu) {
    const isChecked = event.target.checked;
    const menuId = menu.id_menu;    
  }

  seleccionarPerfil(event: any) {
    let perfil = ''
    if(typeof event === 'string') {
      
      perfil = event 
    }else{
      perfil = event.target.value;
    }
 
    console.log(perfil);
    // // console.log(perfil);
    // console.log(this.selectorPerfil.filter((item) => item.rol_id == perfil)[0])
    this.perfilSeleccionado = this.selectorPerfil.filter((item) => item.rol_id == parseInt(perfil))[0].menus;

    this.perfilSeleccionado= this.compararMenus(this.perfilSeleccionadoFull,this.perfilSeleccionado);

    console.log(this.perfilSeleccionado);

  }

  imagenUrl = ''  
  areaColaborador = '';
  cargoColaborador = '';


  seleccionarColaborador(event: any) {
    const colaborador = event.target.value;
    console.log(colaborador);

    const colab = this.listaUsuarios.filter((item) => item.id_usuario == colaborador)[0]
    console.log(colab);

    if( (colab.imagen_perfil || colab.imagen_perfil !== '') && colab.imagen_perfil !== null ){

        this.imagenUrl = 'https://hela.transyanez.cl/api/panel/image/foto_perfil/'+colab.imagen_perfil

      } else {
        this.imagenUrl = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
      }

    // this.imagenUrl = colab.imagen_perfil || 'https://via.placeholder.com/150'; // Default image if none provided
    this.areaColaborador = colab.area || 'Área no especificada';
    this.cargoColaborador = colab.cargo || 'Cargo no especificado';
    // Aquí puedes manejar la lógica para seleccionar un colaborador específico

    console.log('Colaborador seleccionado:', colab.rol_id);
    this.id_colaborador = colab.id_usuario;


    if (colab.submenus_permisos) {
        this.service.get_menu_usuarios(colab.id_usuario).subscribe((data) => {
          this.perfilSeleccionado= this.compararMenus(this.perfilSeleccionadoFull,data);
          console.log(this.perfilSeleccionado);
          this.rolSeleccionado = 1


        })
    } else {
        this.seleccionarPerfil(colab.rol_id);
        this.rolSeleccionado = parseInt(colab.rol_id)
    }

    
    



  }




compararMenus(array1: ListaMenu[], array2: ListaMenu[]): any[] {

  console.log('array 2')
  console.log(array2)
 return array1.map(menu1 => {
    // Buscar si el menú existe en array2
    const menu2 = array2.find(m2 => m2.id_menu === menu1.id_menu);

    if (!menu2) {
      // Si el menú no está en array2, marcar is_propietario en false y todos los accesos en false
      const submenusSinAcceso = menu1.submenus.map(sub => ({
        ...sub,
        acceso: false
      }));

      return {
        ...menu1,
        is_propietario: false,
        submenus: submenusSinAcceso
      };
    }

    // Comparar submenús si el menú existe
    const nuevosSubmenus = menu1.submenus.map(sub1 => {
      const sub2 = menu2.submenus.find(s2 => s2.id_submenu === sub1.id_submenu);
      // console.log("sub1", sub1);
      // console.log("sub2", sub2);
      if (sub2 == undefined){

        return {
          ...sub1,
          acceso: !!sub2 // acceso true si se encontró en array2, false si no
        };

      }else {

        console.log(sub2)
        return {
          ...sub2,
          acceso: !!sub2 // acceso true si se encontró en array2, false si no
        };
      }

      
    });
    // console.log('menu 1')
    // console.log(menu1)
    console.log('menu 2')
    // console.log(menu2)

    return {
      ...menu2,
      // is_propietario: true,
      submenus: nuevosSubmenus
    };
  });
}

buscarColaborador(event: any) {
  const colaborador = event.target.value;
  console.log(this.listaUsuariosFull.filter((lista) => lista.nombre_usuario.toLowerCase().startsWith(colaborador) ));

  console.log(this.listaUsuariosFull)


  this.listaUsuarios = this.listaUsuariosFull.filter((lista) => lista.nombre_usuario.toLowerCase().startsWith(colaborador) )

  // lista.Id_de_ruta.toString().toLowerCase().startsWith(idRuta) 


}


guardarPerfil(){
  // Aquí puedes implementar la lógica para guardar el perfil seleccionado
  console.log('Perfil guardado:', this.perfilSeleccionado);

  const menusConAcceso = this.perfilSeleccionado.filter(menu => menu.is_propietario)

  const arrayMenus = menusConAcceso.map(menu => {
    return menu.id_menu
  })

  console.log('Perfil con acceso guardado:', menusConAcceso)

  const submenusConAcceso = this.perfilSeleccionado.flatMap(menu =>
    menu.submenus.filter(submenu => submenu.acceso)
  );


  console.log('lISTA SUBEMNUS:', submenusConAcceso)

  console.log('ID Colaborador:', this.id_colaborador);

  const perfilData = { 
    id_usuario: this.id_colaborador,
    menu_permisos : arrayMenus, // eso esta ok
    submenus_permisos: submenusConAcceso
   }

   console.log(perfilData)

   this.service.actualizar_permisos_usuarios(perfilData).subscribe((response : any) => {
    console.log('Respuesta del servidor:', response);
    alert(response.message)
    // Aquí puedes manejar la respuesta del servidor, como mostrar un mensaje de éxito
  }, (error) => {
    console.error('Error al guardar el perfil:', error);
    alert(error.error.detail)
    // Aquí puedes manejar el error, como mostrar un mensaje de error

   })
}


}
