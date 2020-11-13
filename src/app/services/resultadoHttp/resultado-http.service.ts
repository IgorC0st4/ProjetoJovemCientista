import { Resultado } from './../../models/resultado';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { Usuario } from 'src/app/models/usuario';

@Injectable({
  providedIn: 'root'
})
export class ResultadoHttpService {

  base_path = 'http://186.219.4.245:8080/resultado'

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(public http: HttpClient) { }

  enviarResultado(postData):Observable<Resultado>{
    return this.http.post<Resultado>(this.base_path, postData, this.httpOptions).pipe();
  }

  solicitarResultadoMaisRapido(id:number):Observable<Resultado>{
    return this.http.get<Resultado>(this.base_path + '/maisRapido/' + id, this.httpOptions).pipe();
  }

}
