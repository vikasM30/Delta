import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Chart } from 'src/app/shell/models/chart';
import { DataTable } from 'src/app/shell/models/dataTable';
import { BrandPerception } from './tables/brand-perception';
import { FilterService } from 'src/app/shell/services/filter.service';
import { variable } from '@angular/compiler/src/output/output_ast';
import { BrandPreceptionCsv } from './tables/brand-perception-csv';
import { AngularCsv } from 'angular7-csv/dist/Angular-csv';
import { FilterConfigService } from 'src/app/service/filter-config.service';
import { Brands } from 'src/app/model/brands';
import { AssetMappings } from 'src/app/model/asset.mappings';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-brand-perceptions',
  templateUrl: './brand-perceptions.component.html',
  styleUrls: ['./brand-perceptions.component.css']
})
export class BrandPerceptionsComponent implements OnInit {
  onDataUpdate: Subject<any> = new Subject;
  optionSelectionUnsubscribe: Subject<any> = new Subject<any>();
  brandPerceptions : Chart;
  brandPerceptionsArray : Array<any> = new Array<any>();
  branPerceptionTableData: Array<any> = new Array<any>();
  //baseValueData: number[];
  showLoader: boolean;
  //colorIndex =[{'color':'green','value':120},{'color':'lightgreen','value':119},{'color':'white','value':109},{'color':'pink','value':90},{'color':'red','value':}];
  brands = ["Delta","Moen", "Kohler",  "Peerless","American Standard", "Pfister", "Waterpik"];
  brandList :any; 
  brandCodes = {
      1: 'Delta',
      2: 'American Stand',
      3: 'Kohler',
      4: 'Moen',
      5: 'Peerless',
      6: 'Pfister',
      23: 'Waterpik',
  };
  brandName = {
    'Delta':'',
    'American Standard':'',
    'Kohler':'',
    'Moen':'',
    'Peerless':'',
    'Pfister':'',
    'Waterpik':''
  };
  KDA = {
    'Is a brand I trust':115,
    'Has products that are a good value for the money':8,
    'Is a leader':222,
    'Is innovative':99,
    'Is creative':84,
    'Is a brand you can be proud to own':117,
    'Is a brand that plays it safe':20,
    'Offers products designed to be practical and functional':19,
    'Is a high quality brand':188,
    'Is a brand worth paying more for':251,
    'Is a reliable, dependable brand':41,
    'Meets a true need':27,
    'Is a respectable brand':39,
    'Provides products that are well thought out':68,
    'Makes a bit of a statement about you':101,
    'Tends to have more higher-price products than lower-price products':110,
    'Has products you would see in a high-end home':141,
    'Has designs that are new / up-to-date':151,
  }
  dtBrandPreceptionCsv= new Array<any>();
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
  brandLogos = AssetMappings.logoByBrandCode;
  constructor(private filterService: FilterService, private filterConfigService: FilterConfigService) {
    this.filterConfigService.initializeOverallBrandPereception();
  }

