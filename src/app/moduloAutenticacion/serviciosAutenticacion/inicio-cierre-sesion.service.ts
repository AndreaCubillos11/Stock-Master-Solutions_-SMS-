import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
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
    return this.http.post<any[]>(`${this.urlApi}/login`, credentials).pipe(
      tap(response => {
        const user = response[0] as Usuario;
        const Token = response[1] as string;
        this.cookie.set('Token', Token, 1);
        localStorage.setItem('Rol',  JSON.stringify(user.rol));
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

  logout() {
    this.cookie.delete('Token', '/');
    localStorage.removeItem('Rol');
    this.router.navigate(['']);
  }

  getRol(): number | null {
    const rolJSON = localStorage.getItem('Rol');
    if (rolJSON) {
      const rol = JSON.parse(rolJSON);
      return parseInt(rol, 10);
    }
    return null;
  }

}
