import { Component, OnInit } from '@angular/core';
import { FilterService } from 'src/app/shell/services/filter.service';
import { FilterConfigService } from 'src/app/service/filter-config.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { CategoryDisposition } from 'src/app/model/categoryDisposition';
import { ActivatedRoute } from '@angular/router';
import { Brands } from 'src/app/model/brands';
import { Chart } from 'src/app/shell/models/chart';
import { AssetMappings } from 'src/app/model/asset.mappings';
import { element } from 'protractor';
import { AngularCsv } from 'angular7-csv/dist/Angular-csv';
import { truncate } from 'fs';

@Component({
  selector: 'app-disposition',
  templateUrl: './disposition.component.html',
  styleUrls: ['./disposition.component.css']
})
export class DispositionComponent implements OnInit {
  selectedTab = 'Influenced';
  viewMode = 'tab1';
  ShowData: string = 'Total';
  pageVisited: boolean = false;
  //brandcodes: any;
  showLoader: boolean;
  onDataUpdate: Subject<any> = new Subject();
  updateDataUnsubscribe: Subject<any> = new Subject<any>();
  brandList: Array<string>;
  Category: string;
  brandNameCsv:Array<string>;
  brandCodesCsv = AssetMappings.brandNameAndCodes;

  InfluencedDataChart: Chart;
  InfluencedBase: Array<any> = new Array<any>();
  selfInfluence: Array<number> = new Array<number>();
  SpouseInfluence: Array<number> = new Array<number>();
  contractorInfluence: Array<number> = new Array<number>();
  familyInfluence: Array<number> = new Array<number>();

  installedDataChart: Chart;
  InstalledBase: Array<any> = new Array<any>();
  selfInstall: Array<number> = new Array<number>();
  SpouseInstall: Array<number> = new Array<number>();
  contractorInstall: Array<number> = new Array<number>();
  familyInstall: Array<number> = new Array<number>();

  purchasePriceChart: Chart;
  PurchasePriceBase: Array<any> = new Array<any>();
  purchasePriceArray: Array<any> = new Array<any>();
  purchaseAverageChart: Chart;
  purchaseMedianChart: Chart;
  purchaseAverageArray: Array<number> = new Array<number>();
  purchaseMedianArray: Array<any> = new Array<any>();
  purchaseMedianArrayResult: Array<any> = new Array<any>();

  reasonForCategoryChoice: Chart;
  ReasonForChoiceBase: Array<any> = new Array<any>();
  reasonfForBrandChoiceArray: Array<any> = new Array<any>();

  reasonForBrandAverageChart: Chart;
  totalBrandsAverageForChoice: Array<any> = new Array<any>();

  whereBoughtChartTotal: Chart;
  whereShoppedChartTotal: Chart;
  whereBoughtChartInstore: Chart;
  whereShoppedChartInstore: Chart;
  whereBoughtChartOnline: Chart;
  whereShoppedChartOnline: Chart;

  totalBoughtChartInstore: Chart;
  totalBoughtChartOnline: Chart;
  totalShoppedChartInstore: Chart;
  totalShoppedChartOnline: Chart;

  TotalBought: Array<any> = new Array<any>();
  TotalShopped: Array<any> = new Array<any>();
  InstoreBought: Array<any> = new Array<any>();
  InstoreShopped: Array<any> = new Array<any>();
  OnlineBought: Array<any> = new Array<any>();
  OnlineShopped: Array<any> = new Array<any>();

  OnlineTotalBought: Array<any> = new Array<any>();
  OnlineTotalShopped: Array<any> = new Array<any>();
  InstoreTotalBought: Array<any> = new Array<any>();
  InstoreTotalShopped: Array<any> = new Array<any>();

  TotalInstoreBoughtBase: Array<any> = new Array<any>();
  TotalInstoreShoppedBase: Array<any> = new Array<any>();
  TotalOnlineBoughtBase: Array<any> = new Array<any>();
  TotalOnlineShoppedBase: Array<any> = new Array<any>();

  TotalBoughtBase: Array<any> = new Array<any>();
  TotalShoppedBase: Array<any> = new Array<any>();
  instoreBoughtBase: Array<any> = new Array<any>();
  instoreShoppedBase: Array<any> = new Array<any>();
  onlineBoughtBase: Array<any> = new Array<any>();
  onlineShoppedBase: Array<any> = new Array<any>();

