import { Chart } from 'src/app/shell/models/chart';
import { TimePeriod } from 'src/app/shell/models/time.period';
import { ChartTypes } from 'src/app/shell/enums/chart.types';
import { Measure } from 'src/app/shell/enums/measure';
import { ChartProvider } from 'src/app/shell/enums/chart.provider';
import { RoundOffStrategy } from 'src/app/shell/enums/round.off.strategy';

export class DemographicsTable {
    private readonly MAPPING = {
        v297: 'Kitchen faucet',
        v298: 'Bath faucet',
        v300: 'Toilet',
        v302: 'Showerhead',
        v303: 'Bathtub',
    };
    readonly MRIOPINIONLIFEMAPPING = {
        v755:"Buying American products is important to me",
        v756:"I don't make purchase decisions based on advertising",
        v757:"I like to shop around before making a purchase",
        v758:"If I really want something, I will buy it on credit rather than wait",
        v759:"I buy based on quality, not price",
        v760:"Price is more important to me than brand names",
        v761:"I'm a 'spender' rather than a 'saver'",
        v762:"It's important to me that sales people be knowledgeable",
        v763:"I like to share my opinions about products and services",
        v764:"Before purchasing a product online, I typically read online reviews",
        v765:"I buy brands that reflect my style",
        v766:"I prefer products that offer the latest in new technology",
        v767:"When I find a brand I like, I stick to it",
        v768:"If a product is made by a company I trust, I'll buy it",
        v769:"Brand name is the best indication of quality",
        v770:"I like to connect with brands through social-networking sites",
        v771:"I prefer to buy things my friends  would approve of",
        v773:"I enjoy showing off my home to guests",
        v774:"Keeping a neat, organized home is a top priority for me",
        v775:"I am typically willing to pay more for high-quality items",
        v776:"I only save for a specific purpose",
        v777:"I'm willing to pay more for top quality electronics",
        v778:"Technology helps make my life more organized",
        v779:"Before buying electronics, I do as much research as possible",
        v780:"I like to have a lot of gadgets",
    };
    constructor(){
    }
    
    /**
     * Create Table Chart Configration for Demo Graphics
     */
    demographicsChartConfigration(chartName,sideBreak,optionCode){
        const config = new Chart({
            SideBreak: sideBreak,
            TopBreak : [TimePeriod.Variable],
            Type     : ChartTypes.Table,
            Measure  : chartName == 'House Hold' ||chartName == 'Average Income Break' ? Measure.Count :Measure.ColumnPercent,
        },chartName, ChartProvider.ECharts);

        config.enableTimeComparison(RoundOffStrategy.BeforeBinding);
        if(TimePeriod.PreviousPeriod){
            config.showTopBreakOptions(0, [TimePeriod.PreviousPeriod, TimePeriod.CurrentPeriod]);
          }else{
            config.showTopBreakOptions(0, [TimePeriod.CurrentPeriod]);
        }
        config.showSideBreakBase(0, true);
        //config.transposeTable(true);
        if(optionCode != ""){
            config.SideBreak.forEach((value, index) => {
                config.showSideBreakOptions(index, optionCode);
              });
        }
        config.addCalculationLogic( output => {
            let table = output.TableOutput.get(config.Name);
            if(optionCode != ""){
                table.forEach(value => {
                    value.SeriesName = this.MAPPING[value.SeriesVariableID];
                });
            }
            return output;
        },RoundOffStrategy.AfterCalculation);
    
        return config;
    }

    /**
     * Create Pie Chart Configration
     */
    demographicsPieChartConfigration(chartName,sideBreak){
        const config = new Chart({
            SideBreak: [sideBreak],
            TopBreak : [TimePeriod.Variable],
            Type     : ChartTypes.Pie,
            Measure  : Measure.ColumnPercent,
        },chartName, ChartProvider.ECharts);

        config.enableTimeComparison(RoundOffStrategy.BeforeBinding);
        if(TimePeriod.PreviousPeriod){
            config.showTopBreakOptions(0, [TimePeriod.PreviousPeriod, TimePeriod.CurrentPeriod]);
          }else{
            config.showTopBreakOptions(0, [TimePeriod.CurrentPeriod]);
        }
        config.showSideBreakBase(0, true);
        config.transposeTable(true);
        config.addCalculationLogic( output => {
            //const table = output.TableOutput.get(config.Name);
            return output;
        },RoundOffStrategy.AfterCalculation);
        config.addChartConfigChange((output, chartConfig) => {
            chartConfig.height = '400px';
            chartConfig.width = '300px';
            const colors = ['#FE8080','#00B0F0', '#E7B900', '#0070C0', '#9B1F23'];
            chartConfig.legend = {
                orient: 'horizontal',
                left: 'center',
                bottom: '0',
                marginTop: '80px',
                data: [],
                "y":"80%",
            }
            output.forEach((val,i)=>{
                if( chartConfig.series[0].data[i].name == 'Prefer not to answer'){
                    chartConfig.series[0].data.splice(i,1);
                }else{
                    chartConfig.legend.data.push(val.SeriesName);
                    chartConfig.series[0].label = {
                        normal:{
                            formatter:'{c}',
                            position: 'inside'
                        }
                    }
                }
            });
            chartConfig.legend.marginTop= '80px';
            chartConfig.series[0].data.forEach((val, i) => {
                val.itemStyle = {
                color: colors[i]
                };
                // chartConfig.series[0].data[i].name = '';
                
            });
            // chartConfig.series[0].center= ['40%','60%'];
            chartConfig.tooltip = {
                trigger: 'item',
                formatter: "{b} :{d}%"
            }
            
            return chartConfig;
        });
        return config;
    }

