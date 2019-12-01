import { AdService } from 'src/app/service/ad-service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AD } from './../../model/ad';
import { Chart } from 'src/app/shell/models/chart';
import { FilterService } from 'src/app/shell/services/filter.service';
import { takeUntil } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';
import { FilterConfigService } from 'src/app/service/filter-config.service';
import { adDiagnostics } from 'src/app/model/adDiagnostics';
import { AssetMappings } from 'src/app/model/asset.mappings';
import { DataTable } from 'src/app/shell/models/dataTable';
import { UploadAdDetailService } from 'src/app/service/upload-ad-detail.service';
import { AdDetails } from 'src/app/model/addetails';
import { Brands } from 'src/app/model/brands';
import { ActivatedRoute } from '@angular/router';
import { AngularCsv } from 'angular7-csv/dist/Angular-csv';
import { isString } from 'util';

@Component({
  selector: 'app-ad-diagnostics',
  templateUrl: './ad-diagnostics.component.html',
  styleUrls: ['./ad-diagnostics.component.css']
})
export class AdDiagnosticsComponent implements OnInit, OnDestroy {

  selectedTab = 'Diagnostics';
  viewMode = 'tab1';
  showPopup: boolean;
  showLoader: boolean;
  updateDataUnsubscribe: Subject<any> = new Subject<any>();
  onDataUpdate: Subject<any> = new Subject();
  brandList: any;
  netActionAverage: number;
  totalaverageOfRow: number;

  overalBase: number;

  adDiagnosticChartForAllBrands: Chart;
  adDiagnosticTableDelta: Array<any> = new Array<any>();
  adDiagnosticTableMoen: Array<any> = new Array<any>();
  adDiagnosticTableKohler: Array<any> = new Array<any>();
  adDiagnosticTableAmerican: Array<any> = new Array<any>();
  adDiagnosticAverageChart: Chart;
  adDiagnosticAverageArray: Array<any> = new Array<any>();

  adCallToActionChartAllBrands: Chart;
  adCallToActionTableDelta: Array<any> = new Array<any>();
  adCallToActionTableMoen: Array<any> = new Array<any>();
  adCallToActionTableKohler: Array<any> = new Array<any>();
  adCallToActionTableAmerican: Array<any> = new Array<any>();
  adCallActionRowAverageChart: Chart;
  adCallActionRowAverageArray: Array<any> = new Array<any>();
  adCallActionColAverageChart: Chart;
  adCallActionColAverageArray: Array<any> = new Array<any>();

  addLists: Array<AdDetails> = new Array<AdDetails>();

  adRecallDataChart: Chart;
  recallBases: Array<any>;
  adRecallDataArray: Array<any> = new Array<any>();
  detalAdSelector: Array<any> = new Array<any>();
  aSAdSelector: Array<any> = new Array<any>();
  kohlerAdSelector: Array<any> = new Array<any>();
  moenAdSelector: Array<any> = new Array<any>();
  AllSelectedAds: Array<any> = new Array<any>();

  data = false;
  table: any;
  dtRetailer: Array<{ ques: string, score: Array<number>, base?: number }>;

  isCallAdDiagnostics: boolean = false;
  isCallCallToAction: boolean = false;
  isCallTotalAvgDiagnostic: boolean = false;
  isCallTotalAvgCallAction: boolean = false;
  isCallApi: boolean = false;
  isDiagnosticTotal: boolean = false;
  isCallToActionTotal: boolean = false;

  adDiagnosticTotalAverageChart: Chart;
  adDiagnosticTotalAverage: Array<any> = new Array<any>();
  adCallToActionTotalAverageChart: Chart;
  adCallToActionTotalAverage: Array<any> = new Array<any>();
  subsDelta: Subscription;
  subsAs: Subscription;
  subsKohler: Subscription;
  subsMoen: Subscription;
  idDelta: any;
  idMoen: any;
  idKohler: any;
  idAs: any;
  selectedBrandsCode: Array<number> = [1, 4, 3, 2];
  subsAllBrand: Subscription;
  isDeltaTrue: boolean = false;
  isMoenTrue: boolean = false;
  isKohlerTrue: boolean = false;
  isAmericanTrue: boolean = false;

  adDiagnosticTestMapping: string[] = [
    'I enjoyed the ad',
    'I would like to see the ad again',
    'I am getting tired of seeing this ad',
    'The ad made me more likely to buy the brand',
    'The ad made the brand seem more appealing',
    'The ad contained information that is important to me',
    'The ad told me something new',
    'The information in the ad was believable',
    'I found the ad easy to understand',
    'The ad was original',
    'The ad is different from other ads I have seen for kitchen or bath plumbing products'];

  adCallToActionTextMapping: string[] = [
    'Look for the brand/product in store',
    'Visit the brand/products website',
    'Search for the brand/product online',
    'Click on the ad for more info',
    'Get more information about the brand/product',
    'Talk about the brand/product with friends, family or co-workers',
    'Recommend the brand/product to a friend, family or co-worker',
    'Talk about the brand/product on social media (e.g., Facebook, Twitter)',
    'Write a blog entry'];

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
  brandsVariableIndexing = {
    Delta : ['The Perfect Touch', 'Hydrorain One', 'Shield Yourself', 'In2ition Two-In-One'],
    Moen : ['The Design', 'Life Designs/ Water is Life', 'Perfect Fit/In Control', 'Rough Water/In Control', 'Moen Flow'],
    Kohler : ['Mother Nature', 'Konnect-Pouring Made Easy', 'Verdera Voice Mirror'],
    American_Standard : ['Quality Product Touchless KF', 'Lysol ActiClean Self-Clean', 'Innovative']
 };

  Delta = ['The Perfect Touch', 'Hydrorain One', 'Shield Yourself', 'In2ition Two-In-One'];
  Moen = ['The Design', 'Life Designs/ Water is Life', 'Perfect Fit/In Control', 'Rough Water/In Control', 'Moen Flow'];
  Kohler = ['Mother Nature', 'Konnect-Pouring Made Easy', 'Verdera Voice Mirror'];
  American = ['Quality Product Touchless KF', 'Lysol ActiClean Self-Clean', 'Innovative'];

  deltaArrayLength: number =4;
  moenArrayLength: number =5;
  KohlerArrayLength: number =3;
  americanArrayLength: number =3;

  // tslint:disable-next-line: max-line-length
  listOfEcr:Array<any> = new Array<any>();
  adrecalAndBrandingArray :Array<Chart> = new Array<Chart>();
  ercValues = {
    'Delta': [],
    'American_Standard':[],
    'Kohler':[],
    'Moen':[]
   }
  constructor(private filterService: FilterService, private route: ActivatedRoute,
    private addDetailsService: UploadAdDetailService, private filterConfigService: FilterConfigService,private adselector: AdService) {
      this.subsAllBrand = this.adselector.getAllData().subscribe(data => {
        this.isCallAdDiagnostics = true;
        this.AllSelectedAds = data;   
        if(this.AllSelectedAds.length>0){
          this.deltaArrayLength=0;
          this.moenArrayLength=0;
          this.KohlerArrayLength=0;
          this.americanArrayLength=0;
          this.Delta.forEach((val, i)=>{
            if(this.AllSelectedAds.indexOf(val) > -1){
              this.deltaArrayLength++
            }
          });
          this.Moen.forEach((val, i)=>{
            if(this.AllSelectedAds.indexOf(val) > -1){
              this.moenArrayLength++
            }
          });
          this.Kohler.forEach((val, i)=>{
            if(this.AllSelectedAds.indexOf(val) > -1){
              this.KohlerArrayLength++
            }
          });
          this.American.forEach((val, i)=>{
            if(this.AllSelectedAds.indexOf(val) > -1){
              this.americanArrayLength++
            }
          });
          this.showLoader = true;
          this.isCallAdDiagnostics = true;
          this.isCallCallToAction = true;
          this.isCallTotalAvgDiagnostic = true;
          this.isCallTotalAvgCallAction = true;
          this.isCallApi = true;
          this.isDiagnosticTotal = true;
          this.isCallToActionTotal = true;
          // this.onDataUpdate.complete();
          // const diagnostic: adDiagnostics = new adDiagnostics();
          // this.adDiagnosticChartForAllBrands = diagnostic.getAdDiagnosticsForAllBrands(this.AllSelectedAds);
          // this.adDiagnosticChartForAllBrands.addTableDataReady((output, dataTable)=>{
          //   this.onDataUpdate.next();
          //   this.diagnosticTableData(output, dataTable);
          // });
          
          this.createCharts();
          setTimeout(() => {
            this.onDataUpdate.next();
          });
        } 
      });
  }

