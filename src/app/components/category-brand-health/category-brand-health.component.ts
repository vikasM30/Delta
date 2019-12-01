import { Component, OnInit } from '@angular/core';
import { Chart } from 'src/app/shell/models/chart';
import {CategoryBrandHealth} from '../../model/CategoryBrandHealth';
import { TableOutput } from 'src/app/shell/interfaces/table-output';
import { Subject } from 'rxjs';
import { FilterService } from 'src/app/shell/services/filter.service';
import { FilterConfigService } from 'src/app/service/filter-config.service';
import { Brands } from 'src/app/model/brands';
import { AssetMappings } from 'src/app/model/asset.mappings';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { AngularCsv } from 'angular7-csv/dist/Angular-csv';

@Component({
  selector: 'app-category-brand-health',
  templateUrl: './category-brand-health.component.html',
  styleUrls: ['./category-brand-health.component.css']
})

export class CategoryBrandHealthComponent implements OnInit {

  categoryHeaderName: string
  Category: string;
  showLoader: boolean;
  updateDataUnsubscribe: Subject<any> = new Subject<any>();

  unaided: Chart;
  unaidedBases: number;
  unadedBrand = ['Delta','American Standard','Kohler','Moen','Peerless','Pfister','Waterpik'];
  unaidedData: Array<TableOutput> = new Array<any>();

  onDataUpdate: Subject<any> = new Subject();
  brandList: Array<string>;
  brandname: any;
  UnaidedScore: number;

  totalBrand: Chart;
  totalBrandData: Array<TableOutput> = new Array<any>();
  totalBrandBase: number;
  totalbrandcheck: Array<boolean> = new Array<boolean>();

  considerationChart : Array<Chart> = new Array<Chart>();
  IndexArrayBrandSidebreak: Array<any> = new Array<any>();
  ConsiderationBases : Array<any> = new Array<any>();
  ConsiderationData: Array<TableOutput> = new Array<any>();
  FisrtChoice : Array<number> = new Array<number>();
  SecondChoice : Array<number> = new Array<number>();
  Consider : Array<number> = new Array<number>();
  NotConsider : Array<number> = new Array<number>();
  Choices: Array<number> = new Array<number>();

  equitychartArray:  Array<Chart> = new Array<any>();
  eqcount:number;
  relcount:number;
  equitydata: any[];
  equitydatawithbrandcode: any[];
  equitydatawithbrandcode1: any[];
  data1 :Array<any> = new Array<any>();
  equityBase :Array<any> = new Array<any>();
  equitydataOutput: Array<TableOutput> = new Array<any>();
  countEquitytimes:number;
  baseeq: number;

  strongChartArray:Array<Chart> = new Array<any>();
  //strongdata: Array<TableOutput> = new Array<TableOutput>();
  IndexArrayOfStrongRelation: Array<any> = new Array<any>();
  StrongBases: Array<any> = new Array<any>();

  eqcheck: boolean;
  strongCode:Array<string>=new Array<any>();
  strongdata: Array<{ Code: number, Score: number,base:number }>;
  strongdata1: Array<{ Code: number, Score: number,base:number }>;
  strongdata2: Array<{ Code: number, Score: number,base:number }>;
  relcheck: boolean;
  basere: number;
  showloader: boolean;
  equityloder:boolean;
  strongloader:boolean;
  brandArray:Array<string> = new Array<string>();
  brandStrongArray:Array<string> = new Array<string>();
  countstrongtimes:number;
  check:boolean;
  brands: any;
  baseArrayUnaidedData: Array<any> = new Array<any>();
  baseArrayTotalBrand: Array<any> = new Array<any>();
  baseArrayChoices: Array<any> = new Array<any>();
  baseArrayEquity: Array<any> = new Array<any>();
  baseArrayStrong: Array<any> = new Array<any>();

  brandMapping = AssetMappings.brandCodeByName;

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
  brandNameCodes = AssetMappings.brandNameAndCodes;
  constructor(private filterService: FilterService,private route: ActivatedRoute, private filterConfigService: FilterConfigService) {
    this.route.params.subscribe(params => {
      this.Category = params.order;
      if(this.Category == "Faucet"){
        this.filterConfigService.initializeCateogryBrandHealthFaucet();
      }
      if(this.Category == "Showerhead"){
        this.filterConfigService.initializeCateogryBrandHealthShowerhead();
      }
      if(this.Category == "Toilet"){
        this.filterConfigService.initializeCateogryBrandHealthToilet();
      }
      if(this.Category == "TubShowerUnit"){
        this.filterConfigService.initializeCateogryBrandHealthTubShowerUnit();
      }
    });
    this.eqcount = 0;
    this.relcount = 0;
  }

