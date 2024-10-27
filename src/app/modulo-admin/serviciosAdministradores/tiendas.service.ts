import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TiendasService {

  apiUri='/api/Tiendas'

  constructor(private http: HttpClient) { }


getTienda(token: any):Observable<any> {
return this.http.get(
  this.apiUri,
{
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
});
}
}
