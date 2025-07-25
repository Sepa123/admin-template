import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { UserList }  from "src/app/models/users.interface";
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  apiurl="https://hela.transyanez.cl/api/v2"
  // apiurl= "http://127.0.0.1:8000/api"
  // apiurl="http://127.0.0.1:8000/api/v2"

  GetUserbyusername(code:any){
    return this.http.post(this.apiurl+"/login",code);
  }

  verifyUser(header:any){
    return this.http.get<any>(this.apiurl+"/user", { headers: header});
  }


  listaMenus( id_usuario:any){
    return this.http.get<any>(this.apiurl+`/menu/hela?id_usuario=${id_usuario}`);
  }

}
