import {Chart} from '../shell/models/chart';
import {ChartTypes} from '../shell/enums/chart.types';
import {Measure} from '../shell/enums/measure';
import {ChartProvider} from '../shell/enums/chart.provider';
import {RoundOffStrategy} from '../shell/enums/round.off.strategy';
import {config} from 'rxjs';
import { TimePeriod } from '../shell/models/time.period';
import { AssetMappings } from './asset.mappings';

export class CategoryBrandHealth {

  ConsiderationChartArray: Array<Chart> = new Array<Chart>();
  EquityCharts: Array<Chart> = new Array<any>();
  StrongRelation: Array<Chart> = new Array<any>();
  Brandlist: any[];

  constructor(CategoryBrandHealth){}

  UnaidedMappingForCategory = {
    Faucet: 'fauunaided', Showerhead: 'shdunaided', Toilet: 'toiunaided', TubShowerUnit: 'tubunaided'
  }
  TotalBrandMappingForCategory = {
    Faucet: 'Faucet', Showerhead: 'Showerhead', Toilet: 'Toilet', TubShowerUnit: 'Tub'
  }
  consideration = {
    Faucet: {
      Delta: 'v499', Moen: 'v502', Kohler: 'v501', Peerless: 'v503', 'American Standard': 'v500', Pfister: 'v504', 'Aqua Source': 'v505', 'Glacier Bay':'v506',
      Brizo: 'v507', Grohe: 'v508', Hansgrohe: 'v509', Toto: 'v510', Other: 'v511'
    },
    Showerhead: {
      Delta: 'v529', Moen: 'v532', Kohler: 'v531', Peerless: 'v533', 'American Standard': 'v530', Pfister: 'v534', 'Aqua Source': 'v535', 'Glacier Bay':'v536',
      Grohe: 'v537', Hansgrohe: 'v538', Speakman: 'v539', Waterpik: 'v540', Symmons: 'v541', Proflo: 'v542', Oxygenics: 'v543', Other: 'v544'
    },
    Toilet: {
      Delta: 'v512', Moen: 'v515', Kohler: 'v514', Peerless: 'v516', 'American Standard': 'v513', Pfister: 'v517', 'Aqua Source': 'v518', 'Glacier Bay':'v519',
      Briggs: 'v520', Eljer: 'v521', Gerber: 'v522', Jacuzzi: 'v523', Mansfield: 'v524', Sterling: 'v525', Toto: 'v526', Penguin: 'v527', Other: 'v528'
    },
    TubShowerUnit: {
      Delta: 'v546', Moen: 'v549', Kohler: 'v548', Peerless: 'v550', 'American Standard': 'v547', Sterling: 'v551', Aquatic: 'v552',
      Maax: 'v553', ASB: 'v554', Swanstone: 'v555', AquaGlass: 'v556', Other: 'v557'
    }
  }
  EquityOptinMapping = {
    Faucet: { 'Delta': { option: [1, 2] }, 'Moen': { option: [5, 6] }, 'Kohler': { option: [3, 4] }, 'Peerless': { option: [9, 10] }, 'American Standard': { option: [7, 8] }, 'Pfister': { option: [11, 12] }, 'Waterpik': { option: [] } , 'Glacier Bay': {option: [13,14]},'Aqua Source':{option:[15,16]},'Brizo': { option: [] }, 'Grohe': { option: [] }, 'Hansgrohe': { option: [] }, 'Briggs': { option: [] }, 'Crane': { option: [] }, 'Eljer': { option: [] }, 'Gerber': { option: [] },'Jacuzzi': {option: []} ,'Mansfield':{option:[] },'Sterling': { option: [] }, 'Toto': { option: [] }, 'Penguin': { option: [] }, 'Danze': { option: [] }, 'Speakman': { option: [] }, 'Symmons': { option: [] }, 'Aquatic': { option: [] },'Maax': {option: []} ,'ASB':{option:[] },'Style Selections': {option:[]},'Allen & Roth': { option: [] },'Swan': {option: []} ,'Aqua Glass':{option:[] },'Proflo': {option:[]},'Duravit': { option: [] },'Mirabelle': {option: []} ,'Villeroy & Boch':{option:[] },'Decolav': {option:[]},'Rohl': { option: [] },'Victoria & Albert': {option: []} ,'Ronbow':{option:[] },'Vortens': {option:[]},'Oxygenics':{option:[] },'MTI': {option:[]}},
    Showerhead: { 'Delta': { option: [33, 34] }, 'Moen': { option: [39, 40] }, 'Kohler': { option: [37, 38] }, 'Peerless': { option: [45, 46] }, 'American Standard': { option: [35, 36]}, 'Pfister': { option: [47, 48] }, 'Waterpik': { option: [43, 44] },'Glacier Bay': {option: [41,42]} ,'Aqua Source':{option:[49,50]},'Brizo': { option: [] }, 'Grohe': { option: [] }, 'Hansgrohe': { option: [] }, 'Briggs': { option: [] }, 'Crane': { option: [] }, 'Eljer': { option: [] }, 'Gerber': { option: [] },'Jacuzzi': {option: []} ,'Mansfield':{option:[] },'Sterling': { option: [] }, 'Toto': { option: [] }, 'Penguin': { option: [] }, 'Danze': { option: [] }, 'Speakman': { option: [] }, 'Symmons': { option: [] }, 'Aquatic': { option: [] },'Maax': {option: []} ,'ASB':{option:[] },'Style Selections': {option:[]},'Allen & Roth': { option: [] },'Swan': {option: []} ,'Aqua Glass':{option:[] },'Proflo': {option:[]},'Duravit': { option: [] },'Mirabelle': {option: []} ,'Villeroy & Boch':{option:[] },'Decolav': {option:[]},'Rohl': { option: [] },'Victoria & Albert': {option: []} ,'Ronbow':{option:[] },'Vortens': {option:[]},'Oxygenics':{option:[] },'MTI': {option:[]}},
    Toilet: { 'Delta': { option: [17, 18] }, 'Moen': { option: [21, 22] }, 'Kohler': { option: [19, 20] }, 'Peerless': { option: [25, 26] }, 'American Standard': { option: [23, 24] }, 'Pfister': { option: [27, 28] }, 'Waterpik': { option: [] },'Glacier Bay': {option: [31,32]} ,'Aqua Source':{option:[29,30]},'Brizo': { option: [] }, 'Grohe': { option: [] }, 'Hansgrohe': { option: [] }, 'Briggs': { option: [] }, 'Crane': { option: [] }, 'Eljer': { option: [] }, 'Gerber': { option: [] },'Jacuzzi': {option: []} ,'Mansfield':{option:[] },'Sterling': { option: [] }, 'Toto': { option: [] }, 'Penguin': { option: [] }, 'Danze': { option: [] }, 'Speakman': { option: [] }, 'Symmons': { option: [] }, 'Aquatic': { option: [] },'Maax': {option: []} ,'ASB':{option:[] },'Style Selections': {option:[]},'Allen & Roth': { option: [] },'Swan': {option: []} ,'Aqua Glass':{option:[] },'Proflo': {option:[]},'Duravit': { option: [] },'Mirabelle': {option: []} ,'Villeroy & Boch':{option:[] },'Decolav': {option:[]},'Rohl': { option: [] },'Victoria & Albert': {option: []} ,'Ronbow':{option:[] },'Vortens': {option:[]},'Oxygenics':{option:[] },'MTI': {option:[]} },
    TubShowerUnit: { 'Delta': { option: [51,52] }, 'Moen': { option: [57,58] }, 'Kohler': { option: [55,56] }, 'Peerless': { option: [59,60] }, 'American Standard': { option: [53,54] }, 'Pfister': { option: [] }, 'Waterpik': { option: [] },'Glacier Bay': {option: []} ,'Aqua Source':{option:[]},'Brizo': { option: [] }, 'Grohe': { option: [] }, 'Hansgrohe': { option: [] }, 'Briggs': { option: [] }, 'Crane': { option: [] }, 'Eljer': { option: [] }, 'Gerber': { option: [] },'Jacuzzi': {option: []} ,'Mansfield':{option:[] },'Sterling': { option: [] }, 'Toto': { option: [] }, 'Penguin': { option: [] }, 'Danze': { option: [] }, 'Speakman': { option: [] }, 'Symmons': { option: [] }, 'Aquatic': { option: [] },'Maax': {option: []} ,'ASB':{option:[] },'Style Selections': {option:[]},'Allen & Roth': { option: [] },'Swan': {option: []} ,'Aqua Glass':{option:[] },'Proflo': {option:[]},'Duravit': { option: [] },'Mirabelle': {option: []} ,'Villeroy & Boch':{option:[] },'Decolav': {option:[]},'Rohl': { option: [] },'Victoria & Albert': {option: []} ,'Ronbow':{option:[] },'Vortens': {option:[]},'Oxygenics':{option:[] },'MTI': {option:[]} },
   // TubShowerUnit: { 'Delta': { option: [] }, 'Moen': { option: [] }, 'Kohler': { option: [] }, 'Peerless': { option: [] }, 'American': { option: [] }, 'Pfister': { option: [] }, 'Waterpik': { option: [] },'Glacier Bay': {option: []} ,'Aqua Source':{option:[] },'Brizo': { option: [] }, 'Grohe': { option: [] }, 'Hansgrohe': { option: [] }, 'Briggs': { option: [] }, 'Crane': { option: [] }, 'Eljer': { option: [] }, 'Gerber': { option: [] },'Jacuzzi': {option: []} ,'Mansfield':{option:[] },'Sterling': { option: [] }, 'Toto': { option: [] }, 'Penguin': { option: [] }, 'Danze': { option: [] }, 'Speakman': { option: [] }, 'Symmons': { option: [] }, 'Aquatic': { option: [] },'Maax': {option: []} ,'ASB':{option:[] },'Style Selections': {option:[]},'Allen & Roth': { option: [] },'Swan': {option: []} ,'Aqua Glass':{option:[] },'Proflo': {option:[]},'Duravit': { option: [] },'Mirabelle': {option: []} ,'Villeroy & Boch':{option:[] },'Decolav': {option:[]},'Rohl': { option: [] },'Victoria & Albert': {option: []} ,'Ronbow':{option:[] },'Vortens': {option:[]},'Oxygenics':{option:[] },'MTI': {option:[]}}
  }

