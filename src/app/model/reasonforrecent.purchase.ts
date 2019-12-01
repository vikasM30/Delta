import {Chart} from '../shell/models/chart';
import {ChartTypes} from '../shell/enums/chart.types';
import {Measure} from '../shell/enums/measure';
import {ChartProvider} from '../shell/enums/chart.provider';
import { TimePeriod } from '../shell/models/time.period';
import { RoundOffStrategy } from '../shell/enums/round.off.strategy';
import { BreakType, show } from '../shell/operators/chart.operators';

export class ReasonforRecentPurchase {
  constructor(category) {
  }

  showDataMappingForCategory = {
    Faucet: 'v591', Showerhead: 'v692', Toilet: 'v629'
  };

  simpleTable(category, codes): Chart {
    const config = new Chart({
      SideBreak: [this.showDataMappingForCategory[category]],
      TopBreak: ['Allbrands'],
      Type: ChartTypes.Table,
      Measure: Measure.ColumnPercent
    }, 'Reason For Recent Purchase', ChartProvider.ECharts);
    config.showTopBreakOptions(0, codes);
    config.enableTimeComparison(RoundOffStrategy.BeforeBinding);
    if (TimePeriod.PreviousPeriod) {
      config.for(BreakType.TopBreak).nest(0, [TimePeriod.Variable])
      .pipe(show(0, [TimePeriod.PreviousPeriod, TimePeriod.CurrentPeriod]));
    } else {
      config.for(BreakType.TopBreak).nest(0, [TimePeriod.Variable])
      .pipe(show(0, [TimePeriod.CurrentPeriod]));
    }
    config.showSideBreakBase(0, true);
    config.addCalculationLogic(output => {
      return output;
    });
    return config;
  }

  totalAvg(category): Chart {
    const config = new Chart({
      SideBreak: [this.showDataMappingForCategory[category]],
      TopBreak: [TimePeriod.Variable],
      Type: ChartTypes.Table,
      Measure: Measure.ColumnPercent
    }, 'Reason For Recent Purchase Total Avg', ChartProvider.ECharts);
    config.enableTimeComparison(RoundOffStrategy.BeforeBinding);
    if (TimePeriod.PreviousPeriod) {
      config.showTopBreakOptions(0, [TimePeriod.PreviousPeriod, TimePeriod.CurrentPeriod]);
    } else {
      config.showTopBreakOptions(0, [TimePeriod.CurrentPeriod]);
    }
    return config;
  }

}
