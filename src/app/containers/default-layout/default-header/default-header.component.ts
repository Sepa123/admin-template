import { Component, Input } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { map } from 'rxjs/operators';
import { ClassToggleService, HeaderComponent } from '@coreui/angular';
import { ACCESO_ROL, ROLES_PERMITIDOS} from 'src/app/rolesPermitidos.const';
import { RsvService } from 'src/app/service/rsv.service';


@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent {

  @Input() sidebarId: string = "sidebar";

  time!: Date;
  contadorDefontana : Number = 0
  numeroFolios : any [] =[]

  idUsuario : string = ""
  mail : string = ""

  direccion : string = ''

  roles_notificaciones =['5','40','41','42','43','44','45']

  roles_dashboard = ['5', '17','14', '13','15','20', '22','21','8']

  foto_perfil : string = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'


  perfil =   sessionStorage.getItem('rol_id')+''

  subNotificaciones!: Subscription


  constructor(private classToggler: ClassToggleService, private service : RsvService) {
    
    super();
  }

  ngOnInit(): void {
    this.perfil =   sessionStorage.getItem('rol_id')+''
    this.direccion = ACCESO_ROL[sessionStorage.getItem('rol_id')+'']
    console.log(sessionStorage.getItem('imagen_perfil'))
    if(sessionStorage.getItem('imagen_perfil') == 'null' || sessionStorage.getItem('imagen_perfil') == null){
        this.foto_perfil = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
    }else {
      this.foto_perfil = 'https://hela.transyanez.cl/api/panel/image/foto_perfil/'+sessionStorage.getItem('imagen_perfil')+''
    }

    if ( this.roles_notificaciones.includes(sessionStorage.getItem('rol_id')+'')){
      // if ( this.roles_notificaciones.includes('sos')){
    setTimeout(() => {
      this.idUsuario = sessionStorage.getItem('server')+'-'+sessionStorage.getItem('id')+''
      this.mail = sessionStorage.getItem('mail')+""
      const body = {
        "Mail" : this.mail
      }

      this.service.obtener_notificaciones_api_defontana(body).subscribe((data : any) => {
        this.contadorDefontana = data.Cantidad
        this.numeroFolios = data.Folios.sort((a : any, b : any) => b.Numero_Factura - a.Numero_Factura)

        this.subNotificacionesDefontana(body)
      })
    }, 1000);

  }
    // console.log(this.idUsuario)
    this.time = new Date()
    interval(1000)
      .pipe(
        map(() => new Date())
      )
      .subscribe(time => {
        
        this.time = time;
      });
  }

  revisar_notificaciones(){

    const body = {
      "Mail" : this.mail
    }
    this.service.revisar_notificaciones_defontana(body).subscribe((data : any) => {
        this.contadorDefontana = data.Cantidad
        this.numeroFolios = data.Folios.sort((a : any, b : any) => b.Numero_Factura - a.Numero_Factura)
    })
  }


  subNotificacionesDefontana(body : any) {
    this.subNotificaciones = this.service.update_notificaciones_api_defontana(body).subscribe((data : any) => {
      this.contadorDefontana = data.Cantidad
      this.numeroFolios = data.Folios
    })
  }

  ngOnDestroy(): void {
    // Cancelar la suscripción al destruir el componente
    if (this.subNotificaciones){
      this.subNotificaciones.unsubscribe()
      console.log('destrui la notificacion alv')
    }
    
  }

  Logout(){
    sessionStorage.clear()
  }
  
}