  strongOptionMapping = {
    Delta: { option: 1 }, Moen: { option: 4 }, Kohler: { option: 3 }, Peerless: { option: 5 }, 'American Standard': { option: 2 }, Pfister: { option: 6 },
    AquaSource: { option: 7 }, GlacierBay: { option: 8 }, Brizo: { option: 9 }, Grohe: { option: 10 }, Hansgrohe: {option: 11}, Waterpik: { option: 23 },
    Briggs: { option: 12 }, Crane: { option: 13 }, Eljer: { option: 14 }, Gerber: { option: 10 }, Jacuzzi: {option: 16}, Mansfield: { option: 17 },  
    Sterling: { option: 18 }, Toto: { option: 19 }, Penguin: { option: 20 }, Danze: { option: 21 }, Speakman: {option: 22}, Symmons: { option: 24 },  
    Aquatic: { option: 25 }, Maax: { option: 26 }, ASB: { option: 27 }, StyleSelections: { option: 28 }, AllenRoth: {option: 29}, Swan: { option: 30 },  
    AquaGlass: { option: 31 }, Proflo: { option: 32 }, Duravit: { option: 33 }, Mirabelle: { option: 34 }, VilleroyBoch: {option: 35}, Decolav: { option: 36 },  
    Rohl: { option: 37 }, VictoriaAlbert: { option: 38 }, Ronbow: { option: 39 }, Vortens: { option: 40 }, Oxygenics: {option: 41}, MTI: { option: 42 },  
  }