  initPara() {
    this.brandList = [];
    this.selectedBrandsCode = [1, 4, 3, 2];
    this.netActionAverage = 0;
    this.adDiagnosticTableDelta = [];
    this.adDiagnosticTableMoen = [];
    this.adDiagnosticTableKohler = [];
    this.adDiagnosticTableAmerican = [];
    this.adCallToActionTableDelta = [];
    this.adCallToActionTableMoen = [];
    this.adCallToActionTableKohler = [];
    this.adCallToActionTableAmerican = [];
    this.adDiagnosticAverageArray = [];
    this.adCallActionColAverageArray = [];
    this.adCallActionRowAverageArray = [];
    this.overalBase = 0;
    this.adDiagnosticTotalAverage = [];
    this.adCallToActionTotalAverage = [];
    this.totalaverageOfRow = 0;
    this.adRecallDataArray = [];
    this.detalAdSelector = [];
    this.aSAdSelector = [];
    this.kohlerAdSelector = [];
    this.moenAdSelector = [];
  }

  ngOnInit() {
    this.showLoader = true;
    this.getAds();
    this.createCharts();
    this.filterService.optionSelectionCallback$
      .pipe(takeUntil(this.updateDataUnsubscribe))
      .subscribe(value => {
        this.createCharts();
        this.bubblechart();
        setTimeout(() => {
          this.onDataUpdate.next();
        });
      });
  }

  /**
   * Call Get ECR Api Through Services
   */
  // GetEcr(id,brand,adName){
  //   //let ecrIdList = [];
  //  // let adIndex = null;
  //   //this.addLists.forEach((value,index)=>{
  //     this.addDetailsService.getAdEcr(id).subscribe((data)=>{
  //       let ecr = [];
  //       data.forEach((element,i) => {
  //         ecr.push(Number(element.ecr));
  //       });
  //       this.ercValues[brand][this.Ad[adName]]= ecr; 
  //     },error => {
  //       console.log(error);
  //       this.showLoader = false;
  //      //this.isDisabledbutton  = true;
  //     });
  //   //})
    
  // }
  bubblechart(){
    this.adrecalAndBrandingArray = [];
    const diagnostic: adDiagnostics = new adDiagnostics();
    let valueECR = JSON.parse(localStorage.getItem('ECR'));
    this.ercValues = valueECR
    const adRecalChart = diagnostic.getAddRecallandBrand('BubbleECRChart',this.ercValues,this.brandsVariableIndexing); 
    //const adBrandingChart  = diagnostic.getAddRecallandBrand('AdBrandingY'); 

    this.adrecalAndBrandingArray.push(adRecalChart);
    //this.adrecalAndBrandingArray.push(adBrandingChart);
    let isCallAdRecalChart:boolean = false;
    
    adRecalChart.addTableDataReady((output,dataTable) => {
      
    });
  }

