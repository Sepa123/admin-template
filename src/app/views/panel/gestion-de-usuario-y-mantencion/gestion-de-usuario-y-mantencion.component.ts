import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GestionyMantencionService, UsuarioUpdate, Usuario} from '../../../service/gestiony-mantencion.service';
import { take } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-registrar-usuarios',
  templateUrl: './gestion-de-usuario-y-mantencion.component.html',
  styleUrls: ['./gestion-de-usuario-y-mantencion.component.scss', './css2.component.scss', './css3.component.scss'],
})
export class GestionDeUsuarioYMantencionComponent implements OnInit {
  @ViewChild('toggleFiltro') toggleFiltro!: ElementRef<HTMLInputElement>;

  // Datos de ejemplo en el componente

  nuevoUsuario = {
    nombre: '',
    mail: '',
    telefono: '',
    fecha_nacimiento: '',
    direccion: '',
    cargo: '',
    id_supervisor: 0, // Cambiar null
    activate: true,
    area_id: 0, // Cambiar null por 0
    rol_id: 0,  // Cambiar null por 0
    password: ''
  };


  Usuarios: any[] = [];
  UsuariosFiltrados: any[] = []; // Asegúrate de que esté declarada aquí
  Imagen: any; // Propiedad para almacenar la imagen
  filtro: any;

  imagenPerfil?: string;

  mostrarModal = false;
  usuarios: Usuario[] = [];

  mostrarContrasena = false;
  nivelSeguridad: 'baja' | 'media' | 'alta' = 'baja';
  private imageUrls: string[] = [];
  userId: any;
  imagenSeleccionada: File | null = null;
  

  constructor(private fb: FormBuilder, private gm: GestionyMantencionService,  private http: HttpClient) {
    
  }
  

  ngOnInit(): void {
    

    
    this.Users();
    this.getAreas();
    this.getRoles();
    this.getSupervisor();
  }


  visible: boolean = false; // Inicialización
  visible2: boolean = false;
  toggleLive() {
    this.visible = !this.visible;
    if (!this.visible) {
      this.resetFormValues(); // Restablecer valores al cerrar el modal
    }
  }
  
  handleLiveDemoChange(event: any) {
    this.visible = event;
  }

  toggleMostrarContrasena() {
    this.mostrarContrasena = !this.mostrarContrasena; // Alternar entre true y false
  }

  copiarContrasena() {
    const contrasena = this.nuevoUsuario.password; // Obtén la contraseña del modelo
    if (contrasena) {
      navigator.clipboard.writeText(contrasena).then(() => {
        console.log('Contraseña copiada al portapapeles:', contrasena);
        this.mostrarAlerta('Contraseña copiada al portapapeles', 'success'); // Opcional: mostrar alerta
      }).catch((err) => {
        console.error('Error al copiar la contraseña:', err);
        this.mostrarAlerta('Error al copiar la contraseña', 'error'); // Opcional: mostrar alerta
      });
    } else {
      this.mostrarAlerta('No hay contraseña para copiar', 'warning'); // Opcional: mostrar alerta
    }
  }
  
  toggleLive2(): void {
    this.visible2 = !this.visible2;
    if (!this.visible2) {
      this.resetFormValues(); // Restablecer valores al cerrar el modal
    }
  }
  
  handleLiveDemoChange2(event: any) {
    this.visible2 = event;
  }

