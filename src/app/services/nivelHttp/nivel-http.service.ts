import { HTTP } from '@ionic-native/http/ngx';
import { Nivel } from 'src/app/models/nivel';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NivelHttpService {

  basePath = 'http://200.141.166.245:8080/nivel'
  //basePath = 'http://localhost:8080/nivel'
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private httpClient: HttpClient,
    public http: HTTP) {
    this.http.setHeader('*', 'Content-Type', 'application/json');
    this.http.setDataSerializer('json');
  }

  listarNiveis(): Observable<Nivel[]> {
    return this.httpClient.get<Nivel[]>(this.basePath, this.httpOptions).pipe();
  }
}