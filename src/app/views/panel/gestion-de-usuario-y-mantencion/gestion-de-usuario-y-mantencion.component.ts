import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GestionyMantencionService } from 'src/app/service/gestiony-mantencion.service';

interface Usuario {
  usuario_id: string;
  usuario_nombre: string;
  usuario_mail: string;
  usuario_telefono: string;
  area_id: string;
  area_nombre: string;
  rol_id: string;
  rol_nombre: string;
  imagen_perfil: string;
  activate: boolean;
  area_icono: string;
  area_color: string;
}

@Component({
  selector: 'app-registrar-usuarios',
  templateUrl: './gestion-de-usuario-y-mantencion.component.html',
  styleUrls: ['./gestion-de-usuario-y-mantencion.component.scss','./css2.component.scss'],
})
export class GestionDeUsuarioYMantencionComponent implements OnInit {
  @ViewChild('toggleFiltro') toggleFiltro!: ElementRef<HTMLInputElement>;

  public visible = false;
  Usuarios: any[] = [];
  UsuariosFiltrados: any[] = []; // Asegúrate de que esté declarada aquí
  Imagen: any; // Propiedad para almacenar la imagen
  filtro: any;

  imagenPerfil?: string;

  toggleLive() {
    this.visible = !this.visible;
  }
  handleLiveDemoChange(event: any) {
    this.visible = event;
  }
  onFileSelected($event: Event) {
    throw new Error('Method not implemented.');
  }
  mostrarModal = false;
  usuarios: Usuario[] = [];

  formUsuario: FormGroup;
  mostrarContrasena = false;
  nivelSeguridad: 'baja' | 'media' | 'alta' = 'baja';
  private imageUrls: string[] = [];