  reasonMapping = {
    serieseName: '',
    dataArray: [],
    average: [],
    median: [],
  }
  selectedOnPageLoad: string;
  constructor(private filterService: FilterService, private route: ActivatedRoute, private filterConfigService: FilterConfigService) {
    this.route.params.subscribe(params => {
      if(this.pageVisited){
        this.updateDataUnsubscribe.next();
        this.updateDataUnsubscribe.complete();
      }
      this.Category = params.order;
        if (this.Category == "Faucet") {     
          this.filterConfigService.initializeCateogryBrandHealthFaucet();
          this.selectedOnPageLoad = 'Total';
        }
        if (this.Category == "Showerhead") {
          this.filterConfigService.initializeCateogryBrandHealthShowerhead();
          this.selectedOnPageLoad = 'Total';
        }
        if (this.Category == "Toilet") {
          this.filterConfigService.initializeCateogryBrandHealthToilet();
          this.selectedOnPageLoad = 'Total';
        }
        if (this.Category == "TubShowerUnit") {
          this.filterConfigService.initializeCateogryBrandHealthTubShowerUnit();
          this.selectedOnPageLoad = 'Total';
        }
        this.filterService.optionSelectionCallback$
          .pipe(takeUntil(this.updateDataUnsubscribe))
          .subscribe(value => {
            this.createCharts(this.Category);
            setTimeout(() => {
              this.onDataUpdate.next();
            });
          });
        this.showLoader = true;
    });
  }

  initpara() {
    this.selfInfluence = [];
    this.SpouseInfluence = [];
    this.contractorInfluence = [];
    this.familyInfluence = [];
    this.selfInstall = [];
    this.SpouseInstall = [];
    this.contractorInstall = [];
    this.familyInstall = [];
    this.purchaseAverageArray = [];
    this.purchaseMedianArray = [];
    this.ShowData = 'Total';
    this.TotalBought = [];
    this.TotalShopped = [];
    this.InstoreBought = [];
    this.InstoreShopped = [];
    this.OnlineBought = [];
    this.OnlineShopped = [];
    this.InstoreTotalBought = [];
    this.InstoreTotalShopped = [];
    this.OnlineTotalBought = [];
    this.OnlineTotalShopped = [];
    this.InfluencedBase = [];
    this.InstalledBase = [];
    this.PurchasePriceBase = [];
    this.ReasonForChoiceBase = [];
    this.TotalOnlineBoughtBase = [];
    this.TotalInstoreBoughtBase = [];
    this.TotalOnlineShoppedBase = [];
    this.TotalInstoreShoppedBase = [];
    this.TotalBoughtBase = [];
    this.TotalShoppedBase = [];
    this.instoreBoughtBase = [];
    this.instoreShoppedBase = [];
    this.onlineBoughtBase = [];
    this.onlineShoppedBase = [];
    this.totalBrandsAverageForChoice = [];
  };

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

  ngAfterContentInit(): void {
    this.Category = '';
    this.route.params.subscribe(params => {
      this.Category = params.order;
      if (this.Category) {
        this.Category = params.order;
        this.createCharts(this.Category);
      } else {
        this.Category = params.order;
        this.createCharts(this.Category);
      }
    });
  }

  ngOnInit() {  
    this.pageVisited = true;
    this.showLoader = true;
    this.createCharts(this.Category);
    this.filterService.optionSelectionCallback$
      .pipe(takeUntil(this.updateDataUnsubscribe))
      .subscribe(value => {
        this.createCharts(this.Category);
        setTimeout(() => {
          this.onDataUpdate.next();
        });
      });
      this.changeTable('Influenced','tab1');
  }

