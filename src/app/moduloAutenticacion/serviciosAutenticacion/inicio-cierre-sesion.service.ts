import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CookieService } from 'ngx-cookie-service';
import { Router } from "@angular/router";
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()

export class InicioCierreSesionService {
  private urlApi ='';

  constructor(private router: Router, private http: HttpClient, private cookie: CookieService) {}

  login(credentials: { user: string, contraseña: string }): Observable<{ token: string, rol: number }> {
    return this.http.post<{ token: string, rol: number }>(`${this.urlApi}/login`, credentials).pipe(
        tap(response => {
          this.cookie.set('Token', response.token, 1);
          localStorage.setItem('Rol', response.rol.toString());
        })
      );
  }

  logout() {
    this.cookie.delete('Token', '/');
    localStorage.removeItem('Rol');
    this.router.navigate(['']);
  }

  getRol(): number | null {
    const rol = localStorage.getItem('Rol');
    return rol ? parseInt(rol, 10) : null;
  }

}
