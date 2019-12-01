import { Component, OnInit } from '@angular/core';
import { UploadAdDetailService } from 'src/app/service/upload-ad-detail.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { AdDetails } from 'src/app/model/addetails';
import { AdlistConfig } from './table/adList-config';
import { Chart } from 'src/app/shell/models/chart';
import { FilterService } from 'src/app/shell/services/filter.service';
import { takeUntil } from 'rxjs/operators';
import { Ecrdetail } from './table/adecr';
// import * as _moment from 'moment';
// const moment =  _moment;
@Component({
  selector: 'app-ad-advert',
  templateUrl: './ad-advert.component.html',
  styleUrls: ['./ad-advert.component.css']
})
export class AdAdvertComponent implements OnInit {
  showLoader:boolean = false;
  showPopup:boolean = false;
  showNotification:boolean = false;
  errorNotification:boolean = false;
  minDate = new Date(2018, 0, 1);
  maxDate = new Date();
  firstDate :any = new FormControl(new Date(''));
  LastDate:any = new FormControl(new Date(''));
  onDataUpdate :Subject<any> = new Subject<any>();
  adListUnsubscribe :Subject<any> = new Subject<any>();
  imageFile : FormData = new FormData();
  videoFile : FormData = new FormData();
  addLists : Array<AdDetails> = new Array<AdDetails>();
  adId :any = null ;
  index:any;
  ecrDetails: Ecrdetail = {
    quarter:'',
    ecr:'',
    adid: ''
  };
  addropdownList : Array<any>= new Array<any>();
  adsBrands = ['Delta','American Standard','Kohler','Moen'];
  adType = ['TV','Digital','Print'];
  adsCategory = ['Faucet','Showerhead','Toilet','Tub/Shower Unit'];
  quarter :Array<any>= new Array<any>();
  ecrList: Array<Ecrdetail> = new Array<Ecrdetail>();
  tempEcrList: Array<Ecrdetail> = new Array<Ecrdetail>();
  ecrIdList: Array<number> = new Array<number>();
  button :String ='Save';
  selectedADId:number= null;
  isDisabledbutton : boolean = true;
  adDetailList :AdDetails = {
      adlength: '',
      adname: "",
      adtype: "",
      brand: "",
      firstrundate: new Date(''),
      lastrundate: new Date(''),
      numerator_ad_code: '',
      product_category: "",
      quarterenddate: "",
      quarterstartdate: "",
  }
  //AdList:Chart;
  adDetailListChart:Array<Chart> = new Array<Chart>();
  constructor(private filterService:FilterService, private addDetailsService : UploadAdDetailService,private formbuilder:FormBuilder) {
  }

