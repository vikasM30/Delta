import {Chart} from '../shell/models/chart';
import {ChartTypes} from '../shell/enums/chart.types';
import {Measure} from '../shell/enums/measure';
import {ChartProvider} from '../shell/enums/chart.provider';
import {RoundOffStrategy} from '../shell/enums/round.off.strategy';
import {config} from 'rxjs';
import { TimePeriod } from '../shell/models/time.period';

export class OverallBrandHealth {
  private readonly consumerBrandVariableMapping = {
    1: 'RelationshipDelta',
    2: 'RelationshipAmerican',
    3: 'RelationshipKohler',
    4: 'RelationshipMoen',
    5: 'RelationshipPeerless',
    6: 'RelationshipPfister',
    7: 'RelationshipAqua',
    8: 'RelationshipGlaicer',
    23:'RelationshipWaterpik'
  };  

  //unaidedBases: number;
  BrandrelationArray:Array<Chart> = new Array<any>();
  //BrandrelationSortedArray:Array<Chart> = new Array<any>();

  constructor() {
    //this.selectedBrandCode = brandCode;
  }

  getUnaided(codes): Chart {
    const config = new Chart({
      SideBreak: ['unaided'],
      TopBreak: [TimePeriod.Variable],
      Type: ChartTypes.Table,
      Measure: Measure.ColumnPercent
    }, 'Unaided', ChartProvider.ECharts);
    config.showSideBreakOptions(0, codes);  
    config.enableTimeComparison(RoundOffStrategy.BeforeBinding);
    if(TimePeriod.PreviousPeriod){
      config.showTopBreakOptions(0, [TimePeriod.PreviousPeriod, TimePeriod.CurrentPeriod]);
    }else{
      config.showTopBreakOptions(0, [TimePeriod.CurrentPeriod]);
    } 
    config.includeNotAnswered(true);
    config.showSideBreakBase(0, true);
    config.addShowAllSeries(true);
    return config;
  }

  getTotalBrand(codes): Chart {
    const config = new Chart({
      SideBreak: ['Allbrands'],
      TopBreak: [TimePeriod.Variable],
      Type: ChartTypes.Table,
      Measure: Measure.ColumnPercent
    }, 'Total Brand(Aided + Unaided)', ChartProvider.ECharts);
    config.showSideBreakOptions(0, codes); 
    config.enableTimeComparison(RoundOffStrategy.BeforeBinding);
    if(TimePeriod.PreviousPeriod){
      config.showTopBreakOptions(0, [TimePeriod.PreviousPeriod, TimePeriod.CurrentPeriod]);
    }else{
      config.showTopBreakOptions(0, [TimePeriod.CurrentPeriod]);
    }
    config.showSideBreakBase(0, true);  
    config.addShowAllSeries(true);
    return config;
  }

  getAdvertising(codes): Chart {
    const config = new Chart({
      SideBreak: ['v468'],
      TopBreak: [TimePeriod.Variable],
      Type: ChartTypes.Table,
      Measure: Measure.ColumnPercent
    }, 'Advertising', ChartProvider.ECharts);
    config.showSideBreakOptions(0, codes); 
    config.enableTimeComparison(RoundOffStrategy.BeforeBinding);
    if(TimePeriod.PreviousPeriod){
      config.showTopBreakOptions(0, [TimePeriod.PreviousPeriod, TimePeriod.CurrentPeriod]);
    }else{
      config.showTopBreakOptions(0, [TimePeriod.CurrentPeriod]);
    }
    config.includeNotAnswered(true);
    config.showSideBreakBase(0, true);
    config.addShowAllSeries(true);
    return config;
  }

  getCustomerBrandRelationship(codes): Array<any> {  
    this.BrandrelationArray = [];  
    for(let i =0; i< codes.length; i++){
      const chart = new Chart({      
        SideBreak: [this.consumerBrandVariableMapping[codes[i]]],
        TopBreak: [TimePeriod.Variable],
        Type: ChartTypes.Gauge,
        Measure: Measure.ColumnPercent
      }, 'Consumer Brand Relationship', ChartProvider.ECharts);

      chart.enableTimeComparison(RoundOffStrategy.BeforeBinding);
      if(TimePeriod.PreviousPeriod){
        chart.showTopBreakOptions(0, [TimePeriod.PreviousPeriod, TimePeriod.CurrentPeriod]);
      }else{
        chart.showTopBreakOptions(0, [TimePeriod.CurrentPeriod]);
      }
      chart.showSideBreakOptions(0,[1,2,3]);
      chart.showSideBreakBase(0, true);
      chart.addChartConfigChange((output, chartConfig) => {
        chartConfig.height = '100px';
        chartConfig.width = '200px';
        const colors = this.getCustomerBRColors();
        chartConfig.series[0].data.forEach((val, i) => {
          val.itemStyle = {
            color: colors[i]
          };
        });
        return chartConfig;
      });
      this.BrandrelationArray.push(chart);
    }
    return this.BrandrelationArray;
  }

  getCustomerBrandRelationship1(codes): Array<any> {  
    this.BrandrelationArray = [];  
    for(let i =0; i< codes.length; i++){
      const chart = new Chart({      
        SideBreak: [this.consumerBrandVariableMapping[codes[i]]],
        TopBreak: [TimePeriod.Variable],
        Type: ChartTypes.Table,
        Measure: Measure.ColumnPercent
      }, 'Consumer Brand Relationship');

      chart.enableTimeComparison(RoundOffStrategy.BeforeBinding);
      chart.showSideBreakBase(0, true);
      if(TimePeriod.PreviousPeriod){
        chart.showTopBreakOptions(0, [TimePeriod.PreviousPeriod, TimePeriod.CurrentPeriod]);
      }else{
        chart.showTopBreakOptions(0, [TimePeriod.CurrentPeriod]);
      }

      chart.showSideBreakOptions(0,[1,2,3]);
      chart.addCalculationLogic(output => {
        
        return output;
      }
      );
        this.BrandrelationArray.push(chart);
    }
    return this.BrandrelationArray;
  }
  getCustomerBRColors() {
    return ['#A2AD00', '#0070C0', '#9B1F23', '#A2AD00', '#0070C0', '#9B1F23'];
  }
}
