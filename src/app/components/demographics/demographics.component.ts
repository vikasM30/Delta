import { Component, OnInit,OnDestroy } from '@angular/core';
import { DemographicsTable } from './table/demographics';
import { DataTable } from 'src/app/shell/models/dataTable';
import { Chart } from 'src/app/shell/models/chart';
import { Subject } from 'rxjs';
import { FilterConfigService } from 'src/app/service/filter-config.service';
import { FilterService } from 'src/app/shell/services/filter.service';
import { takeUntil } from 'rxjs/operators';
import { AngularCsv } from 'angular7-csv/dist/Angular-csv';
import { RoundOffStrategy } from 'src/app/shell/enums/round.off.strategy';
import { parse } from 'querystring';

@Component({
  selector: 'app-demographics',
  templateUrl: './demographics.component.html',
  styleUrls: ['./demographics.component.css']
})
export class DemographicsComponent implements OnInit, OnDestroy {
  selectedTab = 'Demographics';
  viewMode = 'tab1';
  demographicChartConfigArray :Array<Chart> = new Array<Chart>();
  showLoader :boolean;
  onDataUpdate :Subject<any> = new Subject<any>();
  unsubscribedemographic :Subject<any> = new Subject<any>();
  genderData : Array<any> = new Array<any>();
  ageData : Array<any> = new Array<any>();
  incomeData : Array<any> = new Array<any>();
  martialData : Array<any> = new Array<any>();
  demographicPieChartConfigArray :Array<Chart> = new Array<Chart>();
  areaPieChartConfig:Chart;
  childrenPieChartConfig:Chart;
  areaData : Array<any> = new Array<any>();
  regionData : Array<any> = new Array<any>();
  kidsHouseHoldData : Array<any> = new Array<any>();
  recentBuyerData : Array<any> = new Array<any>();
  intenderBuyerData: Array<any> = new Array<any>();
  houseHoldData :{Score:number,Base:number,SeriesName:String} ;
  averageIncomeData :{Score:number,Base:number,SeriesName:String} ;
  OpinionsData : Array<any> = new Array<any>();
  SecondOpinionsData  : Array<any> = new Array<any>(); 
  mriOpinionMapping = ['Agree mostly','Agree somewhat','Disagree somewhat','Disagree mostly']
  mriSecondOpinionMapping = ['Agree completely','Agree somewhat','Disagree somewhat','Disagree completely']
  HouseHoldfactor :Array<number> = [1,2,4,6];
  Incomefactor :Array<number> = [45,63,88,125,200,300];
  
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
  opinionChartConfig:Chart;
  secondOpinionChartConfig:Chart;
  knowledgeAreaChart : Chart; 
  adviceOnTopicsChart :Chart; 
  knowledgeAreaData :Array<any> = new Array<any>();
  adviceOnTopicsData :Array<any> = new Array<any>();
  averageIncomeDataExcel = [];
  houseHoldDataExcel =[];
  constructor(private filterService: FilterService,private filterConfigService : FilterConfigService) {
    this.houseHoldData = {Score:0,Base:0,SeriesName:''} ;
    this.averageIncomeData = {Score:0,Base:0,SeriesName:''} ;
   }

  ngOnInit() {
    this.showLoader = true;
    this.demographicCharts();
    this.MRIdemographicCharts();
    this.filterService.optionSelectionCallback$
    .pipe(takeUntil(this.unsubscribedemographic))
    .subscribe(value=>{
      this.demographicCharts();
      this.MRIdemographicCharts();
      setTimeout(()=>{
        this.onDataUpdate.next();
      })
    })
  }
  /**
   * Change table according to tab
   */
  changeTable(tabName, tab) {
    this.selectedTab = tabName;
    this.viewMode = tab;
  }

