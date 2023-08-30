import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { UserList }  from "src/app/models/users.interface";
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  apiurl="https://hela.transyanez.cl/api"
  // apiurl= "http://127.0.0.1:8000"

  GetUserbyusername(code:any){
    return this.http.post(this.apiurl+"/login",code);
  }

  verifyUser(header:any){
    return this.http.get<any>(this.apiurl+"/user", { headers: header});
  }

}
