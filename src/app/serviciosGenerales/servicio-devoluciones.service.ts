import { Injectable } from '@angular/core';
import { Devolucion } from 'src/models/devolucion.model';
import { Observable} from 'rxjs';
import { HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ServicioDevolucionesService {
  private apiUrl ='/api/Devoluciones';

  constructor(private http: HttpClient) { }

  getAllDevoluciones(): Observable<Devolucion[]> {
    return this.http.get<Devolucion[]>(this.apiUrl);
  }
}
