import {Chart} from '../shell/models/chart';
import {ChartTypes} from '../shell/enums/chart.types';
import {Measure} from '../shell/enums/measure';
import {ChartProvider} from '../shell/enums/chart.provider';
import {RoundOffStrategy} from '../shell/enums/round.off.strategy';
import {config} from 'rxjs';
import { TimePeriod } from '../shell/models/time.period';
import { FilterCondition } from '../shell/enums/filter-condition.enum';

export class OverallSnapshot {
  private readonly touchpointTextMapping = {
    v482: 'TV ad',
    v483: 'Product was on a TV show [SKIPPED]',
    v484: 'Brand at a sporting event [SKIPPED]',
    v485: 'Magazine or newspaper ad',
    v486: 'Online banner or video ad',
    v487: 'Social networking site (e.g., Twitter, Facebook)',
    v488: 'Brand' + 's website',
    v489: 'Billboard or outdoor ad [SKIPPED]',
    v490: 'Radio ad [SKIPPED]',
    v491: 'News story on TV, online, or in print',
    v492: 'Online review, article or blog',
    v493: 'Talk with friends, family or co-workers',
    v494: 'Talk with a contractor',
    v495: 'Talk with a worker in a retail store (e.g., Lowes, Home Depot)',
    v496: 'Retail store (e.g., Lowes, Home Depot)',
    v497: 'While online shopping'
  };

  private readonly imageryTextMapping = {
    v558: 'Is a brand I trust',
    v559: 'Has products that are a good value for the money',
    v560: 'Is a leader',
    v561: 'Is innovative',
    v562: 'Is creative',
    v563: 'Is a brand you can be proud to own',
    v564: 'Is a brand that plays it safe',
    v565: 'Has a variety of styles and finishes [REMOVED 2017.Q2] [SKIPPED]',
    v566: 'Offers products designed to be practical and functional',
    v567: 'Is a high quality brand',
    v568: 'Is a brand worth paying more for',
    v569: 'Is a reliable, dependable brand',
    v570: 'Meets a true need',
    v571: 'Is a respectable brand',
    v572: 'Provides products that are well thought out',
    v573: 'Makes a bit of a statement about you',
    v574: 'Tends to have more higher-price products than lower-price products',
    v575: 'Has products you would see in a high-end home',
    v576: 'Has designs that are new / up-to-date'
  };

  private readonly consumerBrandVariableMapping = {
    1: 'RelationshipDelta',
    2: 'RelationshipAmerican',
    3: 'RelationshipKohler',
    4: 'RelationshipMoen',
    5: 'RelationshipPeerless',
    6: 'RelationshipPfister',
    23: 'RelationshipWaterpik'
  };
  brandCodes = {
    1: '1',
    2: '2',
    3: '3',
    4: '4',
    5: '5',
    6: '6',
    23:'7',
  }

  private selectedBrandCode: number;

  constructor(brandCode: number) {
    this.selectedBrandCode = brandCode;
  }

  getUnaided(): Chart {
    const config = new Chart({
      SideBreak: ['unaided'],
      TopBreak: [TimePeriod.Variable],
      Type: ChartTypes.Table,
      Measure: Measure.ColumnPercent
    }, 'Unaided', ChartProvider.ECharts);

    config.enableTimeComparison(RoundOffStrategy.BeforeBinding);
    if(TimePeriod.PreviousPeriod){
      config.showTopBreakOptions(0, [TimePeriod.PreviousPeriod, TimePeriod.CurrentPeriod]);
    }else{
      config.showTopBreakOptions(0, [TimePeriod.CurrentPeriod]);
    }
    config.includeNotAnswered(true);
    config.showSideBreakBase(0, true);
    config.SideBreak.forEach((value, index) => {
      config.showSideBreakOptions(index, [this.selectedBrandCode]);
    });
    config.addShowAllSeries(true);
    return config;
  }

  getTotalBrand(): Chart {
    const config = new Chart({
      SideBreak: ['Allbrands'],
      TopBreak: [TimePeriod.Variable],
      Type: ChartTypes.Table,
      Measure: Measure.ColumnPercent
    }, 'Total Brand(Aided + Unaided)', ChartProvider.ECharts);

    config.enableTimeComparison(RoundOffStrategy.BeforeBinding);
    if(TimePeriod.PreviousPeriod){
      config.showTopBreakOptions(0, [TimePeriod.PreviousPeriod, TimePeriod.CurrentPeriod]);
    }else{
      config.showTopBreakOptions(0, [TimePeriod.CurrentPeriod]);
    }
    config.showSideBreakBase(0, true);
    config.SideBreak.forEach((value, index) => {
      config.showSideBreakOptions(index, [this.selectedBrandCode]);
    });
    return config;
  }

