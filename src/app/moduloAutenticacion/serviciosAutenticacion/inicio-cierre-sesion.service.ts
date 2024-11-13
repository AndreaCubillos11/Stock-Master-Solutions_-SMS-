import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { CookieService } from 'ngx-cookie-service';
import { Router } from "@angular/router";
import { Observable, catchError, throwError } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Usuario } from "src/models/usuarios.model";

@Injectable()

export class InicioCierreSesionService {
  private urlApi ='/api/Usuarios';

  constructor(private router: Router, private http: HttpClient, private cookie: CookieService) {}

  login(credentials: { user: string, contraseña: string }): Observable<void> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<any>(`${this.urlApi}/login`, JSON.stringify(credentials), {headers}).pipe(
      tap(response => {
        const user = response.user as Usuario;
        const Token = response.accessToken;
        this.cookie.set('Token', Token, 1);
        localStorage.setItem('Rol',  JSON.stringify(user.rol));
        localStorage.setItem('IdTienda',  JSON.stringify(user.tiendaId));
        localStorage.setItem('IdUsuario', JSON.parse(JSON.stringify(response)).user.usuarioId);
      }),
      map(()=> {}),
      catchError(err => {
        let errorMessage = 'Error desconocido';
        if (err.status === 0) {
          errorMessage = 'Error de conexión. Por favor, verifica tu conexión a internet.';
        } else if (err.status === 401) {
          errorMessage = 'Credenciales incorrectas. Por favor, verifica tu usuario y contraseña.';
        } else if (err.status >= 500) {
          errorMessage = 'Error del servidor. Por favor, intenta nuevamente más tarde.';
        }
        console.error('Error en la solicitud de login', err);
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  /* logout() {
    this.cookie.delete('Token', '/');
    localStorage.removeItem('Rol');
    this.router.navigate(['']);
  } */

  getRol(): number | null {
    const rol = localStorage.getItem('Rol');
    return rol ? parseInt(rol,10) : null;
  }

}
