import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Curso } from '../models/curso';

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  url = 'http://localhost:3000/api/curso/listar'; // api rest fake
  urlPost = 'http://localhost:3000/api/curso/criar';
  urlUpdate = 'http://localhost:3000/api/curso/alterar';
  urlDelete = 'http://localhost:3000/api/curso/excluir';


  // injetando o HttpClient
  constructor(private httpClient: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
}


  // Obtem todos os cursos
  getCurso(): Observable<Curso[]> {
    return this.httpClient.get<Curso[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

   // Obtem um curso pelo id
   getCursoById(idCurso: number): Observable<Curso> {
    return this.httpClient.get<Curso>(this.url + '/' + idCurso)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // salva um curso
  saveCurso(curso: Curso): Observable<Curso> {
    return this.httpClient.post<Curso>(this.urlPost, JSON.stringify(curso), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // atualiza um curso
  updateCurso(curso: Curso): Observable<Curso> {
    return this.httpClient.post<Curso>(this.urlUpdate + '/?' + curso.idCurso, JSON.stringify(curso), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // deleta um curso
  deleteCurso(curso: Curso) {
    return this.httpClient.get<Curso>(this.urlDelete + '/?idCurso=' + curso.idCurso, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

    // Manipulação de erros
    handleError(error: HttpErrorResponse) {
      let errorMessage = '';
      if (error.error instanceof ErrorEvent) {
        // Erro ocorreu no lado do client
        errorMessage = error.error.message;
      } else {
        // Erro ocorreu no lado do servidor
        errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
      }
      console.log(errorMessage);
      return throwError(errorMessage);
    }
}