  createCharts() {
    this.initPara();
    //const brands = new Brands(this.filterService);
    this.selectedBrandsCode.forEach((val, i) => {
      this.brandList.push(AssetMappings.logoByBrandCode[val]);
    });

    //tedBrandCode = brands.getBrandsCode();
    const diagnostic: adDiagnostics = new adDiagnostics();

    this.adDiagnosticTotalAverageChart = diagnostic.getAdDiagnosticsTotalAverage();
    this.adCallToActionTotalAverageChart = diagnostic.getAdCallToActionTotalAverage();
    this.adRecallDataChart = diagnostic.getAdBubbleRecall();

    this.adDiagnosticChartForAllBrands = diagnostic.getAdDiagnosticsForAllBrands(this.AllSelectedAds);
    this.adCallToActionChartAllBrands = diagnostic.getAdCallToActionForAllBrands(this.AllSelectedAds);

    if (this.selectedBrandsCode.length > 0) {

      //ad diagnostic average all Ads 
      this.adDiagnosticTotalAverageChart.addTableDataReady((output, dataTable) => {
        this.adDiagnosticTotalAverage = [];
        dataTable.rows.forEach((valueArray, element) => {
          const indexOfElement = this.adDiagnosticTestMapping.indexOf(element)
          this.adDiagnosticTotalAverage[indexOfElement] = this.calTotalAverageArray(valueArray);
        })
        this.isDiagnosticTotal = true;
        this.isConfigCallComplete();
      });

      // ad call to action Average all ads
      this.adCallToActionTotalAverageChart.addTableDataReady((output, dataTable) => {
        this.adCallToActionTotalAverage = [];
        dataTable.rows.forEach((valueArray, element) => {
          const indexOfElement = this.adCallToActionTextMapping.indexOf(element)
          this.adCallToActionTotalAverage[indexOfElement] = this.calTotalAverageArray(valueArray);
        })
        this.isCallToActionTotal = true;
        this.isConfigCallComplete();
      });

      //*ad diagnostic chart data*//
      this.adDiagnosticChartForAllBrands.addTableDataReady((output, dataTable) => {
        this.adDiagnosticTableDelta = [];
        this.adDiagnosticTableMoen = [];
        this.adDiagnosticTableKohler = [];
        this.adDiagnosticTableAmerican = [];
        this.adDiagnosticAverageArray = [];
        this.detalAdSelector = [];
        this.aSAdSelector = [];
        this.kohlerAdSelector = [];
        this.moenAdSelector = [];

        let arrayOfTableData = [];
        let counter = 0;
        this.overalBase = dataTable.bases.get('Base')[0];
        const tableBase = dataTable.bases.get('Base');
        output.forEach((valueArray, index) => {
          switch (valueArray.SeriesVariableID) {
            // data mapping for Delta Brand

            case 'derotationAd1': {
              counter++
              const indexofText = this.adDiagnosticTestMapping.indexOf(valueArray.SeriesName);
              if (indexofText > -1) {
                arrayOfTableData[indexofText] = Math.round(valueArray.Score);
              }
              if (counter == 11) {
                const textName = valueArray.SeriesTree.split(">");
                const id = this.getIdOfAds(textName[0]);
                this.detalAdSelector.push(textName[0]);
                const tableArray = {
                  'id': id,
                  'serieseName': textName[0],
                  'serieseData': arrayOfTableData,
                  'serieseColor': [],
                  'seriesBase': tableBase,
                  'url': textName[0].replace('/','-')+'_'+id
                }
                this.adDiagnosticTableDelta.push(tableArray);
                this.adDiagnosticAverageArray = this.calculateColAverageOfColumn(this.adDiagnosticAverageArray, arrayOfTableData);
                arrayOfTableData = [];
                counter = 0;
              }
              break;
            }
            case 'derotationAd2': {
              counter++
              const indexofText = this.adDiagnosticTestMapping.indexOf(valueArray.SeriesName);
              if (indexofText > -1) {
                arrayOfTableData[indexofText] = Math.round(valueArray.Score);
              }
              if (counter == 11) {
                const textName = valueArray.SeriesTree.split(">");
                const id = this.getIdOfAds(textName[0]);
                this.detalAdSelector.push(textName[0]);
                const tableArray = {
                  'id': id,
                  'serieseName': textName[0],
                  'serieseData': arrayOfTableData,
                  'serieseColor': [],
                  'seriesBase': tableBase,
                  'url': textName[0].replace('/','-')+'_'+id
                }
                this.adDiagnosticTableDelta.push(tableArray);
                this.adDiagnosticAverageArray = this.calculateColAverageOfColumn(this.adDiagnosticAverageArray, arrayOfTableData);
                arrayOfTableData = [];
                counter = 0;
              }
              break;
            }
            case 'derotationAd3': {
              counter++
              const indexofText = this.adDiagnosticTestMapping.indexOf(valueArray.SeriesName);
              if (indexofText > -1) {
                arrayOfTableData[indexofText] = Math.round(valueArray.Score);
              }
              if (counter == 11) {
                const textName = valueArray.SeriesTree.split(">");
                const id = this.getIdOfAds(textName[0]);
                this.detalAdSelector.push(textName[0]);
                const tableArray = {
                  'id': id,
                  'serieseName': textName[0],
                  'serieseData': arrayOfTableData,
                  'serieseColor': [],
                  'seriesBase': tableBase,
                  'url': textName[0].replace('/','-')+'_'+id
                }
                this.adDiagnosticTableDelta.push(tableArray);
                this.adDiagnosticAverageArray = this.calculateColAverageOfColumn(this.adDiagnosticAverageArray, arrayOfTableData);
                arrayOfTableData = [];
                counter = 0;
              }
              break;
            }
            case 'derotationAd13': {
              counter++
              const indexofText = this.adDiagnosticTestMapping.indexOf(valueArray.SeriesName);
              if (indexofText > -1) {
                arrayOfTableData[indexofText] = Math.round(valueArray.Score);
              }
              if (counter == 11) {
                const textName = valueArray.SeriesTree.split(">");
                const id = this.getIdOfAds(textName[0]);
                this.detalAdSelector.push(textName[0]);

                const tableArray = {
                  'id': id,
                  'serieseName': textName[0],
                  'serieseData': arrayOfTableData,
                  'serieseColor': [],
                  'seriesBase': tableBase,
                  'url': textName[0].replace('/','-')+'_'+id
                }
                this.adDiagnosticTableDelta.push(tableArray);
                this.adDiagnosticAverageArray = this.calculateColAverageOfColumn(this.adDiagnosticAverageArray, arrayOfTableData);
                arrayOfTableData = [];
                counter = 0;
              }
              break;
            }

            // data mapping for Moen Brand

            case 'derotationAd10': {
              counter++
              const indexofText = this.adDiagnosticTestMapping.indexOf(valueArray.SeriesName);
              if (indexofText > -1) {
                arrayOfTableData[indexofText] = Math.round(valueArray.Score);
              }
              if (counter == 11) {
                const textName = valueArray.SeriesTree.split(">");
                const id = this.getIdOfAds(textName[0]);
                this.moenAdSelector.push(textName[0]);
                const tableArray = {
                  'id': id,
                  'serieseName': textName[0],
                  'serieseData': arrayOfTableData,
                  'serieseColor': [],
                  'seriesBase': tableBase,
                  'url': textName[0].replace('/','-')+'_'+id
                }
                this.adDiagnosticTableMoen.push(tableArray);
                this.adDiagnosticAverageArray = this.calculateColAverageOfColumn(this.adDiagnosticAverageArray, arrayOfTableData);
                arrayOfTableData = [];
                counter = 0;
              }
              break;
            }
            case 'derotationAd11': {
              counter++
              const indexofText = this.adDiagnosticTestMapping.indexOf(valueArray.SeriesName);
              if (indexofText > -1) {
                arrayOfTableData[indexofText] = Math.round(valueArray.Score);
              }
              if (counter == 11) {
                const textName = valueArray.SeriesTree.split(">");
                const id = this.getIdOfAds(textName[0]);
                this.moenAdSelector.push(textName[0]);
                const tableArray = {
                  'id': id,
                  'serieseName': textName[0],
                  'serieseData': arrayOfTableData,
                  'serieseColor': [],
                  'seriesBase': tableBase,
                  'url': textName[0].replace('/','-')+'_'+id
                }
                this.adDiagnosticTableMoen.push(tableArray);
                this.adDiagnosticAverageArray = this.calculateColAverageOfColumn(this.adDiagnosticAverageArray, arrayOfTableData);
                arrayOfTableData = [];
                counter = 0;
              }
              break;
            }
            case 'derotationAd12': {
              counter++
              const indexofText = this.adDiagnosticTestMapping.indexOf(valueArray.SeriesName);
              if (indexofText > -1) {
                arrayOfTableData[indexofText] = Math.round(valueArray.Score);
              }
              if (counter == 11) {
                const textName = valueArray.SeriesTree.split(">");
                const id = this.getIdOfAds(textName[0]);
                this.moenAdSelector.push(textName[0]);
                const tableArray = {
                  'id': id,
                  'serieseName': textName[0],
                  'serieseData': arrayOfTableData,
                  'serieseColor': [],
                  'seriesBase': tableBase,
                  'url': textName[0].replace('/','-')+'_'+id
                }
                this.adDiagnosticTableMoen.push(tableArray);
                this.adDiagnosticAverageArray = this.calculateColAverageOfColumn(this.adDiagnosticAverageArray, arrayOfTableData);
                arrayOfTableData = [];
                counter = 0;
              }
              break;
            }

            case 'derotationAd14': {
              counter++
              const indexofText = this.adDiagnosticTestMapping.indexOf(valueArray.SeriesName);
              if (indexofText > -1) {
                arrayOfTableData[indexofText] = Math.round(valueArray.Score);
              }
              if (counter == 11) {
                const textName = valueArray.SeriesTree.split(">");
                const id = this.getIdOfAds(textName[0]);
                this.moenAdSelector.push(textName[0]);
                const tableArray = {
                  'id': id,
                  'serieseName': textName[0],
                  'serieseData': arrayOfTableData,
                  'serieseColor': [],
                  'seriesBase': tableBase,
                  'url': textName[0].replace('/','-')+'_'+id
                }
                this.adDiagnosticTableMoen.push(tableArray);
                this.adDiagnosticAverageArray = this.calculateColAverageOfColumn(this.adDiagnosticAverageArray, arrayOfTableData);
                arrayOfTableData = [];
                counter = 0;
              }
              break;
            }
            case 'derotationAd15': {
              counter++
              const indexofText = this.adDiagnosticTestMapping.indexOf(valueArray.SeriesName);
              if (indexofText > -1) {
                arrayOfTableData[indexofText] = Math.round(valueArray.Score);
              }
              if (counter == 11) {
                const textName = valueArray.SeriesTree.split(">");
                const id = this.getIdOfAds(textName[0]);
                this.moenAdSelector.push(textName[0]);
                const tableArray = {
                  'id': id,
                  'serieseName': textName[0],
                  'serieseData': arrayOfTableData,
                  'serieseColor': [],
                  'seriesBase': tableBase,
                  'url': textName[0].replace('/','-')+'_'+id
                }
                this.adDiagnosticTableMoen.push(tableArray);
                this.adDiagnosticAverageArray = this.calculateColAverageOfColumn(this.adDiagnosticAverageArray, arrayOfTableData);
                arrayOfTableData = [];
                counter = 0;
              }
              break;
            }

            // data mapping for kohler Brand

            case 'derotationAd7': {
              counter++
              const indexofText = this.adDiagnosticTestMapping.indexOf(valueArray.SeriesName);
              if (indexofText > -1) {
                arrayOfTableData[indexofText] = Math.round(valueArray.Score);
              }
              if (counter == 11) {
                const textName = valueArray.SeriesTree.split(">");
                const id = this.getIdOfAds(textName[0]);
                this.kohlerAdSelector.push(textName[0]);
                const tableArray = {
                  'id': id,
                  'serieseName': textName[0],
                  'serieseData': arrayOfTableData,
                  'serieseColor': [],
                  'seriesBase': tableBase,
                  'url': textName[0].replace('/','-')+'_'+id
                }
                this.adDiagnosticTableKohler.push(tableArray);
                this.adDiagnosticAverageArray = this.calculateColAverageOfColumn(this.adDiagnosticAverageArray, arrayOfTableData);
                arrayOfTableData = [];
                counter = 0;
              }
              break;
            }
            case 'derotationAd8': {
              counter++
              const indexofText = this.adDiagnosticTestMapping.indexOf(valueArray.SeriesName);
              if (indexofText > -1) {
                arrayOfTableData[indexofText] = Math.round(valueArray.Score);
              }
              if (counter == 11) {
                const textName = valueArray.SeriesTree.split(">");
                const id = this.getIdOfAds(textName[0]);
                this.kohlerAdSelector.push(textName[0]);
                const tableArray = {
                  'id': id,
                  'serieseName': textName[0],
                  'serieseData': arrayOfTableData,
                  'serieseColor': [],
                  'seriesBase': tableBase,
                  'url': textName[0].replace('/','-')+'_'+id
                }
                this.adDiagnosticTableKohler.push(tableArray);
                this.adDiagnosticAverageArray = this.calculateColAverageOfColumn(this.adDiagnosticAverageArray, arrayOfTableData);
                arrayOfTableData = [];
                counter = 0;
              }
              break;
            }
            case 'derotationAd9': {
              counter++
              const indexofText = this.adDiagnosticTestMapping.indexOf(valueArray.SeriesName);
              if (indexofText > -1) {
                arrayOfTableData[indexofText] = Math.round(valueArray.Score);
              }
              if (counter == 11) {
                const textName = valueArray.SeriesTree.split(">");
                const id = this.getIdOfAds(textName[0]);
                this.kohlerAdSelector.push(textName[0]);
                const tableArray = {
                  'id': id,
                  'serieseName': textName[0],
                  'serieseData': arrayOfTableData,
                  'serieseColor': [],
                  'seriesBase': tableBase,
                  'url': textName[0].replace('/','-')+'_'+id
                }
                this.adDiagnosticTableKohler.push(tableArray);
                this.adDiagnosticAverageArray = this.calculateColAverageOfColumn(this.adDiagnosticAverageArray, arrayOfTableData);
                arrayOfTableData = [];
                counter = 0;
              }
              break;
            }

            // data mapping for American Brand
            case 'derotationAd4': {
              counter++
              const indexofText = this.adDiagnosticTestMapping.indexOf(valueArray.SeriesName);
              if (indexofText > -1) {
                arrayOfTableData[indexofText] = Math.round(valueArray.Score);
              }
              if (counter == 11) {
                const textName = valueArray.SeriesTree.split(">");
                const id = this.getIdOfAds(textName[0]);
                this.aSAdSelector.push(textName[0]);
                const tableArray = {
                  'id': id,
                  'serieseName': textName[0],
                  'serieseData': arrayOfTableData,
                  'serieseColor': [],
                  'seriesBase': tableBase,
                  'url': textName[0].replace('/','-')+'_'+id
                }
                this.adDiagnosticTableAmerican.push(tableArray);
                this.adDiagnosticAverageArray = this.calculateColAverageOfColumn(this.adDiagnosticAverageArray, arrayOfTableData);
                arrayOfTableData = [];
                counter = 0;
              }
              break;
            }
            case 'derotationAd5': {
              counter++
              const indexofText = this.adDiagnosticTestMapping.indexOf(valueArray.SeriesName);
              if (indexofText > -1) {
                arrayOfTableData[indexofText] = Math.round(valueArray.Score);
              }
              if (counter == 11) {
                const textName = valueArray.SeriesTree.split(">");
                const id = this.getIdOfAds(textName[0]);
                this.aSAdSelector.push(textName[0]);
                const tableArray = {
                  'id': id,
                  'serieseName': textName[0],
                  'serieseData': arrayOfTableData,
                  'serieseColor': [],
                  'seriesBase': tableBase,
                  'url': textName[0].replace('/','-')+'_'+id
                }
                this.adDiagnosticTableAmerican.push(tableArray);
                this.adDiagnosticAverageArray = this.calculateColAverageOfColumn(this.adDiagnosticAverageArray, arrayOfTableData);
                arrayOfTableData = [];
                counter = 0;
              }
              break;
            }
            case 'derotationAd6': {
              counter++
              const indexofText = this.adDiagnosticTestMapping.indexOf(valueArray.SeriesName);
              if (indexofText > -1) {
                arrayOfTableData[indexofText] = Math.round(valueArray.Score);
              }
              if (counter == 11) {
                const textName = valueArray.SeriesTree.split(">");
                const id = this.getIdOfAds(textName[0]);
                this.aSAdSelector.push(textName[0]);
                const tableArray = {
                  'id': id,
                  'serieseName': textName[0],
                  'serieseData': arrayOfTableData,
                  'serieseColor': [],
                  'seriesBase': tableBase,
                  'url': textName[0].replace('/','-')+'_'+id
                }
                this.adDiagnosticTableAmerican.push(tableArray);
                this.adDiagnosticAverageArray = this.calculateColAverageOfColumn(this.adDiagnosticAverageArray, arrayOfTableData);
                arrayOfTableData = [];
                counter = 0;
              }
              break;
            }
            // Default statements
            default: {
              break;
            }
          }
        });
        if (this.adDiagnosticAverageArray.length == 11) {
          if(this.AllSelectedAds.length>0){
            this.adDiagnosticAverageArray.forEach((val, valindex) => {
              this.adDiagnosticAverageArray[valindex] = Math.round(this.adDiagnosticAverageArray[valindex] / this.AllSelectedAds.length);
            });
          }
          else{
            this.adDiagnosticAverageArray.forEach((val, valindex) => {
              this.adDiagnosticAverageArray[valindex] = Math.round(this.adDiagnosticAverageArray[valindex] / 15);
            });
          }
        }
        if (this.adDiagnosticTableDelta.length == this.deltaArrayLength) {
          this.adDiagnosticTableDelta = this.colorIndexing(this.adDiagnosticTableDelta, this.adDiagnosticAverageArray);
        }
        if (this.adDiagnosticTableMoen.length == this.moenArrayLength) {
          this.adDiagnosticTableMoen = this.colorIndexing(this.adDiagnosticTableMoen, this.adDiagnosticAverageArray);
        }
        if (this.adDiagnosticTableKohler.length == this.KohlerArrayLength) {
          this.adDiagnosticTableKohler = this.colorIndexing(this.adDiagnosticTableKohler, this.adDiagnosticAverageArray);
        }
        if (this.adDiagnosticTableAmerican.length == this.americanArrayLength) {
          this.adDiagnosticTableAmerican = this.colorIndexing(this.adDiagnosticTableAmerican, this.adDiagnosticAverageArray);
        }
        this.isCallAdDiagnostics = true;
        this.isConfigCallComplete();
      });
      // ad call to action data
      this.adCallToActionChartAllBrands.addTableDataReady((output, dataTable) => {
        this.adCallToActionTableDelta = [];
        this.adCallToActionTableMoen = [];
        this.adCallToActionTableKohler = [];
        this.adCallToActionTableAmerican = [];
        this.adCallActionRowAverageArray = [];
        this.adCallActionColAverageArray = [];

        let arrayOfTableData = [];
        let counter = 0;
        const tableBase = dataTable.bases.get('Base');
        output.forEach((valueArray, index) => {

          switch (valueArray.SeriesVariableID) {
            // data mapping for Delta Brand
            case 'adcalltoactionAd1': {
              counter++
              const indexofText = this.adCallToActionTextMapping.indexOf(valueArray.SeriesName);
              if (indexofText > -1) {
                arrayOfTableData[indexofText] = Math.round(valueArray.Score);
              }
              if (counter == 9) {
                const textName = 'The Perfect Touch';
                const id = this.getIdOfAds(textName);
                const tableArray = {
                  'id': id,
                  'serieseName': textName,
                  'serieseData': arrayOfTableData,
                  'serieseColor': [],
                  'seriesBase': tableBase,
                  'url': textName.replace('/','-')+'_'+id
                }
                this.adCallToActionTableDelta.push(tableArray);
                this.adCallActionColAverageArray = this.calculateColAverageOfColumn(this.adCallActionColAverageArray, arrayOfTableData);
                this.adCallActionRowAverageArray = this.calculateRowAverageOfColumn(this.adCallActionRowAverageArray, arrayOfTableData, 0);
                arrayOfTableData = [];
                counter = 0;
              }
              break;
            }
            case 'adcalltoactionAd2': {
              counter++
              const indexofText = this.adCallToActionTextMapping.indexOf(valueArray.SeriesName);
              if (indexofText > -1) {
                arrayOfTableData[indexofText] = Math.round(valueArray.Score);
              }
              if (counter == 9) {
                const textName = 'Hydrorain One';
                const id = this.getIdOfAds(textName);
                const tableArray = {
                  'id': id,
                  'serieseName': textName,
                  'serieseData': arrayOfTableData,
                  'serieseColor': [],
                  'seriesBase': tableBase,
                  'url': textName.replace('/','-')+'_'+id
                }
                this.adCallToActionTableDelta.push(tableArray);
                this.adCallActionColAverageArray = this.calculateColAverageOfColumn(this.adCallActionColAverageArray, arrayOfTableData);
                this.adCallActionRowAverageArray = this.calculateRowAverageOfColumn(this.adCallActionRowAverageArray, arrayOfTableData, 1);
                arrayOfTableData = [];
                counter = 0;
              }
              break;
            }
            case 'adcalltoactionAd3': {
              counter++
              const indexofText = this.adCallToActionTextMapping.indexOf(valueArray.SeriesName);
              if (indexofText > -1) {
                arrayOfTableData[indexofText] = Math.round(valueArray.Score);
              }
              if (counter == 9) {
                const textName = 'Shield Yourself';
                const id = this.getIdOfAds(textName);
                const tableArray = {
                  'id': id,
                  'serieseName': textName,
                  'serieseData': arrayOfTableData,
                  'serieseColor': [],
                  'seriesBase': tableBase,
                  'url': textName.replace('/','-')+'_'+id
                }
                this.adCallToActionTableDelta.push(tableArray);
                this.adCallActionColAverageArray = this.calculateColAverageOfColumn(this.adCallActionColAverageArray, arrayOfTableData);
                this.adCallActionRowAverageArray = this.calculateRowAverageOfColumn(this.adCallActionRowAverageArray, arrayOfTableData, 2);
                arrayOfTableData = [];
                counter = 0;
              }
              break;
            }
            case 'adcalltoactionAd13': {
              counter++
              const indexofText = this.adCallToActionTextMapping.indexOf(valueArray.SeriesName);
              if (indexofText > -1) {
                arrayOfTableData[indexofText] = Math.round(valueArray.Score);
              }
              if (counter == 9) {
                const textName = 'In2ition Two-In-One';
                const id = this.getIdOfAds(textName);
                const tableArray = {
                  'id': id,
                  'serieseName': textName,
                  'serieseData': arrayOfTableData,
                  'serieseColor': [],
                  'seriesBase': tableBase,
                  'url': textName.replace('/','-')+'_'+id
                }
                this.adCallToActionTableDelta.push(tableArray);
                this.adCallActionColAverageArray = this.calculateColAverageOfColumn(this.adCallActionColAverageArray, arrayOfTableData);
                this.adCallActionRowAverageArray = this.calculateRowAverageOfColumn(this.adCallActionRowAverageArray, arrayOfTableData, 3);
                arrayOfTableData = [];
                counter = 0;
              }
              break;
            }

            // data mapping for Moen Brand

            case 'adcalltoactionAd10': {
              counter++
              const indexofText = this.adCallToActionTextMapping.indexOf(valueArray.SeriesName);
              if (indexofText > -1) {
                arrayOfTableData[indexofText] = Math.round(valueArray.Score);
              }
              if (counter == 9) {
                const textName = 'The Design';
                const id = this.getIdOfAds(textName);
                const tableArray = {
                  'id': id,
                  'serieseName': textName,
                  'serieseData': arrayOfTableData,
                  'serieseColor': [],
                  'seriesBase': tableBase,
                  'url': textName.replace('/','-')+'_'+id
                }
                this.adCallToActionTableMoen.push(tableArray);
                this.adCallActionColAverageArray = this.calculateColAverageOfColumn(this.adCallActionColAverageArray, arrayOfTableData);
                this.adCallActionRowAverageArray = this.calculateRowAverageOfColumn(this.adCallActionRowAverageArray, arrayOfTableData, 4);
                arrayOfTableData = [];
                counter = 0;
              }
              break;
            }
            case 'adcalltoactionAd11': {
              counter++
              const indexofText = this.adCallToActionTextMapping.indexOf(valueArray.SeriesName);
              if (indexofText > -1) {
                arrayOfTableData[indexofText] = Math.round(valueArray.Score);
              }
              if (counter == 9) {
                const textName = 'Life Designs/ Water is Life';
                const id = this.getIdOfAds(textName);
                const tableArray = {
                  'id': id,
                  'serieseName': textName,
                  'serieseData': arrayOfTableData,
                  'serieseColor': [],
                  'seriesBase': tableBase,
                  'url': textName.replace('/','-')+'_'+id
                }
                this.adCallToActionTableMoen.push(tableArray);
                this.adCallActionColAverageArray = this.calculateColAverageOfColumn(this.adCallActionColAverageArray, arrayOfTableData);
                this.adCallActionRowAverageArray = this.calculateRowAverageOfColumn(this.adCallActionRowAverageArray, arrayOfTableData, 5);
                arrayOfTableData = [];
                counter = 0;
              }
              break;
            }
            case 'adcalltoactionAd12': {
              counter++
              const indexofText = this.adCallToActionTextMapping.indexOf(valueArray.SeriesName);
              if (indexofText > -1) {
                arrayOfTableData[indexofText] = Math.round(valueArray.Score);
              }
              if (counter == 9) {
                const textName = 'Perfect Fit/In Control';
                const id = this.getIdOfAds(textName);
                const tableArray = {
                  'id': id,
                  'serieseName': textName,
                  'serieseData': arrayOfTableData,
                  'serieseColor': [],
                  'seriesBase': tableBase,
                  'url': textName.replace('/','-')+'_'+id
                }
                this.adCallToActionTableMoen.push(tableArray);
                this.adCallActionColAverageArray = this.calculateColAverageOfColumn(this.adCallActionColAverageArray, arrayOfTableData);
                this.adCallActionRowAverageArray = this.calculateRowAverageOfColumn(this.adCallActionRowAverageArray, arrayOfTableData, 6);
                arrayOfTableData = [];
                counter = 0;
              }
              break;
            }

            case 'adcalltoactionAd14': {
              counter++
              const indexofText = this.adCallToActionTextMapping.indexOf(valueArray.SeriesName);
              if (indexofText > -1) {
                arrayOfTableData[indexofText] = Math.round(valueArray.Score);
              }
              if (counter == 9) {
                const textName = 'Rough Water/In Control';
                const id = this.getIdOfAds(textName);
                const tableArray = {
                  'id': id,
                  'serieseName': textName,
                  'serieseData': arrayOfTableData,
                  'serieseColor': [],
                  'seriesBase': tableBase,
                  'url': textName.replace('/','-')+'_'+id
                }
                this.adCallToActionTableMoen.push(tableArray);
                this.adCallActionColAverageArray = this.calculateColAverageOfColumn(this.adCallActionColAverageArray, arrayOfTableData);
                this.adCallActionRowAverageArray = this.calculateRowAverageOfColumn(this.adCallActionRowAverageArray, arrayOfTableData, 7);
                arrayOfTableData = [];
                counter = 0;
              }
              break;
            }
            case 'adcalltoactionAd15': {
              counter++
              const indexofText = this.adCallToActionTextMapping.indexOf(valueArray.SeriesName);
              if (indexofText > -1) {
                arrayOfTableData[indexofText] = Math.round(valueArray.Score);
              }
              if (counter == 9) {
                const textName = 'Moen Flow';
                const id = this.getIdOfAds(textName);
                const tableArray = {
                  'id': id,
                  'serieseName': textName,
                  'serieseData': arrayOfTableData,
                  'serieseColor': [],
                  'seriesBase': tableBase,
                  'url': textName.replace('/','-')+'_'+id
                }
                this.adCallToActionTableMoen.push(tableArray);
                this.adCallActionColAverageArray = this.calculateColAverageOfColumn(this.adCallActionColAverageArray, arrayOfTableData);
                this.adCallActionRowAverageArray = this.calculateRowAverageOfColumn(this.adCallActionRowAverageArray, arrayOfTableData, 8);
                arrayOfTableData = [];
                counter = 0;
              }
              break;
            }

            // data mapping for kohler Brand

            case 'adcalltoactionAd7': {
              counter++
              const indexofText = this.adCallToActionTextMapping.indexOf(valueArray.SeriesName);
              if (indexofText > -1) {
                arrayOfTableData[indexofText] = Math.round(valueArray.Score);
              }
              if (counter == 9) {
                const textName = 'Mother Nature';
                const id = this.getIdOfAds(textName);
                const tableArray = {
                  'id': id,
                  'serieseName': textName,
                  'serieseData': arrayOfTableData,
                  'serieseColor': [],
                  'seriesBase': tableBase,
                  'url': textName.replace('/','-')+'_'+id
                }
                this.adCallToActionTableKohler.push(tableArray);
                this.adCallActionColAverageArray = this.calculateColAverageOfColumn(this.adCallActionColAverageArray, arrayOfTableData);
                this.adCallActionRowAverageArray = this.calculateRowAverageOfColumn(this.adCallActionRowAverageArray, arrayOfTableData, 9);
                arrayOfTableData = [];
                counter = 0;
              }
              break;
            }
            case 'adcalltoactionAd8': {
              counter++
              const indexofText = this.adCallToActionTextMapping.indexOf(valueArray.SeriesName);
              if (indexofText > -1) {
                arrayOfTableData[indexofText] = Math.round(valueArray.Score);
              }
              if (counter == 9) {
                const textName = 'Konnect-Pouring Made Easy';
                const id = this.getIdOfAds(textName);
                const tableArray = {
                  'id': id,
                  'serieseName': textName,
                  'serieseData': arrayOfTableData,
                  'serieseColor': [],
                  'seriesBase': tableBase,
                  'url': textName.replace('/','-')+'_'+id
                }
                this.adCallToActionTableKohler.push(tableArray);
                this.adCallActionColAverageArray = this.calculateColAverageOfColumn(this.adCallActionColAverageArray, arrayOfTableData);
                this.adCallActionRowAverageArray = this.calculateRowAverageOfColumn(this.adCallActionRowAverageArray, arrayOfTableData, 10);
                arrayOfTableData = [];
                counter = 0;
              }
              break;
            }
            case 'adcalltoactionAd9': {
              counter++
              const indexofText = this.adCallToActionTextMapping.indexOf(valueArray.SeriesName);
              if (indexofText > -1) {
                arrayOfTableData[indexofText] = Math.round(valueArray.Score);
              }
              if (counter == 9) {
                const textName = 'Verdera Voice Mirror';
                const id = this.getIdOfAds(textName);
                const tableArray = {
                  'id': id,
                  'serieseName': textName,
                  'serieseData': arrayOfTableData,
                  'serieseColor': [],
                  'seriesBase': tableBase,
                  'url': textName.replace('/','-')+'_'+id

                }
                this.adCallToActionTableKohler.push(tableArray);
                this.adCallActionColAverageArray = this.calculateColAverageOfColumn(this.adCallActionColAverageArray, arrayOfTableData);
                this.adCallActionRowAverageArray = this.calculateRowAverageOfColumn(this.adCallActionRowAverageArray, arrayOfTableData, 11);
                arrayOfTableData = [];
                counter = 0;
              }
              break;
            }

            // data mapping for American Brand
            case 'adcalltoactionAd4': {
              counter++
              const indexofText = this.adCallToActionTextMapping.indexOf(valueArray.SeriesName);
              if (indexofText > -1) {
                arrayOfTableData[indexofText] = Math.round(valueArray.Score);
              }
              if (counter == 9) {
                const textName = 'Quality Product Touchless KF';
                const id = this.getIdOfAds(textName);
                const tableArray = {
                  'id': id,
                  'serieseName': textName,
                  'serieseData': arrayOfTableData,
                  'serieseColor': [],
                  'seriesBase': tableBase,
                  'url': textName.replace('/','-')+'_'+id
                }
                this.adCallToActionTableAmerican.push(tableArray);
                this.adCallActionColAverageArray = this.calculateColAverageOfColumn(this.adCallActionColAverageArray, arrayOfTableData);
                this.adCallActionRowAverageArray = this.calculateRowAverageOfColumn(this.adCallActionRowAverageArray, arrayOfTableData, 12);
                arrayOfTableData = [];
                counter = 0;
              }
              break;
            }
            case 'adcalltoactionAd5': {
              counter++
              const indexofText = this.adCallToActionTextMapping.indexOf(valueArray.SeriesName);
              if (indexofText > -1) {
                arrayOfTableData[indexofText] = Math.round(valueArray.Score);
              }
              if (counter == 9) {
                const textName = 'Lysol ActiClean Self-Clean';
                const id = this.getIdOfAds(textName);
                const tableArray = {
                  'id': id,
                  'serieseName': textName,
                  'serieseData': arrayOfTableData,
                  'serieseColor': [],
                  'seriesBase': tableBase,
                  'url': textName.replace('/','-')+'_'+id
                }
                this.adCallToActionTableAmerican.push(tableArray);
                this.adCallActionColAverageArray = this.calculateColAverageOfColumn(this.adCallActionColAverageArray, arrayOfTableData);
                this.adCallActionRowAverageArray = this.calculateRowAverageOfColumn(this.adCallActionRowAverageArray, arrayOfTableData, 13);
                arrayOfTableData = [];
                counter = 0;
              }
              break;
            }
            case 'adcalltoactionAd6': {
              counter++
              const indexofText = this.adCallToActionTextMapping.indexOf(valueArray.SeriesName);
              if (indexofText > -1) {
                arrayOfTableData[indexofText] = Math.round(valueArray.Score);
              }
              if (counter == 9) {
                const textName = 'Innovative';
                const id = this.getIdOfAds(textName);
                const tableArray = {
                  'id': id,
                  'serieseName': textName,
                  'serieseData': arrayOfTableData,
                  'serieseColor': [],
                  'seriesBase': tableBase,
                  'url': textName.replace('/','-')+'_'+id
                }
                this.adCallToActionTableAmerican.push(tableArray);
                this.adCallActionColAverageArray = this.calculateColAverageOfColumn(this.adCallActionColAverageArray, arrayOfTableData);
                this.adCallActionRowAverageArray = this.calculateRowAverageOfColumn(this.adCallActionRowAverageArray, arrayOfTableData, 14);
                arrayOfTableData = [];
                counter = 0;
              }
              break;
            }
            // Default statements
            default: {
              break;
            }
          }
        });
        // column average
        const totalrowlength = this.deltaArrayLength+this.moenArrayLength+this.KohlerArrayLength+this.americanArrayLength;
        if (this.adCallActionColAverageArray.length == 9) {
          let rowNet = 0;
          if(this.AllSelectedAds.length>0){
            this.adCallActionColAverageArray.forEach((val, valindex) => {
              this.adCallActionColAverageArray[valindex] = Math.round(val / this.AllSelectedAds.length);
              rowNet = rowNet + this.adCallActionColAverageArray[valindex];
            });
            this.netActionAverage = Math.round(rowNet / 9);
          }
          else{
            this.adCallActionColAverageArray.forEach((val, valindex) => {
              this.adCallActionColAverageArray[valindex] = Math.round(val / 15);
              rowNet = rowNet + this.adCallActionColAverageArray[valindex];
            });
            this.netActionAverage = Math.round(rowNet / 9);
          }
          this.adCallActionRowAverageArray.forEach((val, valindex) => {        
            this.adCallActionRowAverageArray[valindex] = Math.round(val / 9);
          });
        }

        // if (this.adCallActionRowAverageArray.length == totalrowlength) {          
        //   this.adCallActionRowAverageArray.forEach((val, valindex) => {        
        //     this.adCallActionRowAverageArray[valindex] = Math.round(val / 9);
        //   });
        // }
        if (this.adCallToActionTableDelta.length == this.deltaArrayLength) {
          this.adCallToActionTableDelta = this.colorIndexing(this.adCallToActionTableDelta, this.adCallActionColAverageArray);
        }
        if (this.adCallToActionTableMoen.length == this.moenArrayLength) {
          this.adCallToActionTableMoen = this.colorIndexing(this.adCallToActionTableMoen, this.adCallActionColAverageArray);
        }
        if (this.adCallToActionTableKohler.length == this.KohlerArrayLength) {
          this.adCallToActionTableKohler = this.colorIndexing(this.adCallToActionTableKohler, this.adCallActionColAverageArray);
        }
        if (this.adCallToActionTableAmerican.length == this.americanArrayLength) {
          this.adCallToActionTableAmerican = this.colorIndexing(this.adCallToActionTableAmerican, this.adCallActionColAverageArray);
        }
        // total average
        if (this.adCallToActionTotalAverage.length == 9) {
          this.totalaverageOfRow = 0;
          this.adCallToActionTotalAverage.forEach((val, index) => {
            this.totalaverageOfRow =  this.totalaverageOfRow + val;
          })
          this.totalaverageOfRow = Math.round((this.totalaverageOfRow) / 9);
        }
        this.isCallCallToAction = true;
        this.isConfigCallComplete();
      });
    }
  }