  initpara(){
    this.equitydatawithbrandcode = [];
    this.equitydatawithbrandcode1 =[];
    this.brandArray = [];
    this.countEquitytimes = 0;
    this.strongdata = [];
    this.strongdata1 = [];
    this.brandArray = [];
    this.brandStrongArray=[];
    this.check = false;
    this.countstrongtimes=0;
    this.strongChartArray = [];
    this.unaidedData = [];
    this.totalBrandData = [];
    this.considerationChart = [];
    this.equitychartArray = [];
    this.baseArrayUnaidedData = [];
    this.baseArrayTotalBrand = [];
    this.baseArrayChoices = [];
    this.baseArrayEquity = [];
    this.baseArrayStrong = [];
  };

  ngAfterContentInit(): void {
    this.route.params.subscribe(params => {
      this.Category = params.order;
      this.categoryHeaderName = this.Category;
      if(this.Category){
        this.Category = params.order;
        this.updateData(this.Category);
      }else{
        this.Category = params.order;
        this.createTables(this.Category);
      }
    });
  }

  ngOnInit() {
    this.updateData(this.Category);
    this.filterService.optionSelectionCallback$
    .pipe(takeUntil(this.updateDataUnsubscribe))
    .subscribe(value => {
      this.updateData(this.Category);
      setTimeout(() => {
        this.onDataUpdate.next();
      });
    });
  }

  updateData(Category) {
    this.showLoader = true;
    this.createTables(Category);
  }

  getCode(bramdname:string):number {
    return this.brandMapping[bramdname];
  }

