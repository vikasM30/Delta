import { Component, OnInit } from '@angular/core';
import { FilterService } from 'src/app/shell/services/filter.service';
import { ActivatedRoute } from '@angular/router';
import { FilterConfigService } from 'src/app/service/filter-config.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Brands } from 'src/app/model/brands';
import { ConversionRecursion } from 'src/app/model/Conversion';
import { Chart } from 'src/app/shell/models/chart';
import { TableOutput } from 'src/app/shell/interfaces/table-output';
import { AssetMappings } from 'src/app/model/asset.mappings';
import { AngularCsv } from 'angular7-csv/dist/Angular-csv';
import { base } from 'src/app/shell/operators/chart.operators';

@Component({
  selector: 'app-conversion',
  templateUrl: './conversion.component.html',
  styleUrls: ['./conversion.component.css']
})
export class ConversionComponent implements OnInit {
  selectedTab: string;
  viewMode: string;
  Category: string;
  categoryHeading: string;
  optionSelectionUnsubscribe: Subject<any> = new Subject<any>();
  onDataUpdate: Subject<any> = new Subject();
  Retentionchart: Array<Chart> = new Array<any>();
  Conversionchart: Array<Chart> = new Array<any>();
  brandcodes: Array<string>;
  ConversionData: Array<{ code: number, Data: Array<TableOutput>,base:Array<number>}>;
  ConversionData1: Array<{ code: number, Data: Array<TableOutput>,base:Array<number>}>;
  ConversionCodeRepeat: Array<number>;
  RetentionCodeRepeat: Array<number>;
  check:boolean;
  checkRetention:boolean;
  RetentionData: Array<{ code: number, Data: Array<TableOutput>,base:Array<number>}>;
  RetentionData1: Array<{ code: number, Data: Array<TableOutput>,base:Array<number>}>;
  logoByBrandCode =AssetMappings.logoByBrandCode;
  dtRecentPurchase: Array<{ type: string, Data: Array<number> }>;
  dtConversion: Array<{ type: string, Data: Array<number> }>;
  dtRetention: Array<{ type: string, Data: Array<number> }>;
  showLoader:boolean;
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
  constructor(private filterService: FilterService, private route: ActivatedRoute, private filterConfigService: FilterConfigService)
   {
    this.route.params.subscribe(params => {
      this.Category = params.order;
      this.categoryHeading = this.Category;
      if(this.Category == "Faucet"){
        this.filterConfigService.initializeRecentpurchasewithFaucet();
        this.changeTable('Conversion','tab1');
      }
      if(this.Category == "Showerhead"){
        this.filterConfigService.initializeRecentpurchasewithShowerhead();
        this.changeTable('Conversion','tab1');
      }
      if(this.Category == "Toilet"){
        this.filterConfigService.initializeRecentpurchasewithToilet();
        this.changeTable('Conversion','tab1');
      }
      if(this.Category == "TubShowerUnit"){
        this.filterConfigService.initializeRecentpurchasewithTUB();
        this.changeTable('Conversion','tab1');
      }
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
  updateData(Category) {
    this.createTables(Category);
    setTimeout(() => {
      this.onDataUpdate.next();
    });
  }
  getCode(bramdname: string): number {
    return this.brandMapping[bramdname];
  }
  ExcellExport(){
    if(this.selectedTab=='Conversion'){
      this.csvOptions.title = "Conversion";
      new AngularCsv(this.dtConversion, "Conversion", this.csvOptions);
    }
    if(this.selectedTab=='Retention'){
      this.csvOptions.title = "Recent Purchase";
      new AngularCsv(this.dtRetention, "Retention", this.csvOptions);
    }
  }
  createTables(Category) {
    const brands = new Brands(this.filterService);
    this.brandcodes=[];
    this.showLoader=true;
    this.brandcodes = brands.getBrandsCode();
    const RecentPur = new ConversionRecursion(this.Category);
    this.csvOptions.headers=[]
    this.csvOptions.headers.push("");
    var copybrandlist=[]
    this.dtConversion=[];
    this.dtRetention=[];
    this.brandcodes.forEach(element => {
     copybrandlist.push(parseInt(element));
   });
    copybrandlist.forEach(element => {
      this.csvOptions.headers.push(this.BrandCodewiseMapping[element]);
    });
    if(this.selectedTab=='Conversion'){
      this.ConversionData=[];
      this.ConversionData1=[];
      this.ConversionCodeRepeat=[];
      this.check = false;
      this.Conversionchart = RecentPur.getConvertion(this.brandcodes);
      this.Conversionchart.forEach(element => {
      element.addTableDataReady((output, datatable) => {
        if(output.length!=0){
          var ou = [];
          output.forEach(el=>{
            if(el.SeriesName !== "No Answer")
            {
              ou.push(el);
            }
          });
          var base = datatable.bases.get('Base').map(value => Math.round(value));
          var code = this.getCode(ou[0].SeriesName);
          this.ConversionCodeRepeat.push(code);
          var count= this.ConversionCodeRepeat.filter(item => item == code).length;
          if(count==1){
          this.ConversionData.push({'code':code,'Data':ou,'base':base});
          }
          if(this.ConversionData.length== this.brandcodes.length &&this.check==false){
            var dt = [];
            this.brandcodes.forEach(element=>{
              var dt1=[];
              this.ConversionData.forEach(el =>{
                if(parseInt(element)==el.code) {
                this.ConversionData1.push({'code':el.code,'Data':el.Data,'base':el.base});
                el.Data.forEach(el=>{
                  dt1.push(Math.round(el.Score));
                })
                dt.push(dt1);
              }
            })
            })
            dt.forEach((element,index)=>{
          this.dtConversion.push({'type':this.BrandCodewiseMapping[parseInt(this.brandcodes[index])],'Data':element});
        });
            this.dtConversion.push({type: 'Base', Data: base});
            this.showLoader=false;
            this.check=true;
      }
    }
    });
  });
}
    if(this.selectedTab=='Retention'){
      this.RetentionData=[];
      this.RetentionData1=[];
      this.RetentionCodeRepeat= [];
      this.checkRetention= false;
      this.Retentionchart = RecentPur.getRetention(this.brandcodes);
      this.Retentionchart.forEach(element => {
    element.addTableDataReady((output, datatable) => {
      if(output.length!=0){
        var base = datatable.bases.get('Base').map(value => Math.round(value));
        var code = this.getCode(output[0].SeriesName);
        this.RetentionCodeRepeat.push(code);
        var count= this.RetentionCodeRepeat.filter(item => item == code).length;
        if(count==1){
      this.RetentionData.push({'code':code,'Data':output,'base':base});
      }
        if(this.RetentionData.length== this.brandcodes.length && this.checkRetention== false){
        var dt = [];
        this.brandcodes.forEach(element=>{
          var dt1=[];
          this.RetentionData.forEach(el =>{
           if(parseInt(element)==el.code){
             this.RetentionData1.push({'code':el.code,'Data':el.Data,'base':el.base});
             el.Data.forEach(el=>{
              dt1.push(Math.round(el.Score));
            })
             dt.push(dt1);
           }
         })
        })
        dt.forEach((element,index)=>{
          this.dtRetention.push({'type':this.BrandCodewiseMapping[parseInt(this.brandcodes[index])],'Data':element});
        });
        this.dtRetention.push({type: 'Base', Data: base});
        this.showLoader=false;
        this.checkRetention=true;
      }
    }
    });
   });
    }


  }
  changeTable(tabName, tab) {
    this.selectedTab = tabName;
    this.viewMode = tab;
    this.updateData(this.Category);

  }

  getWidth() {
    var width = document.getElementById("mydiv").offsetWidth;
    return width;
  }

  getWidthBlank() {
    var width = document.getElementById("blankdiv").offsetWidth;
    return width;

  }
}
