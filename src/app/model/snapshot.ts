import { Chart } from 'src/app/shell/models/chart';
import { ChartTypes } from 'src/app/shell/enums/chart.types';
import { Measure } from '../shell/enums/measure';
import {ChartProvider} from '../shell/enums/chart.provider';
import { TimePeriod } from '../shell/models/time.period';
import { CollectionOutput } from '../shell/models/collectionOutput';
import { OnInit, OnDestroy, AfterContentInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FilterCondition } from '../shell/enums/filter-condition.enum';
import { BreakType } from '../shell/operators/chart.operators';
import { RoundOffStrategy } from '../shell/enums/round.off.strategy';
export class Snapshot {
  Brand: string;
  Category: string;
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
  strongRMapping={
    Delta: 'RelationshipDelta',
    American: 'RelationshipAmerican',
    Kohler: 'RelationshipKohler',
    Moen: 'RelationshipMoen',
    Peerless: 'RelationshipPeerless',
    Pfister: 'RelationshipPfister',
    Waterpik: 'RelationshipWaterpik'
  }

  brandCodes = {
    Delta: 1,
    American: 2,
    Kohler: 3,
    Moen: 4,
    Peerless: 5,
    Pfister: 6,
    Waterpik:23,
  }
 
  BrandImageryOptionMapping = {
    Delta: { option: 1 }, Moen: { option: 4 }, Kohler: { option: 3 }, Peerless: { option: 5 }, American: { option: 2 }, Pfister: { option: 6 }, Waterpik: { option: 7 }
  };
  strongOptionMapping = {
    Delta: { option: 1 }, Moen: { option: 4 }, Kohler: { option: 3 }, Peerless: { option: 5 }, American: { option: 2 }, Pfister: { option: 6 }, Waterpik: { option: 7 }
  }
  UnaidedBrandOptionMapping = {
    Delta: { option: [1] }, Moen: { option: [4] }, Kohler: { option: [3] }, Peerless: { option: [5] }, American: { option: [2] }, Pfister: { option: [6] }, Waterpik: { option: [23] }
  };
  TotalBrandOptionMapping = {
    Delta: { option: [1] }, Moen: { option: [4] }, Kohler: { option: [3] }, Peerless: { option: [5] }, American: { option: [2] }, Pfister: { option: [6] }, Waterpik: { option: [23] }
  };
  consideration = {
    Faucet: {
      Delta: 'v499', Moen: 'v502', Kohler: 'v501', Peerless: 'v503', American: 'v500', Pfister: 'v504', Waterpik: ''
    },
    Showerhead: {
      Delta: 'v529', Moen: 'v532', Kohler: 'v531', Peerless: 'v533', American: 'v530', Pfister: 'v534',Waterpik: 'v540'
    },
    Toilet: {
      Delta: 'v512', Moen: 'v515', Kohler: 'v514', Peerless: 'v516', American: 'v513', Pfister: 'v517', Waterpik: ''
    },
    TubShowerUnit: {
      Delta: 'v546', Moen: 'v549', Kohler: 'v548', Peerless: 'v550', American: 'v547', Pfister: '', Waterpik: ''
    }
  }

  Awareness = {
    Unaided: {
      Faucet: 'fauunaided', Showerhead: 'shdunaided', Toilet: 'toiunaided', TubShowerUnit: 'tubunaided'
    },
    TotalBrand: {
      Faucet: 'Faucet', Showerhead: 'Showerhead', Toilet: 'Toilet', TubShowerUnit: 'Tub'
    }
  }
  EquityOptinMapping = {
    Faucet: { Delta: { option: [1, 2] }, Moen: { option: [5, 6] }, Kohler: { option: [3, 4] }, Peerless: { option: [9, 10] }, American: { option: [7, 8] }, Pfister: { option: [11, 12] }, Waterpik: { option: [] } },
    Showerhead: { Delta: { option: [33, 34] }, Moen: { option: [39, 40] }, Kohler: { option: [37, 38] }, Peerless: { option: [45, 46] }, American: { option: [] }, Pfister: { option: [47, 48] }, Waterpik: { option: [43, 44] } },
    Toilet: { Delta: { option: [17, 18] }, Moen: { option: [21, 22] }, Kohler: { option: [19, 20] }, Peerless: { option: [25, 26] }, American: { option: [23, 24] }, Pfister: { option: [27, 28] }, Waterpik: { option: [] } },
    TubShowerUnit: { Delta: { option: [51,52] }, Moen: { option: [57,58] }, Kohler: { option: [55,56] }, Peerless: { option: [59,60] }, American: { option: [53,54] }, Pfister: { option: [] }, Waterpik: { option: [] } 
    }
  }
    private selectedBrandCode: number;

