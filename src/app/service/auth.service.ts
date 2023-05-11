import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { UserList }  from "src/app/models/users.interface";
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  apiurl="http://34.225.63.221"

  GetUserbyusername(code:any){
    return this.http.post(this.apiurl+"/login",code);
  }
}
