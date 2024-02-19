import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Main } from '../models/defontana/venta.interface'
@Injectable({
  providedIn: 'root'
})
export class DefontanaApiService {

  constructor(private http: HttpClient) { }

  apiurl="https://replapi.defontana.com/api/sale/GetSaleByDate?initialDate=2024-02-06&endingDate=2024-02-06&itemsPerPage=100&pageNumber=1"

  accessToken = ""  
  
  get_ventas() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.accessToken}`
    });

    return this.http.get<Main>(this.apiurl, { headers: headers })
  }
}
