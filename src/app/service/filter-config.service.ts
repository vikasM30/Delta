import {Injectable, EventEmitter} from '@angular/core';
import {FilterService} from '../shell/services/filter.service';
import {FilterConfig} from '../shell/models/filterConfig';
import {FilterType} from '../shell/enums/filter-type';
import {TimePeriod} from '../shell/models/time.period';
import { FilterDataSource } from '../shell/enums/filter-data-source';
import { MarketQualifier } from '../model/market.qaulifier';
import { Subject, Observable } from 'rxjs';
import { ProductMarketQualifier } from '../model/product.Marketqaulifier';
import { VariableType } from '../shell/enums/variable-type';

@Injectable({
  providedIn: 'root'
})
export class FilterConfigService {

  private allFilters: Map<string, FilterConfig>;
  private filterObservable = new Subject<any>();
  onConfigChange = this.filterObservable.asObservable();

  constructor(private filterService: FilterService) {
    this.allFilters = new Map<string, FilterConfig>();
    this.initialize();
  }

  // showTopDataMappingForCategory = {
  //   Faucet: 'v786', Showerhead: 'v1214', Toilet: 'v870'
  // };

  initialize() {
    this.setAllFilter();
    this.allFilters.forEach(fc => this.filterService.addFilterConfig(fc));
  }

