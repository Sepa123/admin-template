import { Component, Input } from '@angular/core';
import { interval } from 'rxjs';
import { map } from 'rxjs/operators';
import { ClassToggleService, HeaderComponent } from '@coreui/angular';
import { ACCESO_ROL } from 'src/app/rolesPermitidos.const';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent {

  @Input() sidebarId: string = "sidebar";

  time!: Date;

  // direccion : string = ''


  constructor(private classToggler: ClassToggleService) {
    super();
  }

  ngOnInit(): void {
    // this.direccion = ACCESO_ROL[sessionStorage.getItem('rol_id')+'']
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
