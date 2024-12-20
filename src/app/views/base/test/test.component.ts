import { Component } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import Tesseract from 'tesseract.js';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent{

  constructor(private http: HttpClient) {}

  // Evento para capturar la imagen
  private trigger: Subject<void> = new Subject<void>();

  // Lista de imágenes capturadas (máximo 3)
  public capturedImages: string[] = [];

  // Texto reconocido
  public recognizedText: string = '';

  // Imagen seleccionada para vista previa
  public selectedImage: string | null = null;

  public selectedImageIndex: number | null = null; // Índice de imagen seleccionada
  public showPreview: boolean = false; // Muestra la imagen previsualizada

  // Nueva variable para manejar el estado de la cámara
  public isCameraActive: boolean = true;

  // Método para disparar la captura de imagen
  public captureImage(): void {
    if (this.capturedImages.length < 3) {
      this.trigger.next();
      this.getGeolocation();
    } else {
      alert('Solo puedes almacenar un máximo de 3 imágenes.');
    }
  }

  // Método que maneja la imagen capturada
  public handleImage(webcamImage: any): void {
    if (this.capturedImages.length < 3) {
      this.capturedImages.push(webcamImage.imageAsDataUrl); // Guarda la imagen en el arreglo
      this.processImage(webcamImage.imageAsDataUrl);
    }
  }

  // Observable vinculado al disparador
  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  // Método para procesar la imagen capturada
  public processImage(image: string): void {
    if (image) {
      Tesseract.recognize(image, 'eng', {
        logger: (info: any) => console.log(info), // Progreso opcional
      })
        .then(({ data: { text } }) => {
          const filteredText = text.replace(/[^a-zA-Z0-9]/g, '');
          this.recognizedText = filteredText;
        })
        .catch((err) => {
          console.error('Error al procesar la imagen:', err);
        });
    }
  }

  // Método para abrir una imagen en grande
  public openImage(image: string): void {
    this.selectedImage = image;
  }

  // Método para cerrar la vista previa
  public closeImage(): void {
    this.selectedImage = null;
  }

  // Previsualizar una imagen seleccionada
  public previewImage(index: number): void {
    this.selectedImageIndex = index;
    this.showPreview = true; // Activa la previsualización
  }

  // Procesa la imagen seleccionada al hacer clic en ella
  public processSelectedImage(): void {
    if (this.selectedImageIndex !== null) {
      const image = this.capturedImages[this.selectedImageIndex];
      this.processImage(image);
    }
  }

  // Función para llamar a la API y mostrar un modal
  public apiInfo: any = null; // Información obtenida de la API
  public isLoading: boolean = false; // Controla el estado de carga
  public errorMessage: string = ''; // Mensaje de error

  public fetchApiInfo(ppu: string): void {
    this.isLoading = true;
    this.errorMessage = '';

    // Llamada HTTP GET a la API
    this.http.get(`http://localhost:8000/api/info/?PPU=${ppu}`).subscribe({
      next: (data) => {
        this.apiInfo = data; // Guarda la información obtenida
        this.isLoading = false;
        this.openModal(); // Abre el modal al obtener los datos
      },
      error: (error) => {
        console.error('Error al obtener información:', error);
        this.errorMessage = 'Error al obtener información. Intente de nuevo.';
        this.isLoading = false;
      },
    });
  }

  // Alternar cámara
  toggleCamera() {
    this.isCameraActive = !this.isCameraActive;
    if (this.isCameraActive) {
      this.selectedImageIndex = null; // Resetear la previsualización
    }
  }

  public openModal(): void {
    const modalElement = document.getElementById('infoModal');
    if (modalElement) {
      modalElement.style.display = 'block';
    }
  }

  // Método para cerrar el modal
  public closeModal(): void {
    const modalElement = document.getElementById('infoModal');
    if (modalElement) {
      modalElement.style.display = 'none';
    }
  }

  // Nueva función para alternar entre cámara y previsualización
  public toggleCameraAndPreview(index?: number): void {
    if (index !== undefined) {
      this.selectedImageIndex = index;
      this.showPreview = true;
      this.isCameraActive = false; // Desactiva la cámara
    } else {
      this.isCameraActive = true; // Activa la cámara
      this.showPreview = false;
      this.selectedImageIndex = null;
    }
  }


  //seccion subida de imagenes

  public tipoArchivo: string = ''; // Tipo de archivo (puedes ajustarlo)
  public nombreArchivo: string = ''; // Nombre base para las imágenes


  subirImagenes(): void {
    if (!this.capturedImages || this.capturedImages.length === 0) {
      alert('No hay imágenes para subir.');
      return;
    }

    if (!this.tipoArchivo || !this.nombreArchivo) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    const formData = new FormData();

    // Convertir las imágenes base64 a blobs y agregarlas al FormData
    this.capturedImages.forEach((base64Image, index) => {
      const blob = this.base64ToBlob(base64Image);
      const fileName = `${this.nombreArchivo}_${index + 1}.png`; // Asignar un nombre único a cada imagen
      formData.append('file', blob, fileName);
    });

    // Agregar datos adicionales al FormData
    formData.append('tipo_archivo', this.tipoArchivo);
    formData.append('nombre', this.nombreArchivo);

    // Enviar las imágenes al servidor
    this.http.post('http://localhost:8000/colaboradores/subir-archivo', formData)
    //Hay que cambiar el link API que aun no completo
      .subscribe(
        (response) => console.log('Imágenes subidas exitosamente:', response),
        (error) => console.error('Error al subir imágenes:', error)
      );
  }

  // Conversión de base64 a Blob
  base64ToBlob(base64: string): Blob {
    const byteString = atob(base64.split(',')[1]); // Decodificar base64
    const mimeString = base64.split(',')[0].split(':')[1].split(';')[0]; // Obtener el tipo MIME
    const byteArray = new Uint8Array(byteString.length);

    for (let i = 0; i < byteString.length; i++) {
      byteArray[i] = byteString.charCodeAt(i);
    }

    return new Blob([byteArray], { type: mimeString });
  }

  //Seccion Geolocaclizacion

  lat: number | null = null; // Variable para almacenar la latitud
  lng: number | null = null; // Variable para almacenar la longitud

  getGeolocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
          console.log('Latitud:', this.lat);
          console.log('Longitud:', this.lng);

          // Aquí puedes guardar los valores en tu base de datos
        },
        (error) => {
          console.error('Error al obtener la ubicación:', error);
          alert('No se pudo obtener la ubicación.');
        }
      );
    } else {
      alert('La geolocalización no es compatible con este navegador.');
    }
  }

}