  createCharts(category) {
    this.initpara();
    const disposition: CategoryDisposition = new CategoryDisposition();
    const brands = new Brands(this.filterService);
    this.brandList = brands.getBrandsCode().map(val => AssetMappings.logoByBrandCode[val]);
    const brandcodes = brands.getBrandsCode();
    this.brandNameCsv = brands.getBrandsCode().map((val)=> this.brandCodesCsv[val] );
    
    this.purchaseAverageArray = [];
    if (brandcodes.length != 0) {
      brandcodes.forEach(val => {
        this.purchaseAverageArray.push(0);
      })
    }

    this.InfluencedDataChart = disposition.getWhoInfluenced(category, brandcodes);    
    this.installedDataChart = disposition.getWhoInstalled(category, brandcodes);
    this.reasonForCategoryChoice = disposition.getReasonCategoryChoice(category, brandcodes);
    this.purchasePriceChart = disposition.getPurchasePrice(category, brandcodes);
    this.purchaseAverageChart = disposition.getPurchasePriceAverage(category, brandcodes);
    this.purchaseMedianChart = disposition.getPurchasePriceMedian(category, brandcodes);
    this.whereBoughtChartTotal = disposition.getWhereBoughtTotal(category, brandcodes);
    this.whereShoppedChartTotal = disposition.getWhereShoppedTotal(category, brandcodes);
    this.whereBoughtChartInstore = disposition.getWhereBoughtInstore(category, brandcodes);
    this.whereShoppedChartInstore = disposition.getWhereShoppedInstore(category, brandcodes);
    this.whereBoughtChartOnline = disposition.getWhereBoughtOnline(category, brandcodes);
    this.whereShoppedChartOnline = disposition.getWhereShoppedOnline(category, brandcodes);
    this.totalBoughtChartInstore = disposition.getTotalBoughtInstore(category, brandcodes);
    this.totalShoppedChartInstore = disposition.getTotalShoppedInstore(category, brandcodes);
    this.totalBoughtChartOnline = disposition.getTotalBoughtOnline(category, brandcodes);
    this.totalShoppedChartOnline = disposition.getTotalShoppedOnline(category, brandcodes);
    this.reasonForBrandAverageChart = disposition.getReasonCategoryChoiceTotalAverage(category, brandcodes)

    if(brandcodes.length>0){
      this.showLoader = true;
      this.InfluencedDataChart.addTableDataReady((output, dataTable) => {
        this.selfInfluence = [];
        this.SpouseInfluence = [];
        this.contractorInfluence = [];
        this.familyInfluence = [];
        this.InfluencedBase = []; 
        this.InfluencedBase = dataTable.bases.get('Base');
        this.selfInfluence = dataTable.rows.get('Yourself');
        this.SpouseInfluence = dataTable.rows.get('Spouse');
        this.familyInfluence = dataTable.rows.get('Other family member or friend');
        if(category == 'Faucet'){
          this.contractorInfluence = dataTable.rows.get('Plumber / contractor');
        }
        else{
          this.contractorInfluence = dataTable.rows.get('Plumber/contractor');
        }
      });
      this.installedDataChart.addTableDataReady((output, dataTable) => {
        this.selfInstall = [];
        this.SpouseInstall = [];
        this.contractorInstall = [];
        this.familyInstall = [];
        this.InstalledBase = [];
        this.InstalledBase = dataTable.bases.get('Base');
        this.selfInstall = dataTable.rows.get('Yourself');
        this.SpouseInstall = dataTable.rows.get('Spouse');
        this.familyInstall = dataTable.rows.get('Other family member or friend');
        this.contractorInstall = dataTable.rows.get('Plumber/contractor');
      });

      this.reasonForBrandAverageChart.addTableDataReady((output, dataTable)=>{
        dataTable.rows.forEach((element, index)=>{
          const obj = {
            'name': index,
            'score': element[0]
          }
          this.totalBrandsAverageForChoice.push(obj);
        })
      })
      
      this.reasonForCategoryChoice.addTableDataReady((output, dataTable) => {
        this.reasonfForBrandChoiceArray = [];
        this.ReasonForChoiceBase = [];      
        const dataArray = [];
        let counter = 0;
        this.ReasonForChoiceBase = dataTable.bases.get('Base');
        if(this.totalBrandsAverageForChoice.length > 0){
          let avg = 0;
          dataTable.rows.forEach((element, index) => {
            this.totalBrandsAverageForChoice.forEach(val =>{
              if(val.name == index){
                avg = val.score;
              }
            });      
            const reasonObject = {
              'sereiseName': '',
              'seriesdata': [],
              'average': 0,
              'seriesColor': []
            }
            if(index === 'Other reason [O]'){
              let arr = index.split(" ");
              reasonObject.sereiseName = arr[0]+" "+arr[1];
            }
            else{
              reasonObject.sereiseName = index;
            }
            reasonObject.seriesdata = element;
            reasonObject.average = avg;
            dataArray.push(reasonObject);
            counter++;
          });
        }
        
        if (counter >= 10) {
          this.reasonfForBrandChoiceArray = this.colorIndexing(dataArray);
          this.reasonfForBrandChoiceArray.sort((a, b) => b.average - a.average);
        }
      });
  
      this.purchasePriceChart.addTableDataReady((output, dataTable) => { 
        this.purchasePriceArray = [];      
        this.PurchasePriceBase = [];
        this.PurchasePriceBase = dataTable.bases.get('Base');
        dataTable.rows.forEach((element, index) => {
          const priceObject = {
            'sereiseName': '',
            'seriesdata': []
          }
          priceObject.sereiseName = index;
          priceObject.seriesdata = element;
          this.purchasePriceArray.push(priceObject);
        });
      });
  
      this.purchaseAverageChart.addTableDataReady((output, dataTable) => {     
        this.purchaseAverageArray = [];
        dataTable.rows.forEach((element, index) => {
          this.purchaseAverageArray = element;
        });
      });
  
      this.purchaseMedianChart.addTableDataReady((output, dataTable) => {   
        this.purchaseMedianArray = [];
        dataTable.rows.forEach((element, index) => {
          this.purchaseMedianArray = element;
        });
      });
  
      this.totalBoughtChartInstore.addTableDataReady((output, dataTable) =>{
        this.InstoreTotalBought = [];
        this.TotalInstoreBoughtBase = dataTable.bases.get('Base');
        dataTable.rows.forEach((element, index) => {
          this.InstoreTotalBought = element;
        })
      })
      this.totalShoppedChartInstore.addTableDataReady((output, dataTable) =>{
        this.InstoreTotalShopped = [];
        this.TotalInstoreShoppedBase = dataTable.bases.get('Base');
        dataTable.rows.forEach((element, index) => {
          this.InstoreTotalShopped = element;
        })
      });
      this.totalBoughtChartOnline.addTableDataReady((output, dataTable) =>{
        this.OnlineTotalBought = [];
        this.TotalOnlineBoughtBase = dataTable.bases.get('Base');
        dataTable.rows.forEach((element, index) => {
          this.OnlineTotalBought = element;
        })
      });
      this.totalShoppedChartOnline.addTableDataReady((output, dataTable) =>{
        this.OnlineTotalShopped = [];
        this.TotalOnlineShoppedBase = dataTable.bases.get('Base');
        dataTable.rows.forEach((element, index) => {
          this.OnlineTotalShopped = element;
        })
      });

      this.whereBoughtChartTotal.addTableDataReady((output, dataTable) => {
        this.TotalBought = [];
        this.TotalBoughtBase = dataTable.bases.get('Base');
        dataTable.rows.forEach((element, index) => {
          const total = {
            'sereiesNameTotal': index,
            'sereiseDataTotal': element,
            'totalBoughtBase': this.TotalBoughtBase
          }
          this.TotalBought.push(total);
        });
      });
  
      this.whereShoppedChartTotal.addTableDataReady((output, dataTable) => {
        this.TotalShopped = [];
        this.TotalShoppedBase = dataTable.bases.get('Base');
        dataTable.rows.forEach((element, index) => {
          const totalShopped = {
            'sereiesNameTotalShopped': index,
            'sereiseDataTotalShopped': element,
            'totalShoppedBase': this.TotalShoppedBase
          }
          this.TotalShopped.push(totalShopped);
        });
      });
  
      this.whereBoughtChartInstore.addTableDataReady((output, dataTable) => {
        this.InstoreBought = [];
        this.instoreBoughtBase = dataTable.bases.get('Base');
        dataTable.rows.forEach((element, index) => {
          const Instore = {
            'sereiesNameInstoreBought': index,
            'sereiseDataInstoreBought': element,
            'instoreBoughtBase': this.instoreBoughtBase
          }
          this.InstoreBought.push(Instore);
        })
      });
      this.whereShoppedChartInstore.addTableDataReady((output, dataTable) => {
        this.InstoreShopped = [];
        this.instoreShoppedBase = dataTable.bases.get('Base');
        dataTable.rows.forEach((element, index) => {
          const Instore = {
            'sereiesNameInstoreShopped': index,
            'sereiseDataInstoreShopped': element,
            'instoreShoppedBase': this.instoreShoppedBase
          }
          this.InstoreShopped.push(Instore);
        })
      });
  
      this.whereBoughtChartOnline.addTableDataReady((output, dataTable) => {
        this.OnlineBought = [];
        this.onlineBoughtBase = dataTable.bases.get('Base');
        dataTable.rows.forEach((element, index) => {
          const Online = {
            'sereiesNameOnlineBought': index,
            'sereiseDataOnlineBought': element, 
            'onlineBoughtBase': this.onlineBoughtBase
          }
          this.OnlineBought.push(Online);
        })
      });
  
      this.whereShoppedChartOnline.addTableDataReady((output, dataTable) => {
        this.OnlineShopped =[];
        this.onlineShoppedBase = dataTable.bases.get('Base');
        dataTable.rows.forEach((element, index) => {
          const Online = {
            'sereiesNameOnlineShopped': index,
            'sereiseDataOnlineShopped': element,
            'onlineShoppedBase': this.onlineShoppedBase
          }
          this.OnlineShopped.push(Online);
          this.showLoader = false;
        })
      });
      this.showLoader = true;
    }  
  }

