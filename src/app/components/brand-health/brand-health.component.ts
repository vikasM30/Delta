import { Component, OnInit, Output } from '@angular/core';
import { Chart } from '../../shell/models/chart';
import { OverallSnapshot } from '../../model/overallSnapshot';
import { Subject } from 'rxjs';
import { TableOutput } from '../../shell/interfaces/table-output';
import { FilterService } from 'src/app/shell/services/filter.service';
import { OverallBrandHealth } from 'src/app/model/OverallBrandHealth';
import { FilterConfigService } from 'src/app/service/filter-config.service';
import { Brands } from 'src/app/model/brands';
import { AssetMappings } from 'src/app/model/asset.mappings';
import { takeUntil } from 'rxjs/operators';
import { AngularCsv } from 'angular7-csv/dist/Angular-csv';
import { element } from 'protractor';
import { Collection } from 'src/app/shell/models/collection';
import { CollectionOutput } from 'src/app/shell/models/collectionOutput';
import { DataTable } from 'src/app/shell/models/dataTable';
import { PptExportService } from 'src/app/service/ppt-export.service';

@Component({
  selector: 'app-brand-health',
  templateUrl: './brand-health.component.html',
  styleUrls: ['./brand-health.component.css']
})
export class BrandHealthComponent implements OnInit {
  private brandname: Number;
  unaided: Chart;
  unaidedBases: number;
  updateDataUnsubscribe : Subject<any> = new Subject<any>();

  unaidedData: Array<any> = new Array<any>();
  dtunaidedDataCsv: Array<any> = new Array<any>();

  totalBrand: Chart;
  totalBrandData: Array<TableOutput> = new Array<any>();
  TotalBases: number;

  advertising: Chart;
  advertisingData: Array<any> = new Array<any>();
  advertisingBases: number;
  cosnsumerBrandRelationBase: Array<any> = new Array<any>();
  cosnsumerBrandRelation: Array<Chart> = new Array<any>();
  cosnsumerBrandRelation1: Array<Chart> = new Array<any>();

  customerRelationData: Array<TableOutput> = new Array<any>();
  STRONGData:Array<TableOutput> = new Array<any>();
  WeakData:Array<TableOutput> = new Array<any>();
  AtRisk:Array<TableOutput> = new Array<any>();
  unaidedData1: Array<{ code: number, score:number}>;
  totalBrandData1: Array<{ code: number, score:number}>;
  advertisingDataData1: Array<{ code: number, score:number}>;
  STRONGData1: Array<{ code: number, score:number}>;
  WeakData1: Array<{ code: number, score:number}>;
  AtRisk1: Array<{ code: number, score:number}>;
  brandList: Array<string>;
  onDataUpdate: Subject<any> = new Subject();
  showloader: boolean;
  brandCodes = AssetMappings.brandNameAndCodes;
  CBRBases: Number;
  urlfile :any ;
  pptDownloadObject ={
    'Brand': [],
    'Unaided_Brand': [],
    'Totalbrand': [],
    'Advertising': [],
    'CBR':[]
  }

  brandMapping = AssetMappings.brandCodeByName;
  baseArrayUnaidedData: Array<any> = new Array<any>();

  initPara(){
    this.STRONGData=[];
    this.WeakData=[];
    this.AtRisk=[];
    this.cosnsumerBrandRelation = [];
    this.totalBrandData=[];
    this.unaidedData=[];
    this.advertisingData=[];
    this.baseArrayUnaidedData = [];
    this.advertisingDataData1=[];
    this.totalBrandData1=[];
    this.unaidedData1=[];
    this.STRONGData1=[];
    this.WeakData1=[];
    this.AtRisk1=[];
    this.pptDownloadObject ={
      'Brand': [],
      'Unaided_Brand': [],
      'Totalbrand': [],
      'Advertising': [],
      'CBR':[]
    };
  }
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
  brandNameCsv:Array<string>;
  constructor(private filterService: FilterService,private pptexport:  PptExportService, private filterConfigService: FilterConfigService) {
    this.filterConfigService.initializeOverallBrandHealth();
  }