  /**
   * Create Tables and Chart
   */
  demographicCharts(){
    const demographics : DemographicsTable = new DemographicsTable();
    const genderChartConfig:Chart = demographics.demographicsChartConfigration('Gender',['v102'],"");
    const ageChartConfig   :Chart = demographics.demographicsChartConfigration('Age',['v103'],"");
    const incomeChartConfig:Chart = demographics.demographicsChartConfigration('Income Break',['v264'],"");
    const incomeAvgChartConfig:Chart = demographics.demographicsChartConfigration('Average Income Break',['v264'],"");
    const maritalChartConfig:Chart = demographics.demographicsChartConfigration('Marital Status',['v782'],"");
    const regionChartConfig:Chart = demographics.demographicsChartConfigration('Region',['v104'],"");
    const houseHoldChartConfig:Chart = demographics.demographicsChartConfigration('House Hold',['v783'],"");
    const recentBuyerChartConfig:Chart = demographics.demographicsChartConfigration('Recent Buyer',['v297','v298','v300','v302','v303'],[2]);
    const intenderChartConfig:Chart = demographics.demographicsChartConfigration('Intender',['v297','v298','v300','v302','v303'],[3]);
    
    this.areaPieChartConfig = demographics.demographicsPieChartConfigration('Area','v781');
    this.childrenPieChartConfig = demographics.demographicsPieChartConfigration('Kids in Household','v784');
    
    this.demographicChartConfigArray.push(genderChartConfig);
    this.demographicChartConfigArray.push(ageChartConfig);
    this.demographicChartConfigArray.push(incomeChartConfig);
    this.demographicChartConfigArray.push(incomeAvgChartConfig);
    this.demographicChartConfigArray.push(maritalChartConfig);
    this.demographicChartConfigArray.push(regionChartConfig);
    this.demographicChartConfigArray.push(houseHoldChartConfig);
    this.demographicChartConfigArray.push(recentBuyerChartConfig);
    this.demographicChartConfigArray.push(intenderChartConfig);
    

    //Gender Chart
    genderChartConfig.addTableDataReady((output,dataTable)=>{
      this.genderData = this.genderChart(output,dataTable);
      this.showLoader = false;
    });

    //Age Chart
    ageChartConfig.addTableDataReady((output,dataTable)=>{
      this.ageData = this.ageChart(output,dataTable);
      this.showLoader = false;
    });

    //Income Chart
    incomeChartConfig.addTableDataReady((output,dataTable)=>{
      this.incomeData = this.incomeChart(output,dataTable);
      this.showLoader = false;
    });
    //Marital Status Chart
    maritalChartConfig.addTableDataReady((output,dataTable)=>{
      this.martialData = this.martialChart(output,dataTable);
      this.showLoader = false;
    });

    //Recent Buyer Chart
    recentBuyerChartConfig.addTableDataReady((output,dataTable)=>{
      this.recentBuyerData = this.recentAndIntenderBuyerChart(output,dataTable);
      this.showLoader = false;
    });
    //Intender Chart
    intenderChartConfig.addTableDataReady((output,dataTable)=>{
      this.intenderBuyerData = this.recentAndIntenderBuyerChart(output,dataTable);
      this.showLoader = false;
    });
    
    // Region Status Chart
    regionChartConfig.addTableDataReady((output,dataTable)=>{
      this.regionData = this.regionChart(output,dataTable);
      this.showLoader = false;
    });

    incomeAvgChartConfig.addTableDataReady((output,dataTable)=>{
      const baseValue = dataTable.bases.get('Base')[0];
      let totalValue = 0;
      let data = []
      output.forEach((val,index)=>{
        totalValue += val.Score*this.Incomefactor[index];
        const object = {
          Score : val.Score,
          SeriesName  : val.SeriesName,
          Base  : baseValue
        }
        data.push(object);
      });
      this.averageIncomeData = {
        Score : parseFloat((totalValue/baseValue).toFixed(2)),
        Base : baseValue,
        SeriesName: 'Average'
      }
      this.averageIncomeDataExcel = data;
      this.averageIncomeDataExcel.unshift(this.averageIncomeData);
      this.showLoader = false;
    });
    // //House Hold Status Chart
    houseHoldChartConfig.addTableDataReady((output,dataTable)=>{
      const baseValue = dataTable.bases.get('Base')[0];
      let totalValue = 0;
      let data = [];
      output.forEach((val,index)=>{
        totalValue += val.Score*this.HouseHoldfactor[index];
        const object = {
          Score : val.Score,
          SeriesName  : val.SeriesName,
          Base  : baseValue
        }
        data.push(object);
      });
      this.houseHoldData = {
        Score : parseFloat((totalValue/baseValue).toFixed(2)),
        Base : baseValue,
        SeriesName: 'Average'
      }
      this.houseHoldDataExcel = data;
      this.houseHoldDataExcel.unshift(this.houseHoldData);
      this.showLoader = false;
    });
    
    //Area Status Chart For Excel Data
    this.areaPieChartConfig.addCalculationLogic(output => {
      let table = output.TableOutput.get('Area');
      if(table.length){
        const Base = output.Bases.get("Area")[0].Score
        let data = [];
        table.forEach(value => {
          const object = {
            Score : value.Score,
            SeriesName  : value.SeriesName,
            Base:Base
          }
          data.push(object);
        });
        if(data.length) this.areaData = data
      }
      return  output;
    },RoundOffStrategy.AfterCalculation);

    //Kids House Hold Status Chart For Excel Data
    this.childrenPieChartConfig.addCalculationLogic(output => {
      let table = output.TableOutput.get('Kids in Household');
      if(table.length){
        const Base = output.Bases.get("Kids in Household")[0].Score
       // this.kidsHouseHoldData = [];
        let data = [];
        table.forEach(value => {
          const object = {
            Score : value.Score,
            SeriesName  : value.SeriesName,
            Base:Base
          }
          data.push(object);
        });
        if(data.length) this.kidsHouseHoldData = data;
      }
      return  output;
    },RoundOffStrategy.AfterCalculation);
    
  }

