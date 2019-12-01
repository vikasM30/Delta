import { Component, OnInit } from '@angular/core';
import { Chart } from 'src/app/shell/models/chart';
import { TableOutput } from 'src/app/shell/interfaces/table-output';
import { FilterService } from 'src/app/shell/services/filter.service';
import { ActivatedRoute } from '@angular/router';
import { FilterConfigService } from 'src/app/service/filter-config.service';
import { Subject } from 'rxjs';
import { CategoryConsideration } from 'src/app/model/CategoryConsideration';
import { AssetMappings } from 'src/app/model/asset.mappings';
import { Brands } from 'src/app/model/brands';
import { takeUntil } from 'rxjs/operators';
import { AngularCsv } from 'angular7-csv/dist/Angular-csv';

@Component({
  selector: 'app-consideration',
  templateUrl: './consideration.component.html',
  styleUrls: ['./consideration.component.css']
})
export class ConsiderationComponent implements OnInit {
  SecondChoice:boolean;
  Consider:boolean;
  NotConsider:boolean;
  firstChoice:boolean;
  updateDataUnsubscribe: Subject<any> = new Subject<any>();

  categoryHeaderName: string 
  Category: string;
  showLoader: boolean;

  onDataUpdate: Subject<any> = new Subject();

  considerationChart : Array<Chart> = new Array<Chart>();
  IndexArrayBrandSidebreak: Array<any> = new Array<any>();
  ConsiderationBases : Array<any> = new Array<any>();
  ConsiderationData: Array<TableOutput> = new Array<any>();
  FisrtChoiceArray : Array<number> = new Array<number>();
  SecondChoiceArray : Array<number> = new Array<number>();
  ConsiderArray : Array<number> = new Array<number>();
  NotConsiderArray : Array<number> = new Array<number>();
  Choices: Array<number> = new Array<number>();
  brandList: any[];

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
  dtConsideration: Array<{ considerationtype: string, consderationData: Array<number>}>;

  BrandlistForExcel : Array<String>=new Array<any>();

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
  }

  ngOnInit() {
    this.filterService.optionSelectionCallback$
    .pipe(takeUntil(this.updateDataUnsubscribe))
    .subscribe(value => {
      this.updateData(this.Category);
      setTimeout(() => {
        this.onDataUpdate.next();
      });
    });
  }

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

  updateData(Category) {
    
    this.createTables(Category);
  }

  createTables(Category) {
    this.showLoader = true;
    this.dtConsideration = [];
    this.csvOptions.headers = [];
    this.ConsiderationBases = [];
    this.considerationChart = [];

    const brands = new Brands(this.filterService);
    this.brandList = brands.getBrandsCode().map(val => AssetMappings.logoByBrandCode[val]);
    //console.log(brands.getBrandsCode());
     this.BrandlistForExcel = brands.getBrandsCode();

    const categoryBrandHealth: CategoryConsideration = new CategoryConsideration(Category);
      this.considerationChart = categoryBrandHealth.getConsideration(Category, brands.getBrandsCode());
      this.ConsiderationBases = [];
      this.FisrtChoiceArray = [];
      this.SecondChoiceArray = [];
      this.ConsiderArray = [];
      this.NotConsiderArray = [];
      this.Choices = [];
      this.IndexArrayBrandSidebreak = [];
      for(let i =0; i< this.considerationChart.length; i++){
        if(this.considerationChart[i].SideBreak[0] != undefined){
          this.IndexArrayBrandSidebreak.push(this.considerationChart[i].SideBreak[0]);
        }
      }

      this.considerationChart.forEach((val ,index)=>{      
        val.addTableDataReady((output, dataTable) =>{
          this.hideloader();
          this.ConsiderationData = output;
          let outputSideBreak = output[0].SeriesVariableID;
          let indexofBrandData = this.IndexArrayBrandSidebreak.indexOf(outputSideBreak);
          this.ConsiderationBases[indexofBrandData] = dataTable.bases.get('Base').map(value => Math.round(value))[0];
          this.ConsiderationData.forEach(element => {
            switch (element.SeriesName) {
              case "First choice":
                this.FisrtChoiceArray[indexofBrandData] = Math.round(element.Score);
                break;
              case "Second choice":
                this.SecondChoiceArray[indexofBrandData] = Math.round(element.Score);
                break;
              case "Consider":
                this.ConsiderArray[indexofBrandData] = Math.round(element.Score);
                break;
              case "Not consider":
                this.NotConsiderArray[indexofBrandData] = Math.round(element.Score);
                break;
            }
            if(this.FisrtChoiceArray.length != 0 && this.SecondChoiceArray.length != 0){
              this.Choices[indexofBrandData] = (this.FisrtChoiceArray[indexofBrandData]) + (this.SecondChoiceArray[indexofBrandData]);
            }
          });          
        })
      });
      this.dtConsideration.push({'considerationtype':'1st/2nd Choice(net)','consderationData':this.Choices});
      this.dtConsideration.push({'considerationtype':'First Choice','consderationData':this.FisrtChoiceArray});
      this.dtConsideration.push({'considerationtype':'Second Choice','consderationData':this.SecondChoiceArray});
      this.dtConsideration.push({'considerationtype':'Consider','consderationData':this.ConsiderArray});
      this.dtConsideration.push({'considerationtype':'Not Consider','consderationData':this.NotConsiderArray});
      this.dtConsideration.push({'considerationtype':'Base','consderationData':this.ConsiderationBases})
  }
  hideloader() {
    const loader = [this.considerationChart[0].showLoader];
    if (loader.reduce((prev, curr) => prev || curr, false) === false) {
      this.showLoader = false;
    }
  };
  ngOnDestroy(): void {
    this.updateDataUnsubscribe.next();
    this.updateDataUnsubscribe.complete();
  }
  getContentHeight() {
    return window.innerHeight - 350;
  }
  downloadConsiderationScore(){
    this.csvOptions.title = "Category Brand Consideration ( % )";
    this.csvOptions.headers.push("");
    for(let i =0; i< this.BrandlistForExcel.length; i++){
      this.csvOptions.headers.push(this.BrandCodewiseMapping[+this.BrandlistForExcel[i]]);
    }
    new AngularCsv(this.dtConsideration, "Category Brand Consideration", this.csvOptions);
  }
}
