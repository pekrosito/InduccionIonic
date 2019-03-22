import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ClusterService {

  private cluster = "http://localhost:6040/"

  constructor(private http: HttpClient) { }

  /** GET obtenemos todos los clusters */
  getCluster(clusterUrl: string):Observable<any[]>{
    return this.http.get<any[]>(this.cluster + clusterUrl)
    .pipe(
        tap(cluster => this.log('Error Consulta')),
        catchError(this.handleError("Error con el servidor",[]))
    )
  }

  /** GET obtenemos un cluster por su id. Devolvemos `undefined` cuando no exista */
  getClusterById(clustersUrl: string, id: any): Observable<any> {
    const url = `${this.cluster + clustersUrl}/${id}`;
    return this.http.get<any>(url)
      .pipe( // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} cluster id=${id}`);
        }),
        catchError(this.handleError<any>(`getCluster id=${id}`))
      );
  }

    /** POST: añadimos un nuevo cluster */
    addCluster (clustersUrl: string, cluster: any): Observable<any> {
      return this.http.post<any>(this.cluster + clustersUrl, cluster, httpOptions).pipe(
        tap((cluster: any) => this.log(`added cluster w/ id=${cluster.Id_user}`)),
        catchError(this.handleError<any>('addCluster'))
      );
    }

      /** DELETE: eliminamos un cluster */
  deleteCluster (clustersUrl: string, cluster: any | number): Observable<any> {
    const id = typeof cluster === 'number' ? cluster : cluster.Id_user;
    const url = `${this.cluster + clustersUrl}/${id}`;

    return this.http.delete<any>(url).pipe(
      tap(_ => this.log(`deleted cluster id=${id}`)),
      catchError(this.handleError<any>('deleteCluster'))
    );
  }

  updateCluster (clustersUrl: string, cluster: any): Observable<any> {
    const url = `${this.cluster + clustersUrl}/${cluster.Id_user}`;
    return this.http.put<any>(url, cluster, httpOptions).pipe(
      tap(_=> this.log(`updated cluster id=${cluster.Id_user}`)),
      catchError(this.handleError<any>('updateCluster'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {

  }

}
