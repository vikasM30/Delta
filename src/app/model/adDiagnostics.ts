import { Chart } from '../shell/models/chart';
import { Measure } from '../shell/enums/measure';
import { ChartTypes } from '../shell/enums/chart.types';
import { ChartProvider } from '../shell/enums/chart.provider';
import { TimePeriod } from '../shell/models/time.period';
import { RoundOffStrategy } from '../shell/enums/round.off.strategy';
import { BreakType, show } from '../shell/operators/chart.operators';

export class adDiagnostics {
    

    private readonly variableOptionForSideBreak = {
        'sideBreakVariableDiagnostic': ['derotationAd1','derotationAd2','derotationAd3','derotationAd4','derotationAd5',
                                'derotationAd6','derotationAd7','derotationAd8','derotationAd9','derotationAd10',
                                'derotationAd11','derotationAd12','derotationAd13','derotationAd14','derotationAd15'],

        'sideBreakVariableCalltoAction': ['adcalltoactionAd1','adcalltoactionAd2','adcalltoactionAd3','adcalltoactionAd4','adcalltoactionAd5',
                                'adcalltoactionAd6','adcalltoactionAd7','adcalltoactionAd8','adcalltoactionAd9','adcalltoactionAd10',
                                'adcalltoactionAd11','adcalltoactionAd12','adcalltoactionAd13','adcalltoactionAd14','adcalltoactionAd15'],
        
        'sideBreakvariableAdRecall': ['brandingAd1','brandingAd2','brandingAd3','brandingAd13','brandingAd4','brandingAd5','brandingAd6','brandingAd7','brandingAd8',
                                    'brandingAd9','brandingAd10', 'brandingAd11','brandingAd12','brandingAd14','brandingAd15'],
        
        'topBreakvariableAdRecall': ['adRecallAd1','adRecallAd2','adRecallAd3','adRecallAd13','adRecallAd4','adRecallAd5','adRecallAd6','adRecallAd7','adRecallAd8',
                                    'adRecallAd9','adRecallAd10', 'adRecallAd11','adRecallAd12','adRecallAd14','adRecallAd15']
         }


    private readonly selectedAdMappingForAdSelector = {
        'The Perfect Touch': 'derotationAd1',
        'Hydrorain One': 'derotationAd2',
        'Shield Yourself': 'derotationAd3',
        'In2ition Two-In-One': 'derotationAd13',
        'The Design': 'derotationAd10',
        'Life Designs/ Water is Life': 'derotationAd11',
        'Perfect Fit/In Control': 'derotationAd12',
        'Rough Water/In Control': 'derotationAd14',
        'Moen Flow': 'derotationAd15',
        'Mother Nature': 'derotationAd7',
        'Konnect-Pouring Made Easy': 'derotationAd8',
        'Verdera Voice Mirror': 'derotationAd9',
        'Quality Product Touchless KF': 'derotationAd4',
        'Lysol ActiClean Self-Clean': 'derotationAd5',
        'Innovative': 'derotationAd6'
    }

    private readonly selectedAdMappingCallToAction = {
        'The Perfect Touch': 'adcalltoactionAd1',
        'Hydrorain One': 'adcalltoactionAd2',
        'Shield Yourself': 'adcalltoactionAd3',
        'In2ition Two-In-One': 'adcalltoactionAd13',
        'The Design': 'adcalltoactionAd10',
        'Life Designs/ Water is Life': 'adcalltoactionAd11',
        'Perfect Fit/In Control': 'adcalltoactionAd12',
        'Rough Water/In Control': 'adcalltoactionAd14',
        'Moen Flow': 'adcalltoactionAd15',
        'Mother Nature': 'adcalltoactionAd7',
        'Konnect-Pouring Made Easy': 'adcalltoactionAd8',
        'Verdera Voice Mirror': 'adcalltoactionAd9',
        'Quality Product Touchless KF': 'adcalltoactionAd4',
        'Lysol ActiClean Self-Clean': 'adcalltoactionAd5',
        'Innovative': 'adcalltoactionAd6'
    }
    private readonly adTypeECR = {
        0:'The Perfect Touch',
        1:'Hydrorain One',
        2:'Shield Yourself',
        3:'In2ition Two-In-One',
        4:'The Design',
        5:'Life Designs/ Water is Life',
        6:'Perfect Fit/In Control',
        7:'Rough Water/In Control',
        8:'Moen Flow',
        9:'Mother Nature',
        10:'Konnect-Pouring Made Easy',
        11:'Verdera Voice Mirror',
        12:'Quality Product Touchless KF',
        13:'Lysol ActiClean Self-Clean',
        14:'Innovative'
    }

