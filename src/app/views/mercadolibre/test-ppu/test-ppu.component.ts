import { Component, ElementRef, ViewChild } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import Tesseract from 'tesseract.js';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-test-ppu',
  templateUrl: './test-ppu.component.html',
  styleUrls: ['./test-ppu.component.scss']
})
export class TestPPUComponent {


  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;
  capturedImage: string | null = null;
  capturedImage2: string | null = null;

  constructor(private http: HttpClient) {}
  confirmacion: boolean = false;
  // Evento para capturar la imagen
  private trigger: Subject<void> = new Subject<void>();
  canTakePhoto: boolean = true; // Controla si se pueden tomar más fotos
  private hasProcessedFirstImage: boolean = false;
  // Lista de imágenes capturadas (máximo 3)
  public capturedImages: string[] = [];

  isLoadingFull: boolean = true;

  // Texto reconocido
  public recognizedText: string = '';

  // Imagen seleccionada para vista previa
  public selectedImage: string | null = null;

  public selectedImageIndex: number | null = null; // Índice de imagen seleccionada
  public showPreview: boolean = false; // Muestra la imagen previsualizada

  // Nueva variable para manejar el estado de la cámara
  public isCameraActive: boolean = true;

  isModalOpen: boolean = false;

openModal() {
  this.isModalOpen = true;
}

closeModal() {
  this.isModalOpen = false;
}

LimpiarImagenes(){
  this.capturedImages = [];
  this.apiInfo = "";
}
  // Método para disparar la captura de imagen
  public captureImage(): void {
    if (this.capturedImages.length < 4) {
        this.trigger.next(); // Captura la imagen
        this.getGeolocation(); // Obtiene la geolocalización

        // Procesar la imagen solo si es la primera y no ha sido procesada aún
        if (this.capturedImages.length === 1) {
            this.hasProcessedFirstImage = true; // Marcar como procesada
            this.processImage(this.capturedImages[0]); // Procesar solo la primera imagen
            this.openModal();
          }
    } else {
        alert('Solo puedes almacenar un máximo de 4 imágenes.');
    }
}


  

  // Método que maneja la imagen capturada
  public handleImage(webcamImage: any): void {
    if (this.capturedImages.length < 4) {
      this.capturedImages.push(webcamImage.imageAsDataUrl); // Guarda la imagen en el arreglo
    }
  }

  // Observable vinculado al disparador
  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  deleteImage(index: number): void {
    this.capturedImages.splice(index, 1);
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
          this.fetchApiInfo(); // Llama a la API con el texto reconocido
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

  //funcion recuperar data de api
  
  public codigoRecuperado: any ;

  public ppuRecuperada: string = ''; // Declare the property

  public idRecuperada: string = ''; // Declare the property


  // Función para llamar a la API y mostrar un modal
  public apiInfo: any = null; // Información obtenida de la API
  public isLoading: boolean = false; // Controla el estado de carga
  public errorMessage: string = ''; // Mensaje de error
  public patente: string = ''; // Patente reconocida
  public confirmar_Ruta: boolean = true; // Patente reconocida
  public confirmar_patente: boolean = true; // Patente reconocida

  public fetchApiInfo(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.isLoadingFull = true;
    this.patente = this.recognizedText; // Guarda la patente reconocida

    // Llamada HTTP GET a la API
    this.http.get(`https://hela.transyanez.cl/api/camara/info/?Ppu=${this.patente}`).subscribe({
      next: (data: any) => {
        this.apiInfo = data; // Guarda la información obtenida
        this.isLoading = false;
        this.recuperardata(data[0].codigo, data[0].patente_result, data[0].ruta_meli_result);
        if (data[0].ruta_meli_result == null) {
          this.confirmar_Ruta = false;
          console.log('Ruta Meli Result es nulo');
        } else {
          this.confirmar_Ruta = true;
        }
        if (data[0].patente_result == null) {
          this.confirmar_patente = false;
          console.log('Patente Result es nulo');
        } else {
          this.confirmar_patente = true;
        }
        console.log('Información obtenida:', data);

        this.isLoadingFull = false;
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

  // public openModal(): void {
  //   const modalElement = document.getElementById('infoModal');
  //   if (modalElement) {
  //     modalElement.style.display = 'block';
  //   }
  // 
  // // Método para cerrar el modal
  // public closeModal(): void {
  //   const modalElement = document.getElementById('infoModal');
  //   if (modalElement) {
  //     modalElement.style.display = 'none';
  //   }
  // }

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


  uploadForm!: FormGroup;
   // URL del endpoint en FastAPI


   recuperardata(codigo : number, ppuF: string, id_ruta: string){

    this.codigoRecuperado = codigo;
    this.ppuRecuperada = ppuF;
    this.idRecuperada = id_ruta;
    
    console.log(this.codigoRecuperado, this.ppuRecuperada, this.idRecuperada)
  }

  onSubmit() {
    const formData = new FormData();
    
    // Agregar datos adicionales al FormData
    formData.append('latitud', this.lat!.toString());
    formData.append('longitud', this.lng!.toString());
    formData.append('escaneo', this.recognizedText);
    formData.append('ppu', this.ppuRecuperada);
    formData.append('id_ruta', this.idRecuperada);
    // agregar this.idRecuperada a id_ruta al release.
    formData.append('intentos', '3');
    
    // Función que convierte Base64 a Blob
    const base64ToBlob = (base64: string): Blob => {
      const byteCharacters = atob(base64);  // Decodifica el Base64 a caracteres
      const byteArrays = [];
      for (let offset = 0; offset < byteCharacters.length; offset++) {
        const byteArray = byteCharacters.charCodeAt(offset);
        byteArrays.push(byteArray);
      }
      return new Blob([new Uint8Array(byteArrays)], { type: 'image/png' });
    };
  
    // Función que agrega las imágenes al FormData
    const agregarImagenes = this.capturedImages.map((base64Image, index) => {
      const blob = this.base64ToBlob(base64Image); // Convertir Base64 a Blob
  
      return new Promise<void>((resolve, reject) => {
        const reader = new FileReader();
        
        reader.onload = () => {
          const arrayBuffer = reader.result as ArrayBuffer;
          const byteArray = new Uint8Array(arrayBuffer);
          const byteBlob = new Blob([byteArray], { type: blob.type });
          
          
          formData.append(`imagen${index + 1}_png`, byteBlob, `imagen${index + 1}.png`);
          resolve();  // Aseguramos que la promesa se resuelva cuando se agrega la imagen
        };
        
        reader.onerror = reject; // Manejar errores en la lectura del archivo
        reader.readAsArrayBuffer(blob);
      });
    });
  
    // Esperar a que todas las imágenes se agreguen al FormData
    Promise.all(agregarImagenes)
      .then(() => {
        console.log('FormData listo para enviar:', formData);

        formData.forEach((value, key) => {
          console.log(key, value);
        });
        
        // Realizar la solicitud HTTP POST
        this.http.post('https://hela.transyanez.cl/api/camara/subir-archivo/', formData).subscribe(
          (response) => {
            console.log('Imágenes enviadas correctamente', response);
          },
          (error) => {
            console.error('Error al enviar las imágenes', error);
          }
        );
      })
      .catch((error) => {
        console.error('Error al procesar las imágenes', error);
      });
  }
  
  // Método para convertir base64 a Blob
  base64ToBlob(base64: string): Blob {
    const byteString = atob(base64.split(',')[1]);
    const mimeString = base64.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  }
    
}

