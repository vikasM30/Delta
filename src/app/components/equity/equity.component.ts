import { Component, OnInit, Output } from '@angular/core';
import { Chart } from 'src/app/shell/models/chart';
import { Eqity } from 'src/app/model/BrandEquity';
import { ActivatedRoute } from '@angular/router';
import { FilterService } from 'src/app/shell/services/filter.service';
import { Subject } from 'rxjs';
import { Equitydata } from './equitydata'
import { Brands } from 'src/app/model/brands';
import { OnDestroy } from '@angular/core';
import { TableOutput } from 'src/app/shell/interfaces/table-output';
import { element } from 'protractor';
import { AngularCsv } from 'angular7-csv/dist/Angular-csv'
import { FilterConfigService } from 'src/app/service/filter-config.service';
import { DataTable } from 'src/app/shell/models/dataTable';
import { takeUntil } from 'rxjs/operators';
import { AssetMappings } from 'src/app/model/asset.mappings';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-equity',
  templateUrl: './equity.component.html',
  styleUrls: ['./equity.component.css']
})
export class EquityComponent implements OnInit {
  Category: string;
  categoryHeading: string;
  onDataUpdate: Subject<any> = new Subject();
  optionSelectionUnsubscribe: Subject<any> = new Subject<any>();
  equity: Array<Chart> = new Array<any>();
  strong: Array<Chart> = new Array<any>();
  brandcodes: string[];
  // equitydata: Array<TableOutput> = new Array<any>();
  equitydata: Array<Equitydata> = new Array<any>();
  equitydatawithbrandcode: Array<{ Code: number, Data: Array<Equitydata>,base:number }>;
  equitydatawithbrandcode1: Array<{ Code: number, Data: Array<Equitydata>,base:number }>;
  strongdata: Array<{ Code: number, score: number,base:number }>;
  strongdata1: Array<{ Code: number, score: number,base:number }>;
  strongdata2: Array<{ Code: number, score: number,base:number }>;
  eqcheck: boolean;
  eqcount: number;
  relcount: number;
  relcheck: boolean;
  baseeq: number;
  basere: number;
  showloader: boolean;
  equityloder:boolean;
  strongloader:boolean;
  brandArray:Array<string> = new Array<string>();
  brandStrongArray:Array<string> = new Array<string>();
  countEquitytimes:number;
  countstrongtimes:number;
  equitydataOutput: Array<TableOutput> = new Array<any>();
  strongCode:Array<string>=new Array<any>();
  check:boolean;
  Brandlist:Array<String>=new Array<any>();
  //dtEquity:Array<string>=new Array<any>();
  dtEquity: Array<{ type: string, Data: Array<number>}>;
  checkexcelequity: boolean;
  checkexcelstrong:boolean;
  brandMapping = {
    'Delta': 1,
    'American Standard': 2,
    'Kohler': 3,
    'Moen': 4,
    'Peerless': 5,
    'Pfister': 6,
    'Aqua Source': 7,
    'Glacier Bay': 8,
    'Brizo': 9,
    'Grohe': 10,
    'Hansgrohe': 11,
    'Briggs': 12,
    'Crane': 13,
    'Eljer': 14,
    'Gerber': 15,
    'Jacuzzi': 16,
    'Mansfield': 17,
    'Sterling': 18,
    'Toto': 19,
    'Penguin': 20,
    'Danze': 21,
    'Speakman': 22,
    'Waterpik': 23,
    'Symmons': 24,
    'Aquatic': 25,
    'Maax': 26,
    'ASB': 27,
    'Style Selections': 28,
    'Allen & Roth': 29,
    'Swan': 30,
    'Aqua Glass': 31,
    'Proflo': 32,
    'Duravit': 33,
    'Mirabelle': 34,
    'Villeroy & Boch': 35,
    'Decolav': 36,
    'Rohl': 37,
    'Victoria & Albert': 38,
    'Ronbow': 39,
    'Vortens': 40,
    'Oxygenics': 41,
    'MTI': 42,
  }
  BrandCodewiseMapping = {
    1: 'Delta',
    2: 'American',
    3: 'Kohler',
    4: 'Moen',
    5: 'Peerless',
    6: 'Pfister',
    7: 'Aqua Source',
    8: 'Glacier Bay',
    9: 'Brizo',
    10: 'Grohe',
    11: 'Hansgrohe',
    12: 'Briggs',
    13: 'Crane',
    14: 'Eljer',
    15: 'Gerber',
    16: 'Jacuzzi',
    17: 'Mansfield',
    18: 'Sterling',
    19: 'Toto',
    20: 'Penguin',
    21: 'Danze',
    22: 'Speakman',
    23: 'Waterpik',
    24: 'Symmons',
    25: 'Aquatic',
    26: 'Maax',
    27: 'ASB',
    28: 'StyleSelections',
    29: 'AllenRoth',
    30: 'Swan',
    31: 'AquaGlass',
    32: 'Proflo',
    33: 'Duravit',
    34: 'Mirabelle',
    35: 'VilleroyBoch',
    36: 'Decolav',
    37: 'Rohl',
    38: 'VictoriaAlbert',
    39: 'Ronbow',
    40: 'Vortens',
    41: 'Oxygenics',
    42: 'MTI'
  }
  count = 0;
  logoByBrandCode =AssetMappings.logoByBrandCode;
   