    bubbleRecallMapping = {
        'brandingAd1':'Delta',
        'brandingAd2':'Delta',
        'brandingAd3':'Delta',
        'brandingAd4':'American_Standard',
        'brandingAd5':'American_Standard',
        'brandingAd6':'American_Standard',
        'brandingAd7':'Kohler',
        'brandingAd8':'Kohler',
        'brandingAd9':'Kohler',
        'brandingAd10':'Moen', 
        'brandingAd11':'Moen',
        'brandingAd12':'Moen',
        'brandingAd13':'Delta',
        'brandingAd14':'Moen',
        'brandingAd15':'Moen',
        'adRecallAd1':'Delta',
        'adRecallAd2':'Delta',
        'adRecallAd3':'Delta',
        'adRecallAd4':'American_Standard',
        'adRecallAd5':'American_Standard',
        'adRecallAd6':'American_Standard',
        'adRecallAd7':'Kohler',
        'adRecallAd8':'Kohler',
        'adRecallAd9':'Kohler',
        'adRecallAd10':'Moen', 
        'adRecallAd11':'Moen',
        'adRecallAd12':'Moen',
        'adRecallAd13':'Delta',
        'adRecallAd14':'Moen',
        'adRecallAd15':'Moen'
    }
    constructor() { }
    // ad Diagnostic functionality configuration
    getAdDiagnosticsForAllBrands(selectedAd): Chart {
        let sideBreakVariableArray = [];
        if(selectedAd.length != 0){
            selectedAd.forEach((val, index)=>{
                sideBreakVariableArray.push(this.selectedAdMappingForAdSelector[val]);
            })
            //sideBreakVariableArray = this.variableOptionForSideBreak.sideBreakVariableDiagnostic;
        }
        else{
            sideBreakVariableArray = this.variableOptionForSideBreak.sideBreakVariableDiagnostic;
        }
        const config = new Chart({
            SideBreak: sideBreakVariableArray,
            TopBreak: [TimePeriod.Variable],
            Measure: Measure.ColumnPercent,
            Type: ChartTypes.Table
        }, 'All Ad Diagnostic', ChartProvider.ECharts);
        config.showSideBreakBase(0, true);
        sideBreakVariableArray.forEach((val, i)=>{
            config.showSideBreakOptions(i, [1, 4, 9, 6, 8, 2, 3, 10, 11, 5, 7]);
        });
        if(TimePeriod.PreviousPeriod){
            config.showTopBreakOptions(0, [TimePeriod.PreviousPeriod, TimePeriod.CurrentPeriod]);
        }else{
            config.showTopBreakOptions(0, [TimePeriod.CurrentPeriod]);
        }
        return config;
    }

    // ad call to action functionality configuration

    getAdCallToActionForAllBrands(selectedAd): Chart {
        let sideBreakVariableArray = [];
        if(selectedAd.length != 0){
            selectedAd.forEach((val, index)=>{
                sideBreakVariableArray.push(this.selectedAdMappingCallToAction[val]);
            })
        }
        else{
            sideBreakVariableArray = this.variableOptionForSideBreak.sideBreakVariableCalltoAction;
        } 
        const config = new Chart({
            SideBreak: sideBreakVariableArray,
            TopBreak: [TimePeriod.Variable],
            Measure: Measure.ColumnPercent,
            Type: ChartTypes.Table
        }, 'All Ad Call To Action', ChartProvider.ECharts);
        config.showSideBreakBase(0, true);
        sideBreakVariableArray.forEach((val, i)=>{
            config.showSideBreakOptions(i, [5, 3, 1, 7, 9, 4, 6, 2, 8]);
            config.addShowAllSeries(true);
        });
        
        if(TimePeriod.PreviousPeriod){
            config.showTopBreakOptions(0, [TimePeriod.PreviousPeriod, TimePeriod.CurrentPeriod]);
        }else{
            config.showTopBreakOptions(0, [TimePeriod.CurrentPeriod]);
        }
        return config;
    }

    getAdDiagnosticsTotalAverage(): Chart {
        let sideBreakVariableArray = this.variableOptionForSideBreak.sideBreakVariableDiagnostic;
        const config = new Chart({
            SideBreak: sideBreakVariableArray,
            TopBreak: [TimePeriod.Variable],
            Measure: Measure.ColumnPercent,
            Type: ChartTypes.Table
        }, 'All Ad Diagnostic', ChartProvider.ECharts);
        config.showSideBreakBase(0, true);
        sideBreakVariableArray.forEach((val, i)=>{
            config.showSideBreakOptions(i, [1, 4, 9, 6, 8, 2, 3, 10, 11, 5, 7]);
        });
        if(TimePeriod.PreviousPeriod){
            config.showTopBreakOptions(0, [TimePeriod.PreviousPeriod, TimePeriod.CurrentPeriod]);
        }else{
            config.showTopBreakOptions(0, [TimePeriod.CurrentPeriod]);
        }
        return config;
    }

