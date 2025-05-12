import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators,FormArray } from '@angular/forms'
import { FinanzasService } from '../../../service/finanzas.service';
import { CurrencyPipe } from '@angular/common';
import { SeleccionesDescuentos, RazonSocial,Patente,Etiqueta, SeleccionOperaciones, Centro ,Descuentos } from '../../../models/finanzas/descuentos.interface'
import * as XLSX from 'xlsx';

import * as ExcelJS from 'exceljs';
import FileSaver from 'file-saver';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
  providers: [CurrencyPipe]
})
export class TestComponent  {

  private selectedFile: File | null = null;

  visible : boolean =false 

  pendiente : boolean =false

  listaDescuentos : Descuentos [] =[]
  listaDescuentosFull : Descuentos [] =[]
  fechaRecharge: string = '';
  fechaRecharge2: string = '';

  toggleLiveDemo() {
    this.visible = !this.visible;

    this.selectedFile = null; // Reiniciar el archivo seleccionado al cerrar el modal
    if (document.getElementById('archivo_pdf')) (document.getElementById('archivo_pdf') as HTMLInputElement).value = '';
  }

  handleLiveDemoChange(event: any) {
    this.visible = event;
  }


  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  LoginId: string = '';

  AccountUserid() {
    this.LoginId = sessionStorage.getItem('rol_id')?.toString() + '';
    console.log(this.LoginId);
  }

  uploadFile(id_desc : any) {
    if (this.selectedFile) {

      // this.termino = false
      let id_usuario = sessionStorage.getItem('id')+""
      let ids_usuario = sessionStorage.getItem('server')+'-'+id_usuario
      const formData = new FormData();
      formData.append('file', this.selectedFile, this.selectedFile.name);

      this.service.subirArchivoAdjunto(formData, id_desc).subscribe(
        (data : any) => {

          // Lógica adicional en caso de éxito.
        },
        (error) => {
          console.error('Error al subir el archivo:', error);
          alert('Error al subir el archivo')
      
          // Lógica de manejo de errores.
        }
      );
      
    } else {
      console.warn('Ningún archivo seleccionado');
      // Lógica adicional en caso de que el usuario no seleccione ningún archivo.
    }
  }

  cambiarPendiente(){
    // this.pendiente = !this.pendiente

    this.listaDescuentos = this.listaDescuentosFull.filter((data) => data.Cobrada == this.pendiente )
  }

  seleccionRazonSocial : RazonSocial [] = []
  seleccionPantente : Patente [] = []
  seleccionEtiqueta : Etiqueta [] = []

  seleccionOperaciones : SeleccionOperaciones [] = []
  seleccionCentro : Centro [] = []

  // formDescuentos: FormGroup;
  formDescuentos: FormGroup;

  seleccionaCentro(event : any){
    const id = event.target.value

    console.log(id)

    this.seleccionCentro = this.seleccionOperaciones.filter((data) => data.Id_op == id )[0].Centros

  }


  constructor(private fb:FormBuilder, private service : FinanzasService){

    // this.formDescuentos = this.fb.group({
    //   Id_user : this.fb.control(sessionStorage.getItem("id")?.toString()+"", [Validators.required]),
    //   Ids_user : this.fb.control(sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+"", [Validators.required]),
    //   Monto : this.fb.control(0, [Validators.required] ),
    //   Cant_cuotas : this.fb.control("", [Validators.required] ),
    //   Cuotas : this.fb.array([]),
      
    // })

    this.formDescuentos = this.fb.group({
      Id_user : this.fb.control(sessionStorage.getItem("id")?.toString()+"", [Validators.required]),
      Ids_user : this.fb.control(sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+"", [Validators.required]),
      Fecha_evento : this.fb.control('' ),
      Pantente : this.fb.control(""),
      // Cuotas : this.fb.array([]),
      Razon_social : this.fb.control(""),
      Ruta : this.fb.control(""),
      Etiqueta : this.fb.control(""),
      Descripcion : this.fb.control(""),
      Adjunto : this.fb.control(""),
      Monto : this.fb.control(0, [Validators.required] ),
      Cant_cuotas : this.fb.control("", [Validators.required] ),
      Id_operacion : this.fb.control(""),
      Id_cop : this.fb.control(""),
      Cuotas : this.fb.array([]),
      // etiqueta : this.fb.control("")
    })

  }

