import { ChartTypes } from 'src/app/shell/enums/chart.types';
import { Chart } from 'src/app/shell/models/chart';
import { ChartProvider } from 'src/app/shell/enums/chart.provider';
import { Measure } from 'src/app/shell/enums/measure';

export class AdlistConfig{
    constructor(){

    }
    adconfig(sidebreak){
        const config = new Chart({
            SideBreak: [sidebreak],
            TopBreak: [],
            Type: ChartTypes.Table,
            Measure: Measure.ColumnPercent
          }, 'Ad Detail', ChartProvider.ECharts);
          return config;
    }

}