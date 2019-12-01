import { Retailers } from './../../model/retailers';
import { ReasonforRetailer } from './../../model/reasonfor.retailer';
import { Component, OnInit, OnDestroy, AfterContentInit } from '@angular/core';
import { FilterService } from 'src/app/shell/services/filter.service';
import { FilterConfigService } from 'src/app/service/filter-config.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AssetMappings } from 'src/app/model/asset.mappings';
import { ActivatedRoute } from '@angular/router';
import { Chart } from 'src/app/shell/models/chart';
import { AngularCsv } from 'angular7-csv/dist/Angular-csv';

@Component({
  selector: 'app-reason-for-retailer',
  templateUrl: './reason-for-retailer.component.html',
  styleUrls: ['./reason-for-retailer.component.css']
})
export class ReasonForRetailerComponent implements OnInit, OnDestroy, AfterContentInit {

  dataShow: Chart;
  dataShowTotalAvg: Chart;
  inPageVisited: boolean = false;
  dataShowBases: Array<any>;
  dataShowTotalAvgBases: Array<any>;
  retailersList: Array<string>;
  onDataUpdate: Subject<any> = new Subject();
  showloader: boolean;
  showDropdown: boolean;
  updateDataUnsubscribe: Subject<any> = new Subject<any>();
  retailersNameCsv: Array<string>;
  retailersNameCodes = AssetMappings.retailersList;
  Category: string;
  dataShowData: Array<any> = new Array<any>();
  dataShowTotalAvgData: Array<any> = new Array<any>();
  data = false;
  table: any;
  overallavg: boolean;
  avgnew: boolean;
  checkdouble: number;
  checkdouble1: number;
  categoryHeaderName: string;
  sum = 0;
  retailer: Array<any> = new Array<any>();
  dtRetailer: Array<{ ques?: string, score?: Array<number>, avg?: any, totavg?: any, base?: number}>;
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
      if(this.inPageVisited){
        this.updateDataUnsubscribe.next();
        this.updateDataUnsubscribe.complete();
      }
      this.Category = params.order;
      if (this.Category === 'Faucet') {
          this.filterConfigService.initializeCateogryReasonRetailerFaucet();
        }
      if (this.Category === 'Showerhead') {
        this.filterConfigService.initializeCateogryReasonRetailerShowerhead();
      }
      if (this.Category === 'Toilet') {
        this.filterConfigService.initializeCateogryReasonRetailerToilet();
      }
      if (this.Category === 'TubShowerUnit') {
        this.filterConfigService.initializeCateogryReasonRetailerTubShowerUnit();
      }
      this.filterService.optionSelectionCallback$
      .pipe(takeUntil(this.updateDataUnsubscribe))
      .subscribe(value => {
        this.createTables(this.Category);
        setTimeout(() => {
          this.onDataUpdate.next();
        });
      });
      this.showloader = true;
    });
  }

  ngAfterContentInit(): void {
    this.route.params.subscribe(params => {
      this.Category = params.order;
      this.categoryHeaderName = this.Category;
      if (this.Category) {
        this.Category = params.order;
        this.createTables(this.Category);
      } else {
        this.Category = params.order;
        this.createTables(this.Category);
      }
    });
  }

  ngOnInit() {
    this.inPageVisited = true;
    this.showloader = true;
    this.createTables(this.Category);
    this.filterService.optionSelectionCallback$
      .pipe(takeUntil(this.updateDataUnsubscribe))
      .subscribe(value => {
        this.createTables(this.Category);
        setTimeout(() => {
          this.onDataUpdate.next();
        });
      });
  }

  createTables(Category) {
    const retailers = new Retailers(this.filterService, Category);
    const retailerCodeList = retailers.getRetailersCode();
    const reasonforRetailer: ReasonforRetailer = new ReasonforRetailer(Category);

    this.overallavg = false;
    this.checkdouble1 = 0;
    this.dataShowTotalAvg = reasonforRetailer.totalAvg(Category);
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
          };
          this.dataShowTotalAvgData.push(obj);
        });
        this.fun1();
      }
    });

    this.dataShow = reasonforRetailer.simpleTable(Category, retailers.getRetailersCode());
    this.avgnew = false;
    this.checkdouble = 0;
    this.retailersList = retailers.getRetailersCode().map(val => AssetMappings.retailersList[val]);
    this.retailersNameCsv = retailers.getRetailersCode().map((val) => this.retailersNameCodes[val]);
    this.dataShow.addTableDataReady((output, dataTable) => {
      this.checkdouble++;
      if (this.checkdouble <= 1) {
        this.avgnew = true;
        this.dataShowData = [];
        this.dtRetailer = [];
        this.hideloader();
        this.dataShowBases = dataTable.bases.get('Base').map(value => Math.round(value));
        this.table = dataTable;
        this.fun1();
        }
    });

}

fun1() {
  if (this.avgnew && this.overallavg) {
  var base1: Array<{ ques: string, score: Array<number>, totavg?: any, avg?: any, base?: number}>;
  base1 = [];
  this.table.rows.forEach((score, ques) => {
    let avg = 0;
    this.dataShowTotalAvgData.forEach(val => {
      if (val.name === ques) {
        avg = val.score;
      }
    });
    let sum = 0;
    let obj;
    score.forEach(element => {
      if (element !== 'NaN') {
        sum = sum + element;
      }
    });
    obj = {
        question: ques,
        Score: score,
        Average: sum / score.length,
        TotalAverage: avg
      };
    this.dtRetailer.push({ques: obj.question, totavg: obj.TotalAverage, avg: obj.Average,  score: obj.Score});
    base1.push({ques: 'Bases', totavg: '', avg: '', score: this.dataShowBases});
    this.data = true;
    this.dataShowData.push(obj);
  });
  this.dtRetailer.push(base1[0]);
}
}
  downloadExcelFile() {
    this.csvOptions.title = 'Reason For Retailer';
    this.csvOptions.headers = [' ', 'Average(Total Retailers)', 'Average(Selected Retailers)', this.retailersNameCsv];
    // tslint:disable-next-line: no-unused-expression
    new AngularCsv(this.dtRetailer, 'Reason For Retailer', this.csvOptions);
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

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }
}
