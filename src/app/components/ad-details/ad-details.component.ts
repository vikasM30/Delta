import { AD } from './../../model/ad';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AdDetails } from '../ad-details/Ad_Details/adDetails';
import { Chart } from 'src/app/shell/models/chart';
import { FilterService } from 'src/app/shell/services/filter.service';
import { takeUntil, switchMap } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';
import { FilterConfigService } from 'src/app/service/filter-config.service';
import { UploadAdDetailService } from 'src/app/service/upload-ad-detail.service';
import { ActivatedRoute } from '@angular/router';
import { BrandRecall } from './Ad_Details/brandRecall';
import { AngularCsv } from 'angular7-csv/dist/Angular-csv';
import { AdService } from 'src/app/service/ad-service';
import { CollectionOutput } from 'src/app/shell/models/collectionOutput';

@Component({
  selector: 'app-ad-details',
  templateUrl: './ad-details.component.html',
  styleUrls: ['./ad-details.component.css']
})
export class AdDetailsComponent implements OnInit, OnDestroy  {

  dataShowCallToAction: Chart;
  dataShowCallToActionBases: any;
  dataShowCallToActionData: Array<any> = new Array<any>();
  dataShowAddiagnostics: Chart;
  dataShowAddiagnosticsBases: any;
  dataShowAddiagnosticsData: Array<any> = new Array<any>();
  dataShowAdRecall: Chart;
  dataShowAdRecallBases: any;
  dataShowAdRecallData: Array<any> = new Array<any>();
  dataShowBrandRecall: Chart;
  dataShowBrandRecallBases: Array<any>;
  dataShowBrandRecallData: Array<any> = new Array<any>();
  onDataUpdate: Subject<any> = new Subject();
  updateDataUnsubscribe: Subject<any> = new Subject<any>();
  addDet = [];
  data = false;
  table: any;
  adName: string = '';
  adid: number = null;
  dtForCSVCallToAction: Array<{ ques: string, score: number}>;
  dtForCSVAddiagnostics: Array<{ ques: string, score: number}>;
  dtForCSVBrandRecall: Array<{ ques: string, score: number}>;
  dtForCSVAdRecall: Array<{ ques: string, score: number}>;
  showLoader: boolean;
  selectedAds: Array<AdDetails> = new Array<AdDetails>();
  addLists: Array<AdDetails> = new Array<AdDetails>();
  dtBrandRecall: Array<BrandRecall> = new Array<BrandRecall>();
  firstOpt: number;
  secondOpt: number;
  thirdOpt: number;
  fourthOpt: number;
  fifthOpt: number;
  brand: any;
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
  message: any;
  subs: Subscription;
  subsSingleAdd: Subscription;
  idAdd: any;
  isApiCall: boolean = false;
  firstrundate: any;
  lastrundate: any;
  quarterstartdate: any;
  quarterenddate: any;
  addsTempList ={
    88: 'The Perfect Touch',
    89: 'Hydrorain One',
    90: 'Shield Yourself',
    91: 'In2ition Two-In-One',
    92: 'Quality Product Touchless KF',
    93: 'Lysol ActiClean Self-Clean',
    94: 'Innovative',
    95: 'Mother Nature',
    96: 'Konnect-Pouring Made Easy',
    97: 'Verdera Voice Mirror',
    98: 'The Design',
    99: 'Life Designs/ Water is Life',
    100: 'Perfect Fit/In Control',
    101: 'Rough Water/In Control',
    102: 'Moen Flow (was Precious Liquid)',
  };
  codeforaDD ={
    'The Perfect Touch': 88,
    'Hydrorain One': 89,
    'Shield Yourself': 90,
    'In2ition Two-In-One': 91,
    'Quality Product Touchless KF': 92,
    'Lysol ActiClean Self-Clean': 93,
    'Innovative': 94,
    'Mother Nature': 95,
    'Konnect-Pouring Made Easy': 96,
    'Verdera Voice Mirror': 97,
    'The Design': 98,
    'Life Designs/ Water is Life': 99,
    'Perfect Fit/In Control': 100,
    'Rough Water/In Control': 101,
    'Moen Flow (was Precious Liquid)': 102,
  };
  constructor(private addDetailsService: UploadAdDetailService, private filterService: FilterService,
              private filterConfigService: FilterConfigService, private route: ActivatedRoute,
              private idData: AdService) {
    this.filterConfigService.initializeADSelector();
    this.route.params.subscribe(params => {
      let nameAndId =  params.order.split('_');
      this.adName = nameAndId[0];
      this.subsSingleAdd = this.idData.getSingleAd1().subscribe(data => {
        this.adName = data;
        this.selectedAd(this.codeforaDD[this.adName]);
        this.updateData();
        setTimeout(() => {
          this.onDataUpdate.next();
        });
      });
      this.selectedAd(nameAndId[1]);
    });
  }