  get Cuotas() : FormArray {
    return this.formDescuentos.get("Cuotas") as FormArray
  }

 
  newCuotas(): FormGroup {
    return this.fb.group({
      // Fecha_cobro: Optional[str]
      // Monto: Optional[int]
      Numero_cuota: '',
      Origen: 'Finanzas',
      Cobrada: this.fb.control(false),
      Fecha_comp: this.fb.control("", [Validators.required] ),
      Valor_cuota:'',
      Valor_cuota_formato: ''
    })
  }

  cantCuotas : string = '0'

  removeCarga() {
    // this.arrayCodigosProductos.splice(5,1)
    this.Cuotas.clear()
  }

  obtenerListaDescuentos(fecha_ini:string, fecha_fin:string){
    this.fechaRecharge = fecha_ini
    this.fechaRecharge2= fecha_fin
    console.log(this.fechaRecharge, this.fechaRecharge2)
    this.service.obtenerDescuentos(fecha_ini,fecha_fin).subscribe((data) => {
      // console.log(data)
      this.listaDescuentosFull = data
      this.listaDescuentos = data
    })
  }

  agregarCuotas(){

    this.removeCarga()

    const monto = this.formDescuentos.value.Monto 
    console.log(this.formDescuentos.value.Cant_cuotas)

    console.log(typeof(monto))
    if (typeof monto !== "number" || monto == 0 ) {
      return alert('Por favor agregue un monto')
    }

    for (let index = 0; index < parseInt(this.formDescuentos.value.Cant_cuotas); index++) {

      this.Cuotas.push(this.newCuotas());

      this.Cuotas.at(index).patchValue({
        Valor_cuota_formato :  new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(Math.round(monto / this.formDescuentos.value.Cant_cuotas)),
        Valor_cuota: Math.round(monto / this.formDescuentos.value.Cant_cuotas) ,
        Numero_cuota : index + 1
      })
    }
    
  }


  visibleActualizacion : boolean =false 


  toggleActualizacion() {
    this.visibleActualizacion = !this.visibleActualizacion;
  }

  handleActualizacion(event: any) {
    this.visibleActualizacion = event;
  }



  cobrado : boolean = false
  oc_cobro : string = ''
  id_detalle : number = 0
  id_origen: number = 0
  aplicaEstado: boolean = false

  cambiarEstadoCobro(){
    this.cobrado = !this.cobrado
  }

  DescuentoSeleccionado : Descuentos [] = []

  mostrarActualizacion(id_desc : number, cobrado : boolean, oc_cobro : string, dcto : Descuentos, Id_O: number, aplica: boolean){

    this.DescuentoSeleccionado = [dcto]

    this.id_detalle = id_desc
    this.cobrado = cobrado
    this.oc_cobro = oc_cobro

    this.id_origen = Id_O
    this.aplicaEstado = aplica
    // oc_cobrod
    console.log(this.id_origen)



    this.toggleActualizacion()

  }


  actualizarDetalle(){

    const data = {
      Id_detalle : this.id_detalle,
      Cobrado : this.cobrado,
      Oc_cobro : this.oc_cobro
    }

    this.service.actualizarDescuento(data).subscribe((data) => {

      this.listaDescuentosFull.map((data => {
        if (data.Id == this.id_detalle){
          data.Cobrada = this.cobrado
          data.Oc_cobro = this.oc_cobro
        }
      }))

      this.listaDescuentos = this.listaDescuentosFull

      // this.listaDescuentos.map((data => {
      //   if (data.Id == this.id_detalle){
      //     data.Cobrada = this.cobrado
      //     data.Oc_cobro = this.oc_cobro
      //   }
      // }))

      this.toggleActualizacion()
    })

    console.log(data)


  }

 
  fecha_ini : string = ""
  fecha_fin : string = ""


  currentDate : string = ''
  minDate : string = ''
  maxDate : string = ''

  rol =   sessionStorage.getItem("rol_id")+''


  obtenerFechas(){
    let hoy = new Date();

    let año = hoy.getFullYear();
    let mes = ("0" + (hoy.getMonth() + 1)).slice(-2); // Los meses comienzan en 0
    let día = ("0" + hoy.getDate()).slice(-2);

    this.currentDate = `${año}-${mes}-${día}`;

    hoy.setDate(hoy.getDate() - 4);

    let minAño = hoy.getFullYear();
    let minMes = ("0" + (hoy.getMonth() + 1)).slice(-2); // Los meses comienzan en 0
    let MinDía = ("0" + hoy.getDate()).slice(-2);
    this.minDate = `${minAño}-${minMes}-${MinDía}`;
  }

