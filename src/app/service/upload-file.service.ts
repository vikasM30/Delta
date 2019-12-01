import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { AfterSessionExpired } from '../shell/interfaces/after-data-fetch';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {
  fileUrl: String = 'https://deltarcapi.azurewebsites.net/Delta/Subscriptions/145/Projects/2b4720c8-7220-3019-09ae-7a83251e09bf';
  onSessionExpire : AfterSessionExpired;
  
  headers: any;
  constructor(private httpClient:HttpClient) {
     this.headers = new Headers();
     this.headers.set('Content-Type', 'multipart/form-data');
   }

  postFile(file,fileDetail): Observable<{}> {
    const filename = fileDetail.filename;
    const username = fileDetail.username;
    const SyncOn = fileDetail.SynchronizedOn;
    const endpoint = `${this.fileUrl}/UserName/${username}/SyncOn/${SyncOn}/uploadfile`;
    const formData: FormData = new FormData();
    formData.append("name", filename);
    formData.append('filedNameHere', file[0]);
    return this.httpClient
      .post(endpoint,formData,this.headers)
      .pipe(catchError(this.handleError));
  }

  getFile(): Observable<any> {
    const url = `${this.fileUrl}`;
    
    return this.httpClient
      .get(url,this.headers)
      .pipe(catchError(this.handleError));
  }

  deleteFileRecored(Id): Observable<any> {
    const url = `${this.fileUrl}/Delete/${Id}`;
    return this.httpClient
      .delete(url)
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