    // ad call to action functionality configuration

    getAdCallToActionTotalAverage(): Chart {
        let sideBreakVariableArray = this.variableOptionForSideBreak.sideBreakVariableCalltoAction;
        const config = new Chart({
            SideBreak: sideBreakVariableArray,
            TopBreak: [TimePeriod.Variable],
            Measure: Measure.ColumnPercent,
            Type: ChartTypes.Table
        }, 'All Ad Diagnostic', ChartProvider.ECharts);
        config.showSideBreakBase(0, true);
        sideBreakVariableArray.forEach((val, i)=>{
            config.showSideBreakOptions(i, [5, 3, 1, 7, 9, 4, 6, 2, 8]);
            config.addShowAllSeries(true);
        });
        
        if(TimePeriod.PreviousPeriod){
            config.showTopBreakOptions(0, [TimePeriod.PreviousPeriod, TimePeriod.CurrentPeriod]);
        }else{
            config.showTopBreakOptions(0, [TimePeriod.CurrentPeriod]);
        }
        return config;
    }

    // ad recall chart
    getAddRecallandBrand(chartName,ecrValue,brandsVarIndex):Chart{
        let xandYLength = this.variableOptionForSideBreak.topBreakvariableAdRecall.length;
        let sideBreak  = this.variableOptionForSideBreak.topBreakvariableAdRecall.concat(this.variableOptionForSideBreak.sideBreakvariableAdRecall);;
        const config = new Chart({
            SideBreak: sideBreak,
            TopBreak: [TimePeriod.Variable],
            Type: ChartTypes.Scatter,
            Measure: Measure.ColumnPercent
        }, chartName, ChartProvider.ECharts);
        if(TimePeriod.PreviousPeriod){
            config.showTopBreakOptions(0, [TimePeriod.PreviousPeriod, TimePeriod.CurrentPeriod]);
        }else{
            config.showTopBreakOptions(0, [TimePeriod.CurrentPeriod]);
        }
        config.SideBreak.forEach((val, i)=>{
            config.showSideBreakOptions(i, [1]);
        });
        config.TopBreak.forEach((val, i)=>{
            config.showTopBreakOptions(i, [1]);
        });
        config.addCalculationLogic(output => {
            let table = output.TableOutput.get(config.Name);         
            table.forEach(value => {
                value.CategoryName = this.bubbleRecallMapping[value.SeriesVariableID];
            });
            return output;
          }, RoundOffStrategy.AfterCalculation);
          config.addChartConfigChange((output, chartConfig) => {
              const brands = {
                  'Delta':0,
                  'American_Standard':1,
                  'Kohler':2,
                  'Moen':3
                }
            let color ={
                'Delta':'#C80000',
                'American_Standard':'#FFD400',
                'Kohler':'#000000',
                'Moen':'#00B7F9'
            };
            let series = [];
            let counter = 0;
            let data = chartConfig.series[0].data;
            chartConfig.series=[];
            output.forEach((val,i)=>{
                if(i >= xandYLength){
                    if(series[brands[val.CategoryName]].data[counter] == undefined){
                        counter = 0;
                    }
                        series[brands[val.CategoryName]].data[counter][1] = val.Score;
                        counter++; 
                }else{
                     if(series[brands[val.CategoryName]] != undefined){
                       series[brands[val.CategoryName]].data.push([val.Score]);
                    }else{
                        // const sum = ecrValue[val.CategoryName].reduce(function(a,b){
                        //     return a + b
                        // }, 0);
                        series.push({
                        symbolSize: function (data,i) {
                            let sum = 0;
                            if(ecrValue[val.CategoryName].length != 0){
                                sum = ecrValue[val.CategoryName][i.dataIndex].reduce(function(a,b){
                                    return a + b
                                }, 0);
                            }
                            return sum == 0 ? 10 : (Math.sqrt(sum));
                        },
                        data:[[val.Score]],
                        type: 'scatter',
                        itemStyle:{
                            normal:{
                                color:color[val.CategoryName]
                            }
                        },
                        name:val.CategoryName,
                        seriesName:'abc',
                        value:'123',
                        seriesType:'543'
                        });
                    }
                }
            });
          chartConfig.series = series;
          chartConfig.height = '500px';
          chartConfig.width = '1000px';
          let arrX = [];
          let arrY = [];
          data.forEach((val,i) => {
           arrX.push(val[0]);
           arrY.push(val[1]);
          });
          let minValX = Math.min(...arrX);
          let maxValX = Math.max(...arrX);
          let minValY = Math.min(...arrY);
          let maxValY = Math.max(...arrY);
        
          chartConfig.xAxis=  {
            gridIndex: 0, 
            min: Math.round(minValX) < 15? 0: Math.round(minValX-5), 
            max: Math.round(maxValX+10),
            name: 'ReCall',
            nameGap: 30,
            nameLocation: 'middle',
            nameTextStyle: {
            color: '#808080',
            fontSize: 14,
            fontWeight:800
            }
         
          },
        chartConfig.yAxis={
            gridIndex: 0,
             min: Math.round(minValY) < 15? 0: Math.round(minValY-5), 
             max: Math.round(maxValY+10),
            name: 'Branding',
            nameGap: 30,
            nameLocation: 'middle',
            nameTextStyle: {
            color: '#808080',
            fontSize: 14,
            fontWeight:800
            }
        }
        //   chartConfig.xAxis = [
        //     {gridIndex: 0, min: 10, max: 40},
        // ],
        // chartConfig.yAxis = [
        //     {gridIndex: 0, min: 20, max: 60},
        // ],
          chartConfig.grid = [
            {x: '10%', y: '10%', width: '70%', height: '80%'},
            //{gridIndex: 0, min: 20, max: 60},
            //{gridIndex: 0, min: 10, max: 40},
            ]
          
        
            chartConfig.tooltip = {
                padding: 10,
                backgroundColor: '#222',
                borderColor: '#777',
                borderWidth: 1,
                formatter: function (obj,a,b) {
                    //console.log(`{a}: ({c})`);
                    var value = obj.value;
                    let sumOfECR = ecrValue[obj.seriesName][obj.dataIndex].reduce(function(a,b){
                        return a + b
                    }, 0);
                    return '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 14px;padding-bottom: 7px;margin-bottom: 7px">'
                        + obj.seriesName.replace('_',' ')
                       //+ value[7]
                       + '</div>'
                       + brandsVarIndex[obj.seriesName][obj.dataIndex]+ ' (ECR) ：' + sumOfECR + '<br>'
                         + 'ReCall：'+ value[0]+' <br>'
                         + 'Branding : '+ value[1]+'<br>';
                    //    + schema[4].text + '：' + value[4] + '<br>'
                    //    + schema[5].text + '：' + value[5] + '<br>'
                    //    + schema[6].text + '：' + value[6] + '<br>';
                }
            }
          return chartConfig;
        });
        return config;
    }
    getAdBubbleRecall(): Chart {
        const sideBreakVar = this.variableOptionForSideBreak.sideBreakvariableAdRecall;
        const topBreakVar = this.variableOptionForSideBreak.topBreakvariableAdRecall;

        const config = new Chart({
            SideBreak: sideBreakVar,
            TopBreak: topBreakVar,
            Type: ChartTypes.Scatter,
            Measure: Measure.ColumnPercent
        }, 'Ad Recall', ChartProvider.ECharts);

        config.showSideBreakBase(0, true);
        config.SideBreak.forEach((val, i)=>{
            config.showSideBreakOptions(i, [1]);
        });
        config.TopBreak.forEach((val, i)=>{
            config.showTopBreakOptions(i, [1]);
        });
        if(TimePeriod.Variable){
            config.enableTimeComparison(RoundOffStrategy.BeforeBinding);
            config.TopBreak.forEach((val, i)=>{
                if (TimePeriod.PreviousPeriod) {
                    config.for(BreakType.TopBreak).nest(i, [TimePeriod.Variable]).pipe(show(0, [TimePeriod.PreviousPeriod, TimePeriod.CurrentPeriod]));
                } else {
                    config.for(BreakType.TopBreak).nest(i, [TimePeriod.Variable]).pipe(show(0, [TimePeriod.CurrentPeriod]));
                }
            })
        }
        config.addChartConfigChange((output, chartConfig) => {
          // chartConfig.title = 'Ad Recall and Brand Attribution (2018)';
          chartConfig.height = '420px';
          chartConfig.width = '250%';
          chartConfig.grid.width = '80%';
          chartConfig.grid.height = '90%';
          chartConfig.grid.y = '8%';
          chartConfig.series[0].data.forEach((val, i) => {
            console.log(val, i);
          });
          output.forEach(element => {
            console.log(element.SeriesName);
          });
          return chartConfig;
        });
        return config;
      }
}