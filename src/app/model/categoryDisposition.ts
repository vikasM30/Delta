import { Chart } from '../shell/models/chart';
import { ChartTypes } from '../shell/enums/chart.types';
import { Measure } from '../shell/enums/measure';
import { ChartProvider } from '../shell/enums/chart.provider';
import { RoundOffStrategy } from '../shell/enums/round.off.strategy';
import { config } from 'rxjs';
import { TimePeriod } from '../shell/models/time.period';
import { FilterCondition } from '../shell/enums/filter-condition.enum';
import { AssetMappings } from './asset.mappings';
import { BreakType, show } from '../shell/operators/chart.operators';
import { ConfigDefaults } from 'angular7-csv/dist/Angular-csv';

export class CategoryDisposition {
  constructor() { }

  private readonly variableMappingForCharts = {
    topBreakVariable: {Faucet: 'v595', Showerhead: 'v695', Toilet: 'v632', TubShowerUnit: ''},
    influenceSideCode: { Faucet: 'v627', Showerhead: 'v752', Toilet: 'v690', TubShowerUnit: '' },
    installedSideCode: { Faucet: 'v621', Showerhead: 'v744', Toilet: 'v684', TubShowerUnit: '' },
    purchasePrice: { Faucet: 'fau_Price', Showerhead: 'shd_Price', Toilet: 'toi_Price', TubShowerUnit: '' },
    purchaseAverage: {Faucet: 'v624', Showerhead: 'v748', Toilet: 'v687', TubShowerUnit: '' },

    whereBought: { Faucet: 'v822', Showerhead: 'v1059', Toilet: 'v852', TubShowerUnit: '' },
    whereBoughtOption: {
      Faucet: ['v823','v824','v825','v826','v827','v828','v829','v830','v831','v832','v833','v834'],
      Showerhead: ['v1060','v1061','v1062','v1063','v1064','v1065','v1066','v1067','v1068','v1069','v1070','v1071'],
      Toilet: ['v924','v925','v926','v927','v928','v929','v930','v931','v932','v933','v934','v935']
    },
    whereShopped: { Faucet: 'v786', Showerhead: 'v1214', Toilet: 'v870', TubShowerUnit: '' },
    whereShoppedOption: {
      Faucet: ['v787','v788','v789','v790','v791','v792','v793','v794','v795','v796','v797','v798','v799','v800','v801','v802','v803'],
      Showerhead: ['v1024','v1025','v1026','v1027','v1028','v1029','v1030','v1031','v1032','v1033','v1034','v1035','v1036','v1037','v1038','v1039','v1040'],
      Toilet: ['v871','v872','v873','v874','v875','v876','v877','v878','v879','v880','v881','v882','v883','v884','v885','v886','v887']
    },
    totalShopped: {Faucet: 'RECENT_FAU13b_NEW_CAT_total1', Showerhead: 'RECENT_SHD13b_NEW_CAT_total1', Toilet: 'RECENT_TOI13b_NEW_CAT_total1', TubShowerUnit: '' },
    totalBought: {Faucet: 'RECENT_FAU13d_NEW_CAT_total1', Showerhead: 'RECENT_SHD13d_NEW_CAT_total1', Toilet: 'RECENT_TOI13d_NEW_CAT_total1', TubShowerUnit: '' },

    reasonForCategoryChoice: { Faucet: 'v622', Showerhead: 'v745', Toilet: 'v685', TubShowerUnit: '' }    
  }

  BrandMapping = AssetMappings.brandNameAndCodes;

  getWhoInfluenced(category, codes): Chart {
    const sideBreakVariable = this.variableMappingForCharts['influenceSideCode'][category];
    const topBreakVariable = this.variableMappingForCharts['topBreakVariable'][category];
    const config = new Chart({
      SideBreak: [sideBreakVariable],
      TopBreak: [topBreakVariable],
      Type: ChartTypes.Table,
      Measure: Measure.ColumnPercent
    }, 'Who Influenced', ChartProvider.ECharts);
    config.showTopBreakOptions(0, codes);
    if(TimePeriod.Variable){
      config.enableTimeComparison(RoundOffStrategy.BeforeBinding);
      if (TimePeriod.PreviousPeriod) {
        config.for(BreakType.TopBreak).nest(0, [TimePeriod.Variable]).pipe(show(0, [TimePeriod.PreviousPeriod, TimePeriod.CurrentPeriod]));
      } else {
        config.for(BreakType.TopBreak).nest(0, [TimePeriod.Variable]).pipe(show(0, [TimePeriod.CurrentPeriod]));
      }
    }
    config.showSideBreakBase(0, true);
    return config;
  }

