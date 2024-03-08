import { Component, Input } from '@angular/core';
import { interval } from 'rxjs';
import { map } from 'rxjs/operators';
import { ClassToggleService, HeaderComponent } from '@coreui/angular';
import { ACCESO_ROL } from 'src/app/rolesPermitidos.const';
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


  constructor(private classToggler: ClassToggleService, private service : RsvService) {
    super();
  }

  ngOnInit(): void {
    this.direccion = ACCESO_ROL[sessionStorage.getItem('rol_id')+'']
    
    // setTimeout(() => {
    //   this.idUsuario = sessionStorage.getItem('server')+'-'+sessionStorage.getItem('id')+''
    //   this.mail = sessionStorage.getItem('mail')+""
    //   const body = {
    //     "Mail" : this.mail
    //   }

    //   this.service.obtener_notificaciones_api_defontana(body).subscribe((data : any) => {
    //     this.contadorDefontana = data.Cantidad
    //     this.numeroFolios = data.Folios
    //   })
    // }, 1000);
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

  Logout(){
    sessionStorage.clear()
  }
  
}
