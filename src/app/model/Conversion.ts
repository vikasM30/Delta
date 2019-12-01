import { Chart } from '../shell/models/chart'
import { TimePeriod } from '../shell/models/time.period'
import { ChartTypes } from '../shell/enums/chart.types'
import { Measure } from '../shell/enums/measure'
import { ChartProvider } from '../shell/enums/chart.provider'
import { RoundOffStrategy } from '../shell/enums/round.off.strategy'
import { element } from 'protractor'
import { BreakType, show } from '../shell/operators/chart.operators'
import { FilterCondition } from '../shell/enums/filter-condition.enum'

export class ConversionRecursion {
    Category: string;
    ConversionChart: Array<Chart> = new Array<any>();
    RetentionChart: Array<Chart> = new Array<any>();
    ConversionSidebreak = {
        Faucet: 'v626', Showerhead: 'v750', Toilet: 'v688', TubShowerUnit: ''
    }

    ConversionTopbreak = {
        Faucet: 'v595', Showerhead: 'v695', Toilet: 'v632', TubShowerUnit: ''
    }
    ConversionSidebreakOption = {
        Faucet: {'Delta':1,'American':2,'Kohler':3,'Moen':4,'Peerless':5,'Pfister':6,'Aqua Source':7,'Glacier Bay':8,'Brizo':9,'Grohe':10,'Hansgrohe':11,        
        'Toto':12},
        Showerhead:{'Delta':1,'American':2,'Kohler':3,'Moen':4,'Peerless':5,'Pfister':6,'Aqua Source':7,'Glacier Bay':8,'Grohe':9,'Hansgrohe':10,'Speakman':11,'Waterpik':12,'Symmons':13,'Proflo':14,'Oxygenics':15},
        Toilet:{'Delta':1,'American':2,'Kohler':3,'Moen':4,'Peerless':5,'Pfister':6,'Aqua Source':7,'Glacier Bay':8,'Briggs':9,'Eljer':10,'Gerber':11,'Jacuzzi':12,'Mansfield':13,'Sterling':14,'Toto':15,'Penguin':16},
    }
    ConversionTopbreakOpotion = {
   Faucet:{'Delta':1,'American':2,'Kohler':	3,'Moen':4,'Peerless':5,
   'Pfister':6,
   'Aqua Source':7,
   'Glacier Bay':8,
   'Brizo':9,
   'Grohe':10,
   'Hansgrohe':11,
   'Briggs':12,
   'Crane[HIDDEN AS OF 2019.Q1]':13,
   'Eljer':14,
   'Gerber':15,
   'Jacuzzi':16,
   'Mansfield':17,
   'Sterling':	18,
   'Toto':	19,
   'Penguin':	20,
   'Danze [HIDDEN AS OF 2019.Q1]	':21,
   'Speakman':	22,
   'Waterpik':	23,
   'Symmons':	24,
   'Aquatic':	25,
   'Maax':	26,
   'ASB':	27,
   'Style Selections [HIDDEN AS OF 2019.Q1]':	28,
   'Allen & Roth [HIDDEN AS OF 2019.Q1]':	29,
   'Swanstone':	30,
   'Aqua Glass':	31,
   'Proflo':	32,
   'Duravit':	33,
   'Mirabelle':	34,
   'Villeroy & Boch':	35,
   'DecoLav':	36,
   'Rohl':	37,
   'Victoria & Albert':	38,
   'Ronbow':	39,
   'Vortens':	40,
   'Oxygenics':	41,
   'MTI':	42,
   'Other':	43,
   'Dont know':	44,
   },
   Showerhead:{'Delta':1,'American':	2,'Kohler':	3,'Moen':	4,'Peerless':	5,
   'Pfister':6,
   'Aqua Source':7,
   'Glacier Bay':8,
   'Brizo':	9,
   'Grohe':	10,
   'Hansgrohe':	11,
   'Briggs':12,
   'Crane[HIDDEN AS OF 2019.Q1]':13,
   'Eljer':	14,
   'Gerber':	15,
   'Jacuzzi':	16,
   'Mansfield':	17,
   'Sterling':	18,
   'Toto':	19,
   'Penguin':	20,
   'Danze [HIDDEN AS OF 2019.Q1]	':21,
   'Speakman':	22,
   'Waterpik':	23,
   'Symmons':	24,
   'Aquatic':	25,
   'Maax':	26,
   'ASB':	27,
   'Style Selections [HIDDEN AS OF 2019.Q1]':	28,
   'Allen & Roth [HIDDEN AS OF 2019.Q1]':	29,
   'Swanstone':	30,
   'Aqua Glass':	31,
   'Proflo':	32,
   'Duravit':	33,
   'Mirabelle':	34,
   'Villeroy & Boch':	35,
   'DecoLav':	36,
   'Rohl':	37,
   'Victoria & Albert':	38,
   'Ronbow':	39,
   'Vortens':	40,
   'Oxygenics':	41,
   'MTI':	42,
   'Other':	43,
   'Dont know':	44,
   },
   Toilet:{'Delta':1,'American':	2,'Kohler':	3,'Moen':	4,'Peerless':	5,
   'Pfister':	6,
   'Aqua Source':	7,
   'Glacier Bay':	8,
   'Brizo':	9,
   'Grohe':	10,
   'Hansgrohe':	11,
   'Briggs':	12,
   'Crane[HIDDEN AS OF 2019.Q1]':	13,
   'Eljer':	14,
   'Gerber':	15,
   'Jacuzzi':	16,
   'Mansfield':	17,
   'Sterling':	18,
   'Toto':	19,
   'Penguin':	20,
   'Danze [HIDDEN AS OF 2019.Q1]	':21,
   'Speakman':	22,
   'Waterpik':	23,
   'Symmons':	24,
   'Aquatic':	25,
   'Maax':	26,
   'ASB':	27,
   'Style Selections [HIDDEN AS OF 2019.Q1]':	28,
   'Allen & Roth [HIDDEN AS OF 2019.Q1]':	29,
   'Swanstone':	30,
   'Aqua Glass':	31,
   'Proflo':	32,
   'Duravit':	33,
   'Mirabelle':	34,
   'Villeroy & Boch':	35,
   'DecoLav':	36,
   'Rohl':	37,
   'Victoria & Albert':	38,
   'Ronbow':	39,
   'Vortens':	40,
   'Oxygenics':	41,
   'MTI':	42,
   'Other':	43,
   'Dont know':	44,}

    }
    RetensionSidebreak = {
        Faucet: 'v596', Showerhead: 'v696', Toilet: 'v633', TubShowerUnit: ''
    }

