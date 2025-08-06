import { Component, OnInit } from '@angular/core';



declare var YT: any; // Esto es necesario para evitar el error de YT no encontrado


@Component({
  selector: 'app-working',
  templateUrl: './working.component.html',
  styleUrls: ['./working.component.scss']
})
export class WorkingComponent implements OnInit {
  private player: any;

  constructor() { }

  ngOnInit(): void {
    this.loadYouTubeAPI();
  }

  private loadYouTubeAPI() {
    // Comprobar si la API de YouTube ya está cargada
    if (typeof YT === 'undefined' || typeof YT.Player === 'undefined') {
      const script = document.createElement('script');
      script.src = 'https://www.youtube.com/iframe_api';
      script.onload = this.onYouTubeAPIReady.bind(this); // Llamar a la función cuando la API esté lista
      document.body.appendChild(script);
    } else {
      this.onYouTubeAPIReady(); // Si la API ya está cargada, inicializamos el reproductor directamente
    }
  }

  private onYouTubeAPIReady() {
    // Usamos setTimeout para esperar un poco más para asegurarnos de que la API esté completamente lista
    setTimeout(() => {
      // Creamos el reproductor de YouTube
      this.player = new YT.Player('youtube-player', {
        height: '315',
        width: '560',
        videoId: 'SlSylJRwtCk',  // Reemplaza con el ID del video que quieres mostrar
        playerVars: {
          'autoplay': 1,  // Reproducción automática
          'mute': 0,      // Audio activado
          'rel': 0,       // Evitar sugerencias de otros videos al final
          'showinfo': 0,  // Ocultar información del video
        },
        events: {
          'onReady': (event: any) => {
            event.target.playVideo();  // Reproducir el video cuando esté listo
          }
        }
      });
    }, 500); // Esto da un pequeño retraso antes de intentar crear el reproductor
  }
}