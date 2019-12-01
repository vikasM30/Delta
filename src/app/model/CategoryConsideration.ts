import {Chart} from '../shell/models/chart';
import {ChartTypes} from '../shell/enums/chart.types';
import {Measure} from '../shell/enums/measure';
import {ChartProvider} from '../shell/enums/chart.provider';
import {RoundOffStrategy} from '../shell/enums/round.off.strategy';
import {config} from 'rxjs';
import { TimePeriod } from '../shell/models/time.period';

export class CategoryConsideration {

  constructor(CategoryConsideration){

  }

  consideration = {
    Faucet: {
      Delta: 'v499', Moen: 'v502', Kohler: 'v501', Peerless: 'v503', American: 'v500', Pfister: 'v504', AquaSource: 'v505', GlacierBay:'v506',
      Brizo: 'v507', Grohe: 'v508', Hansgrohe: 'v509', Toto: 'v510', Other: 'v511'
    },
    Showerhead: {
      Delta: 'v529', Moen: 'v532', Kohler: 'v531', Peerless: 'v533', American: 'v530', Pfister: 'v534', AquaSource: 'v535', GlacierBay:'v536',
      Grohe: 'v537', Hansgrohe: 'v538', Speakman: 'v539', Waterpik: 'v540', Symmons: 'v541', Proflo: 'v542', Oxygenics: 'v543', Other: 'v544'
    },
    Toilet: {
      Delta: 'v512', Moen: 'v515', Kohler: 'v514', Peerless: 'v516', American: 'v513', Pfister: 'v517', AquaSource: 'v518', GlacierBay:'v519',
      Briggs: 'v520', Eljer: 'v521', Gerber: 'v522', Jacuzzi: 'v523', Mansfield: 'v524', Sterling: 'v525', Toto: 'v526', Penguin: 'v527', Other: 'v528'
    },
    TubShowerUnit: {
      Delta: 'v546', Moen: 'v549', Kohler: 'v548', Peerless: 'v550', American: 'v547', Sterling: 'v551', Aquatic: 'v552',
      Maax: 'v553', ASB: 'v554', Swanstone: 'v555', AquaGlass: 'v556', Other: 'v557'
    }
  }

  considerationBrandMapping = {
    1: 'Delta',
    2: 'American',
    3: 'Kohler',
    4: 'Moen',
    5: 'Peerless',
    6: 'Pfister',
    7: 'AquaSource',
    8: 'GlacierBay',
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
    42: 'MTI'
  }

  ConsiderationChartArray:Array<Chart> = new Array<Chart>();

  getConsideration(selectedCategory, codes): Array<any>{
    this.ConsiderationChartArray = [];
    for(var i =0; i<= codes.length; i++){
      const considerationSideBreak = this.consideration[selectedCategory][this.considerationBrandMapping[codes[i]]];
      const config = new Chart({
        SideBreak: [considerationSideBreak],
        TopBreak: [TimePeriod.Variable],
        Measure: Measure.ColumnPercent,
        Type: ChartTypes.Table
      }, 'Consideration'+this.considerationBrandMapping[codes[i]], ChartProvider.ECharts);

     config.combineSideBreakOptions(considerationSideBreak, [1, 2], '1st/2nd Choice (net)');
     config.showSideBreakBase(0, true);
     config.enableTimeComparison(RoundOffStrategy.BeforeBinding);
      if(TimePeriod.PreviousPeriod){
        config.showTopBreakOptions(0, [TimePeriod.PreviousPeriod, TimePeriod.CurrentPeriod]);
      }else{
        config.showTopBreakOptions(0, [TimePeriod.CurrentPeriod]);
      }
     config.includeNotAnswered(true);

     this.ConsiderationChartArray.push(config)
    }
    return this.ConsiderationChartArray;
  }
}
