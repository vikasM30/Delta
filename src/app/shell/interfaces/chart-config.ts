import {ChartTypes} from '../enums/chart.types';
import {Measure} from '../enums/measure';

export interface ChartConfig {
  SideBreak: string[];
  TopBreak: string[];
  Type: ChartTypes;
  Measure: Measure;
}
