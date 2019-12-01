import { Injectable } from '@angular/core';
import { Observable, throwError, pipe } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AfterSessionExpired } from '../shell/interfaces/after-data-fetch';
import { catchError, mergeMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UploadAdDetailService {
  fileUrl: String = 'https://deltarcapi.azurewebsites.net/api/adsapi';
  headers : any;
  adId :any;
  onSessionExpire : AfterSessionExpired;
  constructor(private https :HttpClient) { 
    this.headers = new Headers();
    // this.headers.set('Content-Type', 'multipart/form-data');
  }

  /**
   * To Get All Ad and Details
   */
  getAllAds(): Observable<any> {
    const url = `${this.fileUrl}/getads`;
    this.headers.set('Content-Type', 'application/json');
    return this.https
      .get(url,this.headers)
      .pipe(catchError(this.handleError));
  }
  getAds(id): Observable<any> {
    const url = `${this.fileUrl}/getads/${id}`;
    this.headers.set('Content-Type', 'application/json');
    return this.https
      .get(url,this.headers)
      .pipe(catchError(this.handleError));
  }
 
  postAdDetails(details): Observable<any> {
    const url = `${this.fileUrl}/postads`;
    this.headers.set('Content-Type', 'application/json');
    return this.https
    .post(url,details,this.headers)
      .pipe(
        map((response: any) => {
          try {
            return this.adId = response;
          } catch (e) {
            return '';
          }
        }));
  }
  uploadImage(imageFile,id):Observable<any>{  
    const url = `${this.fileUrl}/uploadimagefile/${id}`;
    this.headers.set('Content-Type', 'multipart/form-data');
    return this.https.post(url,imageFile,this.headers)
    .pipe(catchError(this.handleError));
  }

  uploadVideo(videoFile,id): Observable<any>{
    const url = `${this.fileUrl}/uploadvideofile/${id}`;
    this.headers.set('Content-Type', 'multipart/form-data');
    return this.https.post(url,videoFile,this.headers)
    .pipe(catchError(this.handleError));
  }
  postEcr(obj,id): Observable<any>{
    //const header = new Headers();
    this.headers.set('Content-Type', 'application/json');
    const url = `${this.fileUrl}/postecr`;
    // obj.adid = id;
    obj.forEach((val,i) => {
      obj[i].adid = id;
    });
    return this.https.post(url,obj,this.headers)
    .pipe(catchError(this.handleError));
  }
  updateAd(obj,id,ecrIdList): Observable<any>{
    const url = `${this.fileUrl}/editad/${id}`;
    return this.https.put(url,obj.details,this.headers)
    .pipe(catchError(this.handleError));
  }
  getAdEcr(id): Observable<any>{
    const url = `${this.fileUrl}/getecr/${id}`;
    // this.headers.set('Content-Type', 'application/json');
    return this.https.get(url,this.headers)
    .pipe(catchError(this.handleError));
  }
  /**
   * To Get All Ad and Details
   */
  deleteAd(id): Observable<any> {
    const url = `${this.fileUrl}/deletead/${id}`;
    this.headers.set('Content-Type', 'application/json');
    return this.https
      .delete(url,this.headers)
      .pipe(catchError(this.handleError));
  }
  deleteEcr(ecrIdList): Observable<any> {
    const url = `${this.fileUrl}/deleteecr`;
    this.headers.set('Content-Type', 'application/json');
    return this.https
      .post(url,ecrIdList,this.headers)
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
