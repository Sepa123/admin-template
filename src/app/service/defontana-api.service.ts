import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Main } from '../models/defontana/venta.interface'
@Injectable({
  providedIn: 'root'
})
export class DefontanaApiService {

  constructor(private http: HttpClient) { }

  apiurl="https://replapi.defontana.com/api/sale/GetSaleByDate?initialDate=2024-02-06&endingDate=2024-02-06&itemsPerPage=100&pageNumber=1"

  accessToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1laWQiOiJBRDEyM0ZULUhHREY1Ni1LSTIzS0wtS0pUUDk4NzYtSEdUMTIiLCJ1bmlxdWVfbmFtZSI6ImNsaWVudC5sZWdhY3lAZGVmb250YW5hLmNvbSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vYWNjZXNzY29udHJvbHNlcnZpY2UvMjAxMC8wNy9jbGFpbXMvaWRlbnRpdHlwcm92aWRlciI6IkFTUC5ORVQgSWRlbnRpdHkiLCJBc3BOZXQuSWRlbnRpdHkuU2VjdXJpdHlTdGFtcCI6IkdIVEQyMzQtS0xISjc4NjgtRkc0OTIzLUhKRzA4RlQ1NiIsImNvbXBhbnkiOiIyMDIxMTEwMjIwMjM1MjU5ODAwMSIsImNsaWVudCI6IjIwMjExMTAyMjAyMzUyNTk4MDAxIiwib2xkc2VydmljZSI6ImdvbGRlbiIsInVzZXIiOiJJTlRFR1JBQ0lPTiIsInNlc3Npb24iOiIxNzA4MzQyMDQwIiwic2VydmljZSI6ImdvbGRlbiIsImNvdW50cnkiOiJDTCIsImNvbXBhbnlfbmFtZSI6IlRyYW5zcG9ydGVzIFlhw7FleiBMdGRhLiIsImNvbXBhbnlfY291bnRyeSI6IkNMIiwidXNlcl9uYW1lIjoiSU5URUdSQUNJT04iLCJyb2xlc1BvcyI6IltcInVzdWFyaW9cIixcInVzdWFyaW9lcnBcIl0iLCJydXRfdXN1YXJpbyI6IjE0LjE3OC42NzMtMyIsImlzcyI6Imh0dHBzOi8vKi5kZWZvbnRhbmEuY29tIiwiYXVkIjoiMDk5MTUzYzI2MjUxNDliYzhlY2IzZTg1ZTAzZjAwMjIiLCJleHAiOjE3MDg1MTQ4MzksIm5iZiI6MTcwODM0MjAzOX0.Ng0a0NGBdHEbZZ_h1auL7-CCVlFbWyu0_SY6gO1ZwZ8"
  
  get_ventas() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.accessToken}`
    });

    return this.http.get<Main>(this.apiurl, { headers: headers })
  }
}