  /**
   * functionality for Gender Chart
   * @param output Array of object of Gender chart
   * @param dataTable  All Gender chart detail in table form with base
   */
  genderChart(output,dataTable){
    const baseValue = dataTable.bases.get('Base')[0];
    let data = [];
    output.forEach(value => {
      const object = {
        Score : value.Score,
        SeriesName  : value.SeriesName,
        Base  : baseValue
      }
      data.push(object);
    });
    return data;
  }

  /**
   * functionality for Age Chart
   * @param output Array of object of Age chart
   * @param dataTable  All Age chart detail in table form with base
   */
  ageChart(output,dataTable){
    const baseValue = dataTable.bases.get('Base')[0];
    let data = [];
    output.forEach(value => {
      const object = {
        Score : value.Score,
        SeriesName  : value.SeriesName,
        Base  : baseValue
      }
      data.push(object);
    });
    return data;
  }

  /**
   * functionality for Age Chart
   * @param output Array of object of Age chart
   * @param dataTable  All Age chart detail in table form with base
   */
  incomeChart(output,dataTable){
    const baseValue = dataTable.bases.get('Base')[0];
    let data = [];
    output.forEach(value => {
      const object = {
        Score : value.Score,
        SeriesName  : value.SeriesName,
        Base  : baseValue
      }
      data.push(object);
    });
    return data;
  }

  /**
   * functionality for Age Chart
   * @param output Array of object of Age chart
   * @param dataTable  All Age chart detail in table form with base
   */
  martialChart(output,dataTable){
    const baseValue = dataTable.bases.get('Base')[0];
    let data = [];
    output.forEach(value => {
      const object = {
        Score : value.Score,
        SeriesName  : value.SeriesName,
        Base  : baseValue
      }
      data.push(object);
    });
    return data;
  }

  
  /**
   * functionality for Age Chart
   * @param output Array of object of Age chart
   * @param dataTable  All Age chart detail in table form with base
   */
  regionChart(output,dataTable){
    const baseValue = dataTable.bases.get('Base')[0];
    let data = [];
    output.forEach(value => {
      const object = {
        Score : value.Score,
        SeriesName  : value.SeriesName,
        Base  : baseValue
      }
      data.push(object);
    });
    return data;
  }

  
  /**
   * functionality for Age Chart
   * @param output Array of object of Age chart
   * @param dataTable  All Age chart detail in table form with base
   */
  recentAndIntenderBuyerChart(output,dataTable){
    const baseValue = dataTable.bases.get('Base')[0];
    let data = [];
    output.forEach(value => {
      const object = {
        Score : value.Score,
        SeriesName  : value.SeriesName,
        Base  : baseValue
      }
      data.push(object);
    });
    return data;
  }
  