  changeTable(tabName, tab) {
    this.selectedTab = tabName;
    this.viewMode = tab;
  }

  colorIndexing(reasonObject) {
    let colorCode: String;
    reasonObject.forEach((val, i) => {
      // let num = 0;
      // val.seriesdata.forEach((a, b) => {
      //   if (typeof a == 'number') {
      //     num += a;
      //   }
      //   return num;
      // })
      const average = reasonObject[i].average;
      reasonObject[i].average = Math.round(average);
      val.seriesdata.forEach((value) => {
        const colorValue = value;
        const colorIndexValue = Math.round(colorValue / average * 100);
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
        reasonObject[i].seriesColor.push(colorCode);
      });
    })
    return reasonObject;
  }

  downloadExcelFile(){
    if(this.selectedTab === 'Influenced'){
      this.downloadInfluencedInstallData('Who Influenced', this.selfInfluence, this.familyInfluence, this.contractorInfluence, this.SpouseInfluence, this.InfluencedBase);
    }
    else if(this.selectedTab === 'Installed'){
      this.downloadInfluencedInstallData('Who Installed', this.selfInstall, this.familyInstall, this.contractorInstall, this.SpouseInstall, this.InfluencedBase);
    }
    else if(this.selectedTab === 'Purchase'){
      this.downloadPurchasePriceData('Purchase Price', this.purchasePriceArray, this.purchaseAverageArray, this.purchaseMedianArray, this.PurchasePriceBase)
    }
    else if(this.selectedTab === 'Reasons'){
      this.downloadReasonForBrandChoice('Reason For Brand Choice', this.reasonfForBrandChoiceArray, this.ReasonForChoiceBase);
    }
    else if(this.selectedTab === 'Bought'){
      if(this.ShowData === 'Total'){
        this.downloadBoughtShoppedData('Where Bought/Shoppedn Total', this.InstoreTotalBought, this.InstoreTotalShopped, this.OnlineTotalBought, this.OnlineTotalShopped,
        this.TotalInstoreBoughtBase, this.TotalInstoreShoppedBase,this.TotalBought,this.TotalShopped,this.TotalBoughtBase, this.TotalShoppedBase);
      }
      if(this.ShowData === 'Instore'){
        this.downloadBoughtShoppedData('Where Bought/Shoppedn Instore', this.InstoreTotalBought, this.InstoreTotalShopped, this.OnlineTotalBought, this.OnlineTotalShopped,
        this.TotalInstoreBoughtBase, this.TotalInstoreShoppedBase,this.InstoreBought,this.InstoreShopped,this.instoreBoughtBase, this.instoreShoppedBase);
      }
      if(this.ShowData === 'Online'){
        this.downloadBoughtShoppedData('Where Bought/Shoppedn Online', this.InstoreTotalBought, this.InstoreTotalShopped, this.OnlineTotalBought, this.OnlineTotalShopped,
        this.TotalInstoreBoughtBase, this.TotalInstoreShoppedBase,this.OnlineBought,this.OnlineShopped,this.onlineBoughtBase, this.onlineShoppedBase);
      }
    }
  }
  downloadInfluencedInstallData(titleOfFile, self, family, contractor, Spouse, baseData){
    let csvData = [];
    csvData.push(Object.assign({}, this.csvDetailCreation(self ,'Self')));
    csvData.push(Object.assign({}, this.csvDetailCreation(Spouse ,'Spouse')));
    csvData.push(Object.assign({}, this.csvDetailCreation(family ,'Family/Other')));
    csvData.push(Object.assign({}, this.csvDetailCreation(contractor ,'Contractor')));
    csvData.push(Object.assign({}, this.csvDetailCreation(baseData,'Base')));
    this.csvOptions.title = titleOfFile;
    this.csvOptions.headers = [" ",this.brandNameCsv ];
    new AngularCsv(csvData, "Purchase Disposition", this.csvOptions);
  }

