import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RegistrarUsuarioService } from 'src/app/service/registrar-usuario.service'
import { CryptoService } from 'src/app/service/crypto.service';

import { encryptHybrid } from "cross-crypto-ts";

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent {
  public publicKey: string = '';
  public encryptedData: string = '';  // Aquí pondrás tus datos cifrados.
  public decryptedResponse: string = '';

  constructor(private cryptoService: CryptoService) {}

  ngOnInit(): void {
    this.getPublicKey();
  }

  // Obtener la clave pública desde el backend
  getPublicKey(): void {
    this.cryptoService.getPublicKey().subscribe(
      (response) => {
        this.publicKey = response.publicKey;
        console.log('Clave pública recibida:', this.publicKey);
      },
      (error) => {
        console.error('Error al obtener la clave pública:', error);
      }
    );
  }

  // Enviar los datos cifrados al backend para descifrarlos
  decryptData(): void {
    const dataToSend = {
      datos_enviados: this.encryptedData, // Asegúrate de que este dato esté cifrado
    };

    const encrypted = encryptHybrid(dataToSend, this.publicKey);

    this.cryptoService.decryptData(encrypted).subscribe(
      (response) => {
        this.decryptedResponse = response.decrypted;
        console.log(response.decrypted.datos)
        console.log('Datos descifrados:', this.decryptedResponse);
      },
      (error) => {
        console.error('Error al descifrar los datos:', error);
      }
    );
  }
}