  colorIndexing(adDiagnosticObject, avgArray) {
    let colorCode: String;
    adDiagnosticObject.forEach((val, i) => {
      let num = 0;
      val.serieseData.forEach((value, index) => {
        const colorValue = value;
        const colorIndexValue = Math.round(colorValue / avgArray[index] * 100);
        if (colorIndexValue >= 120) {
          colorCode = '#92D050';
        } else if (colorIndexValue <= 119 && colorIndexValue >= 110) {
          colorCode = '#E5F995';
        } else if (colorIndexValue <= 109 && colorIndexValue >= 91) {
          colorCode = '#fff';
        } else if (colorIndexValue <= 90 && colorIndexValue >= 81) {
          colorCode = '#FFCCCE';
        } else {
          colorCode = '#FF656D';
        }
        adDiagnosticObject[i].serieseColor.push(colorCode);
      });
    });
    return adDiagnosticObject;
  }

  changeTable(tabName, tab) {
    this.selectedTab = tabName;
    this.viewMode = tab;
  }

  downloadExcelFile() {
    const HeaderArrayDiagnostic = [
      'Enjoyment', 'See Again', 'Tired of Seeing', 'More likely to buy', 'More Appealing', 'Important Info', 'New News', 'Believable',
      'Easy to understand', 'Original', 'Different', 'Base'];

    const HeaderArrayAction = [
      'Take Some Action(net)', 'Look in-store', 'Visit Brand Website', 'Search Online', 'Click Ad', 'More Info',
      'Talk with Freinds/Family', 'Recommended to Freinds/Family', 'Talk on Social Media', 'Write Blog Entry', 'Base'];

    if (this.selectedTab === 'Diagnostics') {
      this.downloadDiagnosticsData('Ad Diagnostic', HeaderArrayDiagnostic, this.adDiagnosticAverageArray, this.adDiagnosticTableDelta,
        this.adDiagnosticTableMoen, this.adDiagnosticTableKohler, this.adDiagnosticTableAmerican, this.overalBase);
    }
    else if (this.selectedTab === 'CallToAction') {
      this.downloadCallToActionData('Ad Call To Action', HeaderArrayAction, this.netActionAverage, this.adCallActionColAverageArray, this.adCallActionRowAverageArray,
        this.adCallToActionTableDelta, this.adCallToActionTableMoen, this.adCallToActionTableKohler, this.adCallToActionTableAmerican, this.overalBase);
    }
    // else if(this.selectedTab === 'Recall'){
    //   this.downloadRecallData('Purchase Price', this.purchasePriceArray, this.purchaseAverageArray, this.purchaseMedianArray, this.PurchasePriceBase)
    // } 
  }
  downloadDiagnosticsData(titleOfFile, headerRow, averageRow, delta, moen, kohler, american, base) {
    let csvData = [];
    let avgArr = [];
    avgArr.push(' Total Average');
    averageRow.forEach((val) => {
      avgArr.push(val);
    });
    csvData.push(Object.assign({}, this.csvDetailCreation(avgArr, '', base)));
    delta.forEach((val, i) => {
      let arr = this.getsereideDataDiagnostic(val);
      if (arr.length > 0) {
        csvData.push(Object.assign({}, this.csvDetailCreation(arr, 'Delta', base)));
      }
    });
    moen.forEach((val, i) => {
      let arr = this.getsereideDataDiagnostic(val);
      if (arr.length > 0) {
        csvData.push(Object.assign({}, this.csvDetailCreation(arr, 'Moen', base)));
      }
    });
    kohler.forEach((val, i) => {
      let arr = this.getsereideDataDiagnostic(val);
      if (arr.length > 0) {
        csvData.push(Object.assign({}, this.csvDetailCreation(arr, 'Kohler', base)));
      }
    });
    american.forEach((val, i) => {
      let arr = this.getsereideDataDiagnostic(val);
      if (arr.length > 0) {
        csvData.push(Object.assign({}, this.csvDetailCreation(arr, 'American', base)));
      }
    });
    this.csvOptions.title = titleOfFile;
    this.csvOptions.headers = [" ", " ", headerRow];
    new AngularCsv(csvData, "Ad Diagnostic", this.csvOptions);
  }