  ngOnInit(){

    this.obtenerFechas();

    this.AccountUserid();
    this.service.seleccionesDescuentos().subscribe((data) => {
      this.seleccionRazonSocial = data.Razon_social
      this.seleccionPantente = data.Patentes
      this.seleccionEtiqueta = data.Etiquetas
    })

    this.service.seleccionesOperaciones().subscribe((data) => {
      console.log(data)
      this.seleccionOperaciones = data
    })

    // this.obtenerListaDescuentos('20240301','20250326')

  }

  guardarCuotas(){


    if (this.formDescuentos.valid){

      


      this.service.guardarDescuento(this.formDescuentos.value).subscribe((data) => {
        
      })
      // this.service.
      alert('felicudaes')
    }else{
      alert('Falta ingresar datos')
    }
  }
  

  guardar(){





    if (this.formDescuentos.valid){


      this.service.guardarDescuento(this.formDescuentos.value).subscribe((data : any) => {

        this.formDescuentos.reset()

        this.formDescuentos.patchValue({
          Id_user : sessionStorage.getItem("id")?.toString()+"",
          Ids_user : sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+"",
        })

        this.uploadFile(data.id)


        alert(data.message)

      })
      
    }else{
      alert('Falta ingresar datos')
    }
  }

  filtroPatente: string = '';
  patentesFiltradas: any[] = [...this.seleccionPantente];
  patenteSeleccionada: string = ''; // Nombre de la patente seleccionada
  idPatenteSeleccionada: number | null = null;

  seleccionarPatente(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const patenteSeleccionada = inputElement.value;

    // Buscar el ID correspondiente a la patente seleccionada  Pantente Razon_social

    const patente = this.seleccionPantente.find(
      (razon) => razon.Patente === patenteSeleccionada
    );

    if (patente) {
      this.idPatenteSeleccionada = patente.Id;

      // Actualizar el valor del control en el formulario
    this.formDescuentos.patchValue({
      Pantente: this.idPatenteSeleccionada,
    });
      console.log('ID de la patente seleccionada:', this.idPatenteSeleccionada);
    } else {
      this.idPatenteSeleccionada = null; // Si no coincide, reinicia el ID
      console.log('Patente no encontrada');
      // Reiniciar el valor del control en el formulario
    this.formDescuentos.patchValue({
      Pantente: null,
    });
    }
  }

  filtroRazonSocial: string = ''; // 
  razonesFiltradas: any[] = [...this.seleccionRazonSocial]; // Lista filtrada
  razonSocialSeleccionada: string = ''; // Nombre seleccionado en el input
  idRazonSocialSeleccionada: number | null = null; 
  seleccionarRazonSocial(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const nombreSeleccionado = inputElement.value;

    // Buscar el ID correspondiente al nombre seleccionado
    const razon = this.seleccionRazonSocial.find(
      (razon) => razon.Nombre_razon === nombreSeleccionado
    );

    if (razon) {
      this.idRazonSocialSeleccionada = razon.Id;
      this.formDescuentos.patchValue({
        Razon_social: this.idRazonSocialSeleccionada,
      });
      console.log('ID seleccionado:', this.idRazonSocialSeleccionada);
    } else {
      this.idRazonSocialSeleccionada = null; // Si no coincide, reinicia el ID
      console.log('Razón social no encontrada');

      this.formDescuentos.patchValue({
        Razon_social: null,
      });
    }
  }