  setAllFilter() {
    this.allFilters.set('Allbrands', {
      variable: 'Allbrands', type: 1, isMultiSelected: true, visibility: false, isNested: false,
      variableText: 'ALL Brands', placeHolder: 'Brand Selector', default: ['1', '4', '3', '5', '2', '6', '23'],
       actAs: FilterType.SeriesSelector, enableSubmitButton:true,
       minSelectionLimit:1,
       maxSelectionLimit:7
    });
    this.allFilters.set('v786', {
      variable: 'v786', type: 1, isMultiSelected: true, visibility: false, isNested: false,
      variableText: 'ALL Retailers', placeHolder: 'Retailer Selector', default: ['1', '2', '3'],
       actAs: FilterType.SeriesSelector, enableSubmitButton: true,
       minSelectionLimit: 3,
       maxSelectionLimit: 5
    });
    this.allFilters.set('v577', {
      variable: 'v577', type: 1, isMultiSelected: true, visibility: false, isNested: false,
      variableText: 'ALL AD', placeHolder: 'AD Selector', default: [],
       actAs: FilterType.SeriesSelector, enableSubmitButton: true
    });
    this.allFilters.set('v1214', {
      variable: 'v1214', type: 1, isMultiSelected: true, visibility: false, isNested: false,
      variableText: 'ALL Retailers', placeHolder: 'Retailer Selector', default: ['1', '2', '3'],
       actAs: FilterType.SeriesSelector, enableSubmitButton: true,
       minSelectionLimit: 3,
       maxSelectionLimit: 5
    });
    this.allFilters.set('v870', {
      variable: 'v870', type: 1, isMultiSelected: true, visibility: false, isNested: false,
      variableText: 'ALL Retailers', placeHolder: 'Retailer Selector', default: ['1', '2', '3'],
       actAs: FilterType.SeriesSelector, enableSubmitButton: true,
       minSelectionLimit: 3,
       maxSelectionLimit: 5
    });
    this.allFilters.set('Quarterly', {
      variable: 'Quarterly', type: 1, isNested: false, visibility: true,
      variableText: 'Quarter', placeHolder: 'Quarter', default: [], hasTimeComparison: true, exclusivityWith: ['Semiannual', 'Yearly'],
      actAs: FilterType.TimePeriod
    });
    this.allFilters.set('Semiannual', {
      variable: 'Semiannual', type: 1, isNested: false, visibility: true,
      variableText: 'Semi Annual', placeHolder: 'Semi Annual', default: [], hasTimeComparison: true,
      exclusivityWith: ['Quarterly', 'Yearly'], actAs: FilterType.TimePeriod
    });
    this.allFilters.set('Yearly', {
      variable: 'Yearly', type: 1, isNested: false, visibility: true,
      variableText: 'Year', placeHolder: 'Year', default: ['1'], hasTimeComparison: true,
      exclusivityWith: ['Semiannual', 'Quarterly'], actAs: FilterType.TimePeriod
    });
    /* add all the filter here */
    this.allFilters.set('v102', {
      variable: 'v102', type: 1, isNested: false, visibility: true, default: [],
      placeHolder: 'Gender', actAs: FilterType.Filter, isMultiSelected : true,
    });
    this.allFilters.set('v471', {
      variable: 'v471', type: VariableType.Numeric, isNested: false, visibility: true, default: [],
      placeHolder: 'Age', actAs: FilterType.Filter,
    });
    // this.allFilters.set('v264', {
    //   variable: 'v264', type: 1, isNested: false, visibility: true, default: [],
    //   placeHolder: 'Income', actAs: FilterType.Filter,isMultiSelected : true, enableSubmitButton: true,
    // });
    // Multichoice (Coustom Filter)
    // this.allFilters.set('Marketqualifer', {
    //   variable: 'Marketqualifer', type: 1, isNested: true, visibility: true, default: [],
    //   placeHolder: 'Market Qualifer', actAs: FilterType.Filter, dataSource: FilterDataSource.JObject, isMultiSelected : true, enableSubmitButton: true,
    // });

    // Multichoice (Product Filter)
    this.allFilters.set('ProductCategoryfau', {
      variable: 'ProductCategoryfau', type: 1, isNested: true, visibility: true, default: [],
     placeHolder: 'Market Segment (Faucet)', actAs: FilterType.Filter, isMultiSelected : true, enableSubmitButton: true,hideOptions : ['1']
    });
    // Multichoice (Product Filter)
    this.allFilters.set('ProductCategorytoi', {
      variable: 'ProductCategorytoi', type: 1, isNested: true, visibility: true, default: [],
     placeHolder: 'Market Segment (Toilet)', actAs: FilterType.Filter, isMultiSelected : true, enableSubmitButton: true,hideOptions : ['1']
    });
    // Multichoice (Product Filter)
    this.allFilters.set('ProductCategoryshd', {
      variable: 'ProductCategoryshd', type: 1, isNested: true, visibility: true, default: [],
     placeHolder: 'Market Segment (Showerhead)', actAs: FilterType.Filter, isMultiSelected : true, enableSubmitButton: true,hideOptions : ['1']
    });
    // Multichoice (Product Filter)
    this.allFilters.set('ProductCategorytub', {
      variable: 'ProductCategorytub', type: 1, isNested: true, visibility: true, default: [],
     placeHolder: 'Market Segment (Tub)', actAs: FilterType.Filter, isMultiSelected : true, enableSubmitButton: true,hideOptions : ['1']
    });


  
    // Multichoice
    this.allFilters.set('Awareness', {
      variable: 'Awareness', type: 1, isNested: false, visibility: true, default: [],
      placeHolder: 'Awareness', actAs: FilterType.Filter, isMultiSelected : true, enableSubmitButton: true,
    });
    // Multichoice
    this.allFilters.set('RelationshipDelta', {
      variable: 'RelationshipDelta', type: 1, isNested: false, visibility: true, default: [],
      placeHolder: 'Relationship (CBR) Delta', actAs: FilterType.Filter, isMultiSelected : true, enableSubmitButton: true,hideOptions :['11','12','13','14','21','22','31','32','33']
    });
    // Multichoice
    this.allFilters.set('RelationshipAmerican', {
      variable: 'RelationshipAmerican', type: 1, isNested: false, visibility: true, default: [],
      placeHolder: 'Relationship (CBR) American Standard', actAs: FilterType.Filter, isMultiSelected : true, enableSubmitButton: true,hideOptions :['11','12','13','14','21','22','31','32','33']
    });
    // Multichoice
    this.allFilters.set('RelationshipKohler', {
      variable: 'RelationshipKohler', type: 1, isNested: false, visibility: true, default: [],
      placeHolder: 'Relationship (CBR) Kohler ', actAs: FilterType.Filter, isMultiSelected : true, enableSubmitButton: true,hideOptions :['11','12','13','14','21','22','31','32','33']
    });
    // Multichoice
    this.allFilters.set('RelationshipMoen', {
      variable: 'RelationshipMoen', type: 1, isNested: false, visibility: true, default: [],
      placeHolder: 'Relationship (CBR) Moen', actAs: FilterType.Filter, isMultiSelected : true, enableSubmitButton: true,hideOptions :['11','12','13','14','21','22','31','32','33']
    });
    // Multichoice
    this.allFilters.set('RelationshipPeerless', {
      variable: 'RelationshipPeerless', type: 1, isNested: false, visibility: true, default: [],
      placeHolder: 'Relationship (CBR) Peerless', actAs: FilterType.Filter, isMultiSelected : true, enableSubmitButton: true,hideOptions :['11','12','13','14','21','22','31','32','33']
    });
    // Multichoice
    this.allFilters.set('RelationshipPfister', {
      variable: 'RelationshipPfister', type: 1, isNested: false, visibility: true, default: [],
      placeHolder: 'Relationship (CBR) Pfister', actAs: FilterType.Filter, isMultiSelected : true, enableSubmitButton: true,hideOptions :['11','12','13','14','21','22','31','32','33']
    });
    // Multichoice
    this.allFilters.set('RelationshipAqua', {
      variable: 'RelationshipAqua', type: 1, isNested: false, visibility: true, default: [],
      placeHolder: 'Relationship (CBR) Aqua Source', actAs: FilterType.Filter, isMultiSelected : true, enableSubmitButton: true,hideOptions :['11','12','13','14','21','22','31','32','33']
    });
    // Multichoice
    this.allFilters.set('RelationshipGlaicer', {
      variable: 'RelationshipGlaicer', type: 1, isNested: false, visibility: true, default: [],
      placeHolder: 'Relationship (CBR) Glaicer Bay', actAs: FilterType.Filter, isMultiSelected : true, enableSubmitButton: true,hideOptions :['11','12','13','14','21','22','31','32','33']
    });
    // Multichoice
    this.allFilters.set('RelationshipWaterpik', {
      variable: 'RelationshipWaterpik', type: 1, isNested: false, visibility: true, default: [],
      placeHolder: 'Relationship (CBR) Waterpik', actAs: FilterType.Filter, isMultiSelected : true, enableSubmitButton: true,hideOptions :['11','12','13','14','21','22','31','32','33']
    });
    // Multichoice(pending)
    // this.allFilters.set('v499', {
    //   variable: 'v499', type: 1, isNested: false, visibility: true, default: [],
    //   placeHolder: 'Faucet-Delta', actAs: FilterType.Filter, isMultiSelected : true, enableSubmitButton: true,
    // });
    // Multichoice(pending)
    this.allFilters.set('v499', {
      variable: 'v499', type: 1, isNested: false, visibility: true, default: [],
      placeHolder: 'Delta (Faucet)', actAs: FilterType.Filter, isMultiSelected : true, enableSubmitButton: true,
    });
    // Multichoice(pending)
    this.allFilters.set('v500', {
      variable: 'v500', type: 1, isNested: false, visibility: true, default: [],
      placeHolder: 'American Standard (Faucet)', actAs: FilterType.Filter, isMultiSelected : true, enableSubmitButton: true,
    });
    // Multichoice(pending)
    this.allFilters.set('v501', {
      variable: 'v501', type: 1, isNested: false, visibility: true, default: [],
      placeHolder: 'Kohler (Faucet)', actAs: FilterType.Filter, isMultiSelected : true, enableSubmitButton: true,
    });
    // Multichoice(pending)
    this.allFilters.set('v502', {
      variable: 'v502', type: 1, isNested: false, visibility: true, default: [],
      placeHolder: 'Moen (Faucet)', actAs: FilterType.Filter, isMultiSelected : true, enableSubmitButton: true,
    });
    // Multichoice(pending)
    this.allFilters.set('v503', {
      variable: 'v503', type: 1, isNested: false, visibility: true, default: [],
      placeHolder: 'Peerless (Faucet)', actAs: FilterType.Filter, isMultiSelected : true, enableSubmitButton: true,
    });
    // Multichoice(pending)
    this.allFilters.set('v504', {
      variable: 'v504', type: 1, isNested: false, visibility: true, default: [],
      placeHolder: 'Pfister (Faucet)', actAs: FilterType.Filter, isMultiSelected : true, enableSubmitButton: true,
    });
    // Multichoice(pending)
    this.allFilters.set('v505', {
      variable: 'v505', type: 1, isNested: false, visibility: true, default: [],
      placeHolder: 'Aqua Source (Faucet)', actAs: FilterType.Filter, isMultiSelected : true, enableSubmitButton: true,
    });
    // Multichoice(pending)
    this.allFilters.set('v506', {
      variable: 'v506', type: 1, isNested: false, visibility: true, default: [],
      placeHolder: 'Glacier Bay (Faucet)', actAs: FilterType.Filter, isMultiSelected : true, enableSubmitButton: true,
    });
    // Multichoice(pending)
    this.allFilters.set('v507', {
      variable: 'v507', type: 1, isNested: false, visibility: true, default: [],
      placeHolder: 'Brizo (Faucet)', actAs: FilterType.Filter, isMultiSelected : true, enableSubmitButton: true,
    });
    // Multichoice(pending)
    this.allFilters.set('v508', {
      variable: 'v508', type: 1, isNested: false, visibility: true, default: [],
      placeHolder: 'Grohe (Faucet)', actAs: FilterType.Filter, isMultiSelected : true, enableSubmitButton: true,
    });
    // Multichoice(pending)
    this.allFilters.set('v509', {
      variable: 'v509', type: 1, isNested: false, visibility: true, default: [],
      placeHolder: 'Hansgrohe (Faucet)', actAs: FilterType.Filter, isMultiSelected : true, enableSubmitButton: true,
    });
    // Multichoice(pending)
    this.allFilters.set('v510', {
      variable: 'v510', type: 1, isNested: false, visibility: true, default: [],
      placeHolder: 'Toto (Faucet)', actAs: FilterType.Filter, isMultiSelected : true, enableSubmitButton: true,
    });

    
    this.allFilters.set('v512', {
      variable: 'v512', type: 1, isNested: false, visibility: true, default: [],
      placeHolder: 'Delta (Toilet)', actAs: FilterType.Filter, isMultiSelected : true, enableSubmitButton: true,
    });
    // Multichoice(pending)
    this.allFilters.set('v513', {
      variable: 'v513', type: 1, isNested: false, visibility: true, default: [],
      placeHolder: 'American Standard (Toilet)', actAs: FilterType.Filter, isMultiSelected : true, enableSubmitButton: true,
    });
    // Multichoice(pending)
    this.allFilters.set('v514', {
      variable: 'v514', type: 1, isNested: false, visibility: true, default: [],
      placeHolder: 'Kohler (Toilet)', actAs: FilterType.Filter, isMultiSelected : true, enableSubmitButton: true,
    });
    // Multichoice(pending)
    this.allFilters.set('v515', {
      variable: 'v515', type: 1, isNested: false, visibility: true, default: [],
      placeHolder: 'Moen (Toilet)', actAs: FilterType.Filter, isMultiSelected : true, enableSubmitButton: true,
    });
    // Multichoice(pending)
    this.allFilters.set('v516', {
      variable: 'v516', type: 1, isNested: false, visibility: true, default: [],
      placeHolder: 'Peerless (Toilet)', actAs: FilterType.Filter, isMultiSelected : true, enableSubmitButton: true,
    });
    // Multichoice(pending)
    this.allFilters.set('v517', {
      variable: 'v517', type: 1, isNested: false, visibility: true, default: [],
      placeHolder: 'Pfister (Toilet)', actAs: FilterType.Filter, isMultiSelected : true, enableSubmitButton: true,
    });
    // Multichoice(pending)
    this.allFilters.set('v518', {
      variable: 'v518', type: 1, isNested: false, visibility: true, default: [],
      placeHolder: 'Aqua Source (Toilet)', actAs: FilterType.Filter, isMultiSelected : true, enableSubmitButton: true,
    });
    // Multichoice(pending)
    this.allFilters.set('v519', {
      variable: 'v519', type: 1, isNested: false, visibility: true, default: [],
      placeHolder: 'Glacier Bay (Toilet)', actAs: FilterType.Filter, isMultiSelected : true, enableSubmitButton: true,
    });
    // Multichoice(pending)
    this.allFilters.set('v520', {
      variable: 'v520', type: 1, isNested: false, visibility: true, default: [],
      placeHolder: 'Briggs (Toilet)', actAs: FilterType.Filter, isMultiSelected : true, enableSubmitButton: true,
    });
    // Multichoice(pending)
    this.allFilters.set('v521', {
      variable: 'v521', type: 1, isNested: false, visibility: true, default: [],
      placeHolder: 'Eljer (Toilet)', actAs: FilterType.Filter, isMultiSelected : true, enableSubmitButton: true,
    });
    // Multichoice(pending)
    this.allFilters.set('v522', {
      variable: 'v522', type: 1, isNested: false, visibility: true, default: [],
      placeHolder: 'Gerber (Toilet)', actAs: FilterType.Filter, isMultiSelected : true, enableSubmitButton: true,
    });
    // Multichoice(pending)
    this.allFilters.set('v523', {
      variable: 'v523', type: 1, isNested: false, visibility: true, default: [],
      placeHolder: 'Jacuzzi (Toilet)', actAs: FilterType.Filter, isMultiSelected : true, enableSubmitButton: true,
    });
    // Multichoice(pending)
    this.allFilters.set('v524', {
      variable: 'v524', type: 1, isNested: false, visibility: true, default: [],
      placeHolder: 'Mansfield (Toilet)', actAs: FilterType.Filter, isMultiSelected : true, enableSubmitButton: true,
    });
    // Multichoice(pending)
    this.allFilters.set('v525', {
      variable: 'v525', type: 1, isNested: false, visibility: true, default: [],
      placeHolder: 'Sterling (Toilet)', actAs: FilterType.Filter, isMultiSelected : true, enableSubmitButton: true,
    });
    // Multichoice(pending)
    this.allFilters.set('v526', {
      variable: 'v526', type: 1, isNested: false, visibility: true, default: [],
      placeHolder: 'Toto (Toilet)', actAs: FilterType.Filter, isMultiSelected : true, enableSubmitButton: true,
    });
    // Multichoice(pending)
    this.allFilters.set('v527', {
      variable: 'v527', type: 1, isNested: false, visibility: true, default: [],
      placeHolder: 'Penguin (Toilet)', actAs: FilterType.Filter, isMultiSelected : true, enableSubmitButton: true,
    });

        // Multichoice
        this.allFilters.set('v529', {
          variable: 'v529', type: 1, isNested: false, visibility: true, default: [],
          placeHolder: 'Delta (Showerhead)', actAs: FilterType.Filter, isMultiSelected : true, enableSubmitButton: true,
        });
        // Multichoice
        this.allFilters.set('v530', {
            variable: 'v530', type: 1, isNested: false, visibility: true, default: [],
            placeHolder: 'American Standard (Showerhead)', actAs: FilterType.Filter, isMultiSelected : true, enableSubmitButton: true,
        });
        // Multichoice
        this.allFilters.set('v531', {
            variable: 'v531', type: 1, isNested: false, visibility: true, default: [],
            placeHolder: 'Kohler (Showerhead)', actAs: FilterType.Filter, isMultiSelected : true, enableSubmitButton: true,
        });
        // Multichoice
        this.allFilters.set('v532', {
            variable: 'v532', type: 1, isNested: false, visibility: true, default: [],
            placeHolder: 'Moen (Showerhead)', actAs: FilterType.Filter, isMultiSelected : true, enableSubmitButton: true,
        });
        // Multichoice
        this.allFilters.set('v533', {
            variable: 'v533', type: 1, isNested: false, visibility: true, default: [],
            placeHolder: 'Peerless (Showerhead)', actAs: FilterType.Filter, isMultiSelected : true, enableSubmitButton: true,
        });
        // Multichoice
        this.allFilters.set('v534', {
            variable: 'v534', type: 1, isNested: false, visibility: true, default: [],
            placeHolder: 'Pfister (Showerhead)', actAs: FilterType.Filter, isMultiSelected : true, enableSubmitButton: true,
        });
        // Multichoice
        this.allFilters.set('v535', {
            variable: 'v535', type: 1, isNested: false, visibility: true, default: [],
            placeHolder: 'Aqua Source (Showerhead)', actAs: FilterType.Filter, isMultiSelected : true, enableSubmitButton: true,
        });
        // Multichoice
        this.allFilters.set('v536', {
            variable: 'v536', type: 1, isNested: false, visibility: true, default: [],
            placeHolder: 'Glacier Bay (Showerhead)', actAs: FilterType.Filter, isMultiSelected : true, enableSubmitButton: true,
        });
        // Multichoice
        this.allFilters.set('v537', {
            variable: 'v537', type: 1, isNested: false, visibility: true, default: [],
            placeHolder: 'Grohe (Showerhead)', actAs: FilterType.Filter, isMultiSelected : true, enableSubmitButton: true,
        });
        // Multichoice
        this.allFilters.set('v538', {
            variable: 'v538', type: 1, isNested: false, visibility: true, default: [],
            placeHolder: 'Hansgrohe (Showerhead)', actAs: FilterType.Filter, isMultiSelected : true, enableSubmitButton: true,
        });
        // Multichoice
        this.allFilters.set('v539', {
            variable: 'v539', type: 1, isNested: false, visibility: true, default: [],
            placeHolder: 'Speakman (Showerhead)', actAs: FilterType.Filter, isMultiSelected : true, enableSubmitButton: true,
        });
        // Multichoice
        this.allFilters.set('v540', {
            variable: 'v540', type: 1, isNested: false, visibility: true, default: [],
            placeHolder: 'Waterpik (Showerhead)', actAs: FilterType.Filter, isMultiSelected : true, enableSubmitButton: true,
        });
        // Multichoice
        this.allFilters.set('v541', {
            variable: 'v541', type: 1, isNested: false, visibility: true, default: [],
            placeHolder: 'Symmons (Showerhead)', actAs: FilterType.Filter, isMultiSelected : true, enableSubmitButton: true,
        });
        // Multichoice
        this.allFilters.set('v542', {
            variable: 'v542', type: 1, isNested: false, visibility: true, default: [],
            placeHolder: 'Proflo (Showerhead)', actAs: FilterType.Filter, isMultiSelected : true, enableSubmitButton: true,
        });
        // Multichoice
        this.allFilters.set('v543', {
            variable: 'v543', type: 1, isNested: false, visibility: true, default: [],
            placeHolder: 'Oxygenics (Showerhead)', actAs: FilterType.Filter, isMultiSelected : true, enableSubmitButton: true,
        });
    
    
    // Multichoice
    this.allFilters.set('BrandEquity', {
      variable: 'BrandEquity', type: 1, isNested: false, visibility: true, default: [],
      placeHolder: 'Brand Equity', actAs: FilterType.Filter, isMultiSelected : true, enableSubmitButton: true,
    });
    // Multichoice
    this.allFilters.set('RecentPurchaser', {
      variable: 'RecentPurchaser', type: 1, isNested: false, visibility: true, default: [],
      placeHolder: 'Recent Purchaser', actAs: FilterType.Filter, isMultiSelected : true, enableSubmitButton: true,
    });

    this.filterService.setJObject('Marketqualifer', new MarketQualifier());
    this.filterService.setJObject('ProductCategory', new ProductMarketQualifier());
    
  }

