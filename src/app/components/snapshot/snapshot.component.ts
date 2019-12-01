import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Chart } from 'src/app/shell/models/chart';
import { Snapshot } from 'src/app/model/snapshot';
import { ActivatedRoute } from '@angular/router';
import { FilterService } from 'src/app/shell/services/filter.service';
import { Subject } from 'rxjs';
import { OnDestroy } from '@angular/core';
import { TableOutput } from 'src/app/shell/interfaces/table-output';
import { Imagry } from 'src/app/model/Imagenary'
import { Consideration } from './ExcellClasses/Consideration';
import { BrandImagery } from './ExcellClasses/BrandImagery';
import { element } from 'protractor';
import { AngularCsv } from 'angular7-csv/dist/Angular-csv'
import { FilterConfigService } from 'src/app/service/filter-config.service';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-snapshot',
  templateUrl: './snapshot.component.html',
  styleUrls: ['./snapshot.component.css']
})
export class SnapshotComponent implements OnInit, OnDestroy, AfterViewInit {
  Unaided: Chart;
  TotalBrand: Chart;
  Equity: Chart;
  Consideration: Chart;
  Strong: Chart;
  isCompareEnabled: boolean;
  brandname: string;
  timeperiod: any;
  Category: string;
  brandImagery: Chart;
  unaidedTrend: Chart;
  onDataUpdate: Subject<any> = new Subject();
  unSubscribe: Subject<any> = new Subject<any>();
  imageryData: Array<TableOutput> = new Array<any>();
  ConsiderationData: Array<TableOutput> = new Array<any>();
  UnaidedData: Array<TableOutput> = new Array<any>();
  EquityData: Array<TableOutput> = new Array<any>();
  StrongData: Array<TableOutput> = new Array<any>();
  UnaidedScore: number;
  TotalScore: number;
  Active: number;
  Latent: number;
  strongScore: number;
  firstChoice: number;
  SecondChoice: number;
  Consider: number;
  NotConsider: number;
  Choices: number;
  UnaidedBase: number;
  StrongBase: number;
  Totalbase: number;
  imageryBases: number[];
  ConsiderationBases: number[];
  equitybase: number[];
  imageryScore: number[];
  TotalBrandData: Array<TableOutput> = new Array<any>();
  ImageryData1: Array<Imagry> = new Array<Imagry>();
  showLoader: boolean;
  FinalKDA: number[];
  dtConsideration: Array<Consideration> = new Array<Consideration>();
  dtConsiderationCSV: Array<{ ques: string, score: number}>;
  dtBrandImagery: Array<{driver?: any, type?: string, score?: number, base?: number}>;
  dtEquity: Array<{type?: string, score?: number, base?: number}>;
  dtAwareness: Array<{type?: string, score?: number, base?: number}>;
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
  KDAScores = {
    Faucet: {
      v558: 115,
      v559: 8,
      v560: 222,
      v561: 99,
      v562: 84,
      v563: 117,
      v564: 20,
      v565: 0,
      v566: 19,
      v567: 188,
      v568: 251,
      v569: 41,
      v570: 27,
      v571: 39,
      v572: 68,
      v573: 101,
      v574: 110,
      v575: 141,
      v576: 151
    },
    Showerhead: {
      v558: 155,
      v559: 13,
      v560: 206,
      v561: 104,
      v562: 75,
      v563: 107,
      v564: 13,
      v565: 0,
      v566: 21,
      v567: 172,
      v568: 202,
      v569: 53,
      v570: 34,
      v571: 46,
      v572: 79,
      v573: 118,
      v574: 106,
      v575: 141,
      v576: 154
    },
    Toilet: {
      v558: 274,
      v559: 119,
      v560: 202,
      v561: 59,
      v562: 34,
      v563: 110,
      v564: 105,
      v565: 0,
      v566: 48,
      v567: 104,
      v568: 144,
      v569: 104,
      v570: 127,
      v571: 84,
      v572: 83,
      v573: 83,
      v574: 31,
      v575: 39,
      v576: 52
    }
  };
  constructor(private filterService: FilterService, private route: ActivatedRoute, private filterConfigService: FilterConfigService) {
    this.brandname = 'Delta';
    this.filterConfigService.initializeCategorySnapshot();
  }