  createTables(Category) {
    this.initpara();
    this.brands = new Brands(this.filterService);
    const brandcodes = this.brands.getBrandsCode();
    this.strongCode = [];
    if(brandcodes.length!=0){
      this.strongCode = this.CategaryMapCodes(brandcodes);
    }
    this.brandNameCsv = this.brands.getBrandsCode().map((val)=> this.brandNameCodes[val] );
    this.brandList = this.brands.getBrandsCode().map(val => AssetMappings.logoByBrandCode[val]);
    this.showLoader = true;

    if(brandcodes){
      for(let i =0; i< brandcodes.length; i++){
        this.FisrtChoice[i] = 0;
        this.SecondChoice[i] = 0;
        this.Consider[i] = 0;
        this.NotConsider[i] = 0;
      }
      const categoryBrandHealth: CategoryBrandHealth = new CategoryBrandHealth(Category);

      this.unaided = categoryBrandHealth.getUnaided(Category, brandcodes);
      this.unaided.addTableDataReady((output, dataTable) => {
        this.baseArrayUnaidedData = [];
        this.hideloader();
        this.unaidedBases = dataTable.bases.get('Base').map(value => Math.round(value))[0];
        this.unaidedData = [];
        output.forEach((val,ind)=>{
          if(brandcodes.indexOf(val.SeriesCode) > -1){
           this.unaidedData[brandcodes.indexOf(val.SeriesCode)] =val;
           this.baseArrayUnaidedData.push(this.unaidedBases);
          }
        });
        console.log(this.baseArrayUnaidedData);
      });

      this.totalBrand = categoryBrandHealth.getTotalAided(Category, brandcodes);
      this.totalBrand.addTableDataReady((output, dataTable) => {
        this.baseArrayTotalBrand = [];
        this.hideloader();
        this.totalBrandData = [];
        this.totalBrandBase = dataTable.bases.get('Base').map(value => Math.round(value))[0];
        this.totalBrandData = [];
        output.forEach((val,ind)=>{
          if(brandcodes.indexOf(val.SeriesCode) > -1){
           this.totalBrandData[brandcodes.indexOf(val.SeriesCode)] =val;
           this.baseArrayTotalBrand.push(this.totalBrandBase);
          }
        });
      });

      this.considerationChart = categoryBrandHealth.getConsideration(Category, brandcodes);
      this.ConsiderationBases = [];
      this.FisrtChoice = [];
      this.SecondChoice = [];
      this.Consider = [];
      this.NotConsider = [];
      this.Choices = [];
      this.IndexArrayBrandSidebreak = [];
      for(let i =0; i< this.considerationChart.length; i++){
        this.IndexArrayBrandSidebreak.push(this.considerationChart[i].SideBreak[0]);
        this.FisrtChoice[i] = 0;
        this.SecondChoice[i] = 0;
        this.Consider[i] = 0;
        this.NotConsider[i] = 0;
        this.Choices[i] = 0;
      }
      this.considerationChart.forEach((val ,index)=>{
        val.addTableDataReady((output, dataTable) =>{
          this.baseArrayChoices = [];
          this.ConsiderationData = output;
          let outputSideBreak = output[0].SeriesVariableID;
          let indexofBrandData = this.IndexArrayBrandSidebreak.indexOf(outputSideBreak);
          this.ConsiderationBases.push(dataTable.bases.get('Base').map(value => Math.round(value)));
          for (let index = 0; index < brandcodes.length; index++) {
            this.baseArrayChoices.push(this.ConsiderationBases[0]);
          }
          if (this.ConsiderationData.length !== 0) {
            this.ConsiderationData.forEach(element => {
              switch (element.SeriesName) {
                case "First choice":
                  this.FisrtChoice[indexofBrandData] = Math.round(element.Score);
                  break;
                case "Second choice":
                  this.SecondChoice[indexofBrandData] = Math.round(element.Score);
                  break;
                case "Consider":
                  this.Consider[indexofBrandData] = Math.round(element.Score);
                  break;
                case "Not consider":
                  this.NotConsider[indexofBrandData] = Math.round(element.Score);
                  break;
              }
              if(this.FisrtChoice.length != 0 && this.SecondChoice.length != 0){
                this.Choices[indexofBrandData] = (this.FisrtChoice[indexofBrandData]) + (this.SecondChoice[indexofBrandData]);
              }
            });
            this.hideloader();
          }
        });

      });

      this.equitychartArray = categoryBrandHealth.getEquity(Category, brandcodes);
      this.equitydata = [];
      this.equitydatawithbrandcode = [];
      this.equitydatawithbrandcode1 =[];
      this.equitychartArray.forEach(element=>{
        element.addTableDataReady((output, datatable) => {
          this.equityBase.push(datatable.bases.get('Base').map(value => Math.round(value)));
          if(output.length==3){
            this.equitydataOutput = [];
            this.baseArrayEquity = [];
            this.baseeq = null;
            this.equitydataOutput.push(output[0]);
            this.equitydataOutput.push(output[1]);
            this.baseeq = datatable.bases.get('Base').map(value => Math.round(value))[0];
            for (let index = 0; index < brandcodes.length; index++) {
              this.baseArrayEquity.push(this.baseeq);
            }
            this.data1 = [];
            var code = 0;
            this.equitydataOutput.forEach(eqdt => {
              this.equitydata.push({ 'Brandname': eqdt.SeriesName.split('-')[2].trim(), 'score': eqdt.Score, 'option': eqdt.SeriesName.split('-')[0].trim() })
              code = this.getCode(eqdt.SeriesName.split('-')[2].trim());
              this.brandArray.push(eqdt.SeriesName.split('-')[2].trim());
              this.countEquitytimes= this.brandArray.filter(item => item == eqdt.SeriesName.split('-')[2].trim()).length;
              if(this.countEquitytimes>2){

              }
              else{
                  this.data1.push({ 'Brandname': eqdt.SeriesName.split('-')[2].trim(), 'score': Math.round(eqdt.Score), 'option': eqdt.SeriesName.split('-')[0].trim() });
                }
            })
          }
          else{
            code = 0;
            this.data1 = [];
          }
          if(this.countEquitytimes<=2){
            this.equitydatawithbrandcode.push({ 'Code': code, Data: this.data1,'base':this.baseeq });
            this.equitydatawithbrandcode.sort((a, b) => b.Code - a.Code);
          }

          if ((this.equitydatawithbrandcode.length == brandcodes.length)&&(this.equitydatawithbrandcode1.length<brandcodes.length)) {
            this.showLoader = false;
            this.hideloader();
            var arr = [];
            this.equitydatawithbrandcode.forEach(element => {
              arr.push(element.Code);
            });

            brandcodes.forEach(el => {
              this.eqcheck = false;
              this.equitydatawithbrandcode.forEach(element => {
                this.eqcount++;
                var def = 0;
                if (parseInt(el) == element.Code) {
                  let indexofCodesInBrandMapping = brandcodes.indexOf(String(element.Code));
                  this.eqcheck = true;
                  this.equitydatawithbrandcode1[indexofCodesInBrandMapping] =({'Code': element.Code, 'Data': element.Data,'base':element.base });
                }
                else if (!arr.includes(parseInt(el)) && this.eqcount == this.equitydatawithbrandcode.length && this.eqcheck == false) {
                  element.Data.push({ 'Brandname': "", 'option': "", 'score': 0 });
                  element.Data.push({ 'Brandname': "", 'option': "", 'score': 0 });
                  element.Data[1].score = 0;
                  let indexofNotfoundData = brandcodes.indexOf(String(el));
                  this.equitydatawithbrandcode1[indexofNotfoundData] = { 'Code': parseInt(el), 'Data': element.Data, 'base':0  };
                }
              })
              this.eqcheck = false;
              this.eqcount = 0;
            })
          }
      });
    });

      this.strongChartArray = categoryBrandHealth.getStrongrelation(Category, this.strongCode);
      this.strongChartArray.forEach(element => {
      this.strongdata = [];
      this.strongdata1 = [];
      this.strongdata2 = [];
      this.baseArrayStrong = [];
      this.strongloader = true;
      element.addTableDataReady((output, datatable) => {

        var brandn = output[0].SeriesVariableID.replace('Relationship', '');
        if (brandn == "American") {
          brandn = "American Standard";
        }
        this.basere = null;
        this.brandStrongArray.push(brandn);
        this.countstrongtimes= this.brandStrongArray.filter(item => item == brandn).length;
        if(this.countstrongtimes>1){

        }
        else {

          this.basere = datatable.bases.get('Base').map(value => Math.round(value))[0];

          this.baseArrayStrong.push(this.basere);
        this.strongdata.push({ 'Code': this.getCode(brandn), 'Score': output[0].Score,'base':this.basere })
        this.strongdata.sort((a, b) => b.Code - a.Code);
        }

        if ((this.strongdata.length == this.strongCode.length) && (this.strongdata1.length<this.strongCode.length)) {

          var arr = [];
          this.strongloader = false;
          this.hideloader();
          this.strongdata.forEach(element => {
            arr.push(element.Code);
          })
          this.strongCode.forEach(el => {
            this.strongdata.forEach(element => {

              if (element.Code == undefined) {
                element.Code = 0;
              }
              this.relcount++;
              if (parseInt(el) == element.Code) {
                this.relcheck == true;
                this.StrongBases.push(element.base);
                this.strongdata1.push({ 'Code': element.Code, 'Score': Math.round(element.Score),'base':element.base });

              }
              else if (!arr.includes(parseInt(el)) && this.relcount == this.strongdata.length && this.relcheck == false) {
                this.strongdata1.push({ 'Code': parseInt(el), 'Score': element.Score,'base':0 });
                this.StrongBases.push(0);
              }
            })
            this.relcheck = false;
            this.relcount = 0;
          })
        }
        if((this.strongdata.length == this.strongCode.length) && (this.strongdata1.length==this.strongCode.length)&&this.check==false){
          brandcodes.forEach(element =>{
            var count= this.strongCode.filter(item => item == element).length;
            if(count == 0){
              this.strongdata2.push({ 'Code':parseInt(element) , 'Score': 0,'base':0 });
            }
            else {
              this.strongdata1.forEach(elementstrong=>{
                if(elementstrong.Code ==parseInt(element) ){
                this.strongdata2.push({ 'Code': elementstrong.Code, 'Score':elementstrong.Score,'base':elementstrong.base });
               } })
            }
          })
          this.check = true;
        }
      })
    });
    }
  }

