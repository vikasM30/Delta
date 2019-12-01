import {Component, OnInit} from '@angular/core';
import {Chart} from '../../shell/models/chart';
import {OverallSnapshot} from '../../model/overallSnapshot';
import {Subject} from 'rxjs';
import {TableOutput} from '../../shell/interfaces/table-output';
import { FilterService } from 'src/app/shell/services/filter.service';
import { Imagry } from 'src/app/model/Imagenary'
import {AwarenessMetrics} from '../overall-snapshot/exceldownload/Awarenessmetrics';
import { BrandImagery} from '../overall-snapshot/exceldownload/BrandImaginaryExcel';
import { Touchpoint} from './exceldownload/Touchpoint';
import { AngularCsv } from 'angular7-csv/dist/Angular-csv'
import { FilterConfigService } from 'src/app/service/filter-config.service';
import { TimePeriod } from 'src/app/shell/models/time.period';
import { FilterType } from 'src/app/shell/enums/filter-type';
import { CollectionOutput } from 'src/app/shell/models/collectionOutput';
import { takeUntil } from 'rxjs/operators';
import { UploadAdDetailService } from 'src/app/service/upload-ad-detail.service';

@Component({
  selector: 'app-overall-snapshot',
  templateUrl: './overall-snapshot.component.html',
  styleUrls: ['./overall-snapshot.component.css']
})
export class OverallSnapshotComponent implements OnInit {

  private brandname: any;
  unaided: Chart;
  totalBrand: Chart;
  advertising: Chart;
  touchpointRecall: Chart;
  brandImagery: Chart;
  cosnsumerBrandRelation: Chart;
  cosnsumerBrandRelationBase: Chart;
  onDataUpdate: Subject<any> = new Subject();
  updateDataUnsubscribe: Subject<any> = new Subject<any>();
  unaidedData: Array<TableOutput> = new Array<any>();
  totalBrandData: Array<TableOutput> = new Array<any>();
  advertisingData: Array<TableOutput> = new Array<any>();
  touchpointData: Array<TableOutput> = new Array<any>();
  imageryData: Array<TableOutput> = new Array<any>();
  touchpointScore: number[];
  touchpointBases: number[];
  brandImageryBases: number[];
  advertisingBases: number;
  CBRBases: number;
  unaidedBases: number;
  TotalBases: number;
  unaidedScore: number;
  Totalscore: number;
  advertisingscore: number;
  showLoader: boolean;
  touchcheck: boolean;
  brandimaginarycheck: boolean;
  comparedScoreUnaided: number;
  comparedScoreTotal: number ;
  comparedScoreAdver: number;
  consumerRelationBase: number;
  comparedScoreTouch: Array<number> = new Array<number>();
  comparedScoreImaginary: Array<number> = new Array<number>();
  dtAwareness: Array<{type?: string, score?: number, base?: number}>;
  dtBrandImagery: Array<{driver?: any, type?: string, score?: number, base?: number}>;
  dtTouchpoint: Array<{type?: string, score?: number, base?: number}>;
  dtCBR: Array<{type?: string, score?: number, base?: number}>;

  csvOptions = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalseparator: '.',
    showLabels: true,
    showTitle: true,
    title: 'Delta',
    useBom: true,
    noDownload: false,
    headers: []
  };
  ImageryData1: Array<Imagry> = new Array<Imagry>();
    KDA = {
      v558: 115,
      v559: 8,
      v560: 222,
      v561: 99,
      v562: 84,
      v563: 117,
      v564: 20,
      v565: 0,
      v566: 19,
      v567: 188,
      v568: 251,
      v569: 41,
      v570: 27,
      v571: 39,
      v572: 68,
      v573: 101,
      v574: 110,
      v575: 141,
      v576: 151
    };

  BrandMapping = {
    1: "Delta",
    2: "American Standard",
    3: "Kohler",
    4: "Moen",
    5: "Peerless",
    6: "Pfister",
    23: "Waterpik"
  }
  addLists: Array<any>= new Array<any>();
  ercValues = {
    'Delta': [],
    'American_Standard':[],
    'Kohler':[],
    'Moen':[]
   }
   Ad = {
    'The Perfect Touch':0,
    'Hydrorain One':1,
    'Shield Yourself':2,
    'Quality Product Touchless KF':0,
    'Lysol ActiClean Self-Clean':1,
    'Innovative':2,
    'Mother Nature':0,
    'Konnect-Pouring Made Easy':1,
    'Verdera Voice Mirror':2,
    'The Design':0,
    'Life Designs/ Water is Life':1,
    'Perfect Fit/In Control':2,
    'In2ition Two-In-One':3,
    'Rough Water/In Control':3,
    'Moen Flow':4
 };
 ApiCall:boolean= true;
  constructor(private addDetailsService:UploadAdDetailService, private filterService: FilterService, private filterConfigService: FilterConfigService) {
    this.filterConfigService.initializeOverallSnapshot();
  }

  ngOnInit() {
    this.brandname = 1;
    this.getAds();
    this.updateData(this.brandname);
    this.filterService.optionSelectionCallback$
    .pipe(takeUntil(this.updateDataUnsubscribe))
    .subscribe(value => {
        this.updateData(this.brandname);
        setTimeout(() => {
          this.onDataUpdate.next();
        });
    });
  }
