import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { take } from 'rxjs';
import { Region } from '../../../models/taskmaster/taskmaster.interface';
import {
  EditarRutaService,
  Cliente,
  UpdateCliente,
} from 'src/app/service/editar-ruta.service';

interface GpOperacion {
  id: number;
  grupo_operacion: string;
  servicio : string;
}
interface Operacion {
  id: number;
  operacion: string;
  region : number;
  glosa: string;
}

@Component({
  selector: 'app-editar-ruta',
  templateUrl: './editar-ruta.component.html',
  styleUrls: ['./editar-ruta.component.scss','./editar-ruta2.component.scss','./editar-ruta3.component.scss','./editar-ruta4.component.scss', './editar-ruta5.component.scss'],
})

export class EditarRutaComponent {
  @ViewChild('toggleFiltro') toggleFiltro!: ElementRef<HTMLInputElement>;

  // Datos de ejemplo en el componente

  nuevoCliente = {
    id_usuario: sessionStorage.getItem('id')?.toString() + '',
    ids_usuario:
      sessionStorage.getItem('server') +
      '-' +
      sessionStorage.getItem('id') +
      '',
      nombre: '',
      rut: '',
      direccion: '',
      ciudad: null as number | null, // Permitir null o number
      region: null as number | null, // Permitir null o number
      telefono: '',
      correo: '',
      representante: '',
      activo: true, // Valor predeterminado para boolean
      esquema_destino: "null",
      tabla_destino: "null",
      id_operacion: null as number | null, // Permitir null o number
      id_centro_op: null as number | null, // Permitir null o number
      id_seguimiento: null as number | null, // Permitir null o number
  };

  Cliente: any[] = [];
  ClienteFiltrado: any[] = []; // Asegúrate de que esté declarada aquí
  Imagen: any; // Propiedad para almacenar la imagen
  filtro: any;

  imagenPerfil?: string;

  mostrarModal = false;
  Clientes: Cliente[] = [];

  mostrarContrasena = false;
  nivelSeguridad: 'baja' | 'media' | 'alta' = 'baja';
  private imageUrls: string[] = [];
  userId: any;
  imagenSeleccionada: File | null = null;

  constructor(
    private fb: FormBuilder,
    private gm: EditarRutaService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.getOp();
    this.getCop();
    this.getSc();
    this.getGpOperaciones()
    this.AccountUserid();
    this.Clients();
    this.getRegiones();
    this.getComunas();
    
  }

  LoginId: string = '';