    /**
     * Create Table Chart Configration for MRI Graphics
     */
    MRIMostlyOpinionsChartConfigration(chartName,sideBreak){
        const config = new Chart({
            SideBreak: sideBreak,
            TopBreak : [TimePeriod.Variable],
            Type     : ChartTypes.StackedHorizontalBar,
            Measure  : Measure.ColumnPercent,
        },chartName, ChartProvider.ZingChart);

        config.enableTimeComparison(RoundOffStrategy.BeforeBinding);
        if(TimePeriod.PreviousPeriod){
            config.showTopBreakOptions(0, [TimePeriod.PreviousPeriod, TimePeriod.CurrentPeriod]);
          }else{
            config.showTopBreakOptions(0, [TimePeriod.CurrentPeriod]);
        }
        config.showSideBreakBase(0, true);
        // config.transposeTable(true);
        config.addChartConfigChange((output, chartConfig) => {
            chartConfig.height = '800px';
            chartConfig.width = '1000px';
            chartConfig.plot.valueBox = [
                {
                  text: '%v',
                  placement: 'center',
                  fontColor:'#fff',
                  padding:'0 20px 0 0'
                }
              ];
             chartConfig.x='3%';
            output.forEach((d,i)=>{
                const question = this.MRIOPINIONLIFEMAPPING[d.SeriesVariableID];
                if(chartConfig.scaleX.labels.indexOf(question) === -1){
                    chartConfig.scaleX.labels.push(question);
                }
            });
            // chartConfig.scaleX.labels.reverse();
            // chartConfig.series.forEach((val,i)=>{
            //     chartConfig.series[i].values.reverse();
            // });
            chartConfig.series.reverse();
            const Color = ['#4d4d4d','#808080', '#A8A7A7', '#bfbfbf'];
            chartConfig.series.forEach((val, i) => {
                chartConfig.series[i].backgroundColor = Color[i];
                let arrayVal = val.values;
                chartConfig.series[i].values = arrayVal.map((v)=>{
                    return Math.round(v)
                });
            });
            return chartConfig;
        });
        return config;
    }

    MRICompletelyOpinionsChartConfigration(chartName,sideBreak){
        const config = new Chart({
            SideBreak: sideBreak,
            TopBreak : [TimePeriod.Variable],
            Type     : ChartTypes.StackedHorizontalBar,
            Measure  : Measure.ColumnPercent,
        },chartName, ChartProvider.ZingChart);

        config.enableTimeComparison(RoundOffStrategy.BeforeBinding);
        if(TimePeriod.PreviousPeriod){
            config.showTopBreakOptions(0, [TimePeriod.PreviousPeriod, TimePeriod.CurrentPeriod]);
          }else{
            config.showTopBreakOptions(0, [TimePeriod.CurrentPeriod]);
        }
        config.showSideBreakBase(0, true);
        // config.transposeTable(true);
        config.addChartConfigChange((output, chartConfig) => {
            chartConfig.height = '500px';
            chartConfig.width = '900px';
            chartConfig.plot.valueBox = [
                {
                  text: '%v',
                  placement: 'center',
                  fontColor:'#fff',
                  padding:'0 18px 0 0'
                }
              ];
            output.forEach((d,i)=>{
                const question = this.MRIOPINIONLIFEMAPPING[d.SeriesVariableID];
                if(chartConfig.scaleX.labels.indexOf(question) === -1){
                    chartConfig.scaleX.labels.push(question);
                }
            });
            // chartConfig.scaleX.labels.reverse();
            // chartConfig.series.forEach((val,i)=>{
            //     chartConfig.series[i].values.reverse();
            // });
            chartConfig.series.reverse();
            const Color = ['#4d4d4d','#808080', '#A8A7A7', '#bfbfbf'];
            chartConfig.series.forEach((val, i) => {
                chartConfig.series[i].backgroundColor = Color[i];
                let arrayVal = val.values;
                chartConfig.series[i].values = arrayVal.map((v)=>{
                    return Math.round(v)
                });
            });

            return chartConfig;
        });
        return config;
    }
    MRIRadarRoseChartConfigration(chartName,sideBreak,chartColor){
        const config = new Chart({
            SideBreak: sideBreak,
            TopBreak : [TimePeriod.Variable],
            Type     : ChartTypes.Radar,
            Measure  : Measure.ColumnPercent,
        },chartName, ChartProvider.ZingChart);

        config.enableTimeComparison(RoundOffStrategy.BeforeBinding);
        if(TimePeriod.PreviousPeriod){
            config.showTopBreakOptions(0, [TimePeriod.PreviousPeriod, TimePeriod.CurrentPeriod]);
          }else{
            config.showTopBreakOptions(0, [TimePeriod.CurrentPeriod]);
        }
        config.showSideBreakBase(0, true);
        // config.transposeTable(true);
        config.addChartConfigChange((output, chartConfig) => {
            chartConfig.height = '400px';
            chartConfig.width = '480px';
            chartConfig.scaleV.visible = false;           
            chartConfig.plot.aspect = "rose";
            chartConfig.legend.visible = false;          
            chartConfig.plot.valueBox = [
                {
                  text: '%v',
                  placement: 'in',
                  fontColor:'#fff'
                }
              ];    
              chartConfig.scaleK.tick= {
                "size":'none',
              }  
              chartConfig.scaleK.item={
                //"font-size":10,
              }
            output.forEach((d,i)=>{
                chartConfig.scaleK.labels.push(d.SeriesName);
            });
            chartConfig.series.forEach((val, i) => {
                let arrayVal = val.values;
                chartConfig.series[i].values = arrayVal.map((v)=>{
                    return Math.round(v)
                });
            });
            chartConfig.series[0].backgroundColor = chartColor;
            return chartConfig;
        });
        return config;
    }
}