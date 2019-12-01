import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class AdService {

  private deltaAd: Subject<any> = new Subject<any>();
  private deltaAd1: Subject<any> = new Subject<any>();
  private aSAd: Subject<any> = new Subject<any>();
  private aSAd1: Subject<any> = new Subject<any>();
  private kohlerAd: Subject<any> = new Subject<any>();
  private kohlerAd1: Subject<any> = new Subject<any>();
  private moenAd: Subject<any> = new Subject<any>();
  private moenAd1: Subject<any> = new Subject<any>();
  private allad: Subject<any> = new Subject<any>();
  private singlead: Subject<any> = new Subject<any>();
  private singlead1: Subject<any> = new Subject<any>();

  private messageSource1: Subject<any> = new Subject<any>();
  constructor() {

  }

  // from component to ad-selector
  sendAdDelta(adName: any) {
    this.deltaAd.next(adName);
  }
  sendSingleAd(adName: any) {
    this.singlead.next(adName);
  }
  getSingleAd(): Observable<any> {
    return this.singlead.asObservable();
  }
  sendSingleAd1(adName: any) {
    this.singlead1.next(adName);
  }
  getSingleAd1(): Observable<any> {
    return this.singlead1.asObservable();
  }
  sendAllAdBrandWiseData(adnames: any) {
    this.allad.next(adnames);
  }
  getAllData(): Observable<any> {
    return this.allad.asObservable();
  }

  getAdDelta(): Observable<any> {
    return this.deltaAd.asObservable();
  }
  sendAdDelta1(adName: any) {
    this.deltaAd1.next(adName);
  }
  getAdDelta1(): Observable<any> {
    return this.deltaAd1.asObservable();
  }
  sendAdAs(adName: any) {
    this.aSAd.next(adName);
  }

  getAdAs(): Observable<any> {
    return this.aSAd.asObservable();
  }
  sendAdAs1(adName: any) {
    this.aSAd1.next(adName);
  }

  getAdAs1(): Observable<any> {
    return this.aSAd1.asObservable();
  }

  sendAdKohler(adName: any) {
    this.kohlerAd.next(adName);
  }

  getAdKohler(): Observable<any> {
    return this.kohlerAd.asObservable();
  }
  sendAdKohler1(adName: any) {
    this.kohlerAd1.next(adName);
  }

  getAdKohler1(): Observable<any> {
    return this.kohlerAd1.asObservable();
  }
  sendAdMoen(adName: any) {
    this.moenAd.next(adName);
  }

  getAdMoen(): Observable<any> {
    return this.moenAd.asObservable();
  }
  sendAdMoen1(adName: any) {
    this.moenAd1.next(adName);
  }

  getAdMoen1(): Observable<any> {
    return this.moenAd1.asObservable();
  }


  // from ad-selector to component

  sendsectorAdId(adName: number) {
    this.messageSource1.next(adName);
  }

  getcompAdId(): Observable<any> {
    return this.messageSource1.asObservable();
  }
}
