import { Injectable } from '@angular/core';
import { Observable, throwError, pipe } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { AfterSessionExpired } from '../shell/interfaces/after-data-fetch';
import { catchError, mergeMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PptExportService {
  fileUrl: String = 'https://deltarcapi.azurewebsites.net/api/adsapi';

  //headers : any;
  onSessionExpire : AfterSessionExpired;
  constructor(private https :HttpClient) { 
    //this.headers = new Headers();
    //this.headers.set('Content-Type', 'application/zip');
  }

  /**
   * To Post PPt Data
   */
  postPPTForDownload(data): Observable<any> {
    const url = `${this.fileUrl}/ExcelPPT`;
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'});
  //let options = { headers: headers,responseType:'json'};
    return this.https.post(url,data,{headers: headers,responseType:'arraybuffer'})
    .pipe(catchError(this.handleError));
  }

  private handleError = (error: HttpErrorResponse) => {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      if (error.status === 401) {
        if (typeof this.onSessionExpire === 'function') {
          this.onSessionExpire();
        }
      }
    }
    // return an observable with a user-facing error message
    return throwError(error.status);
  }

}