    RetensionTopbreak = {
        Faucet: 'v595', Showerhead: 'v695', Toilet: 'v632', TubShowerUnit: ''
    }
    RetentionSidebreakOption = {
        Faucet:{'Delta':1,'American':	2,'Kohler':	3,'Moen':	4,'Peerless':	5,
        'Pfister':	6,
        'Aqua Source':	7,
        'Glacier Bay':	8,
        'Brizo':	9,
        'Grohe':	10,
        'Hansgrohe':	11,
        'Briggs':	12,
        'Crane[HIDDEN AS OF 2019.Q1]':	13,
        'Eljer':	14,
        'Gerber':	15,
        'Jacuzzi':	16,
        'Mansfield':	17,
        'Sterling':	18,
        'Toto':	19,
        'Penguin':	20,
        'Danze [HIDDEN AS OF 2019.Q1]	':21,
        'Speakman':	22,
        'Waterpik':	23,
        'Symmons':	24,
        'Aquatic':	25,
        'Maax':	26,
        'ASB':	27,
        'Style Selections [HIDDEN AS OF 2019.Q1]':	28,
        'Allen & Roth [HIDDEN AS OF 2019.Q1]':	29,
        'Swanstone':	30,
        'Aqua Glass':	31,
        'Proflo':	32,
        'Duravit':	33,
        'Mirabelle':	34,
        'Villeroy & Boch':	35,
        'DecoLav':	36,
        'Rohl':	37,
        'Victoria & Albert':	38,
        'Ronbow':	39,
        'Vortens':	40,
        'Oxygenics':	41,
        'MTI':	42,
        'Other':	43,
        'Dont know':	44,
        },
        Showerhead:{'Delta':1,'American':	2,'Kohler':	3,'Moen':	4,'Peerless':	5,
        'Pfister':	6,
        'Aqua Source':	7,
        'Glacier Bay':	8,
        'Brizo':	9,
        'Grohe':	10,
        'Hansgrohe':	11,
        'Briggs':	12,
        'Crane[HIDDEN AS OF 2019.Q1]':	13,
        'Eljer':	14,
        'Gerber':	15,
        'Jacuzzi':	16,
        'Mansfield':	17,
        'Sterling':	18,
        'Toto':	19,
        'Penguin':	20,
        'Danze [HIDDEN AS OF 2019.Q1]	':21,
        'Speakman':	22,
        'Waterpik':	23,
        'Symmons':	24,
        'Aquatic':	25,
        'Maax':	26,
        'ASB':	27,
        'Style Selections [HIDDEN AS OF 2019.Q1]':	28,
        'Allen & Roth [HIDDEN AS OF 2019.Q1]':	29,
        'Swanstone':	30,
        'Aqua Glass':	31,
        'Proflo':	32,
        'Duravit':	33,
        'Mirabelle':	34,
        'Villeroy & Boch':	35,
        'DecoLav':	36,
        'Rohl':	37,
        'Victoria & Albert':	38,
        'Ronbow':	39,
        'Vortens':	40,
        'Oxygenics':	41,
        'MTI':	42,
        'Other':	43,
        'Dont know':	44,
        },
        Toilet:{'Delta':1,'American':	2,'Kohler':	3,'Moen':	4,'Peerless':	5,
        'Pfister':	6,
        'Aqua Source':	7,
        'Glacier Bay':	8,
        'Brizo':	9,
        'Grohe':	10,
        'Hansgrohe':	11,
        'Briggs':	12,
        'Crane[HIDDEN AS OF 2019.Q1]':	13,
        'Eljer':	14,
        'Gerber':	15,
        'Jacuzzi':	16,
        'Mansfield':	17,
        'Sterling':	18,
        'Toto':	19,
        'Penguin':	20,
        'Danze [HIDDEN AS OF 2019.Q1]	':21,
        'Speakman':	22,
        'Waterpik':	23,
        'Symmons':	24,
        'Aquatic':	25,
        'Maax':	26,
        'ASB':	27,
        'Style Selections [HIDDEN AS OF 2019.Q1]':	28,
        'Allen & Roth [HIDDEN AS OF 2019.Q1]':	29,
        'Swanstone':	30,
        'Aqua Glass':	31,
        'Proflo':	32,
        'Duravit':	33,
        'Mirabelle':	34,
        'Villeroy & Boch':	35,
        'DecoLav':	36,
        'Rohl':	37,
        'Victoria & Albert':	38,
        'Ronbow':	39,
        'Vortens':	40,
        'Oxygenics':	41,
        'MTI':	42,
        'Other':	43,
        'Dont know':	44,}
    }
    RetentionTopbreakOption = {
        Faucet:{'Delta':1,'American':	2,'Kohler':	3,'Moen':	4,'Peerless':	5,
        'Pfister':	6,
        'Aqua Source':	7,
        'Glacier Bay':	8,
        'Brizo':	9,
        'Grohe':	10,
        'Hansgrohe':	11,
        'Briggs':	12,
        'Crane[HIDDEN AS OF 2019.Q1]':	13,
        'Eljer':	14,
        'Gerber':	15,
        'Jacuzzi':	16,
        'Mansfield':	17,
        'Sterling':	18,
        'Toto':	19,
        'Penguin':	20,
        'Danze [HIDDEN AS OF 2019.Q1]	':21,
        'Speakman':	22,
        'Waterpik':	23,
        'Symmons':	24,
        'Aquatic':	25,
        'Maax':	26,
        'ASB':	27,
        'Style Selections [HIDDEN AS OF 2019.Q1]':	28,
        'Allen & Roth [HIDDEN AS OF 2019.Q1]':	29,
        'Swanstone':	30,
        'Aqua Glass':	31,
        'Proflo':	32,
        'Duravit':	33,
        'Mirabelle':	34,
        'Villeroy & Boch':	35,
        'DecoLav':	36,
        'Rohl':	37,
        'Victoria & Albert':	38,
        'Ronbow':	39,
        'Vortens':	40,
        'Oxygenics':	41,
        'MTI':	42,
        'Other':	43,
        'Dont know':	44,
        },
        Showerhead:{'Delta':1,'American':	2,'Kohler':	3,'Moen':	4,'Peerless':	5,
        'Pfister':	6,
        'Aqua Source':	7,
        'Glacier Bay':	8,
        'Brizo':	9,
        'Grohe':	10,
        'Hansgrohe':	11,
        'Briggs':	12,
        'Crane[HIDDEN AS OF 2019.Q1]':	13,
        'Eljer':	14,
        'Gerber':	15,
        'Jacuzzi':	16,
        'Mansfield':	17,
        'Sterling':	18,
        'Toto':	19,
        'Penguin':	20,
        'Danze [HIDDEN AS OF 2019.Q1]	':21,
        'Speakman':	22,
        'Waterpik':	23,
        'Symmons':	24,
        'Aquatic':	25,
        'Maax':	26,
        'ASB':	27,
        'Style Selections [HIDDEN AS OF 2019.Q1]':	28,
        'Allen & Roth [HIDDEN AS OF 2019.Q1]':	29,
        'Swanstone':	30,
        'Aqua Glass':	31,
        'Proflo':	32,
        'Duravit':	33,
        'Mirabelle':	34,
        'Villeroy & Boch':	35,
        'DecoLav':	36,
        'Rohl':	37,
        'Victoria & Albert':	38,
        'Ronbow':	39,
        'Vortens':	40,
        'Oxygenics':	41,
        'MTI':	42,
        'Other':	43,
        'Dont know':	44,
        },
        Toilet:{'Delta':1,'American':	2,'Kohler':	3,'Moen':	4,'Peerless':	5,
        'Pfister':	6,
        'Aqua Source':	7,
        'Glacier Bay':	8,
        'Brizo':	9,
        'Grohe':	10,
        'Hansgrohe':	11,
        'Briggs':	12,
        'Crane[HIDDEN AS OF 2019.Q1]':	13,
        'Eljer':	14,
        'Gerber':	15,
        'Jacuzzi':	16,
        'Mansfield':	17,
        'Sterling':	18,
        'Toto':	19,
        'Penguin':	20,
        'Danze [HIDDEN AS OF 2019.Q1]	':21,
        'Speakman':	22,
        'Waterpik':	23,
        'Symmons':	24,
        'Aquatic':	25,
        'Maax':	26,
        'ASB':	27,
        'Style Selections [HIDDEN AS OF 2019.Q1]':	28,
        'Allen & Roth [HIDDEN AS OF 2019.Q1]':	29,
        'Swanstone':	30,
        'Aqua Glass':	31,
        'Proflo':	32,
        'Duravit':	33,
        'Mirabelle':	34,
        'Villeroy & Boch':	35,
        'DecoLav':	36,
        'Rohl':	37,
        'Victoria & Albert':	38,
        'Ronbow':	39,
        'Vortens':	40,
        'Oxygenics':	41,
        'MTI':	42,
        'Other':	43,
        'Dont know':	44,}
    }
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
        42: 'MTI'
    }
    constructor(Category: string) {
        this.Category = Category;
    }
    getConvertion(codes): Array<any>{
        
        const ConvertionSidebreak = this.ConversionSidebreak[this.Category];
        const ConversionTopbreak  =  this.ConversionTopbreak[this.Category];
        const ConversionTopbreakOption = [];
        
        codes.forEach(element =>{
            ConversionTopbreakOption.push(element);
            });
            codes.forEach(element=>{
           var brandname=  this.BrandMapping[element];
            const config = new Chart({
                SideBreak: [ConvertionSidebreak],
                TopBreak: [ConversionTopbreak],
                Type: ChartTypes.Table,
                Measure: Measure.ColumnPercent
              },brandname+'Conversion', ChartProvider.ECharts);
              const sidebreakOption= this.ConversionSidebreakOption[this.Category][brandname];
              config.showSideBreakBase(0, true);
              config.includeNotAnswered(true);
              if(this.Category=="Faucet"){
                config.setSideBreakFilter(ConvertionSidebreak,'v593', [2,3],FilterCondition.AnyItemSelected);
              }
              else if(this.Category=="Showerhead"){
                config.setSideBreakFilter(ConvertionSidebreak,'v694', [2,3],FilterCondition.AnyItemSelected);
              }
              else if(this.Category=="Toilet"){
                config.setSideBreakFilter(ConvertionSidebreak,'v631', [2,3],FilterCondition.AnyItemSelected);
              }
              config.showSideBreakOptions(0,[sidebreakOption]);
              config.showTopBreakOptions(0,ConversionTopbreakOption);
              config.enableTimeComparison(RoundOffStrategy.BeforeBinding);
              if (TimePeriod.PreviousPeriod) {
                  config.for(BreakType.TopBreak).nest(0, [TimePeriod.Variable])
                  .pipe(show(0, [TimePeriod.PreviousPeriod, TimePeriod.CurrentPeriod]));
                } else {
                  config.for(BreakType.TopBreak).nest(0, [TimePeriod.Variable])
                  .pipe(show(0, [TimePeriod.CurrentPeriod]));
                }
              config.addCalculationLogic(output => {
                return output;
              });
          
              this.ConversionChart.push(config);
            });
            return this.ConversionChart;
        }
        getRetention(codes): Array<any>{
            
            const RetensionSidebreak = this.RetensionSidebreak[this.Category];
            const RetensionTopbreak  =  this.RetensionTopbreak[this.Category];
            const RetensionTopbreakOption = [];
            codes.forEach(element =>{
                RetensionTopbreakOption.push(element);
                });
                codes.forEach(element=>{
               var brandname=  this.BrandMapping[element];
                const config = new Chart({
                    SideBreak: [RetensionSidebreak],
                    TopBreak: [RetensionTopbreak],
                    Type: ChartTypes.Table,
                    Measure: Measure.ColumnPercent
                  },brandname+'Retension', ChartProvider.ECharts);
                  const sidebreakOption= this.RetentionSidebreakOption[this.Category][brandname];
                  config.showSideBreakBase(0, true);
                  config.showSideBreakOptions(0,[sidebreakOption]);
                  config.showTopBreakOptions(0,RetensionTopbreakOption);
                  config.enableTimeComparison(RoundOffStrategy.BeforeBinding);
                  if (TimePeriod.PreviousPeriod) {
                      config.for(BreakType.TopBreak).nest(0, [TimePeriod.Variable])
                      .pipe(show(0, [TimePeriod.PreviousPeriod, TimePeriod.CurrentPeriod]));
                    } else {
                      config.for(BreakType.TopBreak).nest(0, [TimePeriod.Variable])
                      .pipe(show(0, [TimePeriod.CurrentPeriod]));
                    }
                  config.addCalculationLogic(output => {
                    return output;
                  });
              
                  this.RetentionChart.push(config);
                });
                return this.RetentionChart;
            }    
          
       
}