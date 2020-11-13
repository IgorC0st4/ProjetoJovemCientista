import { Resultado } from './../../models/resultado';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { Usuario } from 'src/app/models/usuario';

@Injectable({
  providedIn: 'root'
})
export class ResultadoHttpService {

  basePath = 'http://186.219.4.245:8080/resultado'
  //basePath = 'http://localhost:8080/resultado'

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(public http: HttpClient) { }

  enviarResultado(postData):Observable<Resultado>{
    return this.http.post<Resultado>(this.basePath, postData, this.httpOptions).pipe();
  }

  solicitarResultadoMaisRapido(id:number):Observable<Resultado>{
    return this.http.get<Resultado>(this.basePath + '/maisRapido/' + id, this.httpOptions).pipe();
  }

}
