import { Component } from '@angular/core';
import { LocalizacionService } from '../../../service/localizacion.service';
@Component({
  selector: 'app-activo-gps',
  templateUrl: './activo-gps.component.html',
  styleUrls: ['./activo-gps.component.scss']
})
export class ActivoGpsComponent {


  constructor(private localizacionService: LocalizacionService) { }

  latitude: number | null = null;
  longitude: number | null = null;
  errorMessage: string | null = null;
  locationInfoVisible = false;
  errorVisible = false;

  checkGeolocation(): void {
    // Verificar si la geolocalización está disponible en el navegador
    if ('geolocation' in navigator) {
      // Intentamos obtener la ubicación
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Ubicación obtenida correctamente
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;

          this.localizacionService.setLocalizacion(this.latitude.toString(), this.longitude.toString());
          this.locationInfoVisible = true;
          this.errorVisible = false;
        },
        (error) => {
          // Si ocurre un error (por ejemplo, el usuario deniega el permiso o no hay GPS)
          this.errorMessage = this.getErrorMessage(error.code);
          this.errorVisible = true;
          this.locationInfoVisible = false;
        },
        {
          enableHighAccuracy: true,  // Habilitar alta precisión si es posible
          timeout: 10000,            // Tiempo máximo de espera para la ubicación
          maximumAge: 0              // Evitar usar ubicaciones anteriores
        }
      );
    } else {
      // Si el navegador no soporta geolocalización
      this.errorMessage = 'Tu navegador no soporta geolocalización.';
      this.errorVisible = true;
      this.locationInfoVisible = false;
    }
  }

  // Método para obtener mensajes de error más detallados
  getErrorMessage(errorCode: number): string {
    switch (errorCode) {
      case 1:
        return 'No se puede continuar sin habilitar la geolocalización.';
      case 2:
        return 'No se puede obtener la ubicación debido a un problema de red o falta de GPS.';
      case 3:
        return 'La solicitud de geolocalización ha tardado demasiado. Intenta de nuevo.';
      default:
        return 'Ha ocurrido un error desconocido.';
    }
  }

  ngOnInit(): void {
    this.checkGeolocation();
  }
}