  initializeOverallSnapshot() {
    this.allFilters.get('Allbrands').visibility = false;
  }
  initializediscriptor(){
    this.allFilters.get('Allbrands').visibility = false;
  }

  initializeOverallBrandHealth() {
    this.initBrandFilters();
    this.allFilters.get('Allbrands').visibility = true;
    this.allFilters.get('Allbrands').hideOptions =['48','49','50','47'];
  }

  initializeEquitywithFaucet(){
      this.initBrandFilters();
      this.allFilters.get('Allbrands').visibility = true;
      this.allFilters.get('Allbrands').default = ['1', '4', '3', '5', '2','6'];
      this.Faucet();
  }
  initializeEquitywithShowerhead(){
    this.initBrandFilters();
    this.allFilters.get('Allbrands').visibility = true;
    this.allFilters.get('Allbrands').default = ['1', '4', '3', '5', '2','6','23'];
    this.showerhead();
}
initializeEquitywithToilet(){
  this.initBrandFilters();
  this.allFilters.get('Allbrands').visibility = true;
  this.allFilters.get('Allbrands').default = ['1', '4', '3', '5', '2','6'];
  this.TOI();
}
initializeEquitywithTUB(){
  this.initBrandFilters();
  this.allFilters.get('Allbrands').visibility = true;
  this.allFilters.get('Allbrands').default = ['1', '4', '3', '5', '2'];
  this.TubShowerUnit();
}
initializeRecentpurchasewithFaucet(){
  this.initBrandFilters();
      this.allFilters.get('Allbrands').visibility = true;
      this.allFilters.get('Allbrands').default = ['1', '4', '3', '5', '2','6'];
    this.Faucet();
}
initializeRecentpurchasewithShowerhead(){
  this.initBrandFilters();
    this.allFilters.get('Allbrands').visibility = true;
    this.allFilters.get('Allbrands').default = ['1', '4', '3', '5', '2','6','23'];
   this.showerhead();
}
initializeRecentpurchasewithToilet(){
  this.initBrandFilters();
  this.allFilters.get('Allbrands').visibility = true;
  this.allFilters.get('Allbrands').default = ['1', '4', '3', '5', '2','6'];
  this.TOI();
}
initializeRecentpurchasewithTUB(){
  this.initBrandFilters();
  this.allFilters.get('Allbrands').visibility = true;
  this.allFilters.get('Allbrands').default = ['1', '4', '3', '5', '2'];
  this.TubShowerUnit();
}
initializePurchaseReactionwithFaucet(){
  this.initBrandFilters();
  this.allFilters.get('Allbrands').visibility = true;
  this.allFilters.get('Allbrands').default = ['1', '4', '3', '5', '2','6'];
this.Faucet();
}
initializePurchaseReactionwithToilet(){
  this.initBrandFilters();
  this.allFilters.get('Allbrands').visibility = true;
  this.allFilters.get('Allbrands').default = ['1', '4', '3', '5', '2','6'];
  this.TOI();
}
initializePurchaseReactionwithTUB(){
  this.initBrandFilters();
  this.allFilters.get('Allbrands').visibility = true;
  this.allFilters.get('Allbrands').default = ['1', '4', '3', '5', '2'];
  this.TubShowerUnit();
}
initializePurchaseReactionwithShowerhead(){
  this.initBrandFilters();
  this.allFilters.get('Allbrands').visibility = true;
  this.allFilters.get('Allbrands').default = ['1', '4', '3', '5', '2','6','23'];
 this.showerhead();
}
  initializeCategorySnapshot() {
    this.filterService.hideFilter('Allbrands');
    this.filterService.hideFilter('Yearly');
    this.filterService.hideFilter('Quarterly');
    this.filterService.hideFilter('Semiannual');
    this.allFilters.get('Yearly').visibility = true;
    this.allFilters.get('Quarterly').visibility = true;
    this.allFilters.get('Semiannual').visibility = true;
    this.allFilters.get('Allbrands').visibility = false;
  }
  /**
   * Brand Perception
   */
  initializeOverallBrandPereception(){
    this.filterService.hideFilter('Allbrands');
    this.filterService.hideFilter('Yearly');
    this.filterService.hideFilter('Quarterly');
    this.filterService.hideFilter('Semiannual');
    
    this.allFilters.get('Allbrands').visibility = false;
    this.allFilters.get('Yearly').visibility = true;
    this.allFilters.get('Quarterly').visibility = true;
    this.allFilters.get('Semiannual').visibility = true;
    //this.allFilters.get('Allbrands').default = ['1', '4', '3', '5', '2', '6', '23'];
  }
  /**
   * Over all Touch Point Recall
   */
  initializeOverallTouchPointRecall(){
    this.filterService.hideFilter('Allbrands');
    this.filterService.hideFilter('Yearly');
    this.filterService.hideFilter('Quarterly');
    this.filterService.hideFilter('Semiannual');
    this.allFilters.get('Yearly').visibility = true;
    this.allFilters.get('Quarterly').visibility = true;
    this.allFilters.get('Semiannual').visibility = true;
    this.allFilters.get('Allbrands').visibility = false;
    this.allFilters.get('Allbrands').default = ['1','4','3'];
   // this.emitChanges(this.allFilters.get('Allbrands'));
  }
  initializeCateogryBrandHealth(){
    this.initBrandFilters();
    this.allFilters.get('Allbrands').hideOptions = ['9','10','11','12','13','14','15','16','17','18','19','20','21','22','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40','41','42','48','49','50'];
  }
  initializeCateogryBrandHealthFaucet(){
    this.initBrandFilters();
      this.allFilters.get('Allbrands').visibility = true;
      this.allFilters.get('Allbrands').default = ['1', '4', '3', '5', '2','6'];
      this.Faucet();
  }

