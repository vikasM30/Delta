import { Chart } from 'src/app/shell/models/chart';
import { Measure } from 'src/app/shell/enums/measure';
import { ChartTypes } from 'src/app/shell/enums/chart.types';
import { ChartProvider } from 'src/app/shell/enums/chart.provider';
import { config, Subject } from 'rxjs';
import { DataTable } from 'src/app/shell/models/dataTable';
import { RoundOffStrategy } from 'src/app/shell/enums/round.off.strategy';
import { TimePeriod } from 'src/app/shell/models/time.period';
import { FilterCondition } from 'src/app/shell/enums/filter-condition.enum';
import { AssetMappings } from 'src/app/model/asset.mappings';

export class BrandPerception {
    private readonly MAPPING = {
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
        v576: 'Has designs that are new / up-to-date',
    };
    brandCodes = {
      1: '1',
      2: '2',
      3: '3',
      4: '4',
      5: '5',
      6: '6',
      23:'7',
    }
    brandName = {
      1: 'Delta',
      2: 'American Stand',
      3: 'Kohler',
      4: 'Moen',
      5: 'Peerless',
      6: 'Pfister',
      23: 'Waterpik',
    }
    
    constructor(){
    }

    /**
     * Create Chart Config for Each Brand
     * Calculate and transpose data into table form
     */
    getbrandPerceptionData(codes) {
      let headConfig:Array<any> = new Array<any>();
        codes.forEach((codeVal, i) => { 
        const config = new Chart({
          SideBreak: ['v558','v559','v560','v561','v562','v563','v564','v566','v567','v568','v569','v570','v571','v572','v573','v574','v575','v576'],
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
        config.transposeTable(true);
        config.includeNotAnswered(true);
        config.addRowColumnFields('SeriesName', 'CategoryName');
        config.SideBreak.forEach((value, index) => {
          config.showSideBreakBase(index, true);
          config.showSideBreakOptions(index, [this.brandCodes[codeVal]]);
          config.setSideBreakFilter(value,'v467', [codeVal],FilterCondition.AnyItemSelected);
        });
        config.addCalculationLogic(output => {
          let table = output.TableOutput.get(config.Name);         
          table.forEach(value => {
              value.Score = value.SeriesCode === 'na' ? NaN : value.Score;
              value.CategoryName = this.MAPPING[value.SeriesVariableID];
          });
          return output;
        }, RoundOffStrategy.AfterCalculation);
        headConfig.push(config);
      });
      return headConfig;
    }
}