  constructor(Category: string,Brand: string) {
    this.Brand = Brand;
    this.Category = Category;
    //this.selectedBrandCode = brandCode;
  }
  getUnaided(): Chart{
    const UnaidedSidebreak = this.Awareness.Unaided[this.Category];
    const UnaidedBrandOption  =  this.UnaidedBrandOptionMapping[this.Brand].option;
    const config = new Chart({
      SideBreak: [UnaidedSidebreak],
           TopBreak: [TimePeriod.Variable],
           Type: ChartTypes.Table,
           Measure: Measure.ColumnPercent
    },'Unaided', ChartProvider.ECharts);
    if(UnaidedSidebreak==''){
      config.showLoader = false;
    }
    config.showSideBreakBase(0, true);
    config.includeNotAnswered(true);
    config.enableTimeComparison(RoundOffStrategy.BeforeBinding);
    if(TimePeriod.PreviousPeriod){
      config.showTopBreakOptions(0, [TimePeriod.PreviousPeriod, TimePeriod.CurrentPeriod]);
    }else{
      config.showTopBreakOptions(0, [TimePeriod.CurrentPeriod]);
    }
    config.showSideBreakOptions(0,UnaidedBrandOption);
    config.addCalculationLogic(output => {
      // const table = output.TableOutput.get(config.Name);
      // table.forEach(value => {
      //   value.SeriesName = this.imageryTextMapping[value.SeriesVariableID];
      // });
      return output;
    });

    return config;
    // this.Awareness.showSideBreakOptions(1, AwarenessTotalBrandOptions);
  }
  getUnaidedTrend(): Chart{
    const UnaidedSidebreak = this.Awareness.Unaided[this.Category];
    const UnaidedBrandOption  =  this.UnaidedBrandOptionMapping[this.Brand].option;
    const config = new Chart({
      SideBreak: [UnaidedSidebreak],
           TopBreak: [TimePeriod.Variable],
           Type: ChartTypes.Line,
           Measure: Measure.ColumnPercent
    },'Unaided', ChartProvider.ZingChart);
    if(UnaidedSidebreak==''){
      config.showLoader = false;
    }
    // config.enableTimeComparison(RoundOffStrategy.BeforeBinding);
    // if(TimePeriod.PreviousPeriod){
    //   config.showTopBreakOptions(0, [TimePeriod.PreviousPeriod, TimePeriod.CurrentPeriod]);
    // }else{
    //   config.showTopBreakOptions(0, [TimePeriod.CurrentPeriod]);
    // }
    config.addChartConfigChange((output, chartConfig) => {
      chartConfig.height = '300px';
      chartConfig.width = '400px';
      if(TimePeriod.Variable=="Semiannual"){
        chartConfig.scaleY.labels=[];
        chartConfig.scaleY.labels=["first","second"];
      }
      else{
      chartConfig.scaleY.labels=[TimePeriod.Variable]
      }
      return chartConfig;
    })
    config.showSideBreakOptions(0,UnaidedBrandOption);
    config.addCalculationLogic(output => {
      return output;
    });

    return config;
  }
  getTotalBrand(): Chart{
    const TotalBrandSidebreak = this.Awareness.TotalBrand[this.Category];
    const TotalBrandOption  =  this.TotalBrandOptionMapping[this.Brand].option;
    const config = new Chart({
      SideBreak: [TotalBrandSidebreak],
           TopBreak: [TimePeriod.Variable],
           Type: ChartTypes.Table,
           Measure: Measure.ColumnPercent
    },'TotalBrand', ChartProvider.ECharts);
    if(TotalBrandSidebreak==''){
      config.showLoader = false;
    }
    config.showSideBreakBase(0, true);
    config.enableTimeComparison(RoundOffStrategy.BeforeBinding);
    if(TimePeriod.PreviousPeriod){
      config.showTopBreakOptions(0, [TimePeriod.PreviousPeriod, TimePeriod.CurrentPeriod]);
    }else{
      config.showTopBreakOptions(0, [TimePeriod.CurrentPeriod]);
    }
    config.showSideBreakOptions(0,TotalBrandOption);
    config.addCalculationLogic(output => {
      // const table = output.TableOutput.get(config.Name);
      // table.forEach(value => {
      //   value.SeriesName = this.imageryTextMapping[value.SeriesVariableID];
      // });
      return output;
    });

    return config;
    // this.Awareness.showSideBreakOptions(1, AwarenessTotalBrandOptions);
  }
  getConsideration(): Chart{
    const considerationSideBreak = this.consideration[this.Category][this.Brand];
    const config = new Chart({
      SideBreak: [considerationSideBreak],
      TopBreak: [TimePeriod.Variable],
      Measure: Measure.ColumnPercent,
      Type: ChartTypes.Table
    }, 'Consideration', ChartProvider.ECharts);
    if(considerationSideBreak==''){
      config.showLoader = false;
    }
   config.combineSideBreakOptions(considerationSideBreak, [1, 2], '1st/2nd Choice (net)');
   config.showSideBreakBase(0, true);
   config.enableTimeComparison(RoundOffStrategy.BeforeBinding);
    if(TimePeriod.PreviousPeriod){
      config.showTopBreakOptions(0, [TimePeriod.PreviousPeriod, TimePeriod.CurrentPeriod]);
    }else{
      config.showTopBreakOptions(0, [TimePeriod.CurrentPeriod]);
    }
   config.includeNotAnswered(true);
   config.addCalculationLogic(output => {
    // table.forEach(value => {
    //   //value.SeriesName = this.imageryTextMapping[value.SeriesVariableID];
    // });
    return output;
  });
    return config;
  }
  getStrongRelation():Chart {
      const sidebreak =  this.strongRMapping[this.Brand];
    const strongOption = this.strongOptionMapping[this.Brand].option;
    const config = new Chart(
      {
        SideBreak: [sidebreak],
        TopBreak: [TimePeriod.Variable],
        Type: ChartTypes.Table,
        Measure: Measure.ColumnPercent
      },
      'StrongRelation',
    );

    config.showSideBreakOptions(0, [1]);
    config.showSideBreakBase(0, true);
    config.enableTimeComparison(RoundOffStrategy.BeforeBinding);
     if(TimePeriod.PreviousPeriod){
       config.showTopBreakOptions(0, [TimePeriod.PreviousPeriod, TimePeriod.CurrentPeriod]);
     }else{
       config.showTopBreakOptions(0, [TimePeriod.CurrentPeriod]);
     }
    config.showSideBreakBase(0, true);
    config.addCalculationLogic(output => {
     // table.forEach(value => {
     //   //value.SeriesName = this.imageryTextMapping[value.SeriesVariableID];
     // });
     return output;
   });
     return config;
  }
  getEquity():Chart {
    const EquityOptions = this.EquityOptinMapping[this.Category][this.Brand].option;
    const config = new Chart(
         {
           SideBreak: ['BrandEquity'],
           TopBreak: [TimePeriod.Variable],
           Type: ChartTypes.Table,
           Measure: Measure.ColumnPercent
         },
         'EquityChart',
       );
       config.showSideBreakOptions(0, EquityOptions);
       config.enableTimeComparison(RoundOffStrategy.BeforeBinding);
     if(TimePeriod.PreviousPeriod){
       config.showTopBreakOptions(0, [TimePeriod.PreviousPeriod, TimePeriod.CurrentPeriod]);
     }else{
       config.showTopBreakOptions(0, [TimePeriod.CurrentPeriod]);
     }
    config.showSideBreakBase(0, true);
      
       config.includeNotAnswered(true);
       config.addCalculationLogic(output => {
        // table.forEach(value => {
        //   //value.SeriesName = this.imageryTextMapping[value.SeriesVariableID];
        // });
        return output;
      });
        return config;
           
  }
   
