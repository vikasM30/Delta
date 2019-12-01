import { Chart } from '../shell/models/chart';
import { Measure } from '../shell/enums/measure';
import { ChartTypes } from '../shell/enums/chart.types';
import { CollectionOutput } from '../shell/models/collectionOutput';

export class Dummy {
    constructor() {

    }

    getAwarenessConfig(): Chart {
        const awareness = new Chart({
            SideBreak: ['v12'],
            TopBreak: [],
            Measure: Measure.ColumnPercent,
            Type: ChartTypes.Table
        });

        // awareness.addCalculationLogic((output: CollectionOutput) => {
            
        //     return output;
        // });

        return awareness;
    }

    // getConsiderationCOnfig(): Chart {

    // }

}