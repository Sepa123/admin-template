import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { PortalTransyanezService } from "src/app/service/portal-transyanez.service";
import { TIService } from 'src/app/service/ti.service';
import { IconSetService } from '@coreui/icons-angular';
import { freeSet } from '@coreui/icons'

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.scss']
})
export class ReportesComponent {

  icons = freeSet;

  constructor(
    private service: PortalTransyanezService, private TIservice: TIService,
    public iconSet: IconSetService
  ) {

   }

  downloadVehiculos(){
    this.service.downloadResumenVehiculos()
  }

  downloadBeetrack(){
    this.TIservice.downloadBeetrackMensual()
  }
}
