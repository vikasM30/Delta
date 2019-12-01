import {Chart} from '../shell/models/chart';
import {ChartTypes} from '../shell/enums/chart.types';
import {Measure} from '../shell/enums/measure';
import {ChartProvider} from '../shell/enums/chart.provider';
import { TimePeriod } from '../shell/models/time.period';
import { RoundOffStrategy } from '../shell/enums/round.off.strategy';
import { BreakType, show } from '../shell/operators/chart.operators';

export class ReasonforRetailer {
  constructor(category) {
  }

  private readonly variableMappingForCharts = {
    retailersData: { Faucet: 'v628', Showerhead: 'v753', Toilet: 'v691', TubShowerUnit: ''},
    topBreakVariable: { Faucet: 'v822', Showerhead: 'v1059', Toilet: 'v852', TubShowerUnit: ''}
  };

  simpleTable(category, codes): Chart {
    // tslint:disable-next-line:no-string-literal
    const sideBreakvariable = this.variableMappingForCharts['retailersData'][category];
    // tslint:disable-next-line:no-string-literal
    const topBreakVariable = this.variableMappingForCharts['topBreakVariable'][category];
    const config = new Chart({
      SideBreak: [sideBreakvariable],
      TopBreak: [topBreakVariable],
      Type: ChartTypes.Table,
      Measure: Measure.ColumnPercent
    }, 'Reason For Retailer', ChartProvider.ECharts);
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
    // tslint:disable-next-line:no-string-literal
    const sideBreakvariable = this.variableMappingForCharts['retailersData'][category];
    const config = new Chart({
      SideBreak: [sideBreakvariable],
      TopBreak: [TimePeriod.Variable],
      Type: ChartTypes.Table,
      Measure: Measure.ColumnPercent
    }, 'Reason For Retailer total average', ChartProvider.ECharts);
    config.enableTimeComparison(RoundOffStrategy.BeforeBinding);
    if (TimePeriod.PreviousPeriod) {
      config.showTopBreakOptions(0, [TimePeriod.PreviousPeriod, TimePeriod.CurrentPeriod]);
    } else {
      config.showTopBreakOptions(0, [TimePeriod.CurrentPeriod]);
    }
    return config;
  }
}
