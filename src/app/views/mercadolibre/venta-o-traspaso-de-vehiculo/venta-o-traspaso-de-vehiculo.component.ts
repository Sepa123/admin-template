import { Component } from '@angular/core';
import { VentaOTraspasoService } from '../../../service/Venta-O-Traspaso.service'
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-venta-o-traspaso-de-vehiculo',
  templateUrl: './venta-o-traspaso-de-vehiculo.component.html',
  styleUrls: ['./venta-o-traspaso-de-vehiculo.component.scss']
})
export class VentaOTraspasoDeVehiculoComponent {
  visible: any;
  visible2: any;
  isModalOpen: boolean = false;
  isLoadingFull: boolean = true;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private VoT: VentaOTraspasoService,
  ){}
  infoPPu: any[] = [];
  infoPPu2: any[] = [];
  infoEmpresa: any[] = [];
  infoEmpresa2: any[] = [];

  //todos los datos que se utilizaran en la pantalla principal
  DatoPatenteSeleccionados: number | null = null;
  DatoIdPatenteSeleccionados: number | null = null;
  DatoEmpresaActual: number | null = null;
  DatoIdEmpresaActual: number | null = null;
  DatoRutEmpresa: number | null = null;
  DatoPpuSeleccionada: number | null = null;

  DatoNombreEmpresaNueva: string | null = null;
  DatoEmpresaNueva: number | null = null;
  DatoRutEmpresaNueva: number | null = null;
  // fin de todos los datos que se utilizan en la pantalla principal
  toggleLiveDemo() {
    this.visible = !this.visible;
  }
  handleLiveDemoChange(event: any) {
    this.visible = event;
  }
  toggleLiveDemo2() {
    this.visible2 = !this.visible2;
  }
  handleLiveDemoChange2(event: any) {
    this.visible2 = event;
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  ngOnInit() {
    this.getInfoPpu();
    this.getInfoEmpresa();
  }

  getInfoPpu() {
    this.isLoadingFull = true;
    this.VoT.getInfoPpu().subscribe(
      (data) => {
        this.infoPPu = data;
        this.infoPPu2 = data;
        this.patentesFiltradas = data
        this.isLoadingFull = false;
      },
      (error) => {
        console.error('Error al obtener modalidades de operación', error);
      }
    );
  }

  getInfoEmpresa() {
    this.isLoadingFull = true;
    this.VoT.getInfoEmpresas().subscribe(
      (data) => {
        this.infoEmpresa = data;
        this.infoEmpresa2 = data
        this.RazonesFiltradas = data
        this.isLoadingFull = false;
      },
      (error) => {
        console.error('Error al obtener modalidades de operación', error);
      }
    );
  }

  patentesFiltradas = [...this.infoPPu2]; // Inicialmente todas las patentes

buscarPatente(event: Event) {
  const inputElement = event.target as HTMLInputElement;
  const valorBusqueda = inputElement.value.trim().toLowerCase();

  this.patentesFiltradas = this.infoPPu2.filter(patente => {
    return (
      patente.id?.toString().includes(valorBusqueda) ||
      patente.razon_social?.toLowerCase().includes(valorBusqueda) ||
      patente.ppu?.toLowerCase().includes(valorBusqueda) 
      // patente.tipo?.toString().includes(valorBusqueda) ||
      // patente.colaborador_id?.toString().includes(valorBusqueda) ||
      // patente.tripulacion?.toLowerCase().includes(valorBusqueda)
    );
  });
}
RazonesFiltradas = [...this.infoEmpresa2]; // Inicialmente todas las patentes

BuscarRazon(event: Event) {
const inputElement = event.target as HTMLInputElement;
const valorBusqueda = inputElement.value.trim().toLowerCase();

this.RazonesFiltradas = this.infoEmpresa2.filter(patente => {
  return (
    patente.id?.toString().includes(valorBusqueda)||
    patente.razon_social?.toLowerCase().includes(valorBusqueda) 
    // patente.tipo?.toString().includes(valorBusqueda) ||
    // patente.colaborador_id?.toString().includes(valorBusqueda) ||
    // patente.tripulacion?.toLowerCase().includes(valorBusqueda)
  );
});
}

CambiarRazonSocial() {
  if (this.DatoPatenteSeleccionados !== null && this.DatoEmpresaNueva !== null) {
    // Ahora los valores son seguros para usar como 'number'
    const id = this.DatoPatenteSeleccionados;
    const id_razon = this.DatoEmpresaNueva;

    // Llamada al método del servicio VoT para cambiar la razón social
    this.VoT.changeRazonSocial(id_razon, id).subscribe(
      (response) => {
        console.log('Estado actualizado correctamente:', response);
        // Aquí puedes volver a cargar la tabla o realizar otras acciones necesarias
      },
      (error) => {
        console.error('Error al actualizar el estado', error);
        // Manejo de errores
      }
    );
  } else {
    console.error('Los valores id_razon o id son null');
  }
}

SendBitacora() {
  if (this.DatoPatenteSeleccionados !== null && this.DatoIdEmpresaActual !== null && this.DatoEmpresaNueva !== null) {
    // Ahora los valores son seguros para usar como 'number'
    const id_ppu = this.DatoPatenteSeleccionados;
    const id_razon_antigua = this.DatoIdEmpresaActual;
    const id_razon_nueva = this.DatoEmpresaNueva
    const observacion = sessionStorage.getItem('server') + '-' + sessionStorage.getItem('id') + ' ha realizado un cambio';
    // Llamada al método del servicio VoT para cambiar la razón social
    this.VoT.bitacora(id_ppu, id_razon_antigua, id_razon_nueva, observacion).subscribe(
      (response) => {
        console.log('Estado actualizado correctamente:', response);
        // Aquí puedes volver a cargar la tabla o realizar otras acciones necesarias
      },
      (error) => {
        console.error('Error al actualizar el estado', error);
        // Manejo de errores
      }
    );
  } else {
    console.error('Los valores id_razon o id son null');
  }
}

obtenerDatosIniciales(id: any, razon_id:any, id_razon_Social:any, RutEmpresa:any, ppu:any){
  this.DatoPatenteSeleccionados = id 
  this.DatoPpuSeleccionada = ppu
  this.DatoEmpresaActual = razon_id 
  this.DatoRutEmpresa = RutEmpresa
  this.DatoIdEmpresaActual = id_razon_Social

  console.log(this.DatoPatenteSeleccionados,this.DatoEmpresaActual, this.DatoIdEmpresaActual, this.DatoRutEmpresa,this.DatoPpuSeleccionada)
}
ObtenerDatosResultantes(IdEmpresaNueva:any, RutEmpresaNueva:any, nombreEmpresa:any){
  this.DatoNombreEmpresaNueva = nombreEmpresa
  this.DatoEmpresaNueva = IdEmpresaNueva
  this.DatoRutEmpresaNueva = RutEmpresaNueva
}

}
