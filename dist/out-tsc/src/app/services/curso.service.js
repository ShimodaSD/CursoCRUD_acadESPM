import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
let CursoService = class CursoService {
    // injetando o HttpClient
    constructor(httpClient) {
        this.httpClient = httpClient;
        this.url = 'http://localhost:3000/api/curso/listar'; // api rest fake
        // Headers
        this.httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'YOUR-DOMAIN.TLD',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept' })
        };
    }
    // Obtem todos os carros
    getCars() {
        return this.httpClient.get(this.url)
            .pipe(retry(2), catchError(this.handleError));
    }
    // Manipulação de erros
    handleError(error) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // Erro ocorreu no lado do client
            errorMessage = error.error.message;
        }
        else {
            // Erro ocorreu no lado do servidor
            errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
        }
        console.log(errorMessage);
        return throwError(errorMessage);
    }
};
CursoService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], CursoService);
export { CursoService };
//# sourceMappingURL=curso.service.js.map