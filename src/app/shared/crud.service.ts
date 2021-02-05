import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Solicitud } from '../interfaces/solicitud';
import { CentroCosto } from '../interfaces/centrocosto';
import { EstadoSolicitud } from '../interfaces/estadosolicitud';


@Injectable({
  providedIn: 'root'
})
export class CrudService {

  private REST_API_SERVER = 'http://localhost:3000';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private httpClient: HttpClient) { }

  public getDataEstadoSolicitud(table: string): Observable<EstadoSolicitud[]> {

    let baseurl = this.REST_API_SERVER + '/api/' + table;

    return this.httpClient.get<EstadoSolicitud[]>(baseurl)
    .pipe(retry(3), catchError(this.handleError));;
  }

  public getDataCentroCosto(table: string): Observable<CentroCosto[]> {

    let baseurl = this.REST_API_SERVER + '/api/' + table;

    return this.httpClient.get<CentroCosto[]>(baseurl)
    .pipe(retry(3), catchError(this.handleError));;

  }

  public getSolicitud(id:number): Observable<Solicitud>{
    var url = this.REST_API_SERVER + '/api/Solicitud/pk/' + id;
    return this.httpClient.get<Solicitud>(url)
    .pipe(retry(3), catchError(this.handleError));
  }

  public getDataSolicitud(table: string, fk: string = null): Observable<Solicitud[]> {

    let baseurl = '';
    if (fk === null) {
      baseurl = this.REST_API_SERVER + '/api/' + table;
    } else {
      baseurl = this.REST_API_SERVER + '/api/' + table + '/fk/' + fk;
    }

    return this.httpClient.get<Solicitud[]>(baseurl)
    .pipe(retry(3), catchError(this.handleError));

  }

  // DELETE
borrar(id: string): Observable<Solicitud> {
  let baseurl = this.REST_API_SERVER + '/api/Solicitud/' + id;
  console.log('xxx -> ',baseurl );
  return this.httpClient.delete<Solicitud>(baseurl, this.httpOptions)
  .pipe(retry(1), catchError(this.handleError));

}

public agregar(sol: Solicitud, param: string): Observable<Solicitud> {

  let baseurl = this.REST_API_SERVER + '/api/Solicitud/' + param;

  console.log('baseurl : ', baseurl);

  return this.httpClient.post<Solicitud>(baseurl, sol, this.httpOptions);
}


public modificar(sol: Solicitud): Observable<Solicitud> {

  var url = this.REST_API_SERVER  + '/api/Solicitud/' + sol['id'];
  return this.httpClient.put<Solicitud>(url, sol, this.httpOptions);
}

public handleError(error: HttpErrorResponse) {
  let errorMessage = 'Unknown error!';
  if (error.error instanceof ErrorEvent) {
    // Client-side errors
    errorMessage = `Error: ${error.error.message}`;
  } else {
    // Server-side errors
    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  }
  window.alert(errorMessage);
  return throwError(errorMessage);
}


}