  ngOnInit() {
    this.filterService.optionSelectionCallback$.pipe(takeUntil(this.unSubscribe))
      .subscribe(value => {
        this.updateData(this.Category);
      });
  }

  ngOnDestroy(): void {
    this.unSubscribe.next();
    this.unSubscribe.complete();
  }

  ngAfterContentInit(): void {
    this.route.params.subscribe(params => {
      if (this.Category) {
        this.Category = params.order;
        this.brandname = 'Delta';
        this.toggle(event, this.brandname, 1);
        this.updateData(this.Category);
      } else {
        this.Category = params.order;
        this.brandname = 'Delta';
        this.toggle(event, this.brandname, 2);
        this.createTables(this.Category);
      }
    });
  }

  ngAfterViewInit(): void {
    // this.route.params.subscribe(params => {
    //   this.Category = params.order;
    //   this.updateData(this.Category);
    // });
  }

  BrandCaller(Brand: string) {
    console.log(Brand);
  }
  downloadConsiderationCSV() {
    if (this.brandname == 'American') {
      this.csvOptions.title = this.brandname + ' ' + 'Standard' + ' ' + 'Consideration';
    }
    else {
      this.csvOptions.title = this.brandname + ' ' + 'Consideration';
    }
    this.csvOptions.headers = ['Consideration Options', 'Percentage'];
    new AngularCsv(this.dtConsiderationCSV, 'Consideration', this.csvOptions);
  }
  downloadBrandImageryCSV() {
    if (this.brandname == 'American') {
      this.csvOptions.title = this.brandname + ' ' + 'Standard' + ' ' + 'Brand Imagery';
    }
    else {
      this.csvOptions.title = this.brandname + ' ' + 'Brand Imagery';
    }
    this.csvOptions.headers = ['Driver', 'Series Name', 'Percentage'];
    new AngularCsv(this.dtBrandImagery, 'BrandImagery', this.csvOptions);
  }
  downloadEquityCSV() {
    this.dtEquity.push({type: 'Base', base: this.StrongBase});
    if (this.brandname == 'American') {
      this.csvOptions.title = this.brandname + ' ' + 'Standard' + ' ' + 'Equity';
    }
    else {
      this.csvOptions.title = this.brandname + ' ' + 'Equity';
    }

    this.csvOptions.headers = ['Option', 'Percentage'];
    new AngularCsv(this.dtEquity, 'Equity', this.csvOptions);
  }
  downloadAwarenesCSV() {
    this.dtAwareness.push({type: 'Base', base: this.Totalbase});

    if (this.brandname == 'American') {
      this.csvOptions.title = this.brandname + ' ' + 'Standard' + ' ' + 'Awareness';
    }
    else {
      this.csvOptions.title = this.brandname + ' ' + 'Awareness';
    }
    this.csvOptions.headers = ['Option', 'Percentage'];
    new AngularCsv(this.dtAwareness, 'Awareness', this.csvOptions);
  }