  EquityOptinMapping = {
    Faucet: { Delta: { option: [1, 2] }, Moen: { option: [5, 6] }, Kohler: { option: [3, 4] }, Peerless: { option: [9, 10] }, American: { option: [7, 8] }, Pfister: { option: [11, 12] }, Waterpik: { option: [] } },
    Showerhead: { Delta: { option: [33, 34] }, Moen: { option: [39, 40] }, Kohler: { option: [37, 38] }, Peerless: { option: [45, 46] }, American: { option: [] }, Pfister: { option: [47, 48] }, Waterpik: { option: [43, 44] } },
    Toilet: { Delta: { option: [17, 18] }, Moen: { option: [21, 22] }, Kohler: { option: [19, 20] }, Peerless: { option: [25, 26] }, American: { option: [23, 24] }, Pfister: { option: [27, 28] }, Waterpik: { option: [] } },
    TubShowerUnit: {
      Delta: { option: [] }, Moen: { option: [] }, Kohler: { option: [] }, Peerless: { option: [] }, American: { option: [] }, Pfister: { option: [] }, Waterpik: { option: [] }
    }
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
  constructor(private filterService: FilterService, private route: ActivatedRoute, private filterConfigService: FilterConfigService) {
    this.route.params.subscribe(params => {
      this.Category = params.order;
      this.categoryHeading = this.Category;
      if(this.Category == "Faucet"){
        this.filterConfigService.initializeEquitywithFaucet();
      }
      if(this.Category == "Showerhead"){
        this.filterConfigService.initializeEquitywithShowerhead();
      } 
      if(this.Category == "Toilet"){
        this.filterConfigService.initializeEquitywithToilet();
      } 
      if(this.Category == "TubShowerUnit"){
        this.filterConfigService.initializeEquitywithTUB();
      }     
    }); 

    this.eqcount = 0;
    this.relcount = 0;
  }
  ngOnDestroy(): void {
    this.optionSelectionUnsubscribe.next();
    this.optionSelectionUnsubscribe.complete();
  }
  ngOnInit() {
   
    this.filterService.optionSelectionCallback$.pipe(takeUntil(this.optionSelectionUnsubscribe))
    .subscribe(value => {
        this.updateData(this.Category);
    });
  }
  ngAfterContentInit(): void {
    this.route.params.subscribe(params => {
      this.Category = params.order;
      this.categoryHeading = this.Category;
      if (this.Category) {
        this.Category = params.order;
        this.updateData(this.Category);
      } else {
        this.Category = params.order;
        this.createTables(this.Category);
      }
    });
  }
  initScores() {

  }
  updateData(Category) {
    this.createTables(Category);
    setTimeout(() => {
      this.onDataUpdate.next();
    });
  }
  getCode(bramdname: string): number {
    return this.brandMapping[bramdname];
  }
  downloadEquityCSV() {
    //this.dtHolidays : JSONDATA , HolidayList : CSV file Name, this.csvOptions : file options
   
      this.csvOptions.title = "Brand Equity";
      
      this.csvOptions.headers.push("");
    this.Brandlist.forEach(element =>{
      this.csvOptions.headers.push(element);
    });
    
    new AngularCsv(this.dtEquity, "Brand Equity", this.csvOptions);
  }
  init(){
    this.equitydata = [];
    this.equitydatawithbrandcode = [];
    this.equitydatawithbrandcode1 = [];
    this.strongdata = [];
    this.strongdata1 = [];
    this.brandArray = [];
    this.brandStrongArray=[];
    this.countEquitytimes = 0;
   this.check = false;
    this.countstrongtimes=0;
    this.Brandlist = [];
    this.checkexcelequity = false;
    this.checkexcelstrong = false;
  }
  hideloader(){
if(this.equityloder==false&&this.strongloader==false){
  this.showloader = false;
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
  createTables(Category) {
     this.showloader = true;
    const brands = new Brands(this.filterService);
    this.brandcodes = [];
    this.brandcodes = brands.getBrandsCode();
    this.strongCode = [];
    this.dtEquity = [];
    if(this.brandcodes.length!=0){
   this.strongCode = this.CategaryMapCodes(this.brandcodes);
    }
    this.csvOptions.headers = [];
    this.csvOptions.headers.push("");
    this.brandcodes.forEach(element => {
      this.Brandlist.push(this.BrandCodewiseMapping[element]);   
      this.csvOptions.headers.push(this.BrandCodewiseMapping[element]);
       });
       
    this.init();
    const equity: Eqity = new Eqity(Category);
    this.equity = equity.getEquity(this.brandcodes);
    this.strong = equity.getStrongrelation(this.strongCode);
    this.equitydata = [];
    this.equitydatawithbrandcode = [];
    this.equitydatawithbrandcode1 = [];
    this.equityloder = true;

    this.equity.forEach(element => {
      element.addTableDataReady((output, datatable) => {
        if (output.length == 3) {
          //var outresult = output;
          this.equitydataOutput = [];
          this.baseeq = null;
          this.equitydataOutput.push(output[0]);
          this.equitydataOutput.push(output[1]);
           this.baseeq = datatable.bases.get('Base').map(value => Math.round(value))[0];
          var data1 = [];
          var code;
          this.equitydataOutput.forEach(eqdt => {
            this.equitydata.push({ 'Brandname': eqdt.SeriesName.split('-')[2].trim(), 'score': eqdt.Score, 'option': eqdt.SeriesName.split('-')[0].trim() })
            code = this.getCode(eqdt.SeriesName.split('-')[2].trim());
            this.brandArray.push(eqdt.SeriesName.split('-')[2].trim());
          this.countEquitytimes= this.brandArray.filter(item => item == eqdt.SeriesName.split('-')[2].trim()).length;this.brandArray.filter(item => item == eqdt.SeriesName.split('-')[2].trim()).length;
         if(this.countEquitytimes>2){

         }
         else{
            data1.push({ 'Brandname': eqdt.SeriesName.split('-')[2].trim(), 'score': Math.round(eqdt.Score), 'option': eqdt.SeriesName.split('-')[0].trim() });
           
          }
          })
        }
        else {
          var data1 = [];
          var code;
          code = 0;
          
        }
        if(this.countEquitytimes<=2){
          this.equitydatawithbrandcode.push({ 'Code': code, Data: data1,'base':this.baseeq });
          this.equitydatawithbrandcode.sort((a, b) => b.Code - a.Code);
        }

        if ((this.equitydatawithbrandcode.length == this.brandcodes.length)&&(this.equitydatawithbrandcode1.length<this.brandcodes.length)) {
          this.equityloder = false;
          this.hideloader();
          var arr = [];
          this.equitydatawithbrandcode.forEach(element => {
            arr.push(element.Code);
          }

          )

          this.brandcodes.forEach(el => {
            this.equitydatawithbrandcode.forEach(element => {
              this.eqcount++;
              var def = 0;
              this.eqcheck = false;
              if (parseInt(el) == element.Code) {
                this.eqcheck = true;
                this.equitydatawithbrandcode1.push({ 'Code': element.Code, 'Data': element.Data,'base':element.base });

              }
              else if (!arr.includes(parseInt(el)) && this.eqcount == this.equitydatawithbrandcode.length && this.eqcheck == false) {
                element.Data.push({ 'Brandname': "", 'option': "", 'score': 0 });
                element.Data.push({ 'Brandname': "", 'option': "", 'score': 0 });
                element.Data[1].score = 0;
                this.equitydatawithbrandcode1.push({ 'Code': parseInt(el), 'Data': element.Data,'base':0 });
              }
            })
            
            this.eqcheck = false;
            this.eqcount = 0;
          })
        }
        if(this.equitydatawithbrandcode1.length == this.brandcodes.length&&   this.checkexcelequity==false){
          let dt1 = [];
          let dt2 = [];
          this.equitydatawithbrandcode1.forEach(element =>{
            dt1.push(element.Data[0].score);
            dt2.push(element.Data[1].score);
          })
         
          this.dtEquity.push({'type':'Active','Data':dt1})
          this.dtEquity.push({'type':'Latent','Data':dt2})
          this.checkexcelequity= true;
        }
      })

    });
    this.strong.forEach(element => {
      this.strongdata = [];
      this.strongdata1 = [];
      this.strongdata2 = [];
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
        else{
        this.basere = datatable.bases.get('Base').map(value => Math.round(value))[0];
        this.strongdata.push({ 'Code': this.getCode(brandn), 'score': output[0].Score,'base':this.basere })
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
                this.strongdata1.push({ 'Code': element.Code, 'score': Math.round(element.score),'base':element.base });

              }
              else if (!arr.includes(parseInt(el)) && this.relcount == this.strongdata.length && this.relcheck == false) {
                this.strongdata1.push({ 'Code': parseInt(el), 'score': element.score,'base':0 });
              }
            })
            this.relcheck = false;
            this.relcount = 0;
          })
        }
        if((this.strongdata.length == this.strongCode.length) && (this.strongdata1.length==this.strongCode.length)&&this.check==false){
          this.brandcodes.forEach(element =>{
            var count= this.strongCode.filter(item => item == element).length;
            if(count == 0){
              this.strongdata2.push({ 'Code':parseInt(element) , 'score': 0,'base':0 });
            }
            else {
              this.strongdata1.forEach(elementstrong=>{
                if(elementstrong.Code ==parseInt(element) ){
                this.strongdata2.push({ 'Code': elementstrong.Code, 'score':elementstrong.score,'base':elementstrong.base });
               
               } })
            }
          }
        
          )
          this.check = true;
          if(this.strongdata2.length == this.brandcodes.length && this.checkexcelstrong ==false){
            let dt1 = [];
            this.strongdata2.forEach(element =>{
              dt1.push(element.score);
            })
            this.dtEquity.push({'type':'strongrelation','Data':dt1})
            this.checkexcelstrong = true;
          }
        }
      })

    })
  }

  getContentHeight() {
    return window.innerHeight - 350;
  }
}