  downloadCallToActionData(titleOfFile, headerRow, avgNet, colAverage, rowAverage, delta, moen, kohler, american, base) {
    let csvData = [];
    let avgArr = [];
    let counter = 0;
    avgArr.push(' Total Average');
    avgArr.push(avgNet);
    colAverage.forEach((val) => {
      avgArr.push(val);
    });
    csvData.push(Object.assign({}, this.csvDetailCreation(avgArr, '', base)));
    delta.forEach((val) => {
      let arr = this.getsereideDataCallToAction(val, rowAverage[counter]);
      if (arr.length > 0) {
        csvData.push(Object.assign({}, this.csvDetailCreation(arr, 'Delta', base)));
        counter++
      }
    });
    moen.forEach((val) => {
      let arr = this.getsereideDataCallToAction(val, rowAverage[counter]);
      if (arr.length > 0) {
        csvData.push(Object.assign({}, this.csvDetailCreation(arr, 'Moen', base)));
        counter++
      }
    });
    kohler.forEach((val) => {
      let arr = this.getsereideDataCallToAction(val, rowAverage[counter]);
      if (arr.length > 0) {
        csvData.push(Object.assign({}, this.csvDetailCreation(arr, 'Kohler', base)));
        counter++
      }
    });
    american.forEach((val) => {
      let arr = this.getsereideDataCallToAction(val, rowAverage[counter]);
      if (arr.length > 0) {
        csvData.push(Object.assign({}, this.csvDetailCreation(arr, 'American', base)));
        counter++
      }
    });
    this.csvOptions.title = titleOfFile;
    this.csvOptions.headers = [" ", " ", headerRow];
    new AngularCsv(csvData, "Ad CallToAction", this.csvOptions);
  }
  csvDetailCreation(chartData, sideBreak, base) {
    let csvDetail = [];
    csvDetail.push(sideBreak);
    chartData.forEach((val, index) => {
      csvDetail.push(val);
    });
    csvDetail.push(base);
    return csvDetail;
  }