  getBrandImagery(): Chart {
    const BrandImageryOption = this.BrandImageryOptionMapping[this.Brand].option;
    const config = new Chart({
      SideBreak: ['v558', 'v559', 'v560', 'v561', 'v562', 'v563', 'v564', 'v565', 'v566', 'v567', 'v568', 'v569',
        'v570', 'v571', 'v572', 'v573', 'v574', 'v575', 'v576'],
      TopBreak: [TimePeriod.Variable],
      Type: ChartTypes.Table,
      Measure: Measure.ColumnPercent
    }, 'Brand Imagery', ChartProvider.ECharts);
    config.SideBreak.forEach((value, index) => {
      config.showSideBreakOptions(index, [BrandImageryOption]);
      config.showSideBreakBase(index, true);
      config.setSideBreakFilter(value,'v467', [this.brandCodes[this.Brand]],FilterCondition.AnyItemSelected);
    });
   
    config.enableTimeComparison(RoundOffStrategy.BeforeBinding);
    if(TimePeriod.PreviousPeriod){
      config.showTopBreakOptions(0, [TimePeriod.PreviousPeriod, TimePeriod.CurrentPeriod]);
    }else{
      config.showTopBreakOptions(0, [TimePeriod.CurrentPeriod]);
    }
    config.addCalculationLogic(output => {
      const table = output.TableOutput.get(config.Name);
      table.forEach(value => {
        value.SeriesName = this.imageryTextMapping[value.SeriesVariableID];
      });
      return output;
    });

    return config;
  }
  
}