  downloadPurchasePriceData(titleOfFile, priceData, average, median, baseData){
    let csvData = [];
    priceData.forEach((element, index) =>{
      csvData.push(Object.assign({}, this.csvDetailCreation(element.seriesdata, element.sereiseName)));
    })
    csvData.push(Object.assign({}, this.csvDetailCreation(average ,'Average')));
    csvData.push(Object.assign({}, this.csvDetailCreation(median ,'Median')));
    csvData.push(Object.assign({}, this.csvDetailCreation(baseData,'Base')));
    this.csvOptions.title = titleOfFile;
    this.csvOptions.headers = [" ",this.brandNameCsv ];
    new AngularCsv(csvData, "Purchase Disposition", this.csvOptions);
  }

  downloadReasonForBrandChoice(titleOfFile, reasonForChoiceData, baseData){
    let csvData = [];
    reasonForChoiceData.forEach((element, index) =>{
      csvData.push(Object.assign({}, this.csvDetailCreationForReasons(element.seriesdata, element.sereiseName, element.average)));
    });
    csvData.push(Object.assign({}, this.csvDetailCreationForReasons(baseData,'Base', 0)));
    this.csvOptions.title = titleOfFile;
    this.brandNameCsv.push('Average');
    this.csvOptions.headers = [" ",this.brandNameCsv ];
    new AngularCsv(csvData, "Purchase Disposition", this.csvOptions);
  }