  getWhoInstalled(category, codes): Chart {
    const sideBreakVariable = this.variableMappingForCharts['installedSideCode'][category];
    const topBreakVariable = this.variableMappingForCharts['topBreakVariable'][category];
    const config = new Chart({
      SideBreak: [sideBreakVariable],
      TopBreak: [topBreakVariable],
      Type: ChartTypes.Table,
      Measure: Measure.ColumnPercent
    }, 'Who Installed', ChartProvider.ECharts);
    config.showTopBreakOptions(0, codes);
    if(TimePeriod.Variable){
      config.enableTimeComparison(RoundOffStrategy.BeforeBinding);
      if (TimePeriod.PreviousPeriod) {
        config.for(BreakType.TopBreak).nest(0, [TimePeriod.Variable]).pipe(show(0, [TimePeriod.PreviousPeriod, TimePeriod.CurrentPeriod]));
      } else {
        config.for(BreakType.TopBreak).nest(0, [TimePeriod.Variable]).pipe(show(0, [TimePeriod.CurrentPeriod]));
      }
    }
    config.showSideBreakBase(0, true);
    return config;
  }

  getPurchasePrice(category, codes): Chart {
    const sideBreakVariable = this.variableMappingForCharts['purchasePrice'][category];
    const topBreakVariable = this.variableMappingForCharts['topBreakVariable'][category];
    const config = new Chart({
      SideBreak: [sideBreakVariable],
      TopBreak: [topBreakVariable],
      Type: ChartTypes.Table,
      Measure: Measure.ColumnPercent
    }, 'Purchase Price', ChartProvider.ECharts);
    config.showTopBreakOptions(0, codes);
    if(TimePeriod.Variable){
      config.enableTimeComparison(RoundOffStrategy.BeforeBinding);
      if (TimePeriod.PreviousPeriod) {
        config.for(BreakType.TopBreak).nest(0, [TimePeriod.Variable]).pipe(show(0, [TimePeriod.PreviousPeriod, TimePeriod.CurrentPeriod]));
      } else {
        config.for(BreakType.TopBreak).nest(0, [TimePeriod.Variable]).pipe(show(0, [TimePeriod.CurrentPeriod]));
      }
    }
    config.showSideBreakOptions(0, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    config.showSideBreakBase(0, true);
    return config;
  }

  getPurchasePriceAverage(category, codes): Chart {
    const sideBreakVariable = this.variableMappingForCharts['purchaseAverage'][category];
    const topBreakVariable = this.variableMappingForCharts['topBreakVariable'][category];
    const config = new Chart({
      SideBreak: [sideBreakVariable],
      TopBreak: [topBreakVariable],
      Type: ChartTypes.Table,
      Measure: Measure.Mean
    }, 'Purchase Price Mean', ChartProvider.ECharts);
    config.showTopBreakOptions(0, codes);
    if(TimePeriod.Variable){
      config.enableTimeComparison(RoundOffStrategy.BeforeBinding);
      if (TimePeriod.PreviousPeriod) {
        config.for(BreakType.TopBreak).nest(0, [TimePeriod.Variable]).pipe(show(0, [TimePeriod.PreviousPeriod, TimePeriod.CurrentPeriod]));
      } else {
        config.for(BreakType.TopBreak).nest(0, [TimePeriod.Variable]).pipe(show(0, [TimePeriod.CurrentPeriod]));
      }
    }
    config.showSideBreakBase(0, true);
    return config;
  }

  getPurchasePriceMedian(category, codes): Chart {
    const sideBreakVariable = this.variableMappingForCharts['purchaseAverage'][category];
    const topBreakVariable = this.variableMappingForCharts['topBreakVariable'][category];
    const config = new Chart({
      SideBreak: [sideBreakVariable],
      TopBreak: [topBreakVariable],
      Type: ChartTypes.Table,
      Measure: Measure.Median
    }, 'Purchase Price Median', ChartProvider.ECharts);
    config.showTopBreakOptions(0, codes);
    if(TimePeriod.Variable){
      config.enableTimeComparison(RoundOffStrategy.BeforeBinding);
      if (TimePeriod.PreviousPeriod) {
        config.for(BreakType.TopBreak).nest(0, [TimePeriod.Variable]).pipe(show(0, [TimePeriod.PreviousPeriod, TimePeriod.CurrentPeriod]));
      } else {
        config.for(BreakType.TopBreak).nest(0, [TimePeriod.Variable]).pipe(show(0, [TimePeriod.CurrentPeriod]));
      }
    }
    config.showSideBreakBase(0, true);
    return config;
  }

  getReasonCategoryChoice(category, codes): Chart {
    const sideBreakvariable  = this.variableMappingForCharts['reasonForCategoryChoice'][category];
    const topBreakVariable = this.variableMappingForCharts['topBreakVariable'][category];
    const config = new Chart({
      SideBreak: [sideBreakvariable],
      TopBreak: [topBreakVariable],
      Type: ChartTypes.Table,
      Measure: Measure.ColumnPercent
    }, 'Reason for Brand choice', ChartProvider.ECharts);
    config.showTopBreakOptions(0, codes);
    if(TimePeriod.Variable){
      config.enableTimeComparison(RoundOffStrategy.BeforeBinding);
      if (TimePeriod.PreviousPeriod) {
        config.for(BreakType.TopBreak).nest(0, [TimePeriod.Variable]).pipe(show(0, [TimePeriod.PreviousPeriod, TimePeriod.CurrentPeriod]));
      } else {
        config.for(BreakType.TopBreak).nest(0, [TimePeriod.Variable]).pipe(show(0, [TimePeriod.CurrentPeriod]));
      }
    }
    config.showSideBreakBase(0, true);
    return config;
  }

  getReasonCategoryChoiceTotalAverage(category, codes): Chart {
    const sideBreakvariable = this.variableMappingForCharts['reasonForCategoryChoice'][category];
    const topBreakVariable = this.variableMappingForCharts['topBreakVariable'][category];
    const config = new Chart({
      SideBreak: [sideBreakvariable],
      TopBreak: [TimePeriod.Variable],
      Type: ChartTypes.Table,
      Measure: Measure.ColumnPercent
    }, 'Reason for Brand choice Total Average', ChartProvider.ECharts);
    // config.showSideBreakOptions(0, [2]);
    config.enableTimeComparison(RoundOffStrategy.BeforeBinding);
    if(TimePeriod.PreviousPeriod){
      config.showTopBreakOptions(0, [TimePeriod.PreviousPeriod, TimePeriod.CurrentPeriod]);
    }else{
      config.showTopBreakOptions(0, [TimePeriod.CurrentPeriod]);
    }
    return config;
  }

  getTotalBoughtInstore(category, codes): Chart{
    const boughtBreakvariable = this.variableMappingForCharts['totalBought'][category];
    const topBreakVariable = this.variableMappingForCharts['topBreakVariable'][category];
    const config = new Chart({
      SideBreak: [boughtBreakvariable],
      TopBreak: [topBreakVariable],
      Type: ChartTypes.Table,
      Measure: Measure.ColumnPercent
    }, 'Total Bought Instore', ChartProvider.ECharts);
    config.showTopBreakOptions(0, codes);
    config.showSideBreakOptions(0, [1]);
    if(TimePeriod.Variable){
      config.enableTimeComparison(RoundOffStrategy.BeforeBinding);
      if (TimePeriod.PreviousPeriod) {
        config.for(BreakType.TopBreak).nest(0, [TimePeriod.Variable]).pipe(show(0, [TimePeriod.PreviousPeriod, TimePeriod.CurrentPeriod]));
      } else {
        config.for(BreakType.TopBreak).nest(0, [TimePeriod.Variable]).pipe(show(0, [TimePeriod.CurrentPeriod]));
      }
    }
    config.showSideBreakBase(0, true);
    config.addShowAllSeries(true);
    return config;
  }

  getTotalBoughtOnline(category, codes): Chart{
    const boughtBreakvariable = this.variableMappingForCharts['totalBought'][category];
    const topBreakVariable = this.variableMappingForCharts['topBreakVariable'][category];
    const config = new Chart({
      SideBreak: [boughtBreakvariable],
      TopBreak: [topBreakVariable],
      Type: ChartTypes.Table,
      Measure: Measure.ColumnPercent
    }, 'Total Bought Online', ChartProvider.ECharts);
    config.showTopBreakOptions(0, codes);
    config.showSideBreakOptions(0, [2]);
    if(TimePeriod.Variable){
      config.enableTimeComparison(RoundOffStrategy.BeforeBinding);
      if (TimePeriod.PreviousPeriod) {
        config.for(BreakType.TopBreak).nest(0, [TimePeriod.Variable]).pipe(show(0, [TimePeriod.PreviousPeriod, TimePeriod.CurrentPeriod]));
      } else {
        config.for(BreakType.TopBreak).nest(0, [TimePeriod.Variable]).pipe(show(0, [TimePeriod.CurrentPeriod]));
      }
    }
    config.showSideBreakBase(0, true);
    config.addShowAllSeries(true);
    return config;
  }

  getTotalShoppedInstore(category, codes): Chart{
    const boughtBreakvariable = this.variableMappingForCharts['totalShopped'][category];
    const topBreakVariable = this.variableMappingForCharts['topBreakVariable'][category];
    const config = new Chart({
      SideBreak: [boughtBreakvariable],
      TopBreak: [topBreakVariable],
      Type: ChartTypes.Table,
      Measure: Measure.ColumnPercent
    }, 'Total Bought Instore', ChartProvider.ECharts);
    config.showTopBreakOptions(0, codes);
    config.showSideBreakOptions(0, [1]);
    if(TimePeriod.Variable){
      config.enableTimeComparison(RoundOffStrategy.BeforeBinding);
      if (TimePeriod.PreviousPeriod) {
        config.for(BreakType.TopBreak).nest(0, [TimePeriod.Variable]).pipe(show(0, [TimePeriod.PreviousPeriod, TimePeriod.CurrentPeriod]));
      } else {
        config.for(BreakType.TopBreak).nest(0, [TimePeriod.Variable]).pipe(show(0, [TimePeriod.CurrentPeriod]));
      }
    }
    config.showSideBreakBase(0, true);
    config.addShowAllSeries(true);
    return config;
  }

  getTotalShoppedOnline(category, codes): Chart{
    const boughtBreakvariable = this.variableMappingForCharts['totalShopped'][category];
    const topBreakVariable = this.variableMappingForCharts['topBreakVariable'][category];
    const config = new Chart({
      SideBreak: [boughtBreakvariable],
      TopBreak: [topBreakVariable],
      Type: ChartTypes.Table,
      Measure: Measure.ColumnPercent
    }, 'Total Bought Instore', ChartProvider.ECharts);
    config.showTopBreakOptions(0, codes);
    config.showSideBreakOptions(0, [2]);
    if(TimePeriod.Variable){
      config.enableTimeComparison(RoundOffStrategy.BeforeBinding);
      if (TimePeriod.PreviousPeriod) {
        config.for(BreakType.TopBreak).nest(0, [TimePeriod.Variable]).pipe(show(0, [TimePeriod.PreviousPeriod, TimePeriod.CurrentPeriod]));
      } else {
        config.for(BreakType.TopBreak).nest(0, [TimePeriod.Variable]).pipe(show(0, [TimePeriod.CurrentPeriod]));
      }
    }
    config.showSideBreakBase(0, true);
    config.addShowAllSeries(true);
    return config;
  }
  
  getWhereBoughtTotal(category, codes): Chart {
    const boughtBreakvariable = this.variableMappingForCharts['whereBought'][category];
    const topBreakVariable = this.variableMappingForCharts['topBreakVariable'][category];
    const config = new Chart({
      SideBreak: [boughtBreakvariable],
      TopBreak: [topBreakVariable],
      Type: ChartTypes.Table,
      Measure: Measure.ColumnPercent
    }, 'Where Bought Total', ChartProvider.ECharts);
    config.showTopBreakOptions(0, codes);
    if(TimePeriod.Variable){
      config.enableTimeComparison(RoundOffStrategy.BeforeBinding);
      if (TimePeriod.PreviousPeriod) {
        config.for(BreakType.TopBreak).nest(0, [TimePeriod.Variable]).pipe(show(0, [TimePeriod.PreviousPeriod, TimePeriod.CurrentPeriod]));
      } else {
        config.for(BreakType.TopBreak).nest(0, [TimePeriod.Variable]).pipe(show(0, [TimePeriod.CurrentPeriod]));
      }
    }
    config.showSideBreakBase(0, true);
    config.addShowAllSeries(true);
    return config;
  }

  getWhereShoppedTotal(category, codes): Chart {
    const shoppedBreakvariable = this.variableMappingForCharts['whereShopped'][category];
    const topBreakVariable = this.variableMappingForCharts['topBreakVariable'][category];
    const config = new Chart({
      SideBreak: [shoppedBreakvariable],
      TopBreak: [topBreakVariable],
      Type: ChartTypes.Table,
      Measure: Measure.ColumnPercent
    }, 'Where Bought Total', ChartProvider.ECharts);
    config.showTopBreakOptions(0, codes);
    if(TimePeriod.Variable){
      config.enableTimeComparison(RoundOffStrategy.BeforeBinding);
      if (TimePeriod.PreviousPeriod) {
        config.for(BreakType.TopBreak).nest(0, [TimePeriod.Variable]).pipe(show(0, [TimePeriod.PreviousPeriod, TimePeriod.CurrentPeriod]));
      } else {
        config.for(BreakType.TopBreak).nest(0, [TimePeriod.Variable]).pipe(show(0, [TimePeriod.CurrentPeriod]));
      }
    }
    config.showSideBreakBase(0, true);
    config.addShowAllSeries(true);
    return config;
  }

  getWhereBoughtInstore(category, codes): Chart {
    const sideBreakvariable = this.variableMappingForCharts['whereBought'][category];
    const topBreakVariable = this.variableMappingForCharts['topBreakVariable'][category];
    const config = new Chart({
      SideBreak: [sideBreakvariable],
      TopBreak: [topBreakVariable],
      Type: ChartTypes.Table,
      Measure: Measure.ColumnPercent
    }, 'Where Bought In Store', ChartProvider.ECharts);
    config.showTopBreakOptions(0, codes);
    const nestVariables = this.variableMappingForCharts.whereBoughtOption[category];
    const shownOptions = [];
    nestVariables.forEach((val, index) => shownOptions.push(show(index, [1])));
    const nest = config.for(BreakType.TopBreak).nest(0, nestVariables);
    const nestChild = nest.pipe.apply(nest, shownOptions);
    nestVariables.forEach((val, index) => {
      if (TimePeriod.PreviousPeriod) {
        nestChild.nest(index, [TimePeriod.Variable]).pipe(show(0, [TimePeriod.PreviousPeriod, TimePeriod.CurrentPeriod]));
      } else {
        nestChild.nest(index, [TimePeriod.Variable]).pipe(show(0, [TimePeriod.CurrentPeriod]));
      }
    });
    config.enableTimeComparison(RoundOffStrategy.BeforeBinding);
    config.showSideBreakBase(0, true);
    config.addShowAllSeries(true);
    return config;
  }

  getWhereShoppedInstore(category, codes): Chart {
    const sideBreakvariable = this.variableMappingForCharts['whereShopped'][category];
    const topBreakVariable = this.variableMappingForCharts['topBreakVariable'][category];
    const config = new Chart({
      SideBreak: [sideBreakvariable],
      TopBreak: [topBreakVariable],
      Type: ChartTypes.Table,
      Measure: Measure.ColumnPercent
    }, 'Where Bought In Store', ChartProvider.ECharts);
    config.showTopBreakOptions(0, codes);
    const nestVariables = this.variableMappingForCharts.whereShoppedOption[category];
    const shownOptions = [];
    nestVariables.forEach((val, index) => shownOptions.push(show(index, [1])));
    const nest = config.for(BreakType.TopBreak).nest(0, nestVariables);
    const nestChild = nest.pipe.apply(nest, shownOptions);
    nestVariables.forEach((val, index) => {
      if (TimePeriod.PreviousPeriod) {
        nestChild.nest(index, [TimePeriod.Variable]).pipe(show(0, [TimePeriod.PreviousPeriod, TimePeriod.CurrentPeriod]));
      } else {
        nestChild.nest(index, [TimePeriod.Variable]).pipe(show(0, [TimePeriod.CurrentPeriod]));
      }
    });
    config.enableTimeComparison(RoundOffStrategy.BeforeBinding);
    config.showSideBreakBase(0, true);
    config.addShowAllSeries(true);
    return config;
  }

  getWhereBoughtOnline(category, codes): Chart {
    const sideBreakvariable = this.variableMappingForCharts['whereBought'][category];
    const topBreakVariable = this.variableMappingForCharts['topBreakVariable'][category];
    const config = new Chart({
      SideBreak: [sideBreakvariable],
      TopBreak: [topBreakVariable],
      Type: ChartTypes.Table,
      Measure: Measure.ColumnPercent
    }, 'Where Bought In Store', ChartProvider.ECharts);
    config.showTopBreakOptions(0, codes);
    const nestVariables = this.variableMappingForCharts.whereBoughtOption[category];
    const shownOptions = [];
    nestVariables.forEach((val, index) => shownOptions.push(show(index, [2])));
    const nest = config.for(BreakType.TopBreak).nest(0, nestVariables);
    const nestChild = nest.pipe.apply(nest, shownOptions);
    nestVariables.forEach((val, index) => {
      if (TimePeriod.PreviousPeriod) {
        nestChild.nest(index, [TimePeriod.Variable]).pipe(show(0, [TimePeriod.PreviousPeriod, TimePeriod.CurrentPeriod]));
      } else {
        nestChild.nest(index, [TimePeriod.Variable]).pipe(show(0, [TimePeriod.CurrentPeriod]));
      }
    });
    config.enableTimeComparison(RoundOffStrategy.BeforeBinding);
    config.showSideBreakBase(0, true);
    config.addShowAllSeries(true);
    return config;
  }
  getWhereShoppedOnline(category, codes): Chart {
    const sideBreakvariable = this.variableMappingForCharts['whereShopped'][category];
    const topBreakVariable = this.variableMappingForCharts['topBreakVariable'][category];
    const config = new Chart({
      SideBreak: [sideBreakvariable],
      TopBreak: [topBreakVariable],
      Type: ChartTypes.Table,
      Measure: Measure.ColumnPercent
    }, 'Where Bought In Store', ChartProvider.ECharts);
    config.showTopBreakOptions(0, codes);
    const nestVariables = this.variableMappingForCharts.whereShoppedOption[category];
    const shownOptions = [];
    nestVariables.forEach((val, index) => shownOptions.push(show(index, [2])));
    const nest = config.for(BreakType.TopBreak).nest(0, nestVariables);
    const nestChild = nest.pipe.apply(nest, shownOptions);
    nestVariables.forEach((val, index) => {
      if (TimePeriod.PreviousPeriod) {
        nestChild.nest(index, [TimePeriod.Variable]).pipe(show(0, [TimePeriod.PreviousPeriod, TimePeriod.CurrentPeriod]));
      } else {
        nestChild.nest(index, [TimePeriod.Variable]).pipe(show(0, [TimePeriod.CurrentPeriod]));
      }
    });
    config.enableTimeComparison(RoundOffStrategy.BeforeBinding);
    config.showSideBreakBase(0, true);
    config.addShowAllSeries(true);
    return config;
  }
}
