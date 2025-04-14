import { Component } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import Tesseract from 'tesseract.js';

@Component({
  selector: 'app-camara-test',
  templateUrl: './camara-test.component.html',
  styleUrls: ['./camara-test.component.scss'],
})
export class CamaraTestComponent {
  // Evento para capturar la imagen
  private trigger: Subject<void> = new Subject<void>();

  // Imagen capturada (en formato Base64)
  public capturedImage: string | null = null;

  // Texto reconocido
  public recognizedText: string = '';

  // Método para disparar la captura de imagen
  public captureImage(): void {
    this.trigger.next();
  }

  // Método que maneja la imagen capturada
  public handleImage(webcamImage: any): void {
    this.capturedImage = webcamImage.imageAsDataUrl; // Guarda la imagen como Base64

    // Ejecuta el reconocimiento de texto automáticamente
    this.processImage();
  }

  // Observable vinculado al disparador
  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  // Método para procesar la imagen capturada
  public processImage(): void {
    if (this.capturedImage) {
      Tesseract.recognize(this.capturedImage, 'eng', {
        logger: (info: any) => console.log(info), // Opcional: muestra el progreso en la consola
      })
        .then(({ data: { text } }) => {
          // Filtra el texto reconocido: solo letras y números
          const filteredText = text.replace(/[^a-zA-Z0-9]/g, '');
          this.recognizedText = filteredText;
        })
        .catch((err) => {
          console.error('Error al procesar la imagen:', err);
        });
    } else {
      console.error('No hay una imagen capturada para procesar.');
    }
  }

  // Método para descargar la imagen
  public downloadImage(): void {
    if (!this.capturedImage) {
      alert('Primero debes capturar una imagen.');
      return;
    }

    // Convertir la imagen Base64 a un Blob
    const imageBlob = this.base64ToBlob(this.capturedImage);

    // Crear un enlace de descarga
    const link = document.createElement('a');
    const today = new Date().toISOString().slice(0, 10); // Formato YYYY-MM-DD
    const fileName = `imagen-${today}.png`; // Nombre del archivo

    link.href = URL.createObjectURL(imageBlob); // Crear URL del Blob
    link.download = fileName; // Nombre del archivo descargado
    link.click(); // Simular clic para descargar
  }

  // Convertir Base64 a Blob
  private base64ToBlob(base64: string): Blob {
    const byteString = atob(base64.split(',')[1]); // Decodificar la parte Base64
    const mimeString = base64.split(',')[0].split(':')[1].split(';')[0]; // Obtener el MIME type
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uintArray = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
      uintArray[i] = byteString.charCodeAt(i);
    }

    return new Blob([arrayBuffer], { type: mimeString });
  }
}