  getAds() {
    this.addDetailsService.getAllAds().subscribe((data) => {
      this.addLists = data;
      let counter = 1;
      const maxCount = this.addLists.length;
     // this.addLists.forEach((val,i)=>{
        //if(val.brand)
        //const brandType = this.AdMappingWithBrand[val.adname]
        //const brand = val.brand.replace(' ','_');
       // this.GetEcr(val.adid,brand,val.adname);
        //this.listOfEcr.push(ecr);
       // if(maxCount == counter){
          this.isCallApi = true;
          this.isConfigCallComplete();
          //const diagnostic: adDiagnostics = new adDiagnostics()
    //const adRecalChart = diagnostic.getAddRecallandBrand('BubbleECRChart',this.ercValues); 
    //const adBrandingChart  = diagnostic.getAddRecallandBrand('AdBrandingY'); 

    //this.adrecalAndBrandingArray[0] = adRecalChart;
    //this.adrecalAndBrandingArray.push(adBrandingChart);
    //let isCallAdRecalChart:boolean = false;
    
    //adRecalChart.addTableDataReady((output,dataTable) => {
      
   // });
          //this.onDataUpdate.next();
       // }
      //  counter++;
     // });
      
      //this.isCallApi = true;
      //this.isConfigCallComplete();
    }, error => {
      console.log(error);
    });
  }