  initScores() {
    this.UnaidedScore = null,
      this.Active = null,
      this.Latent = null,
      this.strongScore = null,
      this.firstChoice = null,
      this.SecondChoice = null,
      this.Consider = null,
      this.NotConsider = null,
      this.Choices = null,
      this.TotalScore = null,
      this.UnaidedBase = null,
      this.StrongBase = null,
      this.Totalbase = null,
      this.imageryBases = [],
      this.ConsiderationBases = [],
      this.equitybase = [],
      this.imageryScore = [],
      this.FinalKDA = [],
      this.imageryData = [],
      this.ImageryData1 = [],
      this.showLoader = true,
      this.dtConsideration = [],
      this.dtConsiderationCSV = [],
      this.dtBrandImagery = [],
      this.dtEquity = [];
    this.dtAwareness = [];
  }
  createTables(Category) {
    this.showLoader = true;
    const snapshot: Snapshot = new Snapshot(Category, this.brandname);
    this.initScores();
    this.dtAwareness = [];
    this.brandImagery = snapshot.getBrandImagery();;
    this.Consideration = snapshot.getConsideration();
    this.Unaided = snapshot.getUnaided();
    this.TotalBrand = snapshot.getTotalBrand();
    this.Equity = snapshot.getEquity();
    this.Strong = snapshot.getStrongRelation();
    this.unaidedTrend = snapshot.getUnaidedTrend();


    this.Unaided.addTableDataReady((output, dataTable) => {
      this.hideloader();
      this.UnaidedData = output.sort((a, b) => b.Score - a.Score);
      this.UnaidedScore = Math.round(this.UnaidedData[0].Score);
      this.UnaidedBase = dataTable.bases.get('Base').map(value => Math.round(value))[0];
      this.dtAwareness.push({type: 'Unaided', score: this.UnaidedScore});
    });

    this.TotalBrand.addTableDataReady((output, dataTable) => {
      this.hideloader();
      this.TotalBrandData = output.sort((a, b) => b.Score - a.Score);
      this.TotalScore = Math.round(this.TotalBrandData[0].Score);
      this.Totalbase = dataTable.bases.get('Base').map(value => Math.round(value))[0];
      this.dtAwareness.push({type: 'TotalBrand', score: this.TotalScore});
    });


    this.Strong.addTableDataReady((output, datatable) => {
      this.hideloader();
      this.StrongData = output;
      this.StrongBase = datatable.bases.get('Base').map(value => Math.round(value))[0];
      this.strongScore = Math.round(this.StrongData[0].Score);
      this.dtEquity.push({type: 'strongRelations', score: this.strongScore});
    });

    this.Equity.addTableDataReady((output, dataTable) => {
      this.hideloader();
      this.EquityData = output;
      this.Active = Math.round(this.EquityData[0].Score);
      this.Latent = Math.round(this.EquityData[1].Score);
      this.equitybase = dataTable.bases.get('Base').map(value => Math.round(value));
      this.dtEquity.push({type: 'Active', score: this.Active});
      this.dtEquity.push({type: 'Latent', score: this.Latent});
    });

    this.Consideration.addTableDataReady((output, dataTable) => {
      this.hideloader();
      this.dtConsideration = [];
      this.dtConsiderationCSV = [];
      this.ConsiderationData = output;
      this.ConsiderationBases = dataTable.bases.get('Base').map(value => Math.round(value));
      this.ConsiderationData.forEach(element => {
        switch (element.SeriesName) {
          case 'First choice':
            this.firstChoice = Math.round(element.Score);
            var myobj = {
              'option': 'First choice',
              'score': [this.firstChoice, this.ConsiderationBases]
            }
            this.dtConsideration.push(myobj);
            this.dtConsiderationCSV.push({ques: myobj.option, score: this.firstChoice});
            break;
          case 'Second choice':
            this.SecondChoice = Math.round(element.Score);
            var myobj = {
              'option': 'Second choice',
              'score': [this.SecondChoice, this.ConsiderationBases]
            }
            this.dtConsideration.push(myobj);
            this.dtConsiderationCSV.push({ques: myobj.option, score: this.SecondChoice});
            break;
          case 'Consider':
            this.Consider = Math.round(element.Score);
            var myobj = {
              'option': 'Consider',
              'score': [this.Consider, this.ConsiderationBases]
            }
            this.dtConsideration.push(myobj);
            this.dtConsiderationCSV.push({ques: myobj.option, score: this.Consider});
            break;
          case 'Not consider':
            this.NotConsider = Math.round(element.Score);
            var myobj = {
              'option': 'Not consider',
              'score': [this.NotConsider, this.ConsiderationBases]
            }
            this.dtConsideration.push(myobj);
            this.dtConsiderationCSV.push({ques: myobj.option, score: this.NotConsider});
            break;

        }
        this.Choices = this.firstChoice + this.SecondChoice;
      });


      var myobj = {
        'option': '1st/2nd Choice (net)',
        'score': [this.Choices, this.ConsiderationBases]
      }
      this.dtConsideration.push(myobj);
      var dt = [];
      var dt2 = [];
      this.dtConsideration.forEach(element => {
        if (element.option == '1st/2nd Choice (net)') {
          dt.push(element);
        }
        else {
          dt2.push(element);
        }
      });
      this.dtConsideration = [];
      this.dtConsideration.push(dt[0]);
      this.dtConsideration.push(dt2[0]);
      this.dtConsideration.push(dt2[1]);
      this.dtConsideration.push(dt2[2]);
      this.dtConsideration.push(dt2[3]);
      this.dtConsiderationCSV.push({ques: 'Base', score: this.ConsiderationBases[0]});
    });

    this.brandImagery.addTableDataReady((output, dataTable) => {
      this.hideloader();
      this.imageryData = [];
      this.ImageryData1 = [];
      this.dtBrandImagery = [];
      this.imageryData = output.sort((a, b) => b.Score - a.Score);
      this.imageryBases = dataTable.bases.get('Base').map(value => Math.round(value));
      this.imageryData.forEach((v, i) => {
        switch (this.Category) {
          case 'Faucet':
            var myobj = {
              'sereiesname': v.SeriesName,
              'score': Math.round(v.Score),
              'KDA': this.KDAScores.Faucet[v.SeriesVariableID]
            };
            this.dtBrandImagery.push({driver: this.KDAScores.Faucet[v.SeriesVariableID], type: v.SeriesName, score: Math.round(v.Score)});
            this.ImageryData1.push(myobj);
            break;
          case 'Showerhead':
            var myobj = {
              'sereiesname': v.SeriesName,
              'score': Math.round(v.Score),
              'KDA': this.KDAScores.Showerhead[v.SeriesVariableID]
            };
            // tslint:disable-next-line: max-line-length
            this.dtBrandImagery.push({driver: this.KDAScores.Showerhead[v.SeriesVariableID], type: v.SeriesName, score: Math.round(v.Score)});
            this.ImageryData1.push(myobj);
            break;
          case 'Toilet':
            var myobj = {
              'sereiesname': v.SeriesName,
              'score': Math.round(v.Score),
              'KDA': this.KDAScores.Toilet[v.SeriesVariableID]
            };
            this.dtBrandImagery.push({driver: this.KDAScores.Toilet[v.SeriesVariableID], type: v.SeriesName, score: Math.round(v.Score)});
            this.ImageryData1.push(myobj);
            break;
          case 'TubShowerUnit':
            var myobj = {
              'sereiesname': v.SeriesName,
              'score': Math.round(v.Score),
              'KDA': this.KDAScores.Faucet[v.SeriesVariableID]
            };
            this.dtBrandImagery.push({driver: this.KDAScores.Faucet[v.SeriesVariableID], type: v.SeriesName, score: Math.round(v.Score)});
            this.ImageryData1.push(myobj);
            break;
        }
      });
      this.dtBrandImagery.push({driver: '', type: 'Base', base: this.imageryBases[0]});
      this.dtBrandImagery.sort((a, b) => b.driver - a.driver);
      this.ImageryData1.sort((a, b) => b.KDA - a.KDA);
    });
  };

  hideloader() {
    const loader = [this.brandImagery.showLoader, this.Consideration.showLoader, this.Strong.showLoader, this.Equity.showLoader,
    this.Unaided.showLoader, this.TotalBrand.showLoader];

    if (loader.reduce((prev, curr) => prev || curr, false) === false) {
      this.showLoader = false;
    }
  };
  updateData(Category) {
    this.createTables(Category);
    setTimeout(() => {
      this.onDataUpdate.next();
    });
  }


  toggle($event, id, check) {
    const allIcons = document.getElementsByClassName('icon');
    for (let i = 0; i < allIcons.length; i++) {
      allIcons[i].classList.remove('selected');
    }
    var icon = document.getElementById(id);
    icon.classList.add('selected');
    this.brandname = id;
    if (check == 1) {
      this.updateData(this.Category);
    }
    else if (check == 2) {
      this.createTables(this.Category);
    }
    else if (check == 3) {
      this.updateData(this.Category);
    }

  }

  getBgColor(kda) {
    if (kda <= 75) {
      return 'Grey';
    }
    else if (kda >= 76 && kda <= 124) {
      return '#ffcc00';
    }
    else { return '#0095d9' }

  }

  getContentHeight() {
    return window.innerHeight - 270;
  }

}



