import { Component, OnInit } from '@angular/core';
import { TIService } from "src/app/service/ti.service";
import { Carga } from 'src/app/models/cargas.interface';
@Component({
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {
  // public items = <any>[];

  constructor( private service : TIService) {}

  carga!: Carga[]

  ngOnInit(): void{
    
    this.service.Getcargas().subscribe(data => {
      this.carga = data
    })
  }
}