  downloadBoughtShoppedData(titleOfFile, tboughInstoreHead, tShoppedInstoreHead, tBoughtOnlineHead, tShoppedOnlineHead, headBaseBought, headBaseShopped,
     tboughtData, tshoppedData,tBTotalDataBase, tSTotalDataBase){
    let modifiedBrandList = [];
    let subHeaderRow = []; 
    let tempArrayInstoreHead = [];  
    let tempArrayOnlineHead = []; 

    let tBoughtShoppedHeadBase = [];
    let dataTotalBase = [];

    let csvData = []; 
    this.brandNameCsv.forEach((value) =>{
      modifiedBrandList.push(value);
      modifiedBrandList.push(value);
    });
    this.brandNameCsv.forEach((val) =>{
      subHeaderRow.push('Shopped');
      subHeaderRow.push('Bought');
    });
    tboughInstoreHead.forEach((element, index) =>{       
      tempArrayInstoreHead.push(element);
      tempArrayInstoreHead.push(tShoppedInstoreHead[index]); 
      tempArrayOnlineHead.push(tBoughtOnlineHead[index]);
      tempArrayOnlineHead.push(tShoppedOnlineHead[index]);
      tBoughtShoppedHeadBase.push(headBaseBought[index]);
      tBoughtShoppedHeadBase.push(headBaseShopped[index]);
      dataTotalBase.push(tBTotalDataBase[index]);
      dataTotalBase.push(tSTotalDataBase[index]);
    })
    csvData.push(Object.assign({}, this.csvDetailCreation(subHeaderRow, ' ')));

    if(this.ShowData === 'Total'){
      csvData.push(Object.assign({}, this.csvDetailCreation(tempArrayInstoreHead, 'Total Instore(net)')));
      csvData.push(Object.assign({}, this.csvDetailCreation(tempArrayOnlineHead, 'Total Online(net)')));
      csvData.push(Object.assign({}, this.csvDetailCreation(tBoughtShoppedHeadBase, 'Total Base(net)')));
      tboughtData.forEach((element,i) =>{
        let rowdata = [];
        element.sereiseDataTotal.forEach((val,index) =>{
          if(val){
            rowdata.push(val);
          }
          else{
            rowdata.push('NA');
          }
          if(tshoppedData[i] != undefined){
            if(tshoppedData[i].sereiseDataTotalShopped[index]){
              rowdata.push(tshoppedData[i].sereiseDataTotalShopped[index]);
            }
            else{
              rowdata.push('NA');
            }
          }
          else{
            rowdata.push('NA');
          }
        });
        csvData.push(Object.assign({}, this.csvDetailCreation(rowdata, element.sereiesNameTotal)));
      });
      csvData.push(Object.assign({}, this.csvDetailCreation(dataTotalBase, 'Base')));
    }

    if(this.ShowData === 'Instore'){
      csvData.push(Object.assign({}, this.csvDetailCreation(tempArrayInstoreHead, 'Total Instore(net)')));
      tboughtData.forEach((element,i) =>{
        let rowdata = [];
        element.sereiseDataInstoreBought.forEach((val,index) =>{
          if(val){
            rowdata.push(val);
          }
          else{
            rowdata.push('NA');
          }
          if(tshoppedData[i] != undefined){
            if(tshoppedData[i].sereiseDataInstoreShopped[index]){
              rowdata.push(tshoppedData[i].sereiseDataInstoreShopped[index]);
            }
            else{
              rowdata.push('NA');
            }
          }
          else{
            rowdata.push('NA');
          }
        });
        csvData.push(Object.assign({}, this.csvDetailCreation(rowdata, element.sereiesNameInstoreBought)));
      });
      csvData.push(Object.assign({}, this.csvDetailCreation(dataTotalBase, 'Base')));
    }

    if(this.ShowData === 'Online'){
      csvData.push(Object.assign({}, this.csvDetailCreation(tempArrayOnlineHead, 'Total Online(net)')));
      tboughtData.forEach((element,i) =>{
        let rowdata = [];
        element.sereiseDataOnlineBought.forEach((val,index) =>{
          if(val){
            rowdata.push(val);
          }  
          else{
            rowdata.push('NA');
          }
          if(tshoppedData[i] != undefined){
            if(tshoppedData[i].sereiseDataOnlineShopped[index]){
              rowdata.push(tshoppedData[i].sereiseDataOnlineShopped[index]);
            }
            else{
              rowdata.push('NA');
            }
          }
          else{
            rowdata.push('NA');
          }
        });
        csvData.push(Object.assign({}, this.csvDetailCreation(rowdata, element.sereiesNameOnlineBought)));
      });
      csvData.push(Object.assign({}, this.csvDetailCreation(dataTotalBase, 'Base')));
    }
    this.csvOptions.title = titleOfFile;
    this.csvOptions.headers = [" ",modifiedBrandList ];
    new AngularCsv(csvData, "Purchase Disposition", this.csvOptions);
  }

  csvDetailCreation(chartData, sideBreak){
    let csvDetail = [];
    csvDetail.push(sideBreak);
    chartData.forEach((val,index)=>{
      csvDetail.push(val);
    });
    return csvDetail;
  }

  csvDetailCreationForReasons(chartData, sideBreak, average){
    let csvDetail = [];
    csvDetail.push(sideBreak);
    chartData.forEach((val,index)=>{
      csvDetail.push(val);
    });
    csvDetail.push(average);
    return csvDetail;
  }

  selectChangeHandler(event: any) {
    this.ShowData = event.target.value;
  }

  getContentHeight() {
    return window.innerHeight - 300;
  }

  getContentWidth() {
    var width = document.getElementById("brandData").offsetWidth;
    return width;
  }
  // getContentWidthBought() {
  //   let element = document.getElementById("brandDataBought");
  //   var width = 0;
  //   if(element){
  //     width  = element.offsetWidth;   
  //   }
  //   return width;
  // }
  ngOnDestroy(): void {
    this.updateDataUnsubscribe.next();
    this.updateDataUnsubscribe.complete();
  }
}
