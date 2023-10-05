import { Component,ElementRef ,ViewChild, AfterViewInit} from '@angular/core';
import { RsvService } from 'src/app/service/rsv.service'
import { EstructuraRSV } from 'src/app/models/estructuraRSV.interface';
@Component({
  selector: 'app-ubicacion',
  templateUrl: './ubicacion.component.html',
  styleUrls: ['./ubicacion.component.scss']
})
export class UbicacionComponent {

  @ViewChild('myCanvas', { static: false }) canvas!: ElementRef<HTMLCanvasElement>;


  listaEstructura : EstructuraRSV [] = []
  estructuraSeleccion : string = ""

  constructor(private service : RsvService) {}

  ngAfterViewInit(){
    const canvas = this.canvas.nativeElement;
    const ctx = canvas.getContext('2d');

    const img = new Image();
    img.src = '../../../../assets/images/rsvModel.png'; // Reemplaza esto con la ruta de tu imagen en la carpeta de assets

    // Cargar el contenido SVG como un Blob
    var svgString = '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M16 8.286C8.454 8.286 2.5 16 2.5 16s5.954 7.715 13.5 7.715c5.77 0 13.5-7.715 13.5-7.715S21.77 8.286 16 8.286zm0 12.52c-2.65 0-4.807-2.156-4.807-4.806S13.35 11.193 16 11.193S20.807 13.35 20.807 16S18.65 20.807 16 20.807zm0-7.612a2.806 2.806 0 1 0 0 5.611a2.806 2.806 0 0 0 0-5.611z"/></svg>';
    var blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    var url = URL.createObjectURL(blob);

    const img2 = new Image();
    img2.src = url; 

    const buttonAreas = [
      { x: 200, y: 220, width: 32, height: 32 ,texto: "X" },
      { x: 200, y: 300, width: 32, height: 32 ,texto: "xxpd"}
      // Área del primer botón (x, y, ancho, alto)
      // Agrega más áreas de botón si es necesario
    ];

    img.onload = () => {
      ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);

      buttonAreas.map((button => {
        ctx?.drawImage(img2, button.x, button.y, button.width, button.height);
        // ctx?.fillText(button.texto, button.x, button.y);
      }))
    
      // ctx?.drawImage(img2, 200, 200, 32, 32);
    };

    

    canvas.addEventListener('click', (event) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      for (let i = 0; i < buttonAreas.length; i++) {
        const area = buttonAreas[i];
        if (mouseX >= area.x && mouseX <= area.x + area.width && mouseY >= area.y && mouseY <= area.y + area.height) {
          // El clic está dentro de esta área de botón
          alert(`Haz presionado el botón ${i + 1}`);
          // Realiza las acciones que desees cuando se presione el botón aquí
          break;
        } else {
          console.log("nell")
        }
      }
    })
  }

  ngOnInit(){
    this.service.get_lista_estructura().subscribe(data => {
      this.listaEstructura = data
    })
  }

  selecccionarEstructura(){
    alert(this.estructuraSeleccion)
  }
}
