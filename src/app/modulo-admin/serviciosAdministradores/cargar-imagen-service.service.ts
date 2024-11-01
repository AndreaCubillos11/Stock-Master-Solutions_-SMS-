import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CargarImagenServiceService {

  constructor(private http:HttpClient,) { }
  url:string ='https://api.cloudinary.com/v1_1/dfaqsp0j1/image/upload'

  uploadImg(data:any):Observable<any> {
return this.http.post(this.url,data);
  }
}