  /**
   * To Convert Data into CSV Form
   */
  downloadExcelFile(){
    let csvData = [];
    csvData.push(Object.assign({}, this.csvDetailCreation(this.unaidedData ,'Unaided Brand')));
    csvData.push(Object.assign({}, this.csvDetailCreation(this.baseArrayUnaidedData , 'Base')));
    csvData.push(Object.assign({}, this.csvDetailCreation(this.totalBrandData ,'Total Brand (Aided + Unaided)')));
    csvData.push(Object.assign({}, this.csvDetailCreation(this.baseArrayTotalBrand , 'Base')));
    csvData.push(Object.assign({}, this.csvDetailCreation(this.Choices ,'1st/2nd Choice(net)')));
    csvData.push(Object.assign({}, this.csvDetailCreation(this.FisrtChoice ,'FisrtChoice')));
    csvData.push(Object.assign({}, this.csvDetailCreation(this.SecondChoice ,'SecondChoice')));
    csvData.push(Object.assign({}, this.csvDetailCreation(this.Consider ,'Consider')));
    csvData.push(Object.assign({}, this.csvDetailCreation(this.NotConsider ,'NotConsider')));
    csvData.push(Object.assign({}, this.csvDetailCreation(this.baseArrayChoices , 'Base')));
    csvData.push(Object.assign({}, this.csvDetailCreation(this.strongdata1 ,'Strong Relation')));
    csvData.push(Object.assign({}, this.csvDetailCreation(this.baseArrayStrong , 'Base')));
    csvData.push(Object.assign({}, this.csvDetailCreation(this.equitydatawithbrandcode1 ,'Equity Active')));
    csvData.push(Object.assign({}, this.csvDetailCreation(this.equitydatawithbrandcode1 ,'Equity Latent')));
    csvData.push(Object.assign({}, this.csvDetailCreation(this.baseArrayEquity , 'Base')));

    this.csvOptions.title = "Category Brand Health (%)";
    this.csvOptions.headers = [" ",this.brandNameCsv ];
    // this.csvOptions.headers.push('Base');
    new AngularCsv(csvData, "Category Brand Health", this.csvOptions);
  }
  csvDetailCreation(data,sideBreak, base?){
    let csvDetail = [];
    csvDetail.push(sideBreak);
    data.forEach((val,index)=>{
      let value = null;
      if(sideBreak == 'Equity Active'){
        value = val.Data[0].score;
      }
      else if(sideBreak == 'Equity Latent'){
        value = val.Data[1].score;
      }else{
        value = val.Score ? val.Score : val
      }
      csvDetail.push(value);
    })
    // csvDetail.push(base);
    return csvDetail;
  }
  ngOnDestroy(): void {
    this.updateDataUnsubscribe.next();
    this.updateDataUnsubscribe.complete();
  }
  hideloader() {
    const loader = [this.unaided.showLoader];
    if (loader.reduce((prev, curr) => prev || curr, false) === false) {
      this.showLoader = false;
    }
  }
  CategaryMapCodes(codes): any{
    if(this.Category == "Faucet"){
      var excludecodes = ['9','10','11','19'];
      var newcodelist =[];
      newcodelist = Array.from(codes);
      excludecodes.forEach(element=>{
        codes.forEach((codeel,index) => {
          if(element == codeel){
            newcodelist  = newcodelist.filter(obj => obj !== codeel);
          }
        });
      })
      return newcodelist;
    }
   else if(this.Category == "Showerhead"){
    var excludecodes = ['10','22','24','32','41'];
      var newcodelist =[];
      newcodelist = Array.from(codes);
      excludecodes.forEach((element,index)=>{
        codes.forEach(codeel => {
          if(element == codeel){
            newcodelist  = newcodelist.filter(obj => obj !== codeel);
          }
        });

      })
      return newcodelist;
    }
   else if(this.Category == "Toilet"){
    var excludecodes = ['12','14','15','16','17','18','20','19'];
      var newcodelist =[];
      newcodelist = Array.from(codes);
      excludecodes.forEach((element,index)=>{
        codes.forEach(codeel => {
          if(element == codeel){
            newcodelist  = newcodelist.filter(obj => obj !== codeel);
          }
        });

      })
      return newcodelist;
    }
   else if(this.Category == "TubShowerUnit"){
    var excludecodes = ['18','25','26','27','30','31'];
      var newcodelist =[];
      newcodelist = Array.from(codes);
      excludecodes.forEach((element,index)=>{
        codes.forEach(codeel => {
          if(element == codeel){
            newcodelist  = newcodelist.filter(obj => obj !== codeel);
          }
        });
      })
    }
    return newcodelist;
  }
}