  nombreArchivo: string | null = null;

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.imagenSeleccionada = input.files[0];
      this.nombreArchivo = input.files[0].name; // Almacena el nombre del archivo
      console.log('Archivo seleccionado:', this.nombreArchivo);
    } else {
      this.nombreArchivo = null; // Si no se selecciona archivo, limpia el nombre
    }
  }
  
  guardarImagen(): void {

    const id_user = this.id_User

    if (!this.imagenSeleccionada) {
      this.mostrarAlerta('No se ha seleccionado ninguna imagen', 'warning');
      return;
    }

    this.gm.subirImagen(id_user, this.imagenSeleccionada).subscribe({
      next: (response) => {
        console.log('Imagen subida exitosamente:', response);
        // Actualiza la variable nombreArchivo con el nombre del archivo devuelto por el backend

      // Construye la URL de la imagen y actualiza la imagen del usuario actual
        this.imagenPerfil = `https://hela.transyanez.cl/api/panel/image/foto_perfil/${this.nombreArchivo}`;

        this.mostrarAlerta('Imagen subida exitosamente.', 'success');
        },
      error: (error) => {
        console.error('Error al subir la imagen:', error);
        this.mostrarAlerta('Error al subir la imagen.', 'error');
      },
    });
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
    this.nuevoUsuario.password = contrasena; // Asignar la contraseña generada
    // console.log('Contraseña generada:', contrasena); // Para depuración
  }
  generarContrasenaEdicion() {
    const caracteres =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    let contrasena = '';
    for (let i = 0; i < 12; i++) {
      contrasena += caracteres.charAt(
        Math.floor(Math.random() * caracteres.length)
      );
    }
    this.updateData.password = contrasena; // Asignar la contraseña generada
    // console.log('Contraseña generada:', contrasena); // Para depuración
  }


  nombreUser: string = ''
  id_User: string = ''
  recuperarUserdata(nombre : string, Png: string, idUser: string) {
    
    
    this.imagenPerfil = Png
    this.nombreUser = nombre
    this.id_User = idUser
    this.getUsersEdit(this.id_User)
    console.log(this.id_User);
    
  }
  
  verificarSeguridadContrasena(contrasena: string | undefined): void {
    const password = contrasena || ''; // Si es undefined, usa una cadena vacía
    if (
      password.length >= 12 &&
      /[A-Z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[!@#$%^&*()]/.test(password)
    ) {
      this.nivelSeguridad = 'alta';
    } else if (
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[0-9]/.test(password)
    ) {
      this.nivelSeguridad = 'media';
    } else {
      this.nivelSeguridad = 'baja';
    }
  }
  
  onSubmit() {
    // console.log('Datos antes de enviar:', this.nuevoUsuario);
  
    this.gm.agregarUsuario(this.nuevoUsuario).subscribe({
      next: (response) => {
        // console.log('Usuario creado:', response.message);
        this.mostrarAlerta('Usuario creado correctamente', 'success');
        this.agregarBitacora({
          id_user: sessionStorage.getItem('id')?.toString() + '',
          ids_user:
            sessionStorage.getItem('server') +
            '-' +
            sessionStorage.getItem('id') +
            '',
          origen: 'edicion y matencion de Usuario',
          dato_actual: 'Nuevo Usuario', // Datos actuales antes del cambio
          dato_resultado: JSON.stringify(this.updateData), // Datos después del cambio
          tabla_impactada: 'hela.usuarios',
        });
        this.resetFormulario();
      },
      error: (err) => {
        this.mostrarAlerta('Error al crear usuario', 'error');
        // console.error('Error al crear usuario:', err);
      }
    });
  }

  resetFormulario() {
    this.nuevoUsuario = {
      nombre: '',
      mail: '',
      telefono: '',
      fecha_nacimiento: '',
      direccion: '',
      cargo: '',
      id_supervisor: 0,
      activate: false,
      area_id: 0,
      rol_id: 0,
      password: ''
    };
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
        this.area = data.sort((a: any, b: any) => a.nombre.localeCompare(b.nombre));
      },
      (error) => {
        this.mostrarAlerta('No se han encontrado áreas', 'error');
      }
    );
  }

  sup: any []= [];

  getSupervisor():void {
    this.gm.getSupervisor().subscribe(
      (data) => {
        this.sup = data.sort((a: any, b: any) => a.nombre.localeCompare(b.nombre));
      },
      (error) => {
        this.mostrarAlerta('No se han encontrado áreas', 'error');
      }
    );
  }

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

  rol : any [] = [];
  getRoles(): void {
    this.gm.getRoles().subscribe(
      (data) => {
        this.rol = data.sort((a: any, b: any) => a.nombre.localeCompare(b.nombre));;
        // console.log(data);
      },
      (error) => {
        this.mostrarAlerta('No se han encontrado roles', 'error');
      }
    );
  }

  userData: any;
  cargando: boolean = true; // Por defecto, está cargando

getUsersEdit(id: string): void {
  if (!id) {
    this.mostrarAlerta('ID no válido', 'error');
    return;
  }

  this.cargando = true; // Inicia la carga
  this.gm.getUsuariosTablaEdit(id).pipe(take(1)).subscribe(
    (data) => {
      this.userData = data[0]; // Asigna los datos del usuario
      this.updateData = { ...this.userData }; // Copia los valores directamente a updateData
      this.cargando = false; // Finaliza la carga
    },
    (error) => {
      console.error('Error:', error);
      this.mostrarAlerta('Error al cargar datos', 'error');
      this.cargando = false; // Finaliza la carga incluso si hay error
    }
  );
}

usuarioId!: number;  // Debes obtener este ID de alguna forma (ej: ruta, input)
updateData: UsuarioUpdate = {};

