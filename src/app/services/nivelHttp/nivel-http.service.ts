import { Nivel } from 'src/app/models/nivel';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NivelHttpService {

  basePath = 'http://186.219.4.245:8080/nivel'
  //basePath = 'http://localhost:8080/nivel'

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(public http: HttpClient) { }

  listarNiveis():Observable<Nivel[]>{
    return this.http.get<Nivel[]>(this.basePath, this.httpOptions).pipe();
  }
}