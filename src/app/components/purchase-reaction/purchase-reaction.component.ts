import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FilterService } from 'src/app/shell/services/filter.service';
import { ActivatedRoute } from '@angular/router';
import { FilterConfigService } from 'src/app/service/filter-config.service';
import { Brands } from 'src/app/model/brands';
import { Purchasereaction } from 'src/app/model/purchasereaction';
import { Chart } from 'src/app/shell/models/chart';
import { AssetMappings } from 'src/app/model/asset.mappings';
import { AngularCsv } from 'angular7-csv/dist/Angular-csv';

@Component({
  selector: 'app-purchase-reaction',
  templateUrl: './purchase-reaction.component.html',
  styleUrls: ['./purchase-reaction.component.css']
})
export class PurchaseReactionComponent implements OnInit {
showLoader:boolean;
categoryHeaderName:boolean;
optionSelectionUnsubscribe: Subject<any> = new Subject<any>();
onDataUpdate: Subject<any> = new Subject();
categoryHeading: string;
Category: string;
brandcodes: Array<string>;
PurchaseAgainT3: Array<Chart> = new Array<any>();
RecommandationT3: Array<Chart> = new Array<any>();
SocialMedia: Array<Chart> = new Array<any>();
SatisfactionT3: Array<Chart> = new Array<any>();
socialmediacount: number;
purchasecheck: boolean;
Recommandationcheck: boolean;
socialMedia: boolean;
satisfactioncheck: boolean;
SocialMediadata: Array<{ code: number, op1: number,op2:number,op3:number,op4:number,base:number}>;
Recommanddata:Array<{code:number,score:number,base:number}>;
Satisfactiondata:Array<{code:number,score:number,base:number}>;
Purchasedata:Array<{code:number,score:number,base:number}>;
logoByBrandCode =AssetMappings.logoByBrandCode;
socialmediaBrand: Array<string>;
recommandBrand: Array<string>;
satisfactionBrand:Array<string>;
PurchaseBrand:Array<string>;
purchaseloader:boolean;
satloader:boolean;
recomLoader:boolean;
socialloader:boolean;
dtPurchaseReaction: Array<{ type: string, Data: Array<number> }>;
csvOptions = {
  fieldSeparator: ',',
  quoteStrings: '"',
  decimalseparator: '.',
  showLabels: true,
  showTitle: true,
  title: 'Delta',
  useBom: true,
  noDownload: false,
  headers: []
};
brandMapping = {
  'Delta': 1,
  'American Standard': 2,
  'Kohler': 3,
  'Moen': 4,
  'Peerless': 5,
  'Pfister': 6,
  'Aqua Source': 7,
  'Glacier Bay': 8,
  'Brizo': 9,
  'Grohe': 10,
  'Hansgrohe': 11,
  'Briggs': 12,
  'Crane': 13,
  'Eljer': 14,
  'Gerber': 15,
  'Jacuzzi': 16,
  'Mansfield': 17,
  'Sterling': 18,
  'Toto': 19,
  'Penguin': 20,
  'Danze': 21,
  'Speakman': 22,
  'Waterpik': 23,
  'Symmons': 24,
  'Aquatic': 25,
  'Maax': 26,
  'ASB': 27,
  'Style Selections': 28,
  'Allen & Roth': 29,
  'Swan': 30,
  'Aqua Glass': 31,
  'Proflo': 32,
  'Duravit': 33,
  'Mirabelle': 34,
  'Villeroy & Boch': 35,
  'Decolav': 36,
  'Rohl': 37,
  'Victoria & Albert': 38,
  'Ronbow': 39,
  'Vortens': 40,
  'Oxygenics': 41,
  'MTI': 42,
}
BrandCodewiseMapping = {
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
  constructor(private filterService: FilterService,private route: ActivatedRoute, private filterConfigService: FilterConfigService) {
    this.route.params.subscribe(params => {
      this.Category = params.order;
      this.categoryHeading = this.Category;
      if(this.Category == "Faucet"){
        this.filterConfigService.initializePurchaseReactionwithFaucet();
      }
      if(this.Category == "Showerhead"){
        this.filterConfigService.initializePurchaseReactionwithShowerhead();
      } 
      if(this.Category == "Toilet"){
        this.filterConfigService.initializePurchaseReactionwithToilet();
      } 
      if(this.Category == "TubShowerUnit"){
        this.filterConfigService.initializeRecentpurchasewithTUB();
      }     
    });
   }

  ngOnInit() {
    this.filterService.optionSelectionCallback$.pipe(takeUntil(this.optionSelectionUnsubscribe))
    .subscribe(value => {
        this.updateData(this.Category);
    });
  }
  ngOnDestroy(): void {
    this.optionSelectionUnsubscribe.next();
    this.optionSelectionUnsubscribe.complete();
  }
  getcode(val:string): number{
    return this.brandMapping[val];
  }
  updateData(Category) {
    this.createTables(Category);
    setTimeout(() => {
      this.onDataUpdate.next();
    });
  }
  ExcellExport(){
    this.csvOptions.title = "Purchase Reaction";
    new AngularCsv(this.dtPurchaseReaction, "PurchaseReaction", this.csvOptions);
  }
  CallLoader(){
    if(this.socialloader&&this.recomLoader&&this.satloader&&this.purchaseloader){
      this.showLoader=false;
    }
  }
  createTables(Category) {
   const brands = new Brands(this.filterService);
   this.brandcodes = brands.getBrandsCode();
   this.csvOptions.headers = [];
   var copybrandlist=[]
   this.brandcodes.forEach(element => {
    copybrandlist.push(parseInt(element));
  });
  this.csvOptions.headers=[]
  this.csvOptions.headers.push("");
   copybrandlist.forEach(element => {
    this.csvOptions.headers.push(this.BrandCodewiseMapping[element]);
  });
   const PurchaseReac = new Purchasereaction(this.Category);
   this.PurchaseAgainT3 = PurchaseReac.PurchaseAgainT3B(this.brandcodes);
   this.RecommandationT3 = PurchaseReac.RecommandationT3B(this.brandcodes);
   this.SatisfactionT3 = PurchaseReac.SatisfactionT3B(this.brandcodes);
   this.SocialMedia = PurchaseReac.SocialMedia(this.brandcodes);
   this.socialmediaBrand = [];
   this.SocialMediadata=[];
   this.recommandBrand=[];
   this.Recommanddata = [];
   this.satisfactionBrand=[];
   this.PurchaseBrand=[];
   this.Satisfactiondata=[];
   this.Purchasedata=[];
   this.dtPurchaseReaction = [];
   this.satisfactioncheck=false;
   this.purchasecheck=false;
   this.showLoader=true;
   this.purchaseloader=false;
   this.recomLoader=false;
   this.satloader=false;
   this.socialloader=false;
   this.Recommandationcheck=false;
   this.socialMedia=false;
   this.PurchaseAgainT3.forEach(element => {
    element.addTableDataReady((output, datatable) => {
     this.PurchaseBrand.push(output[0].SeriesTree.split('>')[0]);
     var base = datatable.bases.get('Base').map(value => Math.round(value))[0];
     const repeat=this.PurchaseBrand.filter(item => item == output[0].SeriesTree.split('>')[0]).length;
     const code = this.getcode(output[0].SeriesTree.split('>')[0]);
     var opt1 =0;
     var opt2=0;
     var opt3=0;
      if(repeat==1){ 
       switch(output[0].SeriesCode){
         case "8":
           opt1 = output[0].Score;
           break;
         case "9":
            opt2 = output[0].Score;
           break;
         case "10":
            opt3 = output[0].Score;
           break;    
       }
       if(output.length>=2){
       switch(output[1].SeriesCode){
        case "8":
          opt1 = output[1].Score;
          break;
        case "9":
           opt2 = output[1].Score;
          break;
        case "10":
           opt3 = output[1].Score;
          break;    
      }}
      if(output.length==3){
      switch(output[2].SeriesCode){
        case "8":
          opt1 = output[2].Score;
          break;
        case "9":
           opt2 = output[2].Score;
          break;
        case "10":
           opt3 = output[2].Score;
          break;    
      }
    }}
     if(repeat==1){ 
      this.Purchasedata.push({'code':code,'score':opt1+opt2+opt3,'base':base})
      this.Purchasedata.sort((a, b) =>b.code - a.code).reverse();
    }
    if(this.Purchasedata.length==this.brandcodes.length){
      var dt =[];
      this.purchaseloader=true;
      this.CallLoader();
      var dtb=[];
      this.Purchasedata.forEach(element=>{
        dt.push(Math.round(element.score));
        dtb.push(Math.round(element.base));
      })
      this.dtPurchaseReaction.push({'type':"PurchaseAgainT3",'Data':dt});
      this.dtPurchaseReaction.push({'type':"Base",'Data':dtb});
    }
    })
  });
  this.SatisfactionT3.forEach(element => {
    element.addTableDataReady((output, datatable) => {
      this.satisfactionBrand.push(output[0].SeriesTree.split('>')[0]);
      var base = datatable.bases.get('Base').map(value => Math.round(value))[0];
    const repeat=this.satisfactionBrand.filter(item => item == output[0].SeriesTree.split('>')[0]).length;
   const code = this.getcode(output[0].SeriesTree.split('>')[0]);
   var opt1 =0;
   var opt2=0;
   var opt3=0;
    if(repeat==1){ 
     switch(output[0].SeriesCode){
       case "8":
         opt1 = output[0].Score;
         break;
       case "9":
          opt2 = output[0].Score;
         break;
       case "10":
          opt3 = output[0].Score;
         break;    
     }
     if(output.length>=2){
     switch(output[1].SeriesCode){
      case "8":
        opt1 = output[1].Score;
        break;
      case "9":
         opt2 = output[1].Score;
        break;
      case "10":
         opt3 = output[1].Score;
        break;    
    }
  }
    if(output.length==3){
    switch(output[2].SeriesCode){
      case "8":
        opt1 = output[2].Score;
        break;
      case "9":
         opt2 = output[2].Score;
        break;
      case "10":
         opt3 = output[2].Score;
        break;    
    }
  }}
    if(repeat==1){ 
      this.Satisfactiondata.push({'code':code,'score':opt1+opt2+opt3,'base':base})
      this.Satisfactiondata.sort((a, b) =>b.code - a.code).reverse();
    }
    if(this.Satisfactiondata.length==this.brandcodes.length&&this.satisfactioncheck==false){
      var dt =[];
      this.satloader=true;
      this.CallLoader();
      var dtb=[];
      this.satisfactioncheck=true;
      this.Satisfactiondata.forEach(element=>{
        dt.push(Math.round(element.score));
        dtb.push(Math.round(element.base));
      })
      this.dtPurchaseReaction.push({'type':"SatisfactionT3",'Data':dt});
      this.dtPurchaseReaction.push({'type':"Base",'Data':dtb});
    }
    })
  });
  this.RecommandationT3.forEach(element => {
    element.addTableDataReady((output, datatable) => {
      this.recommandBrand.push(output[0].SeriesTree.split('>')[0]);
      var base = datatable.bases.get('Base').map(value => Math.round(value))[0];
    const repeat=this.recommandBrand.filter(item => item == output[0].SeriesTree.split('>')[0]).length;
   const code = this.getcode(output[0].SeriesTree.split('>')[0]);
   var opt1 =0;
   var opt2=0;
   var opt3=0;
    if(repeat==1){ 
     switch(output[0].SeriesCode){
       case "8":
         opt1 = output[0].Score;
         break;
       case "9":
          opt2 = output[0].Score;
         break;
       case "10":
          opt3 = output[0].Score;
         break;    
     }
     if(output.length>=2){
     switch(output[1].SeriesCode){
      case "8":
        opt1 = output[1].Score;
        break;
      case "9":
         opt2 = output[1].Score;
        break;
      case "10":
         opt3 = output[1].Score;
        break;    
    }
  }
    if(output.length==3){
    switch(output[2].SeriesCode){
      case "8":
        opt1 = output[2].Score;
        break;
      case "9":
         opt2 = output[2].Score;
        break;
      case "10":
         opt3 = output[2].Score;
        break;    
    }
  }
      this.Recommanddata.push({'code':code,'score':opt1+opt2+opt3,'base':base})
      this.Recommanddata.sort((a, b) =>b.code - a.code).reverse();
    }
    if(this.Recommanddata.length==this.brandcodes.length&&this.Recommandationcheck==false){
      var dt =[];
      this.recomLoader=true;
      this.CallLoader();
      var dtb=[];
      this.Recommandationcheck=true;
      this.Recommanddata.forEach(element=>{
        dt.push(Math.round(element.score));
        dtb.push(Math.round(element.base));
      })
      this.dtPurchaseReaction.push({'type':"RecommandationT3",'Data':dt});
      this.dtPurchaseReaction.push({'type':"Base",'Data':dtb});
    } 
  })
  });
  this.SocialMedia.forEach(element => {
    element.addTableDataReady((output, datatable) => {
      if(output.length != 0){
        var base = datatable.bases.get('Base').map(value => Math.round(value))[0];
     var br= output[0].CategoryTree.split('>')[1];
     if(br=="")
     { br= output[0].SeriesTree.split('>')[0]
      this.socialmediaBrand.push(br); 
     }
     else{
    
      this.socialmediaBrand.push(br);
     }
      
      this.socialmediacount= this.socialmediaBrand.filter(item => item == br).length;
      var code = this.getcode(output[0].CategoryTree.split('>')[1]);
      if(this.socialmediacount==1){
     this.SocialMediadata.push({'code':code,'op1':output[0].Score,'op2':output[1].Score,'op3':output[2].Score,'op4':output[3].Score,'base':base})
    this.SocialMediadata.sort((a, b) =>b.code - a.code).reverse();
    }
    if(this.SocialMediadata.length==this.brandcodes.length&&this.socialMedia==false){
      var dt =[];
      this.socialloader=true;
      this.CallLoader();
      var dt1=[];
      var dt2=[];
      var dt3=[];
      var dtb=[];
      this.socialMedia=true;
      this.SocialMediadata.forEach(element=>{
        dt.push(Math.round(element.op1));
        dt1.push(Math.round(element.op2));
        dt2.push(Math.round(element.op3));
        dt3.push(Math.round(element.op4));
        dtb.push(Math.round(element.base));
      })
      this.dtPurchaseReaction.push({'type':"Positive Posts",'Data':dt});
      this.dtPurchaseReaction.push({'type':"Negative Posts",'Data':dt1});
      this.dtPurchaseReaction.push({'type':"Neutral Posts",'Data':dt2});
      this.dtPurchaseReaction.push({'type':"No Posts",'Data':dt3});
      this.dtPurchaseReaction.push({'type':"Base",'Data':dtb});
    } 
      }
      })
  
  });

  }
 
}