initpara(){
  this.touchpointScore = [];
  this.advertisingscore = null;
  this.Totalscore = null;
  this.unaidedScore = 0;
  this.ImageryData1 = [];
  this.touchcheck = false;
  this.brandimaginarycheck = false;
  this.dtAwareness = [];
  this.dtBrandImagery = [];
  this.dtTouchpoint = [];
  this.comparedScoreUnaided = 0;
  this.comparedScoreAdver = 0;
  this.comparedScoreTotal = 0;
  this.CBRBases = 0;
};

  updateData(brandCode) {
    const snapshot: OverallSnapshot = new OverallSnapshot(brandCode);
    this.initpara();
    this.showLoader = true;
    this.dtAwareness = [];

    this.unaided = snapshot.getUnaided();
    this.unaided.addTableDataReady((output, dataTable) => {
      this.unaidedScore = 0;
      this.unaidedData = [];
      this.hideloader();
      this.unaidedBases = dataTable.bases.get('Base').map(value => Math.round(value))[0];
      this.unaidedData = output;
      const unaidData = Math.round(this.unaidedData[0].Score); 
      if(!isNaN(unaidData)){
        this.unaidedScore = unaidData;
      }
      dataTable.comparisonRows.forEach((value)=>{
        if(value[0]){
          this.comparedScoreUnaided = (this.unaidedScore - value[0]);
        }
      });
      this.dtAwareness.push({type: this.unaided.Name, score: this.unaidedScore});
    });

    this.totalBrand = snapshot.getTotalBrand();
    this.totalBrand.addTableDataReady((output, dataTable) => {
      this.totalBrandData = [];
      this.hideloader();
      this.TotalBases = dataTable.bases.get('Base').map(value => Math.round(value))[0];
      this.totalBrandData = output;
      this.Totalscore = Math.round(this.totalBrandData[0].Score);
      dataTable.comparisonRows.forEach((value)=>{
        if(value[0]){
          this.comparedScoreTotal = (this.Totalscore - value[0]);
        }
      });
      this.dtAwareness.push({type: this.totalBrand.Name, score: this.Totalscore});
    });

    this.advertising = snapshot.getAdvertising();
    this.advertising.addTableDataReady((output, dataTable) => {
      this.advertisingData = [];
      this.hideloader();
      this.advertisingBases = dataTable.bases.get('Base').map(value => Math.round(value))[0];
      this.advertisingData = output;
      this.advertisingscore = Math.round(this.advertisingData[0].Score);
      dataTable.comparisonRows.forEach((value)=>{
        if(value[0]){
          this.comparedScoreAdver = (this.advertisingscore - value[0]);
        }
      });
      this.dtAwareness.push({type: this.advertising.Name, score: this.advertisingscore});
    });


    this.touchpointRecall = snapshot.getTouchpointRecall();
    if(this.brandname <= 4 && this.brandname != 2){
      this.touchpointScore = [];
      this.dtTouchpoint = [];
      this.comparedScoreTouch = [];
      this.touchpointBases = [];
      this.touchpointRecall.addTableDataReady((output , dataTable) =>{
        this.dtTouchpoint = [];
        this.hideloader();
        const bases = dataTable.bases.get('Base').map(value => Math.round(value));
        this.touchpointData = output.slice().sort((a, b) => b.Score - a.Score);
        this.touchpointData.forEach((element,index)=>{
          let indexOfBase = -1;
          output.forEach((x, i) => {
            if(x.SeriesName === element.SeriesName){
                indexOfBase = i;
            }
          });
          this.touchpointBases[index] = bases[indexOfBase];
          this.touchpointScore.push(Math.round(element.Score));
          if(TimePeriod.PreviousPeriod){
            const prevPeriodVal = dataTable.comparisonRows.get(element.SeriesName)[0];
            this.comparedScoreTouch.push(Math.round(element.Score - (prevPeriodVal)));
          }
          this.dtTouchpoint.push({type: element.SeriesName, score: Math.round(element.Score)});
          });
        this.dtTouchpoint.push({type: 'Base', base: bases[0]});
        this.dtTouchpoint.sort((a, b) => b.score - a.score);
      });
    }
    else{
      this.touchpointData = new Array<any>();
      this.touchcheck = true;
      this.hideloader();
    }


    this.brandImagery = snapshot.getBrandImagery(brandCode);
    this.brandImagery.addTableDataReady((output, dataTable) => {
      if(output != null){
        this.hideloader();
        this.dtBrandImagery = [];
        this.ImageryData1 = []
        this.brandImageryBases = dataTable.bases.get('Base').map(value => Math.round(value));
        this.imageryData = output.sort((a, b) => b.Score - a.Score);
        this.imageryData.forEach((v, i) => {
          var myobj = {
            'sereiesname': v.SeriesName,
            'score': Math.round(v.Score),
            'KDA': this.KDA[v.SeriesVariableID]
          };
          this.dtBrandImagery.push({driver: this.KDA[v.SeriesVariableID], type: v.SeriesName, score: Math.round(v.Score)});
          this.ImageryData1.push(myobj);
        });
        this.dtBrandImagery.push({driver: '', type: 'Base', base: this.brandImageryBases[0]});
        this.dtBrandImagery.sort((a, b) => b.driver - a.driver);
        this.ImageryData1.sort((a, b) => b.KDA - a.KDA);
      }
      else{
        this.ImageryData1 = new Array<any>();
        this.brandimaginarycheck = true;
        this.hideloader();
      }
  });

    this.dtCBR = [];
    this.cosnsumerBrandRelation = snapshot.getCustomerBrandRelationship();
    this.cosnsumerBrandRelation.addCalculationLogic((output: CollectionOutput) => {
      const bases = output.Bases.get(this.cosnsumerBrandRelation.Name);
      bases.map(val => {
        if(parseInt(val.CategoryCode, 10) === TimePeriod.CurrentPeriod){
          this.consumerRelationBase = val.Score;
        }
      });
      output.TableOutput.forEach(val =>{

        val.forEach((value, index) => {
          value.Score = Math.round(value.Score);
          this.dtCBR.push({type: value.SeriesName, score: value.Score});
        });
        if (output.Bases.get('Consumer Brand Relationship')[0]) {
          this.dtCBR.push({type: 'Base', base: output.Bases.get('Consumer Brand Relationship')[0].Score});
        }
      });
      return output;
  })
}

  downloadAwarenessCSV(){
     this.dtAwareness.push({type: 'Base', base: this.advertisingBases});
    this.csvOptions.title = this.BrandMapping[this.brandname] +" " +"Awareness Metrics";
    this.csvOptions.headers = ["Chart Name","Percentage"];
    new  AngularCsv(this.dtAwareness, "AwarenessMetrics", this.csvOptions);
  }
  downloadBrandImageryCSV(){
    this.csvOptions.title = this.BrandMapping[this.brandname] +" " +"Brand Imagery";
    this.csvOptions.headers = ["Driver","Series Name","Percentage"];
    new  AngularCsv(this.dtBrandImagery, "BrandImagery", this.csvOptions);
  }
  downloadTouchpointCSV(){
    this.csvOptions.title = this.BrandMapping[this.brandname] +" " +"Touchpoint";
    this.csvOptions.headers = ["Series Name","Percentage"];
    new  AngularCsv(this.dtTouchpoint, "Touchpoint", this.csvOptions);
  }
  downloadCBRCSV(){
    this.csvOptions.title = this.BrandMapping[this.brandname] +" " +"CBR";
    this.csvOptions.headers = ["Series Name","Percentage"];
    new  AngularCsv(this.dtCBR, "CBR", this.csvOptions);
  }
  hideloader(){
    const loader = [this.brandImagery.showLoader, this.advertising.showLoader, this.totalBrand.showLoader, this.unaided.showLoader,this.ApiCall];

      if (loader.reduce((prev, curr) => prev || curr, false) === false) {
        this.showLoader = false;
      }
  };
  toggle($event, id, index) {
    const allIcons = document.getElementsByClassName('icon');
    for (let i = 0; i < allIcons.length; i++) {
      allIcons[i].classList.remove('selected');
    }
    var icon = document.getElementById(id);
    icon.classList.add('selected');
    this.brandname = index;
    this.updateData(index);
    setTimeout(() => {
      this.onDataUpdate.next();
    });
  }

  getContentHeight() {
    return window.innerHeight - 270;
  }
  getBgColor(kda)
  {
    if(kda<=75)
    {
      return "Grey";
    }
    else if(kda >=76 && kda <= 124)
    {
      return "#ffcc00";
    }
    else{return "#0095d9"}

  }

  getAds() {
    this.addDetailsService.getAllAds().subscribe((data) => {
      this.addLists = data;
      let counter = 1;
      const maxCount = this.addLists.length;
      this.addLists.forEach((val,i)=>{
        const brand = val.brand.replace(' ','_');
        this.GetEcr(val.adid,brand,val.adname,counter,maxCount);
        counter++;
      });
    }, error => {
      console.log(error);
      this.showLoader = false;
    });
  }
   GetEcr(id,brand,adName,counter,maxCount){
      this.addDetailsService.getAdEcr(id).subscribe((data)=>{
        let ecr = [];
        data.forEach((element,i) => {
          ecr.push(Number(element.ecr));
        });
        if( this.ercValues[brand][this.Ad[adName]] == undefined){
          this.ercValues[brand][this.Ad[adName]] = ecr; 
        }
        if(maxCount == counter){
          this.ApiCall = false;
          console.log(this.ercValues)
          localStorage.setItem('ECR',JSON.stringify(this.ercValues));
          this.hideloader();
        }

      },error => {
        console.log(error);
        this.showLoader = false;
      });
  }
  ngOnDestroy(): void {
    this.updateDataUnsubscribe.next();
    this.updateDataUnsubscribe.complete();
  }
}
