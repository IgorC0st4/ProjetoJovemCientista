import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { Usuario } from 'src/app/models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioHttpService {

  base_path = 'http://localhost:8080/usuario'

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

  efetuarCadastro(postData): Observable<Usuario> {
    console.log('CADASTRO : ' + postData);
    return this.http.
      post<Usuario>(this.base_path + '/cadastro', postData, this.httpOptions)
      .pipe();
  }

  efetuarLogin(postData): Observable<Usuario> {
    console.log('LOGIN : ' + postData);
    return this.http.post<Usuario>(this.base_path + '/login', postData, this.httpOptions)
    .pipe();
  }
}
