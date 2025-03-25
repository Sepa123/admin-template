import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GestionyMantencionService, UsuarioUpdate, Usuario} from 'src/app/service/gestiony-mantencion.service';
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

  

  constructor(private fb: FormBuilder, private gm: GestionyMantencionService,  private http: HttpClient) {
    
  }
  

  ngOnInit(): void {
    

    
    this.Users();
    this.getAreas();
    this.getRoles();
  }


  visible: boolean = false; // Inicialización
  visible2: boolean = false;
  toggleLive() {
    this.visible = !this.visible;
    // console.log("Estado del modal:", this.visible); // Verificación del estado
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
  
  toggleLive2() {
    this.visible2 = !this.visible2;
    // console.log("Estado del modal:", this.visible); // Verificación del estado
  }
  
  handleLiveDemoChange2(event: any) {
    this.visible2 = event;
  }


  onFileSelected($event: Event) {
    throw new Error('Method not implemented.');
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


  nombreUser: string = ''
  idUser: string = ''
  recuperarUserdata(nombre : string, Png: string, idUser: string) {
    this.imagenPerfil = Png
    this.nombreUser = nombre
    this.idUser = idUser
    this.getUsersEdit(this.idUser)
    // console.log(this.idUser);
    
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
    // console.log('Nivel de seguridad de la contraseña:', this.nivelSeguridad); // Para depuración
  }
  
  onSubmit() {
    // console.log('Datos antes de enviar:', this.nuevoUsuario);
  
    this.gm.agregarUsuario(this.nuevoUsuario).subscribe({
      next: (response) => {
        // console.log('Usuario creado:', response.message);
        this.resetFormulario();
      },
      error: (err) => {
        console.error('Error al crear usuario:', err);
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
        this.area = data
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
        this.rol = data;
        // console.log(data);
      },
      (error) => {
        this.mostrarAlerta('No se han encontrado roles', 'error');
      }
    );
  }

  userData: any;
  
getUsersEdit(id: string): void {
  if (!id) {
    this.mostrarAlerta('ID no válido', 'error');
    return;
  }

  this.gm.getUsuariosTablaEdit(id).pipe(take(1)).subscribe(
    (data) => {
      // Accede al primer elemento del array
      this.userData = data[0];
      this.setFormValues();
    },
    (error) => {
      console.error('Error:', error);
      this.mostrarAlerta('Error al cargar datos', 'error');
    }
  );
}

usuarioId!: number;  // Debes obtener este ID de alguna forma (ej: ruta, input)
updateData: UsuarioUpdate = {};

actualizarUsuario() {
  this.usuarioId = parseInt(this.idUser); 
  this.gm.actualizarUsuario(this.usuarioId, this.updateData)
    .subscribe({
      next: (response) => {
        // console.log('Actualización exitosa:', response.message);
        // Resetear formulario
        this.mostrarAlerta('Usuario actualizado correctamente', 'success');
        this.updateData = {};
        this.getUsersEdit(this.idUser)
      },
      error: (err) => {
        // console.error('Error en actualización:', err);
        this.mostrarAlerta('Error al actualizar usuario', 'error');
      }
    });
}



// Función para asignar valores a los inputs
private setFormValues(): void {
  // Mapeo de nombres diferentes entre la API y el HTML
  const fieldMappings = {
    nombre: 'nombre',
    correo: 'mail',
    telefono: 'telefono',
    fechaNacimiento: 'fecha_nacimiento',
    direccion: 'direccion'
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