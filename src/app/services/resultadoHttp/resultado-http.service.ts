import { HTTP } from '@ionic-native/http/ngx';
import { Resultado } from './../../models/resultado';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResultadoHttpService {

  basePath = 'http://200.141.166.245:8080/resultado'
  //basePath = 'http://localhost:8080/resultado'

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private httpClient: HttpClient,
    public http: HTTP) {
    this.http.setHeader('*', 'Content-Type', 'application/json');
  }

  enviarResultado(postData): Observable<Resultado> {
    return this.httpClient.post<Resultado>(this.basePath, postData, this.httpOptions).pipe();
  }

  solicitarResultadoMaisRapido(id: number): Observable<Resultado> {
    return this.httpClient.get<Resultado>(this.basePath + '/maisRapido/' + id, this.httpOptions).pipe();
  }

}