  constructor(private fb: FormBuilder, private gm: GestionyMantencionService) {
    this.formUsuario = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      area: ['Ventas', Validators.required],
      perfil: ['Admin', Validators.required],
      contrasena: ['', [Validators.required, Validators.minLength(8)]],
      telefono: [''],
      fechaNacimiento: [''],
      direccion: [''],
      imagenPerfil: [''],
    });
  }

  ngOnInit(): void {
    this.formUsuario.get('contrasena')?.valueChanges.subscribe((value) => {
      this.verificarSeguridadContrasena(value);
    });
    this.Users();
    this.getAreas();
    this.getRoles();
  }

  abrirModal() {
    this.mostrarModal = true;
  }


  cerrarModal() {
    this.mostrarModal = false;
    this.formUsuario.reset({
      area: 'Ventas',
      perfil: 'Admin',
    });
  }

  toggleMostrarContrasena() {
    this.mostrarContrasena = !this.mostrarContrasena;
  }

  generarContrasena() {
    const caracteres =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    let contrasena = '';
    for (let i = 0; i < 12; i++) {
      contrasena += caracteres.charAt(
        Math.floor(Math.random() * caracteres.length)
      );
    }
    this.formUsuario.patchValue({ contrasena });
  }

  copiarContrasena() {
    const contrasena = this.formUsuario.get('contrasena')?.value;
    navigator.clipboard.writeText(contrasena);
  }

  verificarSeguridadContrasena(contrasena: string) {
    if (
      contrasena.length >= 12 &&
      /[A-Z]/.test(contrasena) &&
      /[0-9]/.test(contrasena) &&
      /[!@#$%^&*()]/.test(contrasena)
    ) {
      this.nivelSeguridad = 'alta';
    } else if (
      contrasena.length >= 8 &&
      /[A-Z]/.test(contrasena) &&
      /[0-9]/.test(contrasena)
    ) {
      this.nivelSeguridad = 'media';
    } else {
      this.nivelSeguridad = 'baja';
    }
  }

  onSubmit() {
    if (this.formUsuario.valid) {
      this.usuarios.push(this.formUsuario.value);
      this.cerrarModal();
    }
  }

  Area: string = '';
  Rol: string = ''; 
  Estado: boolean = true; // Variable ligada al slider (true o false)
  Busqueda: string = ''; //variable para la busqueda

  filtrarUsuarios() {
    this.UsuariosFiltrados = this.Usuarios.filter((us) => {
      const matchAreas = this.Area ? String(us.area_id) === String(this.Area) : true;
      const matchRol = this.Rol ? String(us.rol_id) === String(this.Rol) : true;
      const matchEstado = us.activate === this.Estado;
      const matchBusqueda = this.Busqueda 
        ? (us.usuario_nombre && us.usuario_nombre.toLowerCase().includes(this.Busqueda.toLowerCase())) 
        : true;
        
      // console.log('Area:', this.Area, 'Rol:', this.Rol, 'Estado:', this.Estado, 'Busqueda:', this.Busqueda);
      return matchAreas && matchRol && matchEstado && matchBusqueda;
    });
  
    // console.log('Usuarios filtrados:', this.UsuariosFiltrados); // Verificar el resultado
  }

  // Helper para quitar tildes
  private quitarTildes(texto: string): string {
    return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  // Variable para controlar el estado del filtro
  filtroActivo: boolean = true;



  private readonly baseImageUrl =
    'https://hela.transyanez.cl/api/panel/image/foto_perfil/'; // URL base

  Users(): void {
    this.gm.getUsuarios().subscribe(
      (data) => {
        this.Usuarios = data;
        this.UsuariosFiltrados = data; // Asignar a la propiedad del componente
        this.filtrarUsuarios()
        this.Usuarios.forEach((usuario) => {
          usuario.imagenPerfilUrl =
            this.baseImageUrl + (usuario.imagen_perfil || 'default.jpg');
        });
      },
      (error) => {
        this.mostrarAlerta('No se han encontrado usuarios', 'error');
      }
    );
  }

  area: any []= [];

  getAreas():void {
    this.gm.getAreas().subscribe(
      (data) => {
        this.area = data
      },
      (error) => {
        this.mostrarAlerta('No se han encontrado áreas', 'error');
      }
    );
  }

  rol : any [] = [];
  getRoles(): void {
    this.gm.getRoles().subscribe(
      (data) => {
        this.rol = data;
        // console.log(data);
      },
      (error) => {
        this.mostrarAlerta('No se han encontrado roles', 'error');
      }
    );
  }
  ngOnDestroy(): void {
    // Limpiar URLs para evitar fugas de memoria
    this.imageUrls.forEach((url) => URL.revokeObjectURL(url));
  }
  mostrarAlerta(mensaje: string, tipo: 'success' | 'error' | 'warning'): void {
    // Crear un div para la alerta
    const alerta: HTMLDivElement = document.createElement('div');
    alerta.classList.add('alerta', tipo); // Añadir clase para tipo (success, error, warning)

    // Elegir icono basado en el tipo
    const icono: HTMLElement = document.createElement('i');
    switch (tipo) {
      case 'success':
        icono.classList.add('fas', 'fa-check-circle'); // Icono de éxito
        alerta.style.backgroundColor = 'rgba(40, 167, 69, 0.9)'; // Verde
        alerta.style.borderRadius = '10px';
        alerta.style.padding = '7px'; // Aumentar el padding
        break;
      case 'error':
        icono.classList.add('fas', 'fa-times-circle'); // Icono de error
        alerta.style.backgroundColor = '#dc3545'; // Rojo
        alerta.style.borderRadius = '10px';
        alerta.style.padding = '7px'; // Aumentar el padding
        break;
      case 'warning':
        icono.classList.add('fas', 'fa-exclamation-triangle'); // Icono de advertencia
        alerta.style.backgroundColor = '#ffc107'; // Amarillo
        alerta.style.borderRadius = '10px';
        alerta.style.padding = '7px'; // Aumentar el padding
        break;
    }

    // Añadir el icono y el mensaje al div de la alerta
    alerta.appendChild(icono);
    alerta.appendChild(document.createTextNode(mensaje));

    // Añadir la alerta al contenedor de alertas
    const alertaContainer: HTMLElement | null =
      document.getElementById('alertaContainer');
    if (alertaContainer) {
      alertaContainer.appendChild(alerta);

      // Mostrar la alerta con una animación de opacidad
      setTimeout(() => {
        alerta.style.opacity = '1';
      }, 100);

      // Ocultar la alerta después de 5 segundos y eliminarla del DOM
      setTimeout(() => {
        alerta.style.opacity = '0';
        setTimeout(() => {
          alerta.remove();
        }, 500);
      }, 5000);
    }
  }
}