  ngOnInit() {
    this.showLoader = true;
    this.updateData();
    this.filterService.optionSelectionCallback$
      .pipe(takeUntil(this.updateDataUnsubscribe))
      .subscribe(value => {
        this.updateData();
        setTimeout(() => {
          this.onDataUpdate.next();
        });
      });
  }
sendAddName(adname: any) {
this.idData.sendSingleAd(adname);
}

  selectedAd(id) {
    if (id !== 'undefined') {
      this.showLoader = true;
      this.addDetailsService.getAds(id).subscribe((data) => {
        this.selectedAds = [];
        this.selectedAds.push(data);
        this.addLists = data;
        this.brand = data.brand;
        this.getDate();
        this.isApiCall = true;
      }, error => {
        console.log(error);
        this.isApiCall = true;
      });
    }
  }

  getDate() {
    // tslint:disable-next-line: forin
    for (const key in this.addLists) {
      switch (key) {
        case 'firstrundate': {
          const stringFullDateTime = this.addLists[key].toString();
          const stringFullDate = stringFullDateTime.slice(0, 10);
          this.firstrundate = this.dateConversion(stringFullDate);
          break;
        }
        case 'lastrundate': {
          const stringFullDateTime = this.addLists[key].toString();
          const stringFullDate = stringFullDateTime.slice(0, 10);
          this.lastrundate = this.dateConversion(stringFullDate);
          break;
        }
      }
    }

  }