  ngOnInit() {
    this.updateData();
    this.filterService.optionSelectionCallback$
    .pipe(takeUntil(this.updateDataUnsubscribe))
    .subscribe(value => {
      this.updateData();
      setTimeout(() => {
        this.onDataUpdate.next();
      });
    });
  }
 getCode(bramdname: string): number {
    return this.brandMapping[bramdname];
  }
  downloadPPT(){
    this.showloader = true;
    this.pptexport.postPPTForDownload(this.pptDownloadObject).subscribe((data) => {
      console.log(data);
      let blob = new Blob([data], {type: "application/octet-stream"});
      let url = window.URL.createObjectURL(blob);
        let a = document.createElement("a");
        document.body.appendChild(a);
        a.href = url;
        a.download = 'chartppt.zip';
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
      this.showloader = false;
    },error =>{
      console.log(error);
      this.showloader = false;
    });
  }
  updateData() {
    this.initPara();
    const brands = new Brands(this.filterService);
    this.brandList = brands.getBrandsCode().map(val => AssetMappings.logoByBrandCode[val]);
    this.brandNameCsv = brands.getBrandsCode().map((val)=> this.brandCodes[val] );
    const brandSequenceArray = brands.getBrandsCode();

    brandSequenceArray.forEach(element=>{
      this.pptDownloadObject.Brand.push(AssetMappings.brandNameAndCodes[element]);
      this.advertisingDataData1.push({'code':parseInt(element),'score':0});
      this.unaidedData1.push({'code':parseInt(element),'score':0});
      this.totalBrandData1.push({'code':parseInt(element),'score':0});
      this.STRONGData1.push({'code':parseInt(element),'score':0});
      this.WeakData1.push({'code':parseInt(element),'score':0});
      this.AtRisk1.push({'code':parseInt(element),'score':0});
    });

    this.showloader = true;
    const snapshot: OverallBrandHealth = new OverallBrandHealth();

    this.unaided = snapshot.getUnaided(brands.getBrandsCode());
    this.unaided.addTableDataReady((output, dataTable) => {
      this.baseArrayUnaidedData = [];
      this.hideloader();
      this.unaidedBases = dataTable.bases.get('Base').map(value => Math.round(value))[0];
      this.unaidedData =[];
      output.forEach((val,ind)=>{
        if(brandSequenceArray.indexOf(val.SeriesCode) > -1){
          this.baseArrayUnaidedData.push(this.unaidedBases);
          let unaidData = 0;
          if(!isNaN(val.Score) && !(typeof val.Score === 'string')){
            unaidData = val.Score;
          }
          this.unaidedData[brandSequenceArray.indexOf(val.SeriesCode)] =unaidData;
          this.unaidedData1.forEach(element=>{
            if(parseInt(val.SeriesCode)==element.code)
            {
            element.score=val.Score;
            }
          });
        }
      });
      if(this.unaidedData1.length >0){
        this.unaidedData1.forEach((val, index)=>{
          this.pptDownloadObject.Unaided_Brand.push(val.score);
        });
      }
    });

    this.totalBrand = snapshot.getTotalBrand(brands.getBrandsCode());
    this.totalBrand.addTableDataReady((output, dataTable) => {
      this.hideloader();
      this.totalBrandData = [];
      this.TotalBases = dataTable.bases.get('Base').map(value => Math.round(value))[0];
      output.forEach((val,ind)=>{
        if(brandSequenceArray.indexOf(val.SeriesCode) > -1){
         this.totalBrandData[brandSequenceArray.indexOf(val.SeriesCode)] =val;
         this.totalBrandData1.forEach(element=>{
          if(parseInt(val.SeriesCode)==element.code)
          {
          element.score=val.Score;
          }
        })
        }
      });
      if(this.totalBrandData1.length >0){
        this.totalBrandData1.forEach((val, index)=>{
          this.pptDownloadObject.Totalbrand.push(val.score);
        });
      }
    });

    this.advertising = snapshot.getAdvertising(brands.getBrandsCode());
    this.advertising.addTableDataReady((output, dataTable) => {
      this.hideloader();
      this.advertisingData = [];
      this.advertisingBases = dataTable.bases.get('Base').map(value => Math.round(value))[0];
      output.forEach((val,ind)=>{
        if(brandSequenceArray.indexOf(val.SeriesCode) > -1){
          let advData = 0;
          if(!isNaN(val.Score) && !(typeof val.Score === 'string')){
            advData = val.Score;
          }
          this.advertisingData[brandSequenceArray.indexOf(val.SeriesCode)] = advData;

         this.advertisingDataData1.forEach(element=>{
          if(parseInt(val.SeriesCode)==element.code)
          {
          element.score=val.Score;
          }
        })
        }
      });
      if(this.advertisingDataData1.length >0){
        this.advertisingDataData1.forEach((val, index)=>{
          this.pptDownloadObject.Advertising.push(val.score);
        });
      }
    });

    this.cosnsumerBrandRelation = snapshot.getCustomerBrandRelationship(brands.getBrandsCode());
    if(this.cosnsumerBrandRelation.length > 0){
      this.cosnsumerBrandRelation.forEach((val, index) =>{
        if(val){
          val.addCalculationLogic((output: CollectionOutput) =>{
            output.TableOutput.forEach(val =>{
              val.forEach(value => {
                value.Score = Math.round(value.Score);
              });
            });
            if(output.Bases.get('Consumer Brand Relationship')[0]){
              this.cosnsumerBrandRelationBase.push(output.Bases.get('Consumer Brand Relationship')[0].Score);
            }
            return output;
          })
        }
      })
    }

    this.cosnsumerBrandRelation1 = snapshot.getCustomerBrandRelationship1(brands.getBrandsCode());
    var brandStrongArray=[];
    this.cosnsumerBrandRelation1.forEach(element=>{
      element.addTableDataReady((Output,DataTable)=>{
        const arrayData = [];
        this.STRONGData.push(Output[0]);
        this.WeakData.push(Output[1]);
        this.AtRisk.push(Output[2]);
        var brandn = Output[0].SeriesVariableID.replace('Relationship', '');
        if (brandn == 'American') {
           brandn = "American Standard";
         }
        var code =this.getCode(brandn);
        brandStrongArray.push(brandn);
        this.CBRBases = DataTable.bases.get('Base').map(value => Math.round(value))[0];
        this.STRONGData1.forEach(element=>{

        if(code==element.code)
         {
         element.score=Math.round(Output[0].Score);
         arrayData.push(element.score);
         }
      })
        this.WeakData1.forEach(element=>{

          if(code==element.code)
           {
           element.score=Math.round(Output[1].Score);
           arrayData.push(element.score);
           }
         })
        this.AtRisk1.forEach (element =>{
          if(code==element.code)
          {
          element.score=Math.round(Output[2].Score);
          arrayData.push(element.score);
          }
        })
        const indexOfBrandArrayData = this.pptDownloadObject.Brand.indexOf(brandn);
        this.pptDownloadObject.CBR[indexOfBrandArrayData] = arrayData;
      });
    });
  }

