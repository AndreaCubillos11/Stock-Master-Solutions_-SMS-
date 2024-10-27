import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CookieService } from 'ngx-cookie-service';
import { Router } from "@angular/router";
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Usuario } from "src/models/usuarios.model";

@Injectable()

export class InicioCierreSesionService {
  private urlApi ='/api';

  constructor(private router: Router, private http: HttpClient, private cookie: CookieService) {}

  login(credentials: { user: string, contraseña: string }): Observable<{ user: Usuario, accessToken: string }> {
    return this.http.post<{ user: Usuario, accessToken: string }>(`${this.urlApi}/login`, credentials).pipe(
      tap(response => {
        this.cookie.set('Token', response.accessToken, 1);
        localStorage.setItem('Rol',  JSON.stringify(response.user.rol));
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