  initializeCateogryReasonRetailerFaucet() {
    this.initRetailerFiltersFaucet();
    this.allFilters.get('v786').visibility = true;
    this.allFilters.get('v786').default = ['1', '2', '3'];
  }
  initializeADSelector() {
    this.initADSelector();
    // this.allFilters.get('v577').visibility = true;
    // this.allFilters.get('v786').default = ['1', '2', '3'];
  }

  initializeCateogryReasonRetailerShowerhead() {
    this.initRetailerFiltersShowerhead();
    this.allFilters.get('v1214').visibility = true;
    this.allFilters.get('v1214').default = ['1', '2', '3'];
  }

  initializeCateogryReasonRetailerToilet() {
    this.initRetailerFiltersToilet();
    this.allFilters.get('v870').visibility = true;
    this.allFilters.get('v870').default = ['1', '2', '3'];
  }

  initializeCateogryReasonRetailerTubShowerUnit() {
    // this.initRetailerFiltersTubShowerUnit();
    // this.allFilters.get('').visibility = true;
    this.allFilters.get('').default = ['1', '2', '3'];
  }

  initializeCateogryBrandHealthShowerhead(){
    this.initBrandFilters();
    this.allFilters.get('Allbrands').visibility = true;
    this.allFilters.get('Allbrands').default = ['1', '4', '3', '5', '2', '6', '23'];
    this.showerhead();
  }
  initializeCateogryBrandHealthToilet(){
    this.initBrandFilters();
    this.allFilters.get('Allbrands').visibility = true;
    this.allFilters.get('Allbrands').default = ['1', '4', '3', '5', '2', '6'];
    this.TOI();
  }
  initializeCateogryBrandHealthTubShowerUnit(){
    this.initBrandFilters();
    this.allFilters.get('Allbrands').visibility = true;
    this.allFilters.get('Allbrands').default = ['1', '4', '3', '5', '2'];
    this.TubShowerUnit();
  }
  private TubShowerUnit(){
    // this.allFilters.get('v786').hideOptions = ['4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18'];
    this.allFilters.get('Allbrands').hideOptions = ['6','7','8','9','10','11','12','13','14','15','16','17',
    '19'  ,'20','21','22','23','24','28','29','32','33','34','35','36','37','38','39','40','41','42','43',
    '44','45','46','47','48','49','50','51'];
  }
  private TOI(){
    // this.allFilters.get('v786').hideOptions = ['4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18'];
    this.allFilters.get('Allbrands').hideOptions = ['9','10','11','13','21','22','23','24','25','26',
    '27','28','29','30','31','32','33','34','35','36','37','38','39','40','41','42','43','44','45','46','47',
    '48','49','50','51'];
  }
  private showerhead(){
    // this.allFilters.get('v786').hideOptions = ['4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18'];
    this.allFilters.get('Allbrands').hideOptions = ['9','12','13','14','15','16','17','18','19','20','21','25',
    '26','27','28','29','30','31','33','34','35','36','37','38','39','40','42','43','44','45','46','47',
    '48','49','50','51'];
  }
  private Faucet(){
    // this.allFilters.get('v786').hideOptions = ['4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18'];
    this.allFilters.get('Allbrands').hideOptions = ['12','13','14','15','16','17','18','20','21','22','23',
    '24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40','41','42','43',
    '44','45','46','47','48','49','50','51'];
  }