  ngOnInit() {
    this.updateBrandPerception();
    this.filterService.optionSelectionCallback$
    .pipe(takeUntil(this.optionSelectionUnsubscribe))
    .subscribe(value => {
      this.updateBrandPerception();
      setTimeout(() => {
        this.onDataUpdate.next();
      });
    });
  }
  /**
   * To Get Data of all Brand
   * Calculate and Set into table form
   */
  updateBrandPerception() {
    const brands = ['1', '4', '3', '5', '2', '6', '23'];
    this.brandList = brands.map((val)=> this.brandLogos[val]);
    this.brandNameCsv = brands.map((val)=> this.brandCodes[val] );
    const Perception: BrandPerception = new BrandPerception();
    this.showLoader = true;
    this.branPerceptionTableData = [];
    this.brandPerceptionsArray = Perception.getbrandPerceptionData(brands);
    const data = [];
    this.brandPerceptionsArray.forEach((value,index)=>{
      //Call Each Brand Data
      value.addTableDataReady((output, dataTable) => {
      
        data.push(dataTable);
        if(this.brandPerceptionsArray.length == data.length){
            const perceptionData = [];
            const chartLength = data.length-1;
            data.forEach((table,i)=>{
              let baseValueData :any;
              table.bases.forEach((value,index)=>{
                baseValueData = value[0];
              });
              const headerName = table.headers[0];
              const totalLenght = table.rows.size-1;
              let counter = 0;
              table.rows.forEach((val,question) => {
                let avg = 0;
                //let productValues = [];
                //let csvDetail = [];
                    //let brandValues = [];
                const score = val[0] ;
                const valueAndBase = {
                  'Score': Math.round(score),
                  'Base': baseValueData
                }
                if(i == 0){
                  //brandValues[i] = valueAndBase;
                  let perceptionObj = {
                    "productValues":[],
                    'question':question,
                    "avg":0,
                    "colorCode":'',
                    "KDA": this.KDA[question]
                  }
                  perceptionData.push(perceptionObj);
                }
                perceptionData[counter].productValues[this.brandNameCsv.indexOf(headerName)] = valueAndBase;
                if(totalLenght == counter && chartLength == i){
                  this.branPerceptionTableData = this.colorIndexing(perceptionData)
                  this.branPerceptionTableData.sort((a,b) => b.KDA - a.KDA);
                  this.showLoader = false;
                }    
                counter++; 
              });
             
            });
        }
      });
    });
  }

  /**
   * To calclate Color indexing and Average
   * @param perceptionData Table Data of Pereception
   */
  colorIndexing(perceptionData){
    let colorCode:String;
    let avg = 0
    perceptionData.forEach((val,i) => {
        var num = 0
        val.productValues.forEach((a,b) => {
          num += a.Score;
        });
      const avg =  Math.round(num/val.productValues.length);
      perceptionData[i].avg =  avg;
      val.productValues.forEach((a,b) => {
        const colorValue = a.Score;
        const colorIndexValue =  Math.round(colorValue/avg*100);
        if(colorIndexValue >= 120){
          colorCode = '#92D050';
        }else if(colorIndexValue <= 119 && colorIndexValue >= 110){
          colorCode = '#E5F995';
        }else if(colorIndexValue <= 109 && colorIndexValue >= 91){
          colorCode = '#fff';
        }else if(colorIndexValue <= 90 && colorIndexValue >= 81){
          colorCode = '#FFCCCE';
        }else{
          colorCode = '#FF656D';
        }
        perceptionData[i].productValues[b].colorCode = colorCode;
      });
    });
    return perceptionData;
  }

  /**
   * To Convert Data into CSV Form
   */
  downloadExcelFile(){
    let csvData = [];
    this.dtBrandPreceptionCsv = this.branPerceptionTableData;
    this.dtBrandPreceptionCsv.forEach((val,index)=>{
      let csvDetail = []; 
      csvDetail.push(val.KDA);
      csvDetail.push(val.question);
      csvDetail.push(val.avg);
      val.productValues.forEach((a)=>{
        csvDetail.push(a.Score);
      });
      csvData.push(Object.assign({}, csvDetail));
    });
    var cavBaseValues =['','Base',''];
    this.dtBrandPreceptionCsv[0].productValues.forEach((element,index) => {
      cavBaseValues.push(element.Base);
    });
    csvData.push(Object.assign({}, cavBaseValues));
    this.csvOptions.title = "Over All Brand Preception";
    
    this.csvOptions.headers = ["Driver","Series Name","Average Selected Brands",this.brands ];
    new  AngularCsv(csvData, "Brand Preception", this.csvOptions);
  }

  getContentHeight() {
    return window.innerHeight - 280;
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
  ngOnDestroy(): void {
    this.optionSelectionUnsubscribe.next();
    this.optionSelectionUnsubscribe.complete();
  }

  getContentWidth() {
    var width = document.getElementById("brandData").offsetWidth;   
    return width;
  }
 
}
