import { Component, OnInit } from '@angular/core';
import { FilterConfigService } from 'src/app/service/filter-config.service';
import { ActivatedRoute } from '@angular/router';
import { FilterService } from 'src/app/shell/services/filter.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Brands } from 'src/app/model/brands';
import { Chart } from 'src/app/shell/models/chart';
import { RecentPurchase } from 'src/app/model/RecentPurchase';
import { element } from 'protractor';
import { TableOutput } from 'src/app/shell/interfaces/table-output';
import { AssetMappings } from 'src/app/model/asset.mappings';
import { AngularCsv } from 'angular7-csv/dist/Angular-csv';

@Component({
  selector: 'app-recent-purchase',
  templateUrl: './recent-purchase.component.html',
  styleUrls: ['./recent-purchase.component.css']
})
export class RecentPurchaseComponent implements OnInit {
  showLoader: boolean;
  Category: string;
  categoryHeading: string;
  optionSelectionUnsubscribe: Subject<any> = new Subject<any>();
  onDataUpdate: Subject<any> = new Subject();
  brandcodes: string[];
  TotalAwareness: Array<Chart> = new Array<any>();
  SeriouslyConsider: Array<Chart> = new Array<any>();
  Purchased: Array<Chart> = new Array<any>();
  TotalAwarenessData: Array<TableOutput> = new Array<any>();
  SeriouslyConsiderData: Array<TableOutput> = new Array<any>();
  PurchasedData: Array<TableOutput> = new Array<any>();
  logoByBrandCode = AssetMappings.logoByBrandCode;
  TotalAwareness1: Array<any> = new Array<any>();
  SerioslyConsider1: Array<any> = new Array<any>();
  Purchase1: Array<any> =  new Array<any>();
  awareloader: boolean;
  seriouslyconsiderloader: boolean;
  purchaseloader: boolean;
  seriesAwareName: Array<String> = new Array<any>();
  awarenesscount: number;
  seriesConsiderName: Array<String> = new Array<any>();
  seriesConsidercount: number;
  PurchasedAwareName: Array<String> = new Array<any>();
  brandList: Array<string>;
  dtRecentPurchase: Array<{ type: string, Data: Array<number> }>;
  purchasedcount: number;
  totalawarecheck: boolean;
  purchasecheck: boolean;
  purchaseExcellCheck:boolean;
  totalawareExcellCheck: boolean;
  seriousExcellCheck: boolean;
  seriousconsidercheck: boolean;
  CompTotalAndSeriously: Array<number>;
  CompSeriousAndPurchase: Array<number>;
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


  BrandCodewiseMapping = AssetMappings.brandNameAndCodes;

  isAwareCount: number =0;
  isPurchaseCount: number =0;
  isSeriousCount: number =0;
  awarenessData :Array<any> = new Array<any>();
  considrationData :Array<any> = new Array<any>();
  purchaseData :Array<any> = new Array<any>();
  constructor(private filterService: FilterService, private route: ActivatedRoute, private filterConfigService: FilterConfigService) {
    this.route.params.subscribe(params => {
      this.Category = params.order;
      this.categoryHeading = this.Category;
      if (this.Category == "Faucet") {
        this.filterConfigService.initializeRecentpurchasewithFaucet();
      }
      if (this.Category == "Showerhead") {
        this.filterConfigService.initializeRecentpurchasewithShowerhead();
      }
      if (this.Category == "Toilet") {
        this.filterConfigService.initializeRecentpurchasewithToilet();
      }
      if (this.Category == "TubShowerUnit") {
        this.filterConfigService.initializeRecentpurchasewithTUB();
      }
    });
  }