  BrandMapping = AssetMappings.brandNameAndCodes;

  strongRMapping={
    Delta: 'RelationshipDelta',
    American: 'RelationshipAmerican',
    Kohler: 'RelationshipKohler',
    Moen: 'RelationshipMoen',
    Peerless: 'RelationshipPeerless',
    Pfister: 'RelationshipPfister',
    Waterpik: 'RelationshipWaterpik',
    AquaSource: 'RelationshipAqua',
    GlacierBay: 'RelationshipGlaicer'    
  }
  

  getUnaided(Cateogory, codes): Chart{
    const config = new Chart({
      SideBreak: [this.UnaidedMappingForCategory[Cateogory]],
      TopBreak: [TimePeriod.Variable],
      Type: ChartTypes.Table,
      Measure: Measure.ColumnPercent
    }, 'Category Unaided', ChartProvider.ECharts);
    config.enableTimeComparison(RoundOffStrategy.BeforeBinding);
    if(TimePeriod.PreviousPeriod){
      config.showTopBreakOptions(0, [TimePeriod.PreviousPeriod, TimePeriod.CurrentPeriod]);
    }else{
      config.showTopBreakOptions(0, [TimePeriod.CurrentPeriod]);
    }
    config.showSideBreakOptions(0, codes);
    config.includeNotAnswered(true);
    config.showSideBreakBase(0, true);
    config.addShowAllSeries(true);
    return config;
  }

