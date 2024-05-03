import { Component, OnInit,  ElementRef, ViewChild} from '@angular/core';
import { Subscription } from 'rxjs';
import { RutasService } from 'src/app/service/rutas.service';
import { PortalTransyanezService } from "src/app/service/portal-transyanez.service";
import {PedidoCompromisoObligatorio } from 'src/app/models/rutas/pedidoCompromisoObligatorios.interface'
import { FormControl, FormGroup, FormBuilder, Validators,FormArray } from '@angular/forms'
import { ComunasService } from '../../../service/comunas/comunas.service'
import {bancos, formasPago, tipoCuenta } from 'src/app/models/enum/bancos.json'

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent {

  private selectedFile: File | null = null;
  private selectedConstitucion: File | null = null;
  private selectedCertRRPP: File | null = null;
  private selectedCertViPoderes: File | null = null;
  private selectedRegistroComercio: File | null = null;
  private selectedDocBancario: File | null = null;
  pedidosObligatorios : PedidoCompromisoObligatorio [] = []

  constructor(private service: PortalTransyanezService,public builder: FormBuilder,private comunaService : ComunasService) { }

  isErrorView : boolean = false
  rutValido : boolean = true
  rutRepresentanteValido : boolean = true
  rutTitularBanco : boolean = true
  listaRegiones : any [] = []
  listaComunas : any [] = []
  listaComunasFull : any [] = []
  tipoUsuario : string = "7"

   
  tipoCuentas : any [] = tipoCuenta
  banco : any [] = bancos

  formaPago : any [] = formasPago

  form = this.builder.group({
    Razon_social : this.builder.control("" , [Validators.required]),
    Tipo_razon : this.builder.control("7" ),
    Rut : this.builder.control("" , [Validators.required]),
    Email : this.builder.control("" , [Validators.required, Validators.email]),
    Celular : this.builder.control("" , [Validators.required]),
    Telefono : this.builder.control("" ),
    Fecha_nacimiento : this.builder.control("" , [Validators.required]),
    Direccion : this.builder.control("" , [Validators.required]),
    Representante_legal :this.builder.control("" ),
    Rut_representante_legal :this.builder.control("" ),
    Email_representante_legal :this.builder.control("" ),
    Rut_titular_cta_bancaria : this.builder.control("" ),
    Titular_cta : this.builder.control("" ),
    Numero_cta : this.builder.control("" ),
    Banco : this.builder.control("" ),
    Tipo_cta : this.builder.control("" ),
    Forma_pago : this.builder.control("" ),
    Id_user : this.builder.control(sessionStorage.getItem("id")?.toString()+"", [Validators.required]),
    Ids_user : this.builder.control(sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+"", [Validators.required]),
    // Documentacion_comercial_banco : this.builder.control("" , [Validators.required]),
    Comuna: this.builder.control("" , [Validators.required]),
    Region: this.builder.control("" , [Validators.required]),
  })



  formBancario = this.builder.group({
    Id_razon_social : this.builder.control("" , [Validators.required]),
    Rut_titular_cta_bancaria : this.builder.control("" ),
    Titular_cta : this.builder.control("" ),
    Numero_cta : this.builder.control("" ),
    Banco : this.builder.control("" ),
    Email : this.builder.control("" , [Validators.required, Validators.email]),
    Tipo_cta : this.builder.control("" ),
    Forma_pago : this.builder.control("" ),
    Id_user : this.builder.control(sessionStorage.getItem("id")?.toString()+"", [Validators.required]),
    Ids_user : this.builder.control(sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+"", [Validators.required]),
  })

  ngOnInit() : void {
    this.comunaService.getListaRegiones().subscribe((data : any) => {
      this.listaRegiones = data
    })

    this.comunaService.getListaComunas().subscribe((data : any) => {
      this.listaComunas = data
      this.listaComunasFull = this.listaComunas
      this.form.patchValue({
        Region : '1',
        Comuna : 'Arica'
      })
    })

    
    // Uso de la función
    // console.log(Fn.validaRut('27962409-2') ? 'Valido' : 'inválido');

  }

  pv : boolean = true

  activate( activo : boolean,tipo_usuario : string){
    this.pv = activo
    this.tipoUsuario = tipo_usuario
  }

  onFileSelected(event: any, tipo_doc : string) {

    if(tipo_doc == 'doc_bancario') this.selectedDocBancario = event.target.files[0];
    if(tipo_doc == 'doc_constitucion') this.selectedConstitucion = event.target.files[0];
    if(tipo_doc == 'doc_RRPP') this.selectedCertRRPP = event.target.files[0];
    if(tipo_doc == 'doc_vigencia') this.selectedCertViPoderes = event.target.files[0];
    if(tipo_doc == 'registro_comercio') this.selectedRegistroComercio = event.target.files[0];
    console.log(this.selectedDocBancario)
    console.log(this.selectedConstitucion)
    console.log(this.selectedCertRRPP)
    console.log(this.selectedCertViPoderes)
    console.log(this.selectedRegistroComercio)
  }
  
  uploadFile(){

    if (this.selectedDocBancario) {
    const formData = new FormData();
    formData.append('file', this.selectedDocBancario, this.selectedDocBancario.name);

    this.service.subirDocumentos(formData, 'id_usuario').subscribe(
      (data : any) => {
        console.log('Archivo subido exitosamente');
        // Lógica adicional en caso de éxito.
      },
      (error) => {

        alert('Error al subir el archivo')
      }
    );

    }
  }

  verificaRut(rut : string){
    var Fn = {
      // Valida el rut con su cadena completa "XXXXXXXX-X"
      validaRut : function (rutCompleto : any) {
        rutCompleto = rutCompleto.replace("‐","-");
        if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test( rutCompleto ))
          return false;
        var tmp   = rutCompleto.split('-');
        var digv  = tmp[1]; 
        var rut   = tmp[0];
        if ( digv == 'K' ) digv = 'k' ;
        
        return (Fn.dv(rut) == digv );
      },
      dv : function(T : any){
        var M=0,S=1;
        for(;T;T=Math.floor(T/10))
          S=(S+T%10*(9-M++%6))%11;
        return S?S-1:'k';
      }
    }

    if(rut == 'colab') this.rutValido = Fn.validaRut(this.form.value.Rut?.trim()) ? true : false
    if(rut == 'cta_banco') this.rutTitularBanco = Fn.validaRut(this.form.value.Rut_titular_cta_bancaria?.trim()) ? true : false
    if(rut == 'representante') this.rutRepresentanteValido = Fn.validaRut(this.form.value.Rut_representante_legal?.trim()) ? true : false
    

  }


  buscarComunas(event: any){
    const selectedRegionId = event.target.value;
    console.log('Región seleccionada:', selectedRegionId);
    this.listaComunas = this.listaComunasFull.filter( comuna => comuna.Id_region == selectedRegionId )
    this.form.patchValue({
      Comuna : this.listaComunas[0].Nombre_comuna
    })
  }

  registrar(){
    console.log(this.form.value)
    this.isErrorView = false
    console.log(this.form)

    if(this.form.valid){

      this.formBancario.patchValue({
        Id_user : this.form.value.Id_user,
        Ids_user : this.form.value.Ids_user,
        Id_razon_social : "0",
        Rut_titular_cta_bancaria : this.form.value.Rut_titular_cta_bancaria,
        Titular_cta : this.form.value.Titular_cta,
        Numero_cta : this.form.value.Numero_cta,
        Banco : this.form.value.Banco,
        Email : this.form.value.Email,
        Tipo_cta : this.form.value.Tipo_cta,
        Forma_pago: this.form.value.Forma_pago
      })

      const nom_region = this.listaRegiones.filter(lista => lista.Id_region == this.form.value.Region)[0].Nombre_region
      this.form.patchValue({
        Region : nom_region,
        Tipo_razon : this.tipoUsuario
      })

      this.service.registrarColaborador(this.form.value).subscribe((data : any) => {
        console.log("El registro si llego", data)
        alert(data.message)
        // this.form.reset();
        this.uploadFile()

        
      })
    }else{
      this.isErrorView = true
      alert("Hay datos incorrectos")
    }

  }


 ngOnDestroy(): void {


  }


  

}