actualizarUsuario() {
  this.usuarioId = parseInt(this.id_User); 
  this.gm.actualizarUsuario(this.usuarioId, this.updateData)
    .subscribe({
      next: (response) => {
        // console.log('Actualización exitosa:', response.message);
        // Resetear formulario
        this.agregarBitacora({
          id_user: sessionStorage.getItem('id')?.toString() + '',
          ids_user:
            sessionStorage.getItem('server') +
            '-' +
            sessionStorage.getItem('id') +
            '',
          origen: 'edicion y matencion de Usuario',
          dato_actual: JSON.stringify(this.userData), // Datos actuales antes del cambio
          dato_resultado: JSON.stringify(this.updateData), // Datos después del cambio
          tabla_impactada: 'hela.usuarios',
        });
        this.updateData = {};
        this.getUsersEdit(this.id_User)
        this.mostrarAlerta('Usuario actualizado correctamente', 'success');
        
        this.toggleLive2(); // Cerrar el modal
      },
      error: (err) => {
        // console.error('Error en actualización:', err);
        this.mostrarAlerta('Error al actualizar usuario', 'error');
      }
    });
}

private resetFormValues(): void {
  // Restablecer valores del formulario de ingreso de usuario
  this.nuevoUsuario = {
    nombre: '',
    mail: '',
    telefono: '',
    fecha_nacimiento: '',
    direccion: '',
    cargo: '',
    id_supervisor: 0,
    area_id: 0,
    rol_id: 0,
    password: '',
    activate: true,
  };

  // Restablecer valores del formulario de edición de usuario
  this.updateData = {
    nombre: '',
    mail: '',
    telefono: '',
    fecha_nacimiento: '',
    direccion: '',
    cargo: '',
    id_supervisor: 0,
    area_id: 0,
    rol_id: 0,
    password: '',
    activate: true,
  };

  // Opcional: Restablecer otras variables relacionadas
  this.nombreArchivo = null;
  this.imagenPerfil = 'assets/images/default-profile.png';
}

// Función para asignar valores a los inputs
private setFormValues(): void {
  // Mapeo de nombres diferentes entre la API y el HTML
  const fieldMappings = {
    nombre: 'nombre',
    correo: 'mail',
    telefono: 'telefono',
    fechaNacimiento: 'fecha_nacimiento',
    direccion: 'direccion',
    activate: 'activate'
  };

  // Asignación de valores
  Object.entries(fieldMappings).forEach(([htmlId, apiKey]) => {
    const element = document.getElementById(htmlId) as HTMLInputElement;
    if (element && this.userData[apiKey] !== null) {
      element.value = this.userData[apiKey];
    }
  });

  // Caso especial para fecha (formato ISO -> yyyy-mm-dd)
  const fechaInput = document.getElementById('fechaNacimiento') as HTMLInputElement;
  if (fechaInput && this.userData.fecha_nacimiento) {
    fechaInput.value = new Date(this.userData.fecha_nacimiento).toISOString().split('T')[0];
  }
}
  ngOnDestroy(): void {
    // Limpiar URLs para evitar fugas de memoria
    this.imageUrls.forEach((url) => URL.revokeObjectURL(url));
  }

  // Método para mostrar alertas
  
  mostrarAlerta(mensaje: string, tipo: 'success' | 'error' | 'warning' | 'info'): void {
    // Crear un div para la alerta
    const alerta: HTMLDivElement = document.createElement('div');
    alerta.classList.add('alerta', tipo); // Añadir clase para tipo (success, error, warning, info)
  
    // Elegir icono basado en el tipo
    const icono: HTMLElement = document.createElement('i');
    switch (tipo) {
      case 'success':
        icono.classList.add('fas', 'fa-check-circle'); // Icono de éxito
        alerta.style.backgroundColor = 'rgba(40, 167, 69, 0.9)'; // Verde
        break;
      case 'error':
        icono.classList.add('fas', 'fa-times-circle'); // Icono de error
        alerta.style.backgroundColor = '#dc3545'; // Rojo
        break;
      case 'warning':
        icono.classList.add('fas', 'fa-exclamation-triangle'); // Icono de advertencia
        alerta.style.backgroundColor = '#ffc107'; // Amarillo
        break;
      case 'info':
        icono.classList.add('fas', 'fa-info-circle'); // Icono de información
        alerta.style.backgroundColor = '#17a2b8'; // Azul
        break;
    }
  
    // Añadir el icono y el mensaje al div de la alerta
    alerta.appendChild(icono);
    alerta.appendChild(document.createTextNode(mensaje));
  
    // Añadir la alerta al contenedor de alertas
    const alertaContainer: HTMLElement | null = document.getElementById('alertaContainer');
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

  agregarBitacora(bitacoraData: {
    id_user: string;
    ids_user?: string;
    origen: string;
    dato_actual?: string;
    dato_resultado?: string;
    tabla_impactada: string;
  }): void {
    //https://hela.transyanez.cl/api
    this.http.post('http://localhost:8000/api/Agregar/Bitacora/', bitacoraData).subscribe({
      next: (response: any) => {
        console.log('Registro agregado a la bitácora:', response.message);
      },
      error: (err) => {
        console.error('Error al agregar registro a la bitácora:', err);
      },
    });
  }
}