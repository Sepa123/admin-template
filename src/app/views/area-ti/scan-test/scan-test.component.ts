import { Component, OnInit, OnDestroy } from '@angular/core';

import { BrowserMultiFormatReader } from '@zxing/browser';

@Component({
  selector: 'app-scan-test',
  templateUrl: './scan-test.component.html',
  styleUrls: ['./scan-test.component.scss']
})
export class ScanTestComponent {
  private codeReader: BrowserMultiFormatReader;
  scannedCode: string | null = null;

  constructor() {
    this.codeReader = new BrowserMultiFormatReader();
  }

  ngOnInit(): void {
    this.startScanner();
  }

  startScanner(): void {
    // Decodificar usando la cámara predeterminada
    this.codeReader.decodeFromVideoDevice(undefined, 'video-preview', (result, error) => {
      if (result) {
        this.scannedCode = result.getText(); // Obtener el texto del código escaneado
        console.log('Código escaneado:', this.scannedCode);
      } else if (error) {
        // Mostrar el error en la consola (opcional)
        console.error('Error al escanear:', error.message || error);
      }
    });
  }

  ngOnDestroy(): void {
    const videoElement = document.getElementById('video-preview') as HTMLVideoElement;
    if (videoElement && videoElement.srcObject) {
      const stream = videoElement.srcObject as MediaStream;
      // Detener todas las pistas del stream de la cámara
      stream.getTracks().forEach((track) => track.stop());
      videoElement.srcObject = null; // Liberar el objeto fuente del video
    }
    console.log('Cámara detenida y recursos liberados.');
  }
}
