import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RegistrarUsuarioService } from 'src/app/service/registrar-usuario.service'

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent{

  constructor(private service: RegistrarUsuarioService, public builder: FormBuilder) { }
  
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
      Ids_coordinador : usuarioEliminado,
      Id_coordinador : this.id,
      Id_co : id_co
    }
      console.log('eliminado ', body)
    }
  

    
  
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
      

    }
  
    editarDatos() {

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
        console.log('HORA')
  
        this.service.subirTest(formData,this.id,this.server).subscribe((data : any) => {
  
          
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

      
    }

}

