import {ChartTypes} from 'src/app/shell/enums/chart.types';
import {Measure} from 'src/app/shell/enums/measure';
import {ChartProvider} from 'src/app/shell/enums/chart.provider';
import { TimePeriod } from 'src/app/shell/models/time.period';
import { RoundOffStrategy } from 'src/app/shell/enums/round.off.strategy';
import { BreakType, show } from 'src/app/shell/operators/chart.operators';
import { Chart } from 'src/app/shell/models/chart';

export class AdDetails {

  calltoActionBrandmaaping = {
    1: 'adcalltoactionAd1',
    2: 'adcalltoactionAd2',
    3: 'adcalltoactionAd3',
    4: 'adcalltoactionAd4',
    5: 'adcalltoactionAd5',
    6: 'adcalltoactionAd6',
    7: 'adcalltoactionAd7',
    8: 'adcalltoactionAd8',
    9: 'adcalltoactionAd9',
    10: 'adcalltoactionAd10',
    11: 'adcalltoactionAd11',
    12: 'adcalltoactionAd12',
    13: 'adcalltoactionAd13',
    14: 'adcalltoactionAd14',
    15: 'adcalltoactionAd15'
  };

  adDiagnosticBrandmaaping = {
    1: 'derotationAd1',
    2: 'derotationAd2',
    3: 'derotationAd3',
    4: 'derotationAd4',
    5: 'derotationAd5',
    6: 'derotationAd6',
    7: 'derotationAd7',
    8: 'derotationAd8',
    9: 'derotationAd9',
    10: 'derotationAd10',
    11: 'derotationAd11',
    12: 'derotationAd12',
    13: 'derotationAd13',
    14: 'derotationAd14',
    15: 'derotationAd15'
  };

  adRecallBrandmaaping = {
    1: 'adRecallAd1',
    2: 'adRecallAd2',
    3: 'adRecallAd3',
    4: 'adRecallAd4',
    5: 'adRecallAd5',
    6: 'adRecallAd6',
    7: 'adRecallAd7',
    8: 'adRecallAd8',
    9: 'adRecallAd9',
    10: 'adRecallAd10',
    11: 'adRecallAd11',
    12: 'adRecallAd12',
    13: 'adRecallAd13',
    14: 'adRecallAd14',
    15: 'adRecallAd15'
  };

  brandRecallQuesMap = {
    1: 'brandingAd1',
    2: 'brandingAd2',
    3: 'brandingAd3',
    4: 'brandingAd4',
    5: 'brandingAd5',
    6: 'brandingAd6',
    7: 'brandingAd7',
    8: 'brandingAd8',
    9: 'brandingAd9',
    10: 'brandingAd10',
    11: 'brandingAd11',
    12: 'brandingAd12',
    13: 'brandingAd13',
    14: 'brandingAd14',
    15: 'brandingAd15'
  };

  Ad = {
    1: 'The Perfect Touch',
    2: 'Hydrorain One',
    3: 'Shield Yourself',
    4: 'Quality Product Touchless KF',
    5: 'Lysol ActiClean Self-Clean',
    6: 'Innovative',
    7: 'Mother Nature',
    8: 'Konnect-Pouring Made Easy',
    9: 'Verdera Voice Mirror',
    10: 'The Design',
    11: 'Life Designs- Water is Life',
    12: 'Perfect Fit-In Control',
    13: 'In2ition Two-In-One',
    14: 'Rough Water-In Control',
    15: 'Moen Flow'
};

  variableINdex: number;
  brand: '';

  getId(adname) {
    for (let index = 0; index < 15; index++) {
      if (this.Ad[index + 1] === adname) {
        this.variableINdex = index + 1;
      }
    }
  }

  callToAction(adname): Chart {
    this.getId(adname);
    const config = new Chart({
      SideBreak: [this.calltoActionBrandmaaping[this.variableINdex]],
      TopBreak: [TimePeriod.Variable],
      Type: ChartTypes.Table,
      Measure: Measure.ColumnPercent
    }, 'Ad Call To Action', ChartProvider.ECharts);
    config.enableTimeComparison(RoundOffStrategy.BeforeBinding);
    if (TimePeriod.PreviousPeriod) {
      config.showTopBreakOptions(0, [TimePeriod.PreviousPeriod, TimePeriod.CurrentPeriod]);
    } else {
      config.showTopBreakOptions(0, [TimePeriod.CurrentPeriod]);
    }
    config.showSideBreakBase(0, true);
    return config;
  }

  adDiagnostic(adname): Chart {
    this.getId(adname);
    const config = new Chart({
      SideBreak: [this.adDiagnosticBrandmaaping[this.variableINdex]],
      TopBreak: [TimePeriod.Variable],
      Type: ChartTypes.Table,
      Measure: Measure.ColumnPercent
    }, 'Ad Diagnostic', ChartProvider.ECharts);
    config.enableTimeComparison(RoundOffStrategy.BeforeBinding);
    if (TimePeriod.PreviousPeriod) {
      config.showTopBreakOptions(0, [TimePeriod.PreviousPeriod, TimePeriod.CurrentPeriod]);
    } else {
      config.showTopBreakOptions(0, [TimePeriod.CurrentPeriod]);
    }
    config.showSideBreakBase(0, true);
    return config;
  }

  adRecall(adname): Chart {
    this.getId(adname);
    const chart = new Chart({
      SideBreak: [this.adRecallBrandmaaping[this.variableINdex]],
      TopBreak: [TimePeriod.Variable],
      Type: ChartTypes.Gauge,
      Measure: Measure.ColumnPercent
    }, 'Ad Recall', ChartProvider.ECharts);

    chart.showSideBreakOptions(0, [1]);
    chart.enableTimeComparison(RoundOffStrategy.BeforeBinding);
    if (TimePeriod.PreviousPeriod) {
      chart.showTopBreakOptions(0, [TimePeriod.PreviousPeriod, TimePeriod.CurrentPeriod]);
    } else {
      chart.showTopBreakOptions(0, [TimePeriod.CurrentPeriod]);
    }
    chart.showSideBreakBase(0, true);
    chart.addChartConfigChange((output, chartConfig) => {
      chartConfig.height = '200px';
      chartConfig.width = '250px';
      chartConfig.series[0].label.normal.textStyle.fontSize = 15;
      chartConfig.series[0].label.normal.textStyle.fontWeight = 'bold';
      chartConfig.series[0].labelLine.normal.length = 15;
      // chartConfig.series[0].startAngle = (360 * output[0].Score) / 100;
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
    return ['#fff', '#969595'];
  }

  brandRecall(adname): Chart {
    this.getId(adname);
    const config = new Chart({
      TopBreak: [TimePeriod.Variable],
      SideBreak: [this.brandRecallQuesMap[this.variableINdex]],
      Measure: Measure.ColumnPercent,
      Type: ChartTypes.Table
    }, 'Brand Recall', ChartProvider.ECharts);
    if (this.brandRecallQuesMap[this.variableINdex] === '') {
      config.showLoader = false;
    }
    config.showSideBreakBase(0, true);
    config.enableTimeComparison(RoundOffStrategy.BeforeBinding);
    if (TimePeriod.PreviousPeriod) {
      config.showTopBreakOptions(0, [TimePeriod.PreviousPeriod, TimePeriod.CurrentPeriod]);
    } else {
      config.showTopBreakOptions(0, [TimePeriod.CurrentPeriod]);
    }
    config.addCalculationLogic(output => {
     return output;
    });
    return config;
  }

}