  getTotalAided(Cateogory, codes): Chart{
    const config = new Chart({
      SideBreak: [this.TotalBrandMappingForCategory[Cateogory]],
      TopBreak: [TimePeriod.Variable],
      Type: ChartTypes.Table,
      Measure: Measure.ColumnPercent
    }, 'Category Total Brand', ChartProvider.ECharts);
    config.enableTimeComparison(RoundOffStrategy.BeforeBinding);
    if(TimePeriod.PreviousPeriod){
      config.showTopBreakOptions(0, [TimePeriod.PreviousPeriod, TimePeriod.CurrentPeriod]);
    }else{
      config.showTopBreakOptions(0, [TimePeriod.CurrentPeriod]);
    }
    config.showSideBreakOptions(0,codes);
    config.includeNotAnswered(true);
    config.showSideBreakBase(0, true);
    return config;
  }

  getConsideration(selectedCategory, codes): Array<any>{
    this.ConsiderationChartArray = [];
    for(var i =0; i< codes.length; i++){
      const considerationSideBreak = this.consideration[selectedCategory][this.BrandMapping[codes[i]]];
      if(considerationSideBreak === undefined){
        debugger;
      }
      const config = new Chart({
        SideBreak: [considerationSideBreak],
        TopBreak: [TimePeriod.Variable],
        Measure: Measure.ColumnPercent,
        Type: ChartTypes.Table
      }, 'Consideration'+this.BrandMapping[codes[i]], ChartProvider.ECharts);

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

  getEquity(Category ,codes):Array<any> {
    for(let i =0; i< codes.length; i++) {
        const equityOption = this.EquityOptinMapping[Category][this.BrandMapping[codes[i]]].option;  
        const config = new Chart(
            {
              SideBreak: ['BrandEquity'],
              TopBreak: [TimePeriod.Variable],
              Type: ChartTypes.Table,
              Measure: Measure.ColumnPercent
            },
            'EquityChart'+this.BrandMapping[codes[i]]
          );
          config.showSideBreakOptions(0, equityOption);
          config.includeNotAnswered(true);
          config.enableTimeComparison(RoundOffStrategy.BeforeBinding);
        if(TimePeriod.PreviousPeriod){
          config.showTopBreakOptions(0, [TimePeriod.PreviousPeriod, TimePeriod.CurrentPeriod]);
        }else{
          config.showTopBreakOptions(0, [TimePeriod.CurrentPeriod]);
        }
        config.showSideBreakBase(0, true);
          //config.showSideBreakUnWeightedBase(0, true);
          config.addCalculationLogic(output => {
            // if(output.TableOutput.get(config.Name).length > 2){
            //   output.TableOutput.set(config.Name, []);
            // }
           // table.forEach(value => {
           //   //value.SeriesName = this.imageryTextMapping[value.SeriesVariableID];
           // });
           return output;
         });
         this.EquityCharts.push(config);    
      }
     return this.EquityCharts;
   }

   
   getStrongrelation(Category ,codes):Array<any> {
     this.Brandlist = [];
     codes.forEach(element => {
      this.Brandlist.push(this.BrandMapping[element]);      
     });
    this.Brandlist.forEach(element => {
        const sidebreak =  this.strongRMapping[element]; 
        const config = new Chart(
            {
              SideBreak: [sidebreak],
              TopBreak: [TimePeriod.Variable],
              Type: ChartTypes.Table,
              Measure: Measure.ColumnPercent
            },
            'StrongEquity'+element,
          );
          config.showSideBreakOptions(0, [1]);
          config.showSideBreakBase(0, true);
         
          config.enableTimeComparison(RoundOffStrategy.BeforeBinding);
           if(TimePeriod.PreviousPeriod){
             config.showTopBreakOptions(0, [TimePeriod.PreviousPeriod, TimePeriod.CurrentPeriod]);
           }else{
             config.showTopBreakOptions(0, [TimePeriod.CurrentPeriod]);
           }
          config.showSideBreakUnWeightedBase(0, true);
          config.addCalculationLogic(output => {
           return output;
         });
         this.StrongRelation.push(config);    
      });
     return this.StrongRelation;
   }
}