  DescargarNS() {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Lista Descuentos');
  
    // Encabezados de la tabla
    worksheet.columns = [
      { header: 'Periodo (mes)', key: 'fechaCobro', width: 15 },
      { header: 'Ingresado Por', key: 'ingresadoPor', width: 20 },
      { header: 'Operación', key: 'operacion', width: 15 },
      { header: 'Centro Operación', key: 'centroOperacion', width: 20 },
      { header: 'Ppu', key: 'ppu', width: 10 },
      { header: 'Razón Social', key: 'razonSocial', width: 20 },
      { header: 'Cuota', key: 'cuota', width: 10 },
      { header: 'Valor Cuota', key: 'valorCuota', width: 15 },
      { header: 'Total', key: 'total', width: 15 },
      { header: 'Etiqueta', key: 'etiqueta', width: 15 },
      { header: 'Descripción', key: 'descripcion', width: 30 },
      { header: 'Cobrada', key: 'cobrada', width: 10 },
      { header: 'Oc cobro', key: 'ocCobro', width: 15 },
      { header: 'Fecha evento', key: 'fechaEvento', width: 15 },
      { header: 'Aplica', key: 'aplica', width: 10 },
    ];
  
    // Agregar filas con datos
    this.listaDescuentosFull.forEach((desc) => {
      worksheet.addRow({
        fechaCobro: desc.Fecha_cobro,
        ingresadoPor: desc.Ingresado_por,
        operacion: desc.Operacion,
        centroOperacion: desc.Centro_operacion,
        ppu: desc.Ppu,
        razonSocial: desc.Razon_social,
        cuota: desc.Cuota,
        valorCuota: desc.Valor_cuenta,
        total: desc.Total,
        etiqueta: desc.Etiqueta,
        descripcion: desc.Descripcion,
        cobrada: desc.Cobrada ? 'Sí' : 'No',
        ocCobro: desc.Oc_cobro,
        fechaEvento: desc.Fecha_evento,
        aplica: desc.Aplica ? 'Sí' : 'No',
      });
    });

  
  // Aplicar estilos condicionales
  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber === 1) {
      // Estilo para encabezados
      row.eachCell((cell) => {
        cell.font = { bold: true, color: { argb: 'FFFFFF' } };
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '007bff' } };
        cell.alignment = { horizontal: 'center', vertical: 'middle' };
      });
    } else {
      // Estilo para filas con descripción
      const descripcionCell = row.getCell(11); // Columna "Descripción"
      if (descripcionCell.value) {
        row.eachCell((cell) => {
          cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF380' } }; // Fondo amarillo
          cell.font = { color: { argb: '000000' } }; // Texto NEGRO
        });
      }

      // Estilo para toda la fila si la columna "Cobrada" es "Sí"
      const cobradaCell = row.getCell(12); // Columna "Cobrada"
      if (cobradaCell.value === 'Sí') {
        row.eachCell((cell) => {
          cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'AEF359' } }; // Fondo verde
          cell.font = { color: { argb: '000000' } }; // Texto negro
        });
      }
      
      // Estilo para toda la fila si la columna "Cobrada" es "Sí"
      const AplicaCell = row.getCell(15); // Columna "Cobrada"
      if (AplicaCell.value === 'No') {
        row.eachCell((cell) => {
          cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'BC544B' } }; // Fondo Rojo
          cell.font = { color: { argb: '000000' } }; // Texto negro
        });
      }
    }
  });

  // Descargar el archivo Excel
  workbook.xlsx.writeBuffer().then((data) => {
    const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    FileSaver.saveAs(blob, `Lista-descuentos-${new Date().toISOString().split('T')[0]}.xlsx`);
  });

  
    // Descargar el archivo Excel
    workbook.xlsx.writeBuffer().then((data) => {
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      FileSaver.saveAs(blob, `Lista-descuentos-${new Date().toISOString().split('T')[0]}.xlsx`);
    });
  }


  descargarArchivoAdjunto(name_file : string){
    this.service.descargarArchivoAdjunto(name_file).subscribe((data : any) => {
      const blob = new Blob([data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;

      name_file = name_file.split('/')[name_file.split('/').length - 1]
      a.download = name_file;
      a.click();
      window.URL.revokeObjectURL(url);
    })
  }

  actualizar(event: Event, dcto: any) {
    event.preventDefault(); // Prevenir el comportamiento predeterminado del evento
    event.stopPropagation(); // Detener la propagación del evento
  
    const nuevoValor = !dcto.Aplica; // Cambia al valor contrario del estado actual
  
    // Mostrar alerta de confirmación
    const confirmacion = window.confirm(
      `¿Estás seguro de que deseas ${nuevoValor ? 'Activar' : 'Desactivar'} este cobro?` +
      `Tenga en cuenta qué esto afectará a todas las cuotas correspondientes a este descuento`
    );
  
    if (confirmacion) {
      // Si el usuario acepta, procede con la actualización
      this.service.actualizarAplica(dcto.Id, nuevoValor).subscribe({
        next: (response) => {
          console.log('Respuesta del servidor:', response);
          dcto.Aplica = nuevoValor; // Actualiza el valor localmente
          this.mostrarAlerta(
            `El estado ha sido cambiado a ${nuevoValor ? 'Activado' : 'Desactivado'}.`,
            'success'
          );
        },
        error: (error) => {
          console.error('Error al actualizar:', error);
          this.mostrarAlerta('Error al actualizar el estado.', 'error');
        },
      });
    } else {
      // Si el usuario cancela, revertir el cambio en el input
      (event.target as HTMLInputElement).checked = dcto.Aplica; // Revertir al estado anterior
      this.mostrarAlerta('La acción ha sido cancelada.', 'warning');
    }
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
}