import { Chart } from 'src/app/shell/models/chart';
import { ChartTypes } from 'src/app/shell/enums/chart.types';
import { Measure } from 'src/app/shell/enums/measure';
import { ChartProvider } from 'src/app/shell/enums/chart.provider';
import { RoundOffStrategy } from 'src/app/shell/enums/round.off.strategy';
import { TimePeriod } from 'src/app/shell/models/time.period';
import { FilterCondition } from 'src/app/shell/enums/filter-condition.enum';
import { config } from 'rxjs';

export class TouchpointRecall {
    private readonly MAPPING = {
        v482: "TV ad",
        v485: "Magazine or newspaper ad",
        v486: "Online banner or video ad",
        v487: "Social networking site ",
        v488: "Brand's website",
        v491: "News story on TV, online, or in print",
        v492: "Online review, article or blog",
        v493: "Talk with friends, family or co-workers",
        v494: "Talk with a contractor",
        v495: "Talk with a worker in a retail store",
        v496: "Retail store",
        v497: "While online shopping",
    };
    brandCodes = {
        1:'1',
        3:'2',
        4:'3'
    }
    brandName = {
        1:'Delta',
        3:'Kohler',
        4:'Moen'
    }
    constructor(){

    }
    /**
     * Create Chart Config For Each brand and transpose data
     * @param codes Get Brand Codes
     */
    getTouchpointRecallData(codes) {
        let headConfig:Array<any> = new Array<any>();
        codes.forEach((codeVal, i) => { 
            const config = new Chart({
                SideBreak: ['v482','v485','v486','v487','v488','v491','v492','v493','v494','v495','v496','v497'],
                TopBreak : [TimePeriod.Variable],
                Type     : ChartTypes.Table,
                Measure  : Measure.ColumnPercent,
            },this.brandName[codeVal], ChartProvider.ECharts);
            config.enableTimeComparison(RoundOffStrategy.BeforeBinding);
            if(TimePeriod.PreviousPeriod){
              config.showTopBreakOptions(0, [TimePeriod.PreviousPeriod, TimePeriod.CurrentPeriod]);
            }else{
              config.showTopBreakOptions(0, [TimePeriod.CurrentPeriod]);
            }
            config.includeNotAnswered(true);
            config.transposeTable(true);
            config.addRowColumnFields('SeriesName', 'CategoryName');
            config.SideBreak.forEach((value, index) => {            
                config.showSideBreakBase(index, true);
                config.showSideBreakOptions(index, [this.brandCodes[codeVal]]);
                config.setSideBreakFilter(value,'v467',[codeVal],FilterCondition.AnyItemSelected);
            });
            config.addCalculationLogic(output => {
                const table = output.TableOutput.get(config.Name);
                table.forEach(value => {
                    value.Score = value.SeriesCode === 'na' ? 0 : value.Score;
                    value.CategoryName = this.MAPPING[value.SeriesVariableID];
                });
                return output;
            }, RoundOffStrategy.AfterCalculation);
            headConfig.push(config);
        });
        return headConfig;
    }
}