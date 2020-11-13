import { Nivel } from 'src/app/models/nivel';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NivelHttpService {

  base_path = 'http://186.219.4.245:8080/nivel'

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(public http: HttpClient) { }

  listarNiveis():Observable<Nivel[]>{
    return this.http.get<Nivel[]>(this.base_path, this.httpOptions).pipe();
  }
}