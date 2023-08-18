import { Component } from '@angular/core';
import { TocService } from 'src/app/service/toc.service'
import { AlertasVigente } from 'src/app/models/alertasVigentes.interface';

@Component({
  selector: 'app-alertas-vigentes',
  templateUrl: './alertas-vigentes.component.html',
  styleUrls: ['./alertas-vigentes.component.scss']
})
export class AlertasVigentesComponent {
  alertasVigentes : AlertasVigente [] = []

  constructor( private service : TocService){

  }

  ngOnInit(){
    this.service.buscar_alertas_vigentes().subscribe((data) => {
      this.alertasVigentes = data
    })
  }

  data = {
    labels: ['VueJs', 'EmberJs', 'ReactJs', 'Angular'],
    datasets: [{
      backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
      data: [40, 20, 80, 10]
    }]
  };

  
}