  calculateColAverageOfColumn(mainAverageArray, toBeAddArray) {
    if (toBeAddArray.length > 0) {
      if (mainAverageArray.length == 0) {
        // mainAverageArray = toBeAddArray;
        toBeAddArray.forEach((val, i) => {
          if (Number.isNaN(val)) {
            mainAverageArray[i] = 0;
          }
          else {
            mainAverageArray[i] = Math.round(val);
          }
        })
      }
      else {
        toBeAddArray.forEach((val, i) => {
          if (Number.isNaN(toBeAddArray[i])) {
            toBeAddArray[i] = 0;
          }
          mainAverageArray[i] = Math.round(mainAverageArray[i] + toBeAddArray[i]);
        })
      }
    }
    return mainAverageArray;
  }

  calculateRowAverageOfColumn(rowAverage, toBeAddArray, index) {
    let num = 0;
    if (toBeAddArray.length > 0) {
      toBeAddArray.forEach((a, b) => {
        if (typeof a == 'number') {
          if (!Number.isNaN(a)) {
            num += a;
          }
        }
        return num;
      });
      rowAverage[index] = num;
    }
    return rowAverage;
  }

  getIdOfAds(adName) {
    let adId;
    var keepGoing = true;
    if (adName != '' || adName != undefined) {
      if (this.addLists.length > 0) {
        this.addLists.forEach((val, index) => {
          if (keepGoing) {
            if (val.adname === adName) {
              adId = val.adid;
              keepGoing = false;
            }
          }
        });
      }
    }
    return adId;
  }