  getAdvertising(): Chart {
    const config = new Chart({
      SideBreak: ['v468'],
      TopBreak: [TimePeriod.Variable],
      Type: ChartTypes.Table,
      Measure: Measure.ColumnPercent
    }, 'Advertising', ChartProvider.ECharts);

    config.includeNotAnswered(true);
    config.enableTimeComparison(RoundOffStrategy.BeforeBinding);
    if(TimePeriod.PreviousPeriod){
      config.showTopBreakOptions(0, [TimePeriod.PreviousPeriod, TimePeriod.CurrentPeriod]);
    }else{
      config.showTopBreakOptions(0, [TimePeriod.CurrentPeriod]);
    }
    config.showSideBreakBase(0, true);
    config.SideBreak.forEach((value, index) => {
      config.showSideBreakOptions(index, [this.selectedBrandCode]);
    });
    return config;
  }

  getTouchpointRecall(): Chart {
    let touchpointvar = 1;
    const config = new Chart({
      SideBreak: ['v482', 'v483', 'v484', 'v485', 'v486', 'v487', 'v488', 'v489', 'v490', 'v491', 'v492', 'v493', 'v494', 'v495', 'v496', 'v497'],
      TopBreak: [TimePeriod.Variable],
      Type: ChartTypes.Table,
      Measure: Measure.ColumnPercent
    }, 
    'Touchpoint Recall', ChartProvider.ECharts);
    config.enableTimeComparison(RoundOffStrategy.BeforeBinding);
    if(TimePeriod.PreviousPeriod){
      config.showTopBreakOptions(0, [TimePeriod.PreviousPeriod, TimePeriod.CurrentPeriod]);
    }else{
      config.showTopBreakOptions(0, [TimePeriod.CurrentPeriod]);
    }
    config.SideBreak.forEach((value,index)=>{
      config.showSideBreakBase(index, true);
    });
    config.SideBreak.forEach((value, index) => {
      if (this.selectedBrandCode == 3) {
        touchpointvar = 2;
      }
      if(this.selectedBrandCode == 4){
        touchpointvar = 3;
      }
      config.showSideBreakOptions(index, [touchpointvar]);
      config.setSideBreakFilter(value,'v467', [this.selectedBrandCode],FilterCondition.AnyItemSelected); 
    });   
    config.includeNotAnswered(true);
    config.addCalculationLogic(output => {
      let table = output.TableOutput.get(config.Name);
      table = table.filter(val => {
        val.SeriesName = this.touchpointTextMapping[val.SeriesVariableID];
        return val.SeriesCode !== 'na';
      });
      output.TableOutput.set(config.Name, table);
      return output;
    });
    return config;
  }

  getBrandImagery(codeVal): Chart {
    const config = new Chart({
      SideBreak: ['v558', 'v559', 'v560', 'v561', 'v562', 'v563', 'v564', 'v565', 'v566', 'v567', 'v568', 'v569','v570', 'v571', 'v572', 'v573', 'v574', 'v575', 'v576'],
      TopBreak:[TimePeriod.Variable],
      Type: ChartTypes.Table,
      Measure: Measure.ColumnPercent
    }, 'Brand Imagery', ChartProvider.ECharts);

    config.enableTimeComparison(RoundOffStrategy.BeforeBinding);
    if(TimePeriod.PreviousPeriod){
      config.showTopBreakOptions(0, [TimePeriod.PreviousPeriod, TimePeriod.CurrentPeriod]);
    }else{
      config.showTopBreakOptions(0, [TimePeriod.CurrentPeriod]);
    }
    config.SideBreak.forEach((value,index)=>{
      config.showSideBreakBase(index, true);
    });
    config.SideBreak.forEach((value, index) => {
      config.showSideBreakBase(index, true);
      config.showSideBreakOptions(index, [this.brandCodes[codeVal]]);
      config.setSideBreakFilter(value,'v467', [codeVal],FilterCondition.AnyItemSelected);
    });

    config.addCalculationLogic(output => {
      const table = output.TableOutput.get(config.Name);
      table.forEach(value => {
        value.SeriesName = this.imageryTextMapping[value.SeriesVariableID];
      });
      return output;
    });
    return config;
  }

  getCustomerBrandRelationship(): Chart {
    const chart = new Chart({
      SideBreak: [this.consumerBrandVariableMapping[this.selectedBrandCode]],
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
    // chart.SideBreak.forEach((value, index) => {
    //   chart.showSideBreakOptions(index, [this.selectedBrandCode]);
    // });
  
    chart.addChartConfigChange((output, chartConfig) => {
      chartConfig.height = '150px';
      chartConfig.width = '400px';
      const colors = this.getCustomerBRColors();
      chartConfig.series[0].data.forEach((val, i) => {
        val.itemStyle = {
          color: colors[i]
        };
      });
      return chartConfig;
    });
    return chart;
  }

  getCustomerBRColors() {
    return ['#A2AD00', '#0070C0', '#9B1F23', '#A2AD00', '#0070C0', '#9B1F23'];
  }
}