  MRIdemographicCharts(){
    const demographics : DemographicsTable = new DemographicsTable();
    this.opinionChartConfig = demographics.MRIMostlyOpinionsChartConfigration('Opinions',['v755','v756','v757','v758','v759','v760','v761','v762','v763','v764','v765','v766','v767','v768','v769','v770','v771']);
    this.secondOpinionChartConfig = demographics.MRICompletelyOpinionsChartConfigration('SecondOpinions',['v773','v774','v775','v776','v777','v778','v779','v780',]);
    this.knowledgeAreaChart = demographics.MRIRadarRoseChartConfigration('Knowledge Area',['v754'],'#2EA8DF');
    this.adviceOnTopicsChart = demographics.MRIRadarRoseChartConfigration('Advice on Topics',['v772'],'#EC75D1');

    let questionMapping  = demographics.MRIOPINIONLIFEMAPPING;
    this.opinionChartConfig.addCalculationLogic(output => {
      let table = output.TableOutput.get('Opinions');
      if(table.length){
        this.OpinionsData = this.OpinionsOnLifeChart(output,'Opinions',questionMapping);
      }
      return  output;
    },RoundOffStrategy.AfterCalculation);
    this.secondOpinionChartConfig.addCalculationLogic(output => {
      let table = output.TableOutput.get('SecondOpinions');
      if(table.length){
        this.SecondOpinionsData = this.OpinionsOnLifeChart(output,'SecondOpinions',questionMapping);
      }
      return  output;
    },RoundOffStrategy.AfterCalculation);

    this.knowledgeAreaChart.addCalculationLogic(output => {
      let table = output.TableOutput.get('Knowledge Area');
      if(table.length){
        const Base = output.Bases.get("Knowledge Area")[0].Score
        let data = [];
        table.forEach(value => {
          const object = {
            Score : value.Score,
            SeriesName  : value.SeriesName,
            Base:Base
          }
          data.push(object);
        });
        if(data.length) this.knowledgeAreaData = data;
      }
      return  output;
    },RoundOffStrategy.AfterCalculation);
    this.adviceOnTopicsChart.addCalculationLogic(output => {
      let table = output.TableOutput.get('Advice on Topics');
      if(table.length){
        const Base = output.Bases.get("Advice on Topics")[0].Score
        let data = [];
        table.forEach(value => {
          const object = {
            Score : value.Score,
            SeriesName  : value.SeriesName,
            Base:Base
          }
          data.push(object);
        });
        if(data.length) this.adviceOnTopicsData = data;
      }
      return  output;
    },RoundOffStrategy.AfterCalculation);
  }
  
  /**
   * functionality for Opinions Chart
   * @param output Array of object of Opinions chart
   */
  OpinionsOnLifeChart(output,ChartName,questionMapping){
    let table = output.TableOutput.get(ChartName);
    
      let data = [];
      const baseValue = output.Bases.get(ChartName)[0].Score
      
      let counter = 0;
      
      table.forEach((value,i) => {
        let object = {
          "values":[Math.round(value.Score)],
          'question': questionMapping[value.SeriesVariableID],
          // 'SeriesName'  : value.SeriesName,
          'Base'  : baseValue,
        }
        let index = null;
        data.forEach((val,i)=>{
          if(val.question == object.question){
            index =i;
          }
        });
        if(index != null){
          data[index].values.push(Math.round(value.Score));
        }else{
          data.push(object);
        }
      });
      return data;
    
  }

  /**
   * To Convert Data into CSV Form For Demographics
   */
  downloadExcelFile(data,chartName){
    let csvData = [];
    this.csvOptions.headers = [" "];
    csvData.push(Object.assign({}, this.csvDetailCreation(data ,chartName)));
    this.csvOptions.title = "Demographics";
   
    new AngularCsv(csvData, "Demographics-"+ chartName, this.csvOptions);
  }
  csvDetailCreation(data,sideBreak){
    let csvDetail = [];
    csvDetail.push(sideBreak);
    data.forEach((val,index)=>{
      csvDetail.push(val.Score);
      this.csvOptions.headers.push(val.SeriesName.replace(/,/g , ''));
    });
    this.csvOptions.headers.push('Base');
    csvDetail.push(data[0].Base);
    return csvDetail;
  }
  /**
   * To Convert Data into CSV Form For Demographics
   */
  MriDownloadExcelFile(data,chartName,opinions){
    let csvData = [];
    this.csvOptions.headers = [" "];
    csvData = this.MriCsvDetailCreation(data ,chartName);
    this.csvOptions.title = "Demographics";
    this.csvOptions.headers.push(opinions);
    this.csvOptions.headers.push('Base');
    new AngularCsv(csvData, "Demographics-"+ chartName, this.csvOptions);
  }
  MriCsvDetailCreation(data,chartName){
    let csvDetail = [];
    data.forEach((obj,index)=>{
      let csvRowDetail = {
        question :obj.question,
        values :[]
      };
      obj.values.forEach((value) => {
        csvRowDetail.values.push(value);
      });
      csvRowDetail.values.reverse();
      csvRowDetail.values.push(obj.Base);
      csvDetail.push(csvRowDetail);
    });
    //csvDetail.push(data[0].Base);
    return csvDetail;
  }

  ngOnDestroy(){
    this.unsubscribedemographic.next();
    this.unsubscribedemographic.complete();
  }

}