  ngOnInit() {
    //console.log(this.firstDate);
    this.showLoader = true;
    this.adRelatedDetails();
    this.getAds();
    this.filterService.optionSelectionCallback$
    .pipe(takeUntil(this.adListUnsubscribe))
    .subscribe(value=>{
      // this.adRelatedDetails();
      setTimeout(()=>{
        this.onDataUpdate.next();
      })
    });
  }
  adRelatedDetails(){
    //this.showLoader = trueAdselector;
    const adListconfigration :AdlistConfig = new AdlistConfig();
    const AdList:Chart = adListconfigration.adconfig('Quarterly');
    const Adselector :Chart = adListconfigration.adconfig('Adselector');
    this.adDetailListChart.push(AdList);
    this.adDetailListChart.push(Adselector);
    AdList.addTableDataReady((output,dataTable)=>{
      this.quarter = output;
      this.showLoader = false;
    });
    Adselector.addTableDataReady((output,dataTable)=>{
      this.addropdownList = output;
      this.showLoader = false;
    });
  }
  AddNewAd(){
    this.adDetailList = {
      adlength: '',
      adname: "",
      adtype: "",
      brand: "",
      firstrundate:new Date(''),
      lastrundate: new Date(''),
      numerator_ad_code: '',
      product_category: "",
      quarterenddate: "",
      quarterstartdate: "",
    }
    this.button = 'Save'
    this.ecrList = [];
    this.ecrIdList = [];
    this.selectedADId = null;
    this.imageFile = null;
    this.videoFile = null;
    this.isDisabledbutton = false;
    this.tempEcrList = [];
    this.firstDate  = new FormControl(new Date(''));
    this.LastDate = new FormControl(new Date(''));
  }
  /**
   * Call Get Ad Api Through Services
   */
  getAds(){
    this.addDetailsService.getAllAds().subscribe((data)=>{
      console.log(data);
      this.addLists = data;
      this.showLoader = false;
    },error => {
      console.log(error);
      this.showLoader = false;
    });
  }
  /**
   * Call Get ECR Api Through Services
   */
  selectAdandGetEcr(id){
    this.showLoader = true;
    this.isDisabledbutton  = false
    this.button = 'Update';
    this.ecrList = [];
    this.ecrIdList = [];
    this.selectedADId = id;
    let adIndex = null;
    this.addLists.forEach((value,index)=>{
      if(id == value.adid ){
        adIndex = index;
        console.log(adIndex);
      }
    })
    this.adDetailList = this.addLists[adIndex];
    this.firstDate  = new FormControl(new Date(this.adDetailList.firstrundate));
    this.LastDate = new FormControl(new Date(this.adDetailList.lastrundate));
    this.addDetailsService.getAdEcr(id).subscribe((data)=>{
      if(data.length){
        this.ecrList = data;
      }
      this.showLoader = false;
    },error => {
      console.log(error);
      this.showLoader = false;
      this.isDisabledbutton  = true;
    });
  }
  onDate(event): void {
    this.adDetailList.firstrundate = event;
  }
  uploadImage(file){
    this.imageFile = new FormData();
    this.imageFile.append("name", file[0].name);
    this.imageFile.append(file[0].name, file[0]);
  }
  uploadVideo(file){
    this.videoFile = new FormData();
    this.videoFile.append("name", file[0].name);
    this.videoFile.append(file[0].name, file[0]);
  }
  dateConversion(dateValue){
    const date : Date = new Date(dateValue);
    //let newDate = new Date(date);
    const month = date.getMonth()+1 > 10? date.getMonth()+1:'0'+(date.getMonth()+1);
    const year = date.getFullYear();
    const newdate = date.getDate()> 10? date.getDate():'0'+date.getDate();
    return month+'/'+newdate+'/'+year;
  }
  /**
   * Post Ad Api Through Services
   * Saving Adds
   */
  saveAndUpdateAd(){
    this.showLoader = true;
    // this.adDetailList.firstrundate = this.dateConversion(this.adDetailList.firstrundate);
    // this.adDetailList.lastrundate = this.dateConversion(this.adDetailList.lastrundate);
    this.adDetailList.firstrundate =  this.firstDate.value;
    this.adDetailList.lastrundate =  this.LastDate.value;
    const obj = {
      details : this.adDetailList,
      imageFile : this.imageFile,
      videoFile : this.videoFile,
      ecrDetails : this.tempEcrList
    }
    if(this.selectedADId == null){
      this.addDetailsService.postAdDetails(obj.details).subscribe(id=>{
        this.addMediaAndEcr(obj,id,this.ecrIdList);
        this.showNotification = true;
      },error =>{
        console.log(error);
        this.showLoader = false;
        this.errorNotification = true;
        setTimeout(function(){ this.errorNotification = false; }, 3000);
      }); 
    }else{
      this.addDetailsService.updateAd(obj,this.selectedADId,this.ecrIdList).subscribe(data=>{
        this.addMediaAndEcr(obj,this.selectedADId,this.ecrIdList);
        this.showNotification = true;
      },error=>{
        console.log(error);
        this.showLoader = false;
        this.errorNotification = true;
        setTimeout(function(){ this.errorNotification = false; }, 3000);
      });
    }
  }

