import { Chart } from 'src/app/shell/models/chart';
import { ChartTypes } from 'src/app/shell/enums/chart.types';
import { Measure } from '../shell/enums/measure';
import { ChartProvider } from '../shell/enums/chart.provider';
import { TimePeriod } from '../shell/models/time.period';
import { CollectionOutput } from '../shell/models/collectionOutput';
import { OnInit, OnDestroy, AfterContentInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FilterCondition } from '../shell/enums/filter-condition.enum';
import { BreakType, show } from '../shell/operators/chart.operators';
import { RoundOffStrategy } from '../shell/enums/round.off.strategy';
export class Discriptor {
  Brandlist: string[];
  Brand: string;
  Category: string;
  Awarenesschart: Array<Chart> = new Array<any>();
  AddCharts: Array<Chart> = new Array<any>();
  AddCharts1: Array<Chart> = new Array<any>();
  Purchased: Array<Chart> = new Array<any>();

  BrandMapping = {
    1: 'Delta',
    2: 'American',
    3: 'Kohler',
    4: 'Moen',
    5: 'Peerless',
    6: 'Pfister',
    7: 'Aqua Source',
    8: 'Glacier Bay',
    9: 'Brizo',
    10: 'Grohe',
    11: 'Hansgrohe',
    12: 'Briggs',
    13: 'Crane',
    14: 'Eljer',
    15: 'Gerber',
    16: 'Jacuzzi',
    17: 'Mansfield',
    18: 'Sterling',
    19: 'Toto',
    20: 'Penguin',
    21: 'Danze',
    22: 'Speakman',
    23: 'Waterpik',
    24: 'Symmons',
    25: 'Aquatic',
    26: 'Maax',
    27: 'ASB',
    28: 'StyleSelections',
    29: 'AllenRoth',
    30: 'Swan',
    31: 'AquaGlass',
    32: 'Proflo',
    33: 'Duravit',
    34: 'Mirabelle',
    35: 'VilleroyBoch',
    36: 'Decolav',
    37: 'Rohl',
    38: 'VictoriaAlbert',
    39: 'Ronbow',
    40: 'Vortens',
    41: 'Oxygenics',
    42: 'MTI',
    44: 'Home Improvement Stores',
    45: 'Sears/Kenmore',
    46: 'GE'
  }

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

  private selectedBrandCode: number;

  constructor() {

    this.Brandlist = [];
  }


  DiscriptorChart(codes): Array<any> {
    this.Brandlist = [];


    codes.forEach(element => {
      const sidebreakcalltoAction=this.calltoActionBrandmaaping[element];
      const config = new Chart(

        {
          SideBreak: [sidebreakcalltoAction],
          TopBreak: [TimePeriod.Variable],
          Type: ChartTypes.Table,
          Measure: Measure.ColumnPercent
        },
        'adcalltoaction' + element,
      );
      config.showSideBreakOptions(0, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
     // config.showTopBreakOptions(0, [element]);
      //config.setSideBreakFilter("v582",'v577', codes,FilterCondition.AnyItemSelected);
      config.showSideBreakBase(0, true);
      config.enableTimeComparison(RoundOffStrategy.BeforeBinding);
      config.addCalculationLogic(output => {
        return output;
      });
      this.AddCharts.push(config);
    });
    return this.AddCharts;
  }
  DiscriptorTrendChart(codes): Array<any> {
    this.Brandlist = [];


    codes.forEach(element => {
      const sidebrekdiagnostic=this.adDiagnosticBrandmaaping[element];
      const config = new Chart(
        {
          SideBreak: [sidebrekdiagnostic],
          TopBreak: [TimePeriod.Variable],
          Type: ChartTypes.Table,
          Measure: Measure.ColumnPercent
        },
        'addiscriptor' + element,
      );
      config.showSideBreakOptions(0, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
      //config.setSideBreakFilter("v582",'v577', codes,FilterCondition.AnyItemSelected);
      config.showSideBreakBase(0, true);
      config.enableTimeComparison(RoundOffStrategy.BeforeBinding);
      config.addCalculationLogic(output => {
        return output;
      });
      this.AddCharts1.push(config);
    });
    return this.AddCharts1;
  }
}