  hideloader() {
    const loader = [this.advertising.showLoader, this.totalBrand.showLoader, this.unaided.showLoader];
    if (loader.reduce((prev, curr) => prev || curr, false) === false) {
      this.showloader = false;
    }
  }
  /**
   * To Convert Data into CSV Form
   */
  downloadExcelFile(){
    let csvData = [];
    csvData.push(Object.assign({}, this.csvDetailCreation(this.unaidedData1 ,'Unaided Brand')));
    csvData.push(Object.assign({}, this.csvDetailCreation(this.totalBrandData1 ,'Total Brand (Aided + Unaided)')));
    csvData.push(Object.assign({}, this.csvDetailCreation(this.advertisingDataData1 ,'Advertising')));
    csvData.push(Object.assign({}, this.csvDetailCreation(this.STRONGData1 ,'STRONG (NET)')));
    csvData.push(Object.assign({}, this.csvDetailCreation(this.WeakData1 ,'Weak (NET)')));
    csvData.push(Object.assign({}, this.csvDetailCreation(this.AtRisk1 ,'At Risk (NET)')));
    csvData.push(Object.assign({}, this.csvDetailCreation(this.baseArrayUnaidedData , 'Base')));
    this.csvOptions.title = "Over All Brand Health";
    this.csvOptions.headers = [" ",this.brandNameCsv ];
    new AngularCsv(csvData, "Brand Health", this.csvOptions);
  }
  csvDetailCreation(data ,sideBreak,Base?){
    let csvDetail = [];
    csvDetail.push(sideBreak);
    data.forEach((val, index) => {
      if (sideBreak === 'Base') {
        csvDetail.push(val);
      } else {
        csvDetail.push(val.score);
      }
    });
    // csvDetail.push(Base);
    return csvDetail;
  }
  ngOnDestroy(): void {
    this.updateDataUnsubscribe.next();
    this.updateDataUnsubscribe.complete();
  }
}