  dateConversion(dateValue) {
    const date: Date = new Date(dateValue);
    const month = date.getMonth() + 1 > 10 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1);
    const year = date.getFullYear();
    const newdate = date.getDate() > 10 ? date.getDate() : '0' + date.getDate();
    return month + '/' + newdate + '/' + year;
  }


  updateData() {
    const ads = new AD(this.filterService);
    const adDetails: AdDetails = new AdDetails();
    this.showLoader = true;

    // call to action
    this.dataShowCallToAction = adDetails.callToAction(this.adName);
    this.dataShowCallToAction.addTableDataReady((output, dataTable) => {
      this.dataShowCallToActionData = [];
      this.dtForCSVCallToAction = [];
      this.dataShowCallToActionBases = dataTable.bases.get('Base').map(value => Math.round(value));
      this.table = dataTable;
      this.table.rows.forEach((score, ques) => {
        let obj;
        obj = {
            question: ques,
            Score: score,
          };
        this.dtForCSVCallToAction.push({ques: obj.question, score: obj.Score});
        this.data = true;
        this.dataShowCallToActionData.push(obj);
      });
      this.dtForCSVCallToAction.push({ques: 'Base', score: this.dataShowCallToActionBases});
      this.sendAddName(this.adName);
      this.hideloader();
    });

    // Addiagnostics
    this.dataShowAddiagnostics = adDetails.adDiagnostic(this.adName);
    this.dataShowAddiagnostics.addTableDataReady((output, dataTable) => {
      this.dataShowAddiagnosticsData = [];
      this.dtForCSVAddiagnostics = [];
      this.dataShowAddiagnosticsBases = dataTable.bases.get('Base').map(value => Math.round(value));
      this.table = dataTable;
      this.table.rows.forEach((score, ques) => {
        let obj;
        obj = {
          question: ques,
          Score: score,
        };
        this.dtForCSVAddiagnostics.push({ques: obj.question, score: obj.Score});
        this.data = true;
        this.dataShowAddiagnosticsData.push(obj);
        this.hideloader();
      });
      this.dtForCSVAddiagnostics.push({ques: 'Base', score: this.dataShowAddiagnosticsBases});
    });

    // Ad-Recall
    this.dtForCSVAdRecall = [];
    this.dataShowAdRecall = adDetails.adRecall(this.adName);
    this.dataShowAdRecall.addCalculationLogic((output: CollectionOutput) => {
      output.TableOutput.forEach(val => {
        val.forEach(value => {
          value.Score = Math.round(value.Score);
          this.dtForCSVAdRecall.push({ques: 'Score', score: value.Score});
        });
      });
      if (output.Bases.get('Ad Recall')[0]) {
        this.dtForCSVAdRecall.push({ques: 'Base', score: output.Bases.get('Ad Recall')[0].Score});
      }
      return output;
   });

    // Brand-Recall
    this.dataShowBrandRecall = adDetails.brandRecall(this.adName);
    this.firstOpt = null;
    this.secondOpt = null;
    this.thirdOpt = null;
    this.fourthOpt = null;
    this.fifthOpt = null;
    this.dataShowBrandRecall.addTableDataReady((output, dataTable) => {
      this.showLoader = false;
      this.dtBrandRecall = [];
      this.dtForCSVBrandRecall = [];
      this.dataShowBrandRecallData = output;
      this.dataShowBrandRecallBases = dataTable.bases.get('Base').map(value => Math.round(value));
      this.dataShowBrandRecallData.forEach(element => {
        switch (element.SeriesName) {
          case 'You could not help but remember it is for':
            this.firstOpt = Math.round(element.Score);
            const myobj1 = {
              option: 'You could not help but remember it is for',
              score: [this.firstOpt, this.dataShowBrandRecallBases]
             };
            this.dtBrandRecall.push(myobj1);
            this.dtForCSVBrandRecall.push({ques: myobj1.option, score: this.firstOpt});
            break;
          case 'It is pretty good at making you remember it is for':
            this.secondOpt = Math.round(element.Score);
            const myobj2 = {
              option: 'It is pretty good at making you remember it is for',
              score: [this.secondOpt, this.dataShowBrandRecallBases]
            };
            this.dtBrandRecall.push(myobj2);
            this.dtForCSVBrandRecall.push({ques: myobj2.option, score: this.secondOpt});
            break;
          case 'It is just okay at making you remember it is for':
            this.thirdOpt = Math.round(element.Score);
            const myobj3 = {
              option: 'It is just okay at making you remember it is for',
              score: [this.thirdOpt, this.dataShowBrandRecallBases]
            };
            this.dtBrandRecall.push(myobj3);
            this.dtForCSVBrandRecall.push({ques: myobj3.option, score: this.thirdOpt});
            break;
          case 'It could be for any brand of kitchen or bath plumbing products':
            this.fourthOpt = Math.round(element.Score);
            const myobj4 = {
              option: 'It could be for any brand of kitchen or bath plumbing products',
              score: [this.fourthOpt, this.dataShowBrandRecallBases]
             };
            this.dtBrandRecall.push(myobj4);
            this.dtForCSVBrandRecall.push({ques: myobj4.option, score: this.fourthOpt});
            break;
          case 'It could be for almost anything':
               this.fifthOpt = Math.round(element.Score);
               const myobj5 = {
                option: 'It could be for almost anything',
                score: [this.fifthOpt, this.dataShowBrandRecallBases]
               };
               this.dtBrandRecall.push(myobj5);
               this.dtForCSVBrandRecall.push({ques: myobj5.option, score: this.fifthOpt});
               break;
        }
        let dt = [];
        this.dtBrandRecall.forEach(element => {
            dt.push(element);
        });
        this.dtBrandRecall = [];
        this.dtBrandRecall.push(dt[0]);
        this.dtBrandRecall.push(dt[1]);
        this.dtBrandRecall.push(dt[2]);
        this.dtBrandRecall.push(dt[3]);
      });
      this.dtForCSVBrandRecall.push({ques: 'Base', score: this.dataShowBrandRecallBases[0]});
    });
  }

  downloadExcelFileCallToAction() {
    this.csvOptions.title = 'Call To Action';
    this.csvOptions.headers = [' ', 'Score'];
    // tslint:disable-next-line: no-unused-expression
    new AngularCsv(this.dtForCSVCallToAction, 'Call To Action', this.csvOptions);
  }

  downloadExcelFileAdDiagnostic() {
    this.csvOptions.title = 'Ad Diagnostic';
    this.csvOptions.headers = [' ', 'Score'];
    // tslint:disable-next-line: no-unused-expression
    new AngularCsv(this.dtForCSVAddiagnostics, 'Ad Diagnostic', this.csvOptions);
  }

  downloadExcelFileBrandRecall() {
    this.csvOptions.title = 'Brand Recall';
    this.csvOptions.headers = [' ', 'Score'];
    // tslint:disable-next-line: no-unused-expression
    new AngularCsv(this.dtForCSVBrandRecall, 'Brand Recall', this.csvOptions);
  }

  downloadExcelFileAdRecall() {
    this.csvOptions.title = 'Ad Recall';
    // tslint:disable-next-line: no-unused-expression
    new AngularCsv(this.dtForCSVAdRecall, 'Ad Recall', this.csvOptions);
  }

  hideloader() {
    // tslint:disable-next-line: max-line-length
    if(this.isApiCall && this.dataShowCallToActionData.length && this.selectedAds.length && this.dataShowAddiagnosticsData.length && this.dataShowCallToActionData.length){
      this.showLoader = false;
    }
  }

  ngOnDestroy(): void {
    this.updateDataUnsubscribe.next();
    this.updateDataUnsubscribe.complete();
  }

}
