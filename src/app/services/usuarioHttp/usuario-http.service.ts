import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { Usuario } from 'src/app/models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioHttpService {

  basePath = 'http://186.219.4.245:8080/usuario'

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(public http: HttpClient) { }

  efetuarCadastro(postData): Observable<Usuario> {
    return this.http.
      post<Usuario>(this.basePath + '/cadastro', postData, this.httpOptions)
      .pipe();
  }

  efetuarLogin(postData): Observable<Usuario> {
    return this.http.post<Usuario>(this.basePath + '/login', postData, this.httpOptions)
    .pipe();
  }
}
