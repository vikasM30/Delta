import { AdService } from './../../service/ad-service';
import { Component, OnInit } from '@angular/core';
import { FilterConfig } from 'src/app/shell/models/filterConfig';
import { FilterOption } from 'src/app/shell/models/filterOption';
import { FilterConfigService } from 'src/app/service/filter-config.service';
import { FilterService } from 'src/app/shell/services/filter.service';
import { FilterType } from 'src/app/shell/enums/filter-type';
import { UploadAdDetailService } from 'src/app/service/upload-ad-detail.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ad-selector',
  templateUrl: './ad-selector.component.html',
  styleUrls: ['./ad-selector.component.css']
})
export class AdSelectorComponent implements OnInit {
  Kohler:string;
  AS:string;
  Moen:string;
  delta:string;
  exampleRadios1:string;
  deltaArray: Array<any>;
  asArray: Array<any>;
  kohlerArray: Array<any>;
  moenArray: Array<any>;
  subsDelta: Subscription;
  subsAs: Subscription;
  subsKohler: Subscription;
  subsMoen: Subscription;
  idDelta: any;
  idAs: any;
  idKohler: any;
  idMoen: any;
  idDelta1: any;
  idAs1: any;
  idKohler1: any;
  idMoen1: any;
 
  constructor(private idData: AdService) {

    // this.subsDelta = this.idData.getAdDelta1().subscribe(data => {
    //   this.idDelta = data;
    //   this.idDelta1 =  Array.from(this.idDelta);
    //   // console.log('Delta', this.idDelta);
    // });
    // this.subsAs = this.idData.getAdAs1().subscribe(data => {
    //   this.idAs = data;
    //   this.idAs1 =  Array.from(this.idAs);
    //   // console.log('AS', this.idAs);
    // });
    // this.subsKohler = this.idData.getAdKohler1().subscribe(data => {
    //   this.idKohler = data;
    //   this.idKohler1 =  Array.from(this.idKohler);
    //   // console.log('Kohler', this.idKohler);
    // });
    // this.subsMoen = this.idData.getAdMoen1().subscribe(data => {
    //   this.idMoen = data;
    //   this.idMoen1 =  Array.from(this.idMoen);
    //   // console.log('Moen', this.idMoen);
    // });
  }
  adSelector: boolean;
  ngOnInit() {
    this.idDelta = ['The Perfect Touch', 'Hydrorain One', 'Shield Yourself', 'In2ition Two-In-One'];
    this.idDelta1 =  Array.from(this.idDelta);
    this.idMoen = ['The Design', 'Life Designs/ Water is Life', 'Perfect Fit/In Control', 'Rough Water/In Control', 'Moen Flow'];
    this.idMoen1 =  Array.from(this.idMoen);
    this.idKohler = ['Mother Nature', 'Konnect-Pouring Made Easy', 'Verdera Voice Mirror'];
    this.idKohler1 =  Array.from(this.idKohler);
    this.idAs = ['Quality Product Touchless KF', 'Lysol ActiClean Self-Clean', 'Innovative'];
    this.idAs1 =  Array.from(this.idAs);
  }

  sendselId() {
    var Alladd =[];
    this.idDelta1.forEach(element => {
      Alladd.push(element)
    });
    this.idKohler1.forEach(element => {
      Alladd.push(element)
    });
    this.idMoen1.forEach(element => {
      Alladd.push(element)
    });
    this.idAs1.forEach(element => {
      Alladd.push(element)
    });
    this.idData.sendAllAdBrandWiseData(Alladd);
    
      }


      checked($event, id:string,el: any,brand:string) {             
        var icon = document.getElementById(id); 
        var containClass=icon.classList.contains('checked');   
        if(containClass)
        {
          icon.classList.remove('checked');
          if(brand=='delta'){
            this.idDelta1=this.idDelta1.filter(el1=>el!=el1);
          }
          else if(brand=='AS'){
            this.idAs1=this.idAs1.filter(el1=>el!=el1);
          }
          else if(brand=='Kohler'){
            this.idKohler1=this.idKohler1.filter(el1=>el!=el1);
          }
          else {
            this.idMoen1=this.idMoen1.filter(el1=>el!=el1);
          }
        }   
        else{
          icon.classList.add('checked');
          if(brand=='delta'){
            this.idDelta1.push(el);
          }
          else if(brand=='AS'){
            this.idAs1.push(el);
          }
          else if(brand=='Kohler'){
            this.idKohler1.push(el);
          }
          else {
            this.idMoen1.push(el);
          }
        }   
      }
}
