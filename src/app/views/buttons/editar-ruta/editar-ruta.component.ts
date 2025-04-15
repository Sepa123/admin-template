import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { take } from 'rxjs';
import {
  EditarRutaService,
  Cliente,
  UpdateCliente,
} from 'src/app/service/editar-ruta.service';

@Component({
  selector: 'app-editar-ruta',
  templateUrl: './editar-ruta.component.html',
  styleUrls: ['./editar-ruta.component.scss','./editar-ruta2.component.scss','./editar-ruta3.component.scss','./editar-ruta4.component.scss'],
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
    ciudad: 0,
    region: 0,
    telefono: '',
    correo: '',
    representante: '',
    activo: true, // Valor predeterminado para boolean
    esquema_destino: null,
    tabla_destino: null,
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
    this.AccountUserid();
    this.Clients();
    this.getRegiones();
    this.getComunas();
  }

  LoginId: string = '';

  AccountUserid() {
    this.LoginId = sessionStorage.getItem('rol_id')?.toString() + '';
    console.log(this.LoginId);
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
      console.log('Archivo seleccionado:', this.nombreArchivo);
    } else {
      this.nombreArchivo = null; // Si no se selecciona archivo, limpia el nombre
    }
  }

  guardarImagen(): void {
    const id_user = this.Id_cliente;

    if (!this.imagenSeleccionada) {
      alert('Por favor, selecciona una imagen antes de guardar.');
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

  nombreUser: string = '';
  Id_cliente: string = '';
  recuperarUserdata(nombre: string, Png: string, id_C: string) {
    this.imagenPerfil = Png;
    this.nombreUser = nombre;
    this.Id_cliente = id_C;
    this.getUsersEdit(this.Id_cliente);
    console.log(this.Id_cliente);
  }

  onSubmit() {
    console.log('Datos antes de enviar:', this.nuevoCliente);
    this.nuevoCliente.region = Number(this.nuevoCliente.region);
    this.nuevoCliente.ciudad = Number(this.nuevoCliente.ciudad);

    this.gm.agregarCliente(this.nuevoCliente).subscribe({
      next: (response: any) => {
        this.Clients();
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
      ciudad: 0,
      region: 0,
      telefono: '',
      correo: '',
      representante: '',
      activo: true, // Valor predeterminado para boolean
      esquema_destino: null,
      tabla_destino: null,
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
        console.log(this.ClienteFiltrado);
      },
      (error) => {
        this.mostrarAlerta('No se han encontrado usuarios', 'error');
      }
    );
  }

  ComunasFiltradas: any[] = []; // Lista de comunas filtradas según la región seleccionada
  regionSeleccionada: number | null = null; // ID de la región seleccionada
  regiones: any[] = [];
  Comunas: any[] = [];
  getRegiones(): void {
    this.gm.getRegiones().subscribe(
      (data) => {
        this.regiones = data;
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
        this.filtrarComunasPorRegion(); // Filtra las comunas según la región seleccionada
        // console.log(data);
      },
      (error) => {
        this.mostrarAlerta('No se han encontrado roles', 'error');
      }
    );
  }

  filtrarComunasPorRegion(): void {
    if (this.regionSeleccionada !== null) {
      this.ComunasFiltradas = this.Comunas.filter(
        (comuna) => Number(comuna.id_region) === this.regionSeleccionada // Asegúrate de que ambos sean números
      );
      console.log('Comunas filtradas:', this.ComunasFiltradas);
    } else {
      this.ComunasFiltradas = []; // Si no hay región seleccionada, no mostrar comunas
    }
  }

  onRegionChange(event: any): void {
    this.regionSeleccionada = Number(event.target.value); // Convierte el valor a número
    console.log('Región seleccionada:', this.regionSeleccionada);
    this.filtrarComunasPorRegion(); // Filtra las comunas según la nueva región seleccionada
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

  actualizarCliente() {
    this.ClienteId = parseInt(this.Id_cliente);
    this.gm.actualizarUsuario(this.ClienteId, this.updateData).subscribe({
      next: (response: any) => {
        this.Clients();
        this.mostrarAlerta('Usuario actualizado correctamente', 'success');
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
      ciudad: 0,
      region: 0,
      telefono: '',
      correo: '',
      representante: '',
      activo: true, // Valor predeterminado para boolean
      esquema_destino: null,
      tabla_destino: null,
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
          console.log('Registro agregado a la bitácora:', response.message);
        },
        error: (err: any) => {
          console.error('Error al agregar registro a la bitácora:', err);
        },
      });
  }

  formatRut(rut: string): string {
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
  
  formatPhoneNumber(phone: string): string {
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
}