import { Chart } from 'src/app/shell/models/chart';
import { ChartTypes } from 'src/app/shell/enums/chart.types';
import { Measure } from '../shell/enums/measure';
import {ChartProvider} from '../shell/enums/chart.provider';
import { TimePeriod } from '../shell/models/time.period';
import { CollectionOutput } from '../shell/models/collectionOutput';
import { OnInit, OnDestroy, AfterContentInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FilterCondition } from '../shell/enums/filter-condition.enum';
import { BreakType } from '../shell/operators/chart.operators';
import { RoundOffStrategy } from '../shell/enums/round.off.strategy';
export class Eqity {
  strongRMapping={
    'Delta': 'RelationshipDelta',
    'American': 'RelationshipAmerican',
    'Kohler': 'RelationshipKohler',
    'Moen': 'RelationshipMoen',
    'Peerless': 'RelationshipPeerless',
    'Pfister': 'RelationshipPfister',
    'Waterpik': 'RelationshipWaterpik',
    'Aqua Source': 'RelationshipAqua',
    'Glacier Bay':'RelationshipGlaicer',
  }
 Brandlist : string[];
 Brand: string;
 Category: string;
 EquityCharts:Array<Chart> = new Array<any>();
 StrongRelation:Array<Chart> = new Array<any>();
 
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
EquityOptinMapping = {
  Faucet: { 'Delta': { option: [1, 2] }, 'Moen': { option: [5, 6] }, 'Kohler': { option: [3, 4] }, 'Peerless': { option: [9, 10] }, 'American': { option: [7, 8] }, 'Pfister': { option: [11, 12] }, 'Waterpik': { option: [] } , 'Glacier Bay': {option: [13,14]},'Aqua Source':{option:[15,16]},'Brizo': { option: [] }, 'Grohe': { option: [] }, 'Hansgrohe': { option: [] }, 'Briggs': { option: [] }, 'Crane': { option: [] }, 'Eljer': { option: [] }, 'Gerber': { option: [] },'Jacuzzi': {option: []} ,'Mansfield':{option:[] },'Sterling': { option: [] }, 'Toto': { option: [] }, 'Penguin': { option: [] }, 'Danze': { option: [] }, 'Speakman': { option: [] }, 'Symmons': { option: [] }, 'Aquatic': { option: [] },'Maax': {option: []} ,'ASB':{option:[] },'Style Selections': {option:[]},'Allen & Roth': { option: [] },'Swan': {option: []} ,'Aqua Glass':{option:[] },'Proflo': {option:[]},'Duravit': { option: [] },'Mirabelle': {option: []} ,'Villeroy & Boch':{option:[] },'Decolav': {option:[]},'Rohl': { option: [] },'Victoria & Albert': {option: []} ,'Ronbow':{option:[] },'Vortens': {option:[]},'Oxygenics':{option:[] },'MTI': {option:[]}},
  Showerhead: { 'Delta': { option: [33, 34] }, 'Moen': { option: [39, 40] }, 'Kohler': { option: [37, 38] }, 'Peerless': { option: [45, 46] }, 'American': { option: [35, 36]}, 'Pfister': { option: [47, 48] }, 'Waterpik': { option: [43, 44] },'Glacier Bay': {option: [41,42]} ,'Aqua Source':{option:[49,50]},'Brizo': { option: [] }, 'Grohe': { option: [] }, 'Hansgrohe': { option: [] }, 'Briggs': { option: [] }, 'Crane': { option: [] }, 'Eljer': { option: [] }, 'Gerber': { option: [] },'Jacuzzi': {option: []} ,'Mansfield':{option:[] },'Sterling': { option: [] }, 'Toto': { option: [] }, 'Penguin': { option: [] }, 'Danze': { option: [] }, 'Speakman': { option: [] }, 'Symmons': { option: [] }, 'Aquatic': { option: [] },'Maax': {option: []} ,'ASB':{option:[] },'Style Selections': {option:[]},'Allen & Roth': { option: [] },'Swan': {option: []} ,'Aqua Glass':{option:[] },'Proflo': {option:[]},'Duravit': { option: [] },'Mirabelle': {option: []} ,'Villeroy & Boch':{option:[] },'Decolav': {option:[]},'Rohl': { option: [] },'Victoria & Albert': {option: []} ,'Ronbow':{option:[] },'Vortens': {option:[]},'Oxygenics':{option:[] },'MTI': {option:[]}},
  Toilet: { 'Delta': { option: [17, 18] }, 'Moen': { option: [21, 22] }, 'Kohler': { option: [19, 20] }, 'Peerless': { option: [25, 26] }, 'American': { option: [23, 24] }, 'Pfister': { option: [27, 28] }, 'Waterpik': { option: [] },'Glacier Bay': {option: [31,32]} ,'Aqua Source':{option:[29,30]},'Brizo': { option: [] }, 'Grohe': { option: [] }, 'Hansgrohe': { option: [] }, 'Briggs': { option: [] }, 'Crane': { option: [] }, 'Eljer': { option: [] }, 'Gerber': { option: [] },'Jacuzzi': {option: []} ,'Mansfield':{option:[] },'Sterling': { option: [] }, 'Toto': { option: [] }, 'Penguin': { option: [] }, 'Danze': { option: [] }, 'Speakman': { option: [] }, 'Symmons': { option: [] }, 'Aquatic': { option: [] },'Maax': {option: []} ,'ASB':{option:[] },'Style Selections': {option:[]},'Allen & Roth': { option: [] },'Swan': {option: []} ,'Aqua Glass':{option:[] },'Proflo': {option:[]},'Duravit': { option: [] },'Mirabelle': {option: []} ,'Villeroy & Boch':{option:[] },'Decolav': {option:[]},'Rohl': { option: [] },'Victoria & Albert': {option: []} ,'Ronbow':{option:[] },'Vortens': {option:[]},'Oxygenics':{option:[] },'MTI': {option:[]} },
  TubShowerUnit: { 'Delta': { option: [51,52] }, 'Moen': { option: [57,58] }, 'Kohler': { option: [55,56] }, 'Peerless': { option: [59,60] }, 'American': { option: [53,54] }, 'Pfister': { option: [] }, 'Waterpik': { option: [] },'Glacier Bay': {option: []} ,'Aqua Source':{option:[]},'Brizo': { option: [] }, 'Grohe': { option: [] }, 'Hansgrohe': { option: [] }, 'Briggs': { option: [] }, 'Crane': { option: [] }, 'Eljer': { option: [] }, 'Gerber': { option: [] },'Jacuzzi': {option: []} ,'Mansfield':{option:[] },'Sterling': { option: [] }, 'Toto': { option: [] }, 'Penguin': { option: [] }, 'Danze': { option: [] }, 'Speakman': { option: [] }, 'Symmons': { option: [] }, 'Aquatic': { option: [] },'Maax': {option: []} ,'ASB':{option:[] },'Style Selections': {option:[]},'Allen & Roth': { option: [] },'Swan': {option: []} ,'Aqua Glass':{option:[] },'Proflo': {option:[]},'Duravit': { option: [] },'Mirabelle': {option: []} ,'Villeroy & Boch':{option:[] },'Decolav': {option:[]},'Rohl': { option: [] },'Victoria & Albert': {option: []} ,'Ronbow':{option:[] },'Vortens': {option:[]},'Oxygenics':{option:[] },'MTI': {option:[]} },
 // TubShowerUnit: { 'Delta': { option: [] }, 'Moen': { option: [] }, 'Kohler': { option: [] }, 'Peerless': { option: [] }, 'American': { option: [] }, 'Pfister': { option: [] }, 'Waterpik': { option: [] },'Glacier Bay': {option: []} ,'Aqua Source':{option:[] },'Brizo': { option: [] }, 'Grohe': { option: [] }, 'Hansgrohe': { option: [] }, 'Briggs': { option: [] }, 'Crane': { option: [] }, 'Eljer': { option: [] }, 'Gerber': { option: [] },'Jacuzzi': {option: []} ,'Mansfield':{option:[] },'Sterling': { option: [] }, 'Toto': { option: [] }, 'Penguin': { option: [] }, 'Danze': { option: [] }, 'Speakman': { option: [] }, 'Symmons': { option: [] }, 'Aquatic': { option: [] },'Maax': {option: []} ,'ASB':{option:[] },'Style Selections': {option:[]},'Allen & Roth': { option: [] },'Swan': {option: []} ,'Aqua Glass':{option:[] },'Proflo': {option:[]},'Duravit': { option: [] },'Mirabelle': {option: []} ,'Villeroy & Boch':{option:[] },'Decolav': {option:[]},'Rohl': { option: [] },'Victoria & Albert': {option: []} ,'Ronbow':{option:[] },'Vortens': {option:[]},'Oxygenics':{option:[] },'MTI': {option:[]}}
}
  
