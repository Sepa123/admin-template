import { Component, OnInit,  ElementRef, ViewChild} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RazonSocial } from 'src/app/models/modalidad-de-operaciones.interface';
import { CentroOperacion } from 'src/app/models/operacion/centroOperacion.interface';
import { ModalidadDeOperacionesService } from 'src/app/service/modalidad-de-operaciones.service';
import { RegistrarUsuarioService } from 'src/app/service/registrar-usuario.service'
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent {
  constructor(private service: RegistrarUsuarioService, public builder: FormBuilder,
              private MoService: ModalidadDeOperacionesService
  ) { }

  private selectedImagenPerfil: File | null = null
  rol =   sessionStorage.getItem('rol_id')+''
  id =   sessionStorage.getItem('id')+''
  server = sessionStorage.getItem('server')+''
  nombre_usuario = sessionStorage.getItem('usuario')+''
  mail = sessionStorage.getItem('mail')+''


  public op: any [] = [

  ]

  eliminarUsuarioCO(id_co : number){

    const usuarioEliminado = this.server + '-' + this.id

    const body = {
      Ids_usuario : usuarioEliminado,
      Id_usuario : this.id,
      Id_co : id_co
    }

    console.log(body)

    this.service.eliminar_usuario_de_co(body).subscribe((data : any) => {
      alert(data.message)
    })
      // console.log('eliminado ', body)
  }

  editarForm = this.builder.group({
    Id_user: this.builder.control(""),
    Server: this.builder.control(""),
    Telefono : this.builder.control(""),
    Fecha_nacimiento : this.builder.control(""),
    Direccion: this.builder.control(""),
  })


  
  passForm = this.builder.group({
    Password_antigua : this.builder.control("", [Validators.required ,Validators.minLength(6)]),
    Password_nueva : this.builder.control("",  [Validators.required,Validators.minLength(6)]),
    Password_repetida: this.builder.control("",  [Validators.required,Validators.minLength(6)]),
    Mail: this.builder.control(""),
  })

  isErrorView : boolean = false

  // modal de contraseña
  isModalOpen: boolean = false
  public visible = false;

  toggleLiveDemo() {
    this.visible = !this.visible;
  }

  handleLiveDemoChange(event: any) {
    this.visible = event;
  }
  
  openModal(){
    this.isModalOpen = true
  }

  closeModal(){
    this.isModalOpen = false
  }


  ///Modal para agregar CO

  isModalCOOpen: boolean = false
  public visibleCO = false;

  buscarCentroOperacion(){
    this.service.get_co_op_lista_coordinadores(this.id).subscribe((data) => {
      this.centroOperacionFull = data
      this.centroOperacionAsignado = data
      this.centroOperacionLista = data
      this.centroOperacion = data
    })
  }

  idOperacion : number = 0
  IdCentroOperacion : number = 0

  buscarPorModalidadOperacion(){
    if(this.idOperacion == 0){
      this.centroOperacion = this.centroOperacionFull
      this.centroOperacionLista = this.centroOperacionFull
      
    }else{
      this.centroOperacion = this.centroOperacionFull.filter(co => co.Id_op == this.idOperacion)
      this.centroOperacionLista = this.centroOperacionFull.filter(co => co.Id_op == this.idOperacion)
    }
  
    this.estaAsignadoCO()
    this.IdCentroOperacion = 0
  }

  seleccionarCentroOperacion(){
    if(this.IdCentroOperacion == 0){
  
    }else{
      this.centroOperacion = this.centroOperacionFull.filter(co => co.Id == this.IdCentroOperacion)
      this.centroOperacionLista = this.centroOperacionFull.filter(co => co.Id_op == this.idOperacion)
    }
  
    this.estaAsignadoCO()
  }
  isAsignado : boolean = false
  estaAsignadoCO(){

    if(this.IdCentroOperacion == 0 ){
      this.isAsignado = false
      return false
    }else{
      const filtro = this.centroOperacion.filter( co => co.Id == this.IdCentroOperacion)[0]
      if(filtro.Estado == true){
        this.isAsignado = false
        return false
      }else{
        this.isAsignado = true
        return true
      }
    }
    
    
    
  }


  asignarCOaUsuario(){
    const body = {
      Id_op : this.idOperacion,
      Id_co : this.IdCentroOperacion,
      Id_usuario : this.id,
      Ids_usuario : this.server+'-'+this.id
    }
    this.service.asignar_usuario_a_co(body).subscribe((data : any) => {
      alert(data.message)
    })
  }

  toggleLiveCO() {
    this.MoService.getRazonesSocial().subscribe((data) => {
      this.modalidadOperacion = data
      this.modalidadOperacionFull = data
      this.buscarCentroOperacion()

  
      // const operacion = this.modalidadOperacion.filter( op => op.id == vehiculo.Agency_id)
  
    })

    this.visibleCO = !this.visibleCO;
  }

  handleLiveCOChange(event: any) {
    this.visibleCO = event;
  }
  

  profilePicture: string | ArrayBuffer | null = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';

  ngOnInit(){
    
    this.service.getDatosUsuario(this.id,this.server).subscribe((data : any) => {
      this.editarForm.patchValue({
        Telefono : data.Telefono,
        Fecha_nacimiento : data.Fecha_nacimiento,
        Direccion : data.Direccion
      })

      this.rol = data.Rol

      console.log(data.Imagen_perfil)

      if( (data.Imagen_perfil || data.Imagen_perfil !== '') && data.Imagen_perfil !== null ){


        this.profilePicture = 'https://hela.transyanez.cl/api/panel/image/foto_perfil/'+data.Imagen_perfil
        // this.service.getFotoPerfil(data.Imagen_perfil).subscribe(blob => {
        //   const reader = new FileReader();
        //   reader.readAsDataURL(blob);
        //   reader.onloadend = () => {
        //     this.profilePicture = reader.result;
        //   };
        // });
      } else {
        this.profilePicture = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
      }

      console.log(this.profilePicture)
    })

    // this.service.verCOusuario(this.id,this.server).subscribe((data : any) =>{
    this.service.verCOusuario(this.id,this.server).subscribe((data : any) =>{
      this.op = data
    })
  }

  editarDatos() {
    this.editarForm.patchValue({
      Server : this.server,
      Id_user: this.id
    })

    this.service.actualizarDatosUsuario(this.editarForm.value).subscribe((data : any) =>{
      alert(data.message)
    })
  }

  subirImagen(){
    const fileInput = document.getElementById('fileInput');

    if(fileInput) fileInput.click();
  }
  
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      // reader.onload = (e: any) => {
      //   this.profilePicture = e.target.result;
      // };
      const formData = new FormData();
      formData.append('file', file, file.name);
      // reader.readAsDataURL(file);

      this.service.subirImagenPerfil(formData,this.id,this.server).subscribe((data : any) => {

        this.profilePicture = 'https://hela.transyanez.cl/api/panel/image/foto_perfil/'+data.filename
        sessionStorage.setItem("imagen_perfil", data.filename)

        window.location.reload();
        // this.profilePicture = 'https://hela.transyanez.cl/api/panel/image/foto_perfil/'+data.filename
        // this.service.getFotoPerfil(data.filename).subscribe(blob => {
        //   const reader = new FileReader();
        //   reader.readAsDataURL(blob);
        //   reader.onloadend = () => {
        //     this.profilePicture = reader.result;
        //   };
        // });
      })
    } else {
      alert('Por favor, seleccione un archivo de imagen.');
    }
  }

  isPasswordHidden: boolean = true;
  isPassNuevaHidden: boolean = true;
  isPassRepetHidden: boolean = true;
  togglePassword() {
    this.isPasswordHidden = !this.isPasswordHidden;
    const passwordField = document.getElementById('pass_antigua') as HTMLInputElement;
    
    if (this.isPasswordHidden) {
      passwordField.type = 'password';
    } else {
      passwordField.type = 'text';
    }
  }

  togglePass_nueva() {
    this.isPassNuevaHidden = !this.isPassNuevaHidden;
    const passwordField = document.getElementById('pass_nueva') as HTMLInputElement;
    
    if (this.isPassNuevaHidden) {
      passwordField.type = 'password';
    } else {
      passwordField.type = 'text';
    }
  }

  togglePass_repetida() {
    this.isPassRepetHidden = !this.isPassRepetHidden;
    const passwordField = document.getElementById('pass_repetida') as HTMLInputElement;
    
    if (this.isPassRepetHidden) {
      passwordField.type = 'password';
    } else {
      passwordField.type = 'text';
    }
  }


  actualizarPassword(){
    this.isErrorView = false
    this.passForm.patchValue({Mail : this.mail})
    if(this.passForm.valid){

      if(this.passForm.value.Password_nueva !== this.passForm.value.Password_repetida){
        this.isErrorView = true
      } else{
        // alert('contraseña aCTUALIZADA CORRECTAMENTE')
        this.service.cambiarPassword(this.passForm.value).subscribe((data:any) => {
          alert(data.message)
        })
        this.isErrorView = false
      }  
    }else {
      this.isErrorView = true
    }
    
  }

  modalidadOperacion : RazonSocial []= []
  modalidadOperacionFull : RazonSocial []= []

  centroOperacion : CentroOperacion [] =[]
  centroOperacionLista : CentroOperacion [] =[]
  centroOperacionAsignado : CentroOperacion [] =[]
  centroOperacionFull : CentroOperacion [] =[]

  convertirOperacion(id : number){
    if(this.modalidadOperacion.length != 0){
      return this.modalidadOperacion.filter(v => v.id == id)[0].nombre
    }
    return ""
    
  }
}