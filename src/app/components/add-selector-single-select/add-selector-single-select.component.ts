import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AdService } from 'src/app/service/ad-service';

@Component({
  selector: 'app-add-selector-single-select',
  templateUrl: './add-selector-single-select.component.html',
  styleUrls: ['./add-selector-single-select.component.css']
})
export class AddSelectorSingleSelectComponent implements OnInit {
  Kohler:string;
  AS:string;
  Moen:string;
  delta:string;
  exampleRadios1:string;
  deltaArray: Array<any>;
  asArray: Array<any>;
  kohlerArray: Array<any>;
  moenArray: Array<any>;
  subsSingleAdd: Subscription;
  subsAs: Subscription;
  subsKohler: Subscription;
  subsMoen: Subscription;
  idAdd: any;
  idAs: any;
  idKohler: any;
  idMoen: any;
  idDelta:any;
  idDelta1:any;
  idAdd1: any;
  idAs1: any;
  idKohler1: any;
  idMoen1: any;
  Alladd1: Array<any>;
  constructor(private idData: AdService) 
  {
    this.subsSingleAdd = this.idData.getSingleAd().subscribe(data => {
         this.idAdd = data;
         //this.idAdd1 =  Array.from(this.idAdd);
         this.selectAddFromAdDetails1(this.idAdd);
         // console.log('Delta', this.idDelta);
       });
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
  selectAddFromAdDetails1(dt:any){
    this.Alladd1 =[];
    
    this.idDelta1.forEach(element => {
      this.Alladd1.push(element)
    });
    this.idKohler1.forEach(element => {
      this.Alladd1.push(element)
    });
    this.idMoen1.forEach(element => {
      this.Alladd1.push(element)
    });
    this.idAs1.forEach(element => {
      this.Alladd1.push(element)
    });
    this.Alladd1.forEach(el=>{
      if(el==dt){
        var icon = document.getElementById(el);   
        icon.classList.add('checked');
      }
    })
  }
  sendselId() {
    var Alladd =[];
    this.idAdd1.forEach(element => {
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

      senddatatoAdddetails(el:any){
        this.idData.sendSingleAd1(el);
      }

      checked($event, id:string,el: any,brand:string) {             
        var icon = document.getElementById(id); 
        var containClass=icon.classList.contains('checked');   
        if(containClass)
        {
          this.senddatatoAdddetails(el);
        
        }   
        else{
          const allIcons = document.getElementsByClassName('hand-pointer');
          for (let i = 0; i < allIcons.length; i++) {
            allIcons[i].classList.remove('checked');
          }
          icon.classList.add('checked');
          this.senddatatoAdddetails(el);
         
        }   
      }
}
