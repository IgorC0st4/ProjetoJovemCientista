import { HTTP } from '@ionic-native/http/ngx';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioHttpService {

  basePath = 'http://186.219.4.245:8080/usuario'
  //basePath = 'http://localhost:8080/usuario'
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private httpClient: HttpClient,
    public http: HTTP) {
    this.http.setHeader('*', 'Content-Type', 'application/json');
    this.http.setHeader('*', 'Access-Control-Allow-Origin', '*');
    this.http.setDataSerializer('json');
  }

  efetuarCadastro(postData): Observable<Usuario> {
    return this.httpClient.
      post<Usuario>(this.basePath + '/cadastro', postData, this.httpOptions)
      .pipe();
  }

  efetuarLogin(postData): Observable<Usuario> {
    return this.httpClient.post<Usuario>(this.basePath + '/login', postData, this.httpOptions)
      .pipe();
  }
}