  getsereideDataDiagnostic(arrayOfObject) {
    let arr = [];
    if (arrayOfObject.serieseData.length > 0) {
      arr.push(arrayOfObject.serieseName);
      arrayOfObject.serieseData.forEach((value) => {
        arr.push(value);
      });
    }
    return arr;
  }

  getsereideDataCallToAction(arrayOfObject, rowAvgValue) {
    let arr = [];
    if (arrayOfObject.serieseData.length > 0) {
      arr.push(arrayOfObject.serieseName);
      arr.push(rowAvgValue);
      arrayOfObject.serieseData.forEach((value) => {
        arr.push(value);
      });
    }
    return arr;
  }



  OpenPopup() {
    this.showPopup = !this.showPopup;
  }
  close() {
    this.showPopup = !this.showPopup;
  }

  calTotalAverageArray(addArrayToAverage) {
    let sumOfArray = 0
    if (addArrayToAverage.length > 0) {
      addArrayToAverage.forEach((value, index) => {
        if (!isString(value)) {
          if (!Number.isNaN(value)) {
            sumOfArray += value;
          }
        }
      });
      if (sumOfArray > 0) {
        sumOfArray = Math.round(sumOfArray / 15);
      }
    }
    return sumOfArray
  }

  isConfigCallComplete() {
    if (this.isCallAdDiagnostics && this.isCallCallToAction && this.isCallApi && this.isDiagnosticTotal && this.isCallToActionTotal) {
      this.showLoader = false;
    }
  }
  ngOnDestroy(): void {
    this.updateDataUnsubscribe.next();
    this.updateDataUnsubscribe.complete();
  }
}

