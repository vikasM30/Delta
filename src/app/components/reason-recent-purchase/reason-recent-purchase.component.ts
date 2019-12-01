import { ReasonforRecentPurchase } from './../../model/reasonforrecent.purchase';
import { Component, OnInit, OnDestroy, AfterContentInit } from '@angular/core';
import { FilterService } from 'src/app/shell/services/filter.service';
import { FilterConfigService } from 'src/app/service/filter-config.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Brands } from 'src/app/model/brands';
import { AssetMappings } from 'src/app/model/asset.mappings';
import { ActivatedRoute } from '@angular/router';
import { Chart } from 'src/app/shell/models/chart';
import { AngularCsv } from 'angular7-csv/dist/Angular-csv';

@Component({
  selector: 'app-reason-recent-purchase',
  templateUrl: './reason-recent-purchase.component.html',
  styleUrls: ['./reason-recent-purchase.component.css']
})
export class ReasonRecentPurchaseComponent implements OnInit, OnDestroy, AfterContentInit {

  dataShow: Chart;
  dataShowTotalAvg: Chart;
  isPageVisited: boolean = false;
  dataShowBases: Array<any>;
  brandList: Array<string>;
  onDataUpdate: Subject<any> = new Subject();
  showloader: boolean;
  updateDataUnsubscribe: Subject<any> = new Subject<any>();
  brandNameCodes = AssetMappings.brandNameAndCodes;
  Category: string;
  dataShowData: Array<any> = new Array<any>();
  dataShowTotalAvgData: Array<any> = new Array<any >();
  data = false;
  table: any;
  overallavg: boolean;
  avgnew: boolean;
  checkdouble: number;
  checkdouble1: number;
  categoryHeaderName: string;
  brandNameCsv: Array<string>;
  dtResent: Array<{ ques: string, score: Array<number>, base?: number, avg?: any}>;
  csvOptions = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalseparator: '.',
    showLabels: true,
    showTitle: true,
    title: '',
    useBom: true,
    noDownload: false,
    headers: []
  };

  constructor(private filterService: FilterService, private filterConfigService: FilterConfigService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      if(this.isPageVisited){
        this.updateDataUnsubscribe.next();
        this.updateDataUnsubscribe.complete();
      }
      this.Category = params.order;
      if (this.Category === 'Faucet') {
          this.filterConfigService.initializeCateogryBrandHealthFaucet();
        }
      if (this.Category === 'Showerhead') {
        this.filterConfigService.initializeCateogryBrandHealthShowerhead();
      }
      if (this.Category === 'Toilet') {
        this.filterConfigService.initializeCateogryBrandHealthToilet();
      }
      if (this.Category === 'TubShowerUnit') {
        this.filterConfigService.initializeCateogryBrandHealthTubShowerUnit();
      }
      this.filterService.optionSelectionCallback$
      .pipe(takeUntil(this.updateDataUnsubscribe))
      .subscribe(value => {
        this.updateData(this.Category);
        setTimeout(() => {
          this.onDataUpdate.next();
        });
      });
    });
  }
  ngAfterContentInit(): void {
    this.route.params.subscribe(params => {
      this.Category = params.order;
      this.categoryHeaderName = this.Category;
      if (this.Category) {
        this.Category = params.order;
        this.updateData(this.Category);
      } else {
        this.Category = params.order;
        this.createTables(this.Category);
      }
    });
  }

  ngOnInit() {
    this.isPageVisited = true;
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
    this.showloader = true;
    this.createTables(Category);
  }

  createTables(Category) {
    const brands = new Brands(this.filterService);
    const brandcode = brands.getBrandsCode();
    this.brandList = brands.getBrandsCode().map(val => AssetMappings.logoByBrandCode[val]);
    this.brandNameCsv = brands.getBrandsCode().map((val) => this.brandNameCodes[val]);
    const reasonforRecentPurchase: ReasonforRecentPurchase = new ReasonforRecentPurchase(Category);

    this.overallavg = false;
    this.checkdouble1 = 0;
    this.dataShowTotalAvg = reasonforRecentPurchase.totalAvg(Category);
    this.dataShowTotalAvg.addTableDataReady((output, dataTable) => {
        this.overallavg = true;
        this.checkdouble1++;
        if (this.checkdouble1 <= 1) {
        this.dataShowTotalAvgData = [];
        this.hideloader();
        dataTable.rows.forEach((element, index) => {
          const obj = {
            name: index,
            score: element[0]
          }
          this.dataShowTotalAvgData.push(obj);
        });
        this.fun1();
      }
      });


    this.dataShow = reasonforRecentPurchase.simpleTable(Category, brandcode);
    this.avgnew = false;
    this.checkdouble = 0;
    this.dataShow.addTableDataReady((output, dataTable) => {
      this.checkdouble++;
      if (this.checkdouble <= 1) {
      this.avgnew = true;
      this.dataShowData = [];
      this.dtResent = [];
      this.hideloader();
      this.dataShowBases = dataTable.bases.get('Base').map(value => Math.round(value));
      this.table = dataTable;
      this.fun1();
      }
      });
  }

  fun1() {
    if (this.avgnew && this.overallavg) {
      var base1: Array<{ ques: string, score: Array<number>, avg?: any, base?: number}>;
      base1 = [];
      this.table.rows.forEach((score, ques) => {
        let avg = 0;
        this.dataShowTotalAvgData.forEach(val =>{
          if (val.name === ques) {
            avg = val.score;
          }
        });
        let obj;
        obj = {
            question: ques,
            Score: score,
            Avg: avg
          };
        this.dtResent.push({ques: obj.question, avg: obj.Avg, score: obj.Score});
        base1.push({ques: 'Bases', avg: '', score: this.dataShowBases});
        this.data = true;
        this.dataShowData.push(obj);
        });
      this.dtResent.push(base1[0]);
  }
  }

  /**
   * To Convert Data into CSV Form
   */
  downloadExcelFile() {
    this.csvOptions.title = 'Reason For Recent Purchase';
    this.csvOptions.headers = [' ', 'Average (Total Brands)', this.brandNameCsv];
    // tslint:disable-next-line:no-unused-expression
    new AngularCsv(this.dtResent, 'Reason For Recent Purchase', this.csvOptions);
  }

  hideloader() {
    const loader = [this.dataShow.showLoader];
    if (loader.reduce((prev, curr) => prev || curr, false) === false) {
      this.showloader = false;
    }
  }

  ngOnDestroy(): void {
    this.updateDataUnsubscribe.next();
    this.updateDataUnsubscribe.complete();
  }

}