  addMediaAndEcr(obj,id,ecrIdList){
    let maxcount = ecrIdList.lenght? 4:3;
    let counter = 0;
    this.addDetailsService.uploadImage(obj.imageFile,id).subscribe(Id=>{
      console.log('image uploaded');
      counter++;
      if(counter == maxcount){
        
        this.getAds();
        this.AddNewAd();
        setTimeout(()=>{ this.showNotification = false;},3000);
      }
    },error =>{
      console.log(error);
      counter++;
      if(counter == maxcount){
        
        this.getAds();
        this.AddNewAd();
        setTimeout(()=>{ this.showNotification = false;},3000);
      }
    });
    this.addDetailsService.uploadVideo(obj.videoFile,id).subscribe(Id=>{
      console.log('video uploaded');
      counter++;
      if(counter == maxcount){
        
        this.getAds();
        this.AddNewAd();
        setTimeout(()=>{ this.showNotification = false;},3000);
      }
    },error =>{
      console.log(error);
      counter++;
      if(counter == maxcount){
        
        this.getAds();
        this.AddNewAd();
        setTimeout(()=>{ this.showNotification = false;},3000);
      }
    });
    if(ecrIdList.length){
      this.addDetailsService.deleteEcr(ecrIdList).subscribe(Id=>{
        console.log('ECR completed');
        counter++;
      if(counter == maxcount){
        
        this.getAds();
        this.AddNewAd();
        setTimeout(()=>{ this.showNotification = false;},3000);
      }
      },error =>{
        console.log(error);
        counter++;
      if(counter == maxcount){
        this.getAds();
        this.AddNewAd();
        setTimeout(()=>{ this.showNotification = false;},3000);
      }
      });
    }
    this.addDetailsService.postEcr(obj.ecrDetails,id).subscribe(Id=>{
      console.log('ECR completed');
      counter++;
      if(counter == maxcount){
        this.getAds();
        this.AddNewAd();
        setTimeout(()=>{ this.showNotification = false;},3000);
      }
    },error =>{
      console.log(error);
      counter++;
      if(counter == maxcount){
        this.getAds();
        this.AddNewAd();
        setTimeout(()=>{ this.showNotification = false;},3000);
      }
    });
  }
  deleteAd(){
    this.showLoader = true;
    this.addDetailsService.deleteAd(this.adId).subscribe(data=>{
      this.showLoader = false;
      this.showPopup = !this.showPopup;
      this.addLists.splice(this.index,1);
      this.index = null;
      this.adId = null;
    },error=>{
      this.showLoader = false;
      this.showPopup = !this.showPopup;
      this.index = null;
      this.adId = null;
    });
  }

  saveEcr(quarter,num){
    console.log(quarter,num);
    this.ecrDetails = {
      quarter:quarter,
      ecr:num,
      adid:''
    }
    this.ecrList.push(this.ecrDetails);
    this.tempEcrList.push(this.ecrDetails);

  }
  deleteEcr(id,index){
    if(id){
      this.ecrIdList.push(id);
    }else{
      const value = this.ecrList[index];
      let ind = null;
      this.tempEcrList.forEach((val,j)=>{
        if(val.ecr == value.ecr){
          ind = j;
        }
      })
      this.tempEcrList.splice(ind,1);
    }
    this.ecrList.splice(index,1);
  }
  openPopup(id,i) {
    this.showPopup = !this.showPopup;
    this.adId = id;
    this.index = i;
  }
  close() {
    this.showPopup = !this.showPopup;
    this.adId = null;
    this.index = null;
  }
  ngOnDestroy(): void {
    this.adListUnsubscribe.next();
    this.adListUnsubscribe.complete();
  }

  highlight($event, id:string) {
    const allIcons = document.getElementsByClassName('media');
    for (let i = 0; i < allIcons.length; i++) {
      allIcons[i].classList.remove('alert-info');
    }
    var icon = document.getElementById(id);
    icon.classList.add('alert-info');
  }
}
