import { Resultado } from './../../models/resultado';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { Usuario } from 'src/app/models/usuario';

@Injectable({
  providedIn: 'root'
})
export class ResultadoHttpService {

  base_path = 'http://localhost:8080/resultado'

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(public http: HttpClient) { }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

  enviarResultado(postData):Observable<Resultado>{
    return this.http.post<Resultado>(this.base_path, postData, this.httpOptions).pipe();
  }

  solicitarResultadoMaisRapido(id:number):Observable<Resultado>{
    return this.http.get<Resultado>(this.base_path + '/maisRapido/' + id, this.httpOptions).pipe();
  }

}
