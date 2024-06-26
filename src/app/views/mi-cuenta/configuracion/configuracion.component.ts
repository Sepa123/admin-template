import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RegistrarUsuarioService } from 'src/app/service/registrar-usuario.service'

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.scss']
})
export class ConfiguracionComponent {
  constructor(private service: RegistrarUsuarioService, public builder: FormBuilder) { }

  private selectedImagenPerfil: File | null = null
  rol =   sessionStorage.getItem('rol_id')+''
  id =   sessionStorage.getItem('id')+''
  server = sessionStorage.getItem('server')+''
  nombre_usuario = sessionStorage.getItem('usuario')+''
  mail = sessionStorage.getItem('mail')+''

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
}
