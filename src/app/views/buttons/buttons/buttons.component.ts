import { Component } from '@angular/core';
import { PortalTransyanezService } from "src/app/service/portal-transyanez.service";
import { TIService } from 'src/app/service/ti.service';
@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss']
})
export class ButtonsComponent {

  constructor(private service: TIService) { }

  downloadQuadminds(){
    this.service.downloadResumenQuadmine()
  }
}