    private selectedBrandCode: number;

  constructor(Category: string) {
    this.Category = Category;
    this.Brandlist = [];

   
  }
 
  getEquity(codes):Array<any> {
    this.Brandlist = [];
    codes.forEach(element => {
      this.Brandlist.push(this.BrandMapping[element]);      
       });
    this.Brandlist.forEach(element => {
     
        const equityOption = this.EquityOptinMapping[this.Category][element].option;  
        const config = new Chart(
            {
              SideBreak: ['BrandEquity'],
              TopBreak: [TimePeriod.Variable],
              Type: ChartTypes.Table,
              Measure: Measure.ColumnPercent
            },
            'EquityChart'+element,
          );
          config.showSideBreakOptions(0, equityOption);
          //config.includeNotAnswered(true);
          config.enableTimeComparison(RoundOffStrategy.BeforeBinding);
        if(TimePeriod.PreviousPeriod){
          config.showTopBreakOptions(0, [TimePeriod.PreviousPeriod, TimePeriod.CurrentPeriod]);
        }else{
          config.showTopBreakOptions(0, [TimePeriod.CurrentPeriod]);
        }
        config.showSideBreakBase(0, true);
        config.includeNotAnswered(true);
          config.addCalculationLogic(output => {
           // table.forEach(value => {
           //   //value.SeriesName = this.imageryTextMapping[value.SeriesVariableID];
           // });
           return output;
         });
         this.EquityCharts.push(config);    
      });
     return this.EquityCharts;
   }

   getStrongrelation(codes):Array<any> {
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