  ngOnInit() {
    this.showLoader = true;
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
  ExcellExport() {
    this.csvOptions.title = "Recent Purchase";
    new AngularCsv(this.dtRecentPurchase, "Consideration", this.csvOptions);
  }
  init() {
    this.brandList = [];
    this.TotalAwareness1 = [];
    this.SerioslyConsider1 = [];
    this.brandcodes = [];
    this.Purchase1 = [];
    this.showLoader = true;
    this.awareloader = true;
    this.purchaseloader = true;
    this.seriouslyconsiderloader = true;
    this.seriesAwareName = [];
    this.seriesConsiderName = [];
    this.PurchasedAwareName = [];
    this.dtRecentPurchase = [];
    this.purchasecheck = false;
    this.seriousconsidercheck = false;
    this.totalawarecheck = false;
    this.purchaseExcellCheck=false;
    this.seriousExcellCheck=false;
    this.totalawareExcellCheck=false;
    this.isAwareCount =0;
    this.isPurchaseCount =0;
    this.isSeriousCount =0;
    this.awarenessData = [];
    this.considrationData = [];
    this.purchaseData = [];
  }
  LoaderCall() {
    if (this.purchaseloader == false && this.seriouslyconsiderloader == false && this.awareloader == false) {
      this.showLoader = false;
    }
  }
  CompareseriesCall() {
    if (this.seriousconsidercheck && this.purchasecheck && this.awarenesscount) {
      this.CompTotalAndSeriously = [];
      this.CompSeriousAndPurchase = [];
      if(this.awarenessData.length == this.considrationData.length && this.considrationData.length == this.purchaseData.length){
        for (var i = 0; i < this.awarenessData.length; i++) {
          var measure = (this.considrationData[i].score / this.awarenessData[i].score) * 100;
          this.CompTotalAndSeriously.push(Math.round(measure));
        }
        for (var i = 0; i < this.considrationData.length; i++) {
          var measure = (this.purchaseData[i].score / this.considrationData[i].score) * 100;
          this.CompSeriousAndPurchase.push(Math.round(measure));
        }
        this.TotalAwareness1 = this.awarenessData;  
        this.SerioslyConsider1 = this.considrationData; 
        this.Purchase1 = this.purchaseData;
      }

    }
  }
  createTables(Category) {
    this.init();
    const brands = new Brands(this.filterService);
    this.brandcodes = brands.getBrandsCode();
    this.brandList = brands.getBrandsCode().map(val => AssetMappings.logoByBrandCode[val]);
    this.csvOptions.headers = [];
    var copybrandlist = [];
    this.csvOptions.headers.push("");
    this.brandcodes.forEach(element => {
      this.csvOptions.headers.push(AssetMappings.brandNameAndCodes[element]);
    });

    this.isAwareCount =0;
    this.isPurchaseCount =0;
    this.isSeriousCount =0;

    const reecentPur = new RecentPurchase(this.Category);
    this.TotalAwareness = reecentPur.getAwareness(this.brandcodes);
    this.SeriouslyConsider = reecentPur.SeriouslyConsider(this.brandcodes);
    this.Purchased = reecentPur.getPurchased(this.brandcodes);
    if(this.brandcodes.length >0){
      this.TotalAwareness.forEach(element => {
        element.addTableDataReady((output, datatable) => {
          this.awareloader = false;
          this.LoaderCall();
          if (output.length != 0) {
            this.TotalAwarenessData.push(output[0]);
            var base = datatable.bases.get('Base').map(value => Math.round(value))[0];
            this.seriesAwareName.push(output[0].SeriesName);
            this.awarenesscount = this.seriesAwareName.filter(item => item == output[0].SeriesName).length;
            if (this.awarenesscount == 1) {
              const indextoBeAdd = this.brandcodes.indexOf(output[0].SeriesCode);
              this.awarenessData[indextoBeAdd]= ({'Code': parseInt(output[0].SeriesCode), 'score': output[0].Score, 'base': base })
              this.isAwareCount++;
              //this.TotalAwareness1.sort((a, b) => b.Code - a.Code).reverse();
            }
            if (this.isAwareCount == this.brandcodes.length&&this.totalawareExcellCheck==false) {
              var dt = [];
              var dtb=[];
              this.totalawareExcellCheck=true;
              this.totalawarecheck = true;
              this.CompareseriesCall();
              //this.TotalAwareness1 = awarenessData;
              this.TotalAwareness1.forEach(element => {
                dt.push(Math.round(element.score));
                dtb.push(Math.round(element.base));
              })
              this.dtRecentPurchase.push({ 'type': "TotalAwareness", 'Data': dt });
              this.dtRecentPurchase.push({ 'type': "Base", 'Data': dtb });
            }
          }
        });
      });
      
      this.SeriouslyConsider.forEach(element => {
        element.addTableDataReady((output, datatable) => {
          this.seriouslyconsiderloader = false;
          this.LoaderCall();
          this.SeriouslyConsiderData.push(output[0]);
          var base = datatable.bases.get('Base').map(value => Math.round(value))[0];
          this.seriesConsiderName.push(output[0].SeriesName);
          this.seriesConsidercount = this.seriesConsiderName.filter(item => item == output[0].SeriesName).length;
          if (this.seriesConsidercount == 1) {
            const indextoBeAdd = this.brandcodes.indexOf(output[0].SeriesCode);
            this.considrationData[indextoBeAdd] = ({ 'Code': parseInt(output[0].SeriesCode), 'score': output[0].Score, 'base': base })
            // this.SerioslyConsider1.sort((a, b) => b.Code - a.Code).reverse();
           this.isSeriousCount++;
          }
          if (this.isSeriousCount == this.brandcodes.length && this.seriousExcellCheck==false) {
            var dt = [];
            var dtb=[];
            this.seriousExcellCheck=true;
            this.seriousconsidercheck = true;
            this.CompareseriesCall();
            //this.SerioslyConsider1 = considrationData;
            this.SerioslyConsider1.forEach(element => {
              dt.push(Math.round(element.score));
              dtb.push(Math.round(element.base));
            })
            this.dtRecentPurchase.push({ 'type': "SerioslyConsider", 'Data': dt });
            this.dtRecentPurchase.push({ 'type': "Base", 'Data': dtb });
          }
        });
      });

      this.Purchased.forEach(element => {
        element.addTableDataReady((output, datatable) => {
          this.purchaseloader = false;
          this.LoaderCall();
          this.PurchasedData.push(output[0]);
          var base = datatable.bases.get('Base').map(value => Math.round(value))[0];
          this.PurchasedAwareName.push(output[0].SeriesName);
          this.purchasedcount = this.PurchasedAwareName.filter(item => item == output[0].SeriesName).length;
          if (this.purchasedcount == 1) {
            const indextoBeAdd = this.brandcodes.indexOf(output[0].SeriesCode);
            this.purchaseData[indextoBeAdd] = ({ 'Code': parseInt(output[0].SeriesCode), 'score': output[0].Score, 'base': base })
            // this.Purchase1.sort((a, b) => b.Code - a.Code).reverse();
            this.isPurchaseCount++        
          }
          if (this.isPurchaseCount == this.brandcodes.length && this.purchaseExcellCheck==false) {
            var dt = [];
            var dtb=[];
            this.purchaseExcellCheck=true;
            this.purchasecheck = true;
            this.CompareseriesCall();
            //this.Purchase1 = purchaseData;
            this.Purchase1.forEach(element => {
              dt.push(Math.round(element.score));
              dtb.push(Math.round(element.base));
            })
            this.dtRecentPurchase.push({ 'type': "Purchase", 'Data': dt });
            this.dtRecentPurchase.push({ 'type': "Base", 'Data': dtb });
          }
        });
      });
    }
  }

  ngOnDestroy(): void {
    this.optionSelectionUnsubscribe.next();
    this.optionSelectionUnsubscribe.complete();
  }
}