  AccountUserid() {
    this.LoginId = sessionStorage.getItem('rol_id')?.toString() + '';
    // console.log(this.LoginId);
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
      // console.log('Archivo seleccionado:', this.nombreArchivo);
    } else {
      this.nombreArchivo = null; // Si no se selecciona archivo, limpia el nombre
    }
  }

  guardarImagen(): void {
    const id_user = this.Id_cliente;

    if (!this.imagenSeleccionada) {
      this.mostrarAlerta('No se ha seleccionado ninguna imagen', 'warning');
      return;
    }

    this.gm.subirImagen(id_user, this.imagenSeleccionada).subscribe({
      next: (response) => {
        // console.log('Imagen subida exitosamente:', response);
        // Actualiza la variable nombreArchivo con el nombre del archivo devuelto por el backend

        // Construye la URL de la imagen y actualiza la imagen del usuario actual
        this.imagenPerfil = `https://hela.transyanez.cl/api/panel/image/foto_perfil/${this.nombreArchivo}`;
        this.mostrarAlerta('Imagen subida exitosamente.', 'success');
      },
      error: (error) => {
        // console.error('Error al subir la imagen:', error);
        this.mostrarAlerta('Error al subir la imagen.', 'error');
      },
    });
  }

  nombreUser: string = '';
  Id_cliente: string = '';
  id_operacionRECUPERAR: string = '';
  recuperarUserdata(nombre: string, Png: string, id_C: string) {
    this.imagenPerfil = Png;
    this.nombreUser = nombre;
    this.Id_cliente = id_C;
    // this.id_operacionRECUPERAR = id_OPC
    this.getUsersEdit(this.Id_cliente);
    // console.log(this.Id_cliente, this.nombreUser);
  }

  onSubmit() {

    // console.log('Datos antes de enviar:', this.nuevoCliente);
    this.nuevoCliente.region = Number(this.nuevoCliente.region);
    this.nuevoCliente.ciudad = Number(this.nuevoCliente.ciudad);
    this.nuevoCliente.id_operacion = this.nuevoCliente.id_operacion ?? 0; // Si es null, asignar 0
    this.nuevoCliente.id_centro_op = this.nuevoCliente.id_centro_op ?? 0; // Si es null, asignar 0
    this.nuevoCliente.id_seguimiento = this.nuevoCliente.id_seguimiento ?? 0; // Asegurarse de que sea booleano

    this.gm.agregarCliente(this.nuevoCliente).subscribe({
      next: (response) => {
        this.Clients();
        // console.log('Usuario creado:', response);
        // console.log('Datos enviados:', this.nuevoCliente);
        // console.log('Usuario creado:', response.message);
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
          tabla_impactada: 'ruta.clientes',
        });
        this.resetFormulario();
      },
      error: (err: any) => {
        console.error('Error al crear usuario:', err);
      },
    });
  }

  // id_user: sessionStorage.getItem('id')?.toString() + '',
  //         ids_user:
  //           sessionStorage.getItem('server') +
  //           '-' +
  //           sessionStorage.getItem('id') +
  //           '',
  resetFormulario() {
    this.nuevoCliente = {
      id_usuario: sessionStorage.getItem('id')?.toString() + '',
      ids_usuario:
        sessionStorage.getItem('server') +
        '-' +
        sessionStorage.getItem('id') +
        '',
      nombre: '',
      rut: '',
      direccion: '',
      ciudad: null,
      region: null,
      telefono: '',
      correo: '',
      representante: '',
      activo: true, // Valor predeterminado para boolean
      esquema_destino: "null",
      tabla_destino: "null",
      id_operacion: null,
      id_centro_op: null,
      id_seguimiento: null,
    };
  }

  Area: string = '';
  Rol: string = '';
  Estado: boolean = true; // Variable ligada al slider (true o false)
  Busqueda: string = ''; //variable para la busqueda

  filtrarUsuarios() {
    this.ClienteFiltrado = this.Cliente.filter((cf) => {
      // const matchAreas = this.Area ? String(us.area_id) === String(this.Area) : true;
      // const matchRol = this.Rol ? String(us.rol_id) === String(this.Rol) : true;
      const matchEstado = cf.activo === this.Estado;
      const matchBusqueda = this.Busqueda
        ? cf.nombre &&
          cf.nombre.toLowerCase().includes(this.Busqueda.toLowerCase())
        : true;

      // console.log('Area:', this.Area, 'Rol:', this.Rol, 'Estado:', this.Estado, 'Busqueda:', this.Busqueda);
      return matchEstado && matchBusqueda;
    });

    // console.log('Usuarios filtrados:', this.ClienteFiltrado); // Verificar el resultado
  }

  // Helper para quitar tildes
  private quitarTildes(texto: string): string {
    return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  // Variable para controlar el estado del filtro
  filtroActivo: boolean = true;

  private readonly baseImageUrl =
    'https://hela.transyanez.cl/api/panel/image/foto_perfil/'; // URL base

  Clients(): void {
    this.gm.getClient().subscribe(
      (data) => {
        this.Cliente = data;
        this.ClienteFiltrado = data; // Asignar a la propiedad del componente
        this.filtrarUsuarios();
        this.Cliente.forEach((usuario) => {
          usuario.logo_img =
            this.baseImageUrl + (usuario.logo_img || 'default.jpg');
        });
        // console.log(this.ClienteFiltrado);
      
      },
      (error) => {
        this.mostrarAlerta('No se han encontrado usuarios', 'error');
      }
    );
  }

  ComunasFiltradas: any[] = []; // Lista de comunas filtradas según la región seleccionada
  regionSeleccionada: number | null = null; 
  operacionSeleccionada: number | null = null; // ID de la región seleccionada
  CentroOperacionSeleccionada: number | null = null;
  regiones: any[] = [];
  Comunas: any[] = [];
  getRegiones(): void {
    this.gm.getRegiones().subscribe(
      (data) => {
        this.regiones = data;
        this.filtrarComunasPorRegion(); 
      },
      (error) => {
        this.mostrarAlerta('No se han encontrado áreas', 'error');
      }
    );
  }

  getComunas(): void {
    this.gm.getComunas().subscribe(
      (data) => {
        this.Comunas = data;
        this.ComunasFiltradas = [...this.Comunas]; // Inicializa con todas las comunas
      },
      (error) => {
        console.error('Error al cargar comunas:', error);
      }
    );
  }

  Operaciones: any[] = []; // Lista completa de operaciones
CentroOperaciones: any[] = []; // Lista completa de centros de operaciones
OperacionesFiltradas: any[] = []; // Lista filtrada de operaciones
CentroOperacionesFiltradas: any[] = []; // Lista filtrada de centros de operaciones

// Método para obtener las operaciones
getOp(): void {
  this.gm.getOp().subscribe(
    (data) => {
      this.Operaciones = data;
      this.OperacionesFiltradas = [...this.Operaciones]; // Inicialmente, todas las operaciones están disponibles
    },
    (error) => {
      this.mostrarAlerta('No se han encontrado operaciones', 'error');
    }
  );
}

CentroOperacionUpdate: [] = [];

getCop(): void {
  this.gm.getCop().subscribe(
    (data) => {
      this.CentroOperaciones = data;
      this.CentroOperacionesFiltradas = [...this.CentroOperaciones]; // Inicialmente, todos los centros están disponibles
    },
    (error) => {
      this.mostrarAlerta('No se han encontrado centros de operaciones', 'error');
    }
  );
}

gpOperaciones: GpOperacion[] = [];
 getGpOperaciones(): void {
    const url = `https://hela.transyanez.cl/api/editar_ruta/GpOperacion/`;
    this.http.get<GpOperacion[]>(url).subscribe({
      next: (data) => {
        this.gpOperaciones = data;
        console.log('Operación encontrada:', data);
      },
      error: (error) => {
        this.mostrarAlerta('No se pudo obtener la operación', 'error');
      }
    });
  }

  selectedGpOperacion: number | null = null;
  
  id_GpO: any = '';

  onGpSelectOperacion(event: Event): void {
  const selectElement = event.target as HTMLSelectElement;
  const id = Number(selectElement.value);

  if (!isNaN(id)) {
    this.getSLoperacionesbyid(id);
    this.id_GpO = id; // Asigna el ID de la operación seleccionada
  }
}
region: string = ''
glosa: any = ''
id_SO: number | null = null; // ID de la operación seleccionada

selectedSO: any = null; // o mejor con tipo fuerte si tienes una interfaz
onSelectOperacion(): void {
  if (this.selectedSO) {
    this.id_SO = this.selectedSO.id;
    this.region = this.selectedSO.region;
    this.glosa = this.selectedSO.glosa;
  }
}

paresSeleccionados: { idGpO: number, idCentroSeleccionado: number }[] = [];

  agregarPar(): void {
    if (this.id_GpO != null && this.id_SO != null) {
      this.paresSeleccionados.push({
        idGpO: this.id_GpO,
        idCentroSeleccionado: this.id_SO
      });

      // Limpiar después de agregar
      console.log('Par agregado:', this.id_GpO, this.id_SO);
      console.log('Pares seleccionados:', this.paresSeleccionados);
      
      this.id_SO = null;
    } else {
      alert("Debes seleccionar los tres valores.");
    }
  }
SlOperaciones: Operacion[] = [];
getSLoperacionesbyid(id: number): void {
  const url = `https://hela.transyanez.cl/api/editar_ruta/SelectOperacion/?id=${id}`;
  this.http.get<any>(url).subscribe({
    next: (data) => {
      // Aquí puedes manejar la respuesta, por ejemplo:
      this.SlOperaciones = data; // Asigna a una propiedad si lo necesitas
      this.region = data[0].region; // Asigna la región de la primera operación
      console.log('Operación encontrada:', data);
      // this.operacionSeleccionada = data; // O asigna a una propiedad si lo necesitas
    },
    error: (error) => {
      this.mostrarAlerta('No se pudo obtener la operación', 'error');
    }
  });
}

SeguimientoClienteList: any [] = [];

getSc(): void {
  this.gm.getSC().subscribe(
    (data) => {
      this.SeguimientoClienteList = data;

    },
    (error) => {
      this.mostrarAlerta('No se han encontrado centros de operaciones', 'error');
    }
  );
}

// Método para filtrar los centros de operaciones según la operación seleccionada
filtrarCentroOperacionesPorSeleccion(): void {
  if (this.CentroOperacionesFiltradas !== null) {
    this.CentroOperacionesFiltradas = this.CentroOperaciones.filter(
      (cop) => Number(cop.id_op) === this.operacionSeleccionada
    );
    // console.log('Centros filtrados:', this.CentroOperacionesFiltradas);
  
  } else {
    this.CentroOperacionesFiltradas = [...this.CentroOperaciones]; // Mostrar todos si no hay selección
    // console.log('Mostrando todos los centros:', this.CentroOperacionesFiltradas);
  
  }
}

// Método para filtrar las operaciones según el centro de operaciones seleccionado
filtrarOperacionesPorSeleccion(idCentroSeleccionado: number | null): void {
  if (idCentroSeleccionado) {
    const centroSeleccionado = this.CentroOperaciones.find(
      (cop) => cop.id === idCentroSeleccionado
    );
    if (centroSeleccionado) {
      this.OperacionesFiltradas = this.Operaciones.filter(
        (op) => op.id === centroSeleccionado.id_op
      );
      console.log('Operaciones filtradas:', this.OperacionesFiltradas);
    }
  } else {
    this.OperacionesFiltradas = [...this.Operaciones]; // Mostrar todos si no hay selección
    console.log('Mostrando todas las operaciones:', this.OperacionesFiltradas);
  }
}
  filtrarComunasPorRegion(): void {
    if (this.regionSeleccionada !== null) {
      this.ComunasFiltradas = this.Comunas.filter(
        (comuna) => Number(comuna.id_region) === this.regionSeleccionada // Asegúrate de que ambos sean números
      );
      // console.log('Comunas filtradas:', this.ComunasFiltradas);
    } else {
      this.ComunasFiltradas = []; // Si no hay región seleccionada, no mostrar comunas
    }
  }

  onOperacionChange(event: any): void {
    this.operacionSeleccionada = Number(event.target.value);
    this.filtrarCentroOperacionesPorSeleccion(); // Filtrar centros de operaciones según la operación seleccionada
  }
  

  onRegionChange(event: any): void {
    this.regionSeleccionada = Number(event.target.value);
    this.filtrarComunasPorRegion();
  }

  sup: any[] = [];

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

  userData: any;
  cargando: boolean = true; // Por defecto, está cargando

  getUsersEdit(id: string): void {
    if (!id) {
      this.mostrarAlerta('ID no válido', 'error');
      return;
    }

    this.cargando = true; // Inicia la carga
    this.gm
      .getClienteTablaEdit(id)
      .pipe(take(1))
      .subscribe(
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

  ClienteId!: number; // Debes obtener este ID de alguna forma (ej: ruta, input)
  updateData: UpdateCliente = {};

  guardarOperaciones() {
  const operacionesPermitidas = this.paresSeleccionados.map(par => par.idCentroSeleccionado);

  const idCliente = Number(this.Id_cliente); // Asegúrate de que sea número

  this.guardarOperacionesPermitidas(idCliente, operacionesPermitidas);
  this.mostrarAlerta('Operaciones guardadas correctamente', 'success');
  console.log('Operaciones guardadas:', operacionesPermitidas);
  this.cerrarModalOperaciones();
}

  actualizarCliente() {
    this.ClienteId = parseInt(this.Id_cliente);
    this.gm.actualizarUsuario(this.ClienteId, this.updateData).subscribe({
      next: (response: any) => {
        this.Clients();
        this.mostrarAlerta('Usuario actualizado correctamente', 'success');
        const idCliente = Number(this.Id_cliente); // Asegúrate de que sea número
        // Mapear paresSeleccionados a un array de números (por ejemplo, usando idCentroSeleccionado)
        this.guardarOperaciones();
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
        this.getUsersEdit(this.Id_cliente);
        this.toggleLive2(); // Cerrar el modal
      },
      error: (err: any) => {
        // console.error('Error en actualización:', err);
        this.mostrarAlerta('Error al actualizar usuario', 'error');
      },
    });
  }

  private resetFormValues(): void {
    // Restablecer valores del formulario de ingreso de usuario
    this.nuevoCliente = {
      id_usuario: sessionStorage.getItem('id')?.toString() + '',
      ids_usuario:
        sessionStorage.getItem('server') +
        '-' +
        sessionStorage.getItem('id') +
        '',
      nombre: '',
      rut: '',
      direccion: '',
      ciudad: null,
      region: null,
      telefono: '',
      correo: '',
      representante: '',
      activo: true, // Valor predeterminado para boolean
      esquema_destino: "null",
      tabla_destino: "null",
      id_operacion: null,
      id_centro_op: null,
      id_seguimiento: null,
    };

    // Restablecer valores del formulario de edición de usuario
    this.updateData = {
      nombre: '',
      rut: '',
      direccion: '',
      ciudad: '',
      region: '',
      telefono: '',
      correo: '',
      representante: '',
      activo: true, // Valor predeterminado para boolean
      logo_img: '',
      esquema_destino: '',
      tabla_destino: '',
      id_seguimiento: null,
    };

    // Opcional: Restablecer otras variables relacionadas
    this.nombreArchivo = null;
    this.imagenPerfil = '/panel/image/default-profile.png';
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
      activate: 'activate',
    };

    // Asignación de valores
    Object.entries(fieldMappings).forEach(([htmlId, apiKey]) => {
      const element = document.getElementById(htmlId) as HTMLInputElement;
      if (element && this.userData[apiKey] !== null) {
        element.value = this.userData[apiKey];
      }
    });

    // Caso especial para fecha (formato ISO -> yyyy-mm-dd)
    const fechaInput = document.getElementById(
      'fechaNacimiento'
    ) as HTMLInputElement;
    if (fechaInput && this.userData.fecha_nacimiento) {
      fechaInput.value = new Date(this.userData.fecha_nacimiento)
        .toISOString()
        .split('T')[0];
    }
  }
  ngOnDestroy(): void {
    // Limpiar URLs para evitar fugas de memoria
    this.imageUrls.forEach((url) => URL.revokeObjectURL(url));
  }

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
    this.http
      .post('http://localhost:8000/api/Agregar/Bitacora/', bitacoraData)
      .subscribe({
        next: (response: any) => {
          // console.log('Registro agregado a la bitácora:', response.message);
          
        },
        error: (err: any) => {
          console.error('Error al agregar registro a la bitácora:', err);
        },
      });
  }

  formatRut(rut: string  | null): string {

    if (!rut) {
      return '';
    }
    // Eliminar puntos, guiones y espacios
    const cleanRut = rut.replace(/[^0-9kK]/g, '').toUpperCase();

    // Validar que tenga al menos 2 caracteres (número + dígito verificador)
    if (cleanRut.length < 2) {
      return cleanRut; // Retornar sin formato si no es válido
    }

    // Separar el cuerpo del dígito verificador
    const body = cleanRut.slice(0, -1);
    const dv = cleanRut.slice(-1);

    // Formatear el cuerpo con puntos
    const formattedBody = body.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    // Retornar el RUT formateado
    return `${formattedBody}-${dv}`;
  }

  validateRut(rut: string): boolean {
    // Eliminar puntos, guiones y espacios
    const cleanRut = rut.replace(/[^0-9kK]/g, '').toUpperCase();

    // Validar que tenga al menos 2 caracteres (número + dígito verificador)
    if (cleanRut.length < 2) {
      return false;
    }

    // Separar el cuerpo del dígito verificador
    const body = cleanRut.slice(0, -1);
    const dv = cleanRut.slice(-1);

    // Calcular el dígito verificador esperado
    let sum = 0;
    let multiplier = 2;

    for (let i = body.length - 1; i >= 0; i--) {
      sum += parseInt(body[i], 10) * multiplier;
      multiplier = multiplier === 7 ? 2 : multiplier + 1;
    }

    const expectedDv = 11 - (sum % 11);
    const calculatedDv =
      expectedDv === 11 ? '0' : expectedDv === 10 ? 'K' : expectedDv.toString();

    // Comparar el dígito verificador calculado con el ingresado
    return calculatedDv === dv;
  }

  rutValido: boolean = true;

  validarRut(): void {
    this.rutValido = this.validateRut(this.nuevoCliente.rut);
  }


  
  allowOnlyNumbers(event: KeyboardEvent): void {
    const charCode = event.charCode || event.keyCode;
    // Permitir solo números (códigos de 48 a 57) y teclas especiales como backspace (8)
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }
  
  cleanPhoneInput(phone: string): string {
    // Eliminar todos los caracteres que no sean números
    return phone.replace(/\D/g, '');
  }
  
  formatPhoneNumber(phone: string): any {
    const cleanPhone = this.cleanPhoneInput(phone);
  
    // Validar que tenga al menos 8 dígitos
    if (cleanPhone.length < 8) {
      return phone; // Retornar sin formato si no es válido
    }
  
    // Formatear según el largo del número
    if (cleanPhone.length === 9) {
      return `+56 9 ${cleanPhone.slice(1, 5)} ${cleanPhone.slice(5)}`;
    } else if (cleanPhone.length === 10) {
      return `(${cleanPhone.slice(0, 3)}) ${cleanPhone.slice(3, 6)}-${cleanPhone.slice(6)}`;
    } else {
      return cleanPhone.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3');
    }
  }


  modalOperacionesAbierto = false;

abrirModalOperaciones() {
  if (this.LoginId === '5') {
    this.cargarOperacionesModalidades();
    this.modalOperacionesAbierto = true;
  }
}

cerrarModalOperaciones() {
  this.modalOperacionesAbierto = false;
}


operaciones: any[] = [];

reiniciarOperaciones() {
  this.operaciones = [];  // Reinicia la lista de operaciones
}

tooltipIndex: number | null = null;

getOperacionTooltip(op: any): string {

  const centros = op.centro_operacion?.map((c: any) => c.centro).join('\n') || '';
  return `${op.descripcion}${centros ? '\n' + centros : ''}`;
}

cargarOperacionesModalidades() {
  this.http.get<any[]>('https://hela.transyanez.cl/api/editar_ruta/CentrosXmodalidades/').subscribe({
    next: (data) => {
      this.operaciones = data;
      // Solo aquí, cuando ya tienes userData y operaciones:
      if (this.userData && this.userData.operaciones_permitidas) {
        this.operaciones.forEach(op => {
          op.checked = this.userData.operaciones_permitidas.includes(op.id);
        });
      }
    },
    error: () => {
      this.mostrarAlerta('No se pudieron cargar las operaciones', 'error');
    }
  });
}

// Por ejemplo, si quieres mostrar solo las operaciones cuyo nombre coincida con this.nombreUser:
getOperacionesParaUsuario(): any[] {
  // Ejemplo: si nombreUser está en algún centro
  return this.operaciones.filter(op =>
    op.centro_operacion.some((c: { centro: string; }) => c.centro === this.nombreUser)
  );
}



guardarOperacionesPermitidas(id: number, operaciones: number[]): void {
  const formData = new FormData();
  formData.append('id', id.toString());
  operaciones.forEach(op => {
    formData.append('operaciones_permitidas', op.toString());
  });

  this.http.post('https://hela.transyanez.cl/api/editar_ruta/actualizar-operaciones-permitidas/', formData)
    .subscribe({
      next: (response) => {
        this.mostrarAlerta('Operaciones permitidas actualizadas correctamente', 'success');
      },
      error: (error) => {
        this.mostrarAlerta('Error al actualizar operaciones permitidas', 'error');
      }
    });
}

}