  initializeEquity(){
      this.initBrandFilters();
      this.allFilters.get('Allbrands').hideOptions = ['9','10','11','12','13','14','15','16','17','18',
      '19','20','21','22','24','28','29','32','33','34','35','36','37','38','39','40','41','42','43',
      '44','45','46','47','48','49','50','51'];
  }

  initializeCateogryPurchaseDisposition(){
    this.initBrandFilters();
    this.allFilters.get('Allbrands').default = ['1', '4', '3', '5', '2', '6', '23'];
    this.Faucet();
  }

  initializeAdDiagnostic(){
    this.initBrandFilters();
    this.allFilters.get('Allbrands').default = ['1', '4', '3', '2'];
  }
  initializeAdDiagnostic1(){
    this.initADSelector();
    
    this.allFilters.get('Allbrands').default = ['1', '4', '3', '2'];
  }


  emitChanges(config){
    this.filterObservable.next(config);
  }

  private initBrandFilters() {
    this.filterService.hideFilter('Allbrands');
    this.filterService.hideFilter('Yearly');
    this.filterService.hideFilter('Quarterly');
    this.filterService.hideFilter('Semiannual');

    this.allFilters.get('Allbrands').visibility = true;
    this.allFilters.get('Yearly').visibility = true;
    this.allFilters.get('Quarterly').visibility = true;
    this.allFilters.get('Semiannual').visibility = true;
    this.allFilters.get('Allbrands').default = ['1', '4', '3', '5', '2', '6', '23'];
    this.allFilters.get('Allbrands').hideOptions =['43','48','49','50','51'];
  }
  private initRetailerFiltersFaucet() {
    this.filterService.hideFilter('v786');
    this.filterService.hideFilter('Yearly');
    this.filterService.hideFilter('Quarterly');
    this.filterService.hideFilter('Semiannual');

    this.allFilters.get('v786').visibility = true;
    this.allFilters.get('Yearly').visibility = true;
    this.allFilters.get('Quarterly').visibility = true;
    this.allFilters.get('Semiannual').visibility = true;
    this.allFilters.get('v786').default = ['1', '2', '3'];
  }
  private initRetailerFiltersShowerhead() {
    this.filterService.hideFilter('v1214');
    this.filterService.hideFilter('Yearly');
    this.filterService.hideFilter('Quarterly');
    this.filterService.hideFilter('Semiannual');

    this.allFilters.get('v1214').visibility = true;
    this.allFilters.get('Yearly').visibility = true;
    this.allFilters.get('Quarterly').visibility = true;
    this.allFilters.get('Semiannual').visibility = true;
    this.allFilters.get('v1214').default = ['1', '2', '3'];
  }
  private initRetailerFiltersToilet() {
    this.filterService.hideFilter('v870');
    this.filterService.hideFilter('Yearly');
    this.filterService.hideFilter('Quarterly');
    this.filterService.hideFilter('Semiannual');

    this.allFilters.get('v870').visibility = true;
    this.allFilters.get('Yearly').visibility = true;
    this.allFilters.get('Quarterly').visibility = true;
    this.allFilters.get('Semiannual').visibility = true;
    this.allFilters.get('v870').default = ['1', '2', '3'];
  }
  private initRetailerFiltersTubShowerUnit() {
    this.filterService.hideFilter('');
    this.filterService.hideFilter('Yearly');
    this.filterService.hideFilter('Quarterly');
    this.filterService.hideFilter('Semiannual');

    this.allFilters.get('').visibility = true;
    this.allFilters.get('Yearly').visibility = true;
    this.allFilters.get('Quarterly').visibility = true;
    this.allFilters.get('Semiannual').visibility = true;
    this.allFilters.get('').default = ['1', '2', '3'];
  }
  private initADSelector() {
    this.filterService.hideFilter('v577');
    this.filterService.hideFilter('Yearly');
    this.filterService.hideFilter('Quarterly');
    this.filterService.hideFilter('Semiannual');

    this.allFilters.get('v577').visibility = false;
    this.allFilters.get('Yearly').visibility = true;
    this.allFilters.get('Quarterly').visibility = true;
    this.allFilters.get('Semiannual').visibility = true;
    // this.allFilters.get('v870').default = ['1', '2', '3'];
  }
}

