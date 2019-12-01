import { Component, OnInit } from '@angular/core';
import { FilterService } from 'src/app/shell/services/filter.service';
import { FilterConfigService } from 'src/app/service/filter-config.service';
import { FilterConfig } from 'src/app/shell/models/filterConfig';
import { FilterType } from 'src/app/shell/enums/filter-type';

@Component({
  selector: 'app-filter-menu',
  templateUrl: './filter-menu.component.html',
  styleUrls: ['./filter-menu.component.css']
})
export class FilterMenuComponent implements OnInit {
  consideration: boolean;
  filtersConfig: Array<FilterConfig>;
  respondentLevelConfig    = {
    category : '',
    filterConfig   : []
  };
  productLevelConfig       = {
    category : '',
    filterConfig   : []
  };
  overAllbrandLevelConfig  = {
    category : '',
    filterConfig   : []
  };
  productByBrandLevelConfig = {
    category       : '',
    considrationCategory       : '',
    filterConfig   : [],
    considrationFilterConfig   : [],
  };
  filterMapping = {
    v102:'Respondent Level',
    v471:'Respondent Level',
    v264:'Respondent Level',
    Marketqualifer:'Respondent Level',
    Awareness:'Overall Brand Level',
    RelationshipDelta:'Overall Brand Level',
    RelationshipAmerican : 'Overall Brand Level',
    RelationshipKohler : 'Overall Brand Level',
    RelationshipMoen : 'Overall Brand Level',
    RelationshipPeerless : 'Overall Brand Level',
    RelationshipPfister : 'Overall Brand Level',
    RelationshipAqua : 'Overall Brand Level',
    RelationshipGlaicer : 'Overall Brand Level',
    RelationshipWaterpik : 'Overall Brand Level',
    v499 : 'Consideration',
    v500 : 'Consideration',
    v501 : 'Consideration',
    v502 : 'Consideration',
    v503 : 'Consideration',
    v504 : 'Consideration',
    v505 : 'Consideration',
    v506 : 'Consideration',
    v507 : 'Consideration',
    v508 : 'Consideration',
    v509 : 'Consideration',
    v510 : 'Consideration',
    v512 : 'Consideration',
    v513 : 'Consideration',
    v514 : 'Consideration',
    v515 : 'Consideration',
    v516 : 'Consideration',
    v517 : 'Consideration',
    v518 : 'Consideration',
    v519 : 'Consideration',
    v520 : 'Consideration',
    v521 : 'Consideration',
    v523 : 'Consideration',
    v524 : 'Consideration',
    v525 : 'Consideration',
    v526 : 'Consideration',
    v527 : 'Consideration',
    v529 : 'Consideration',
    v530 : 'Consideration',
    v531 : 'Consideration',
    v532 : 'Consideration',
    v533 : 'Consideration',
    v534 : 'Consideration',
    v535 : 'Consideration',
    v536 : 'Consideration',
    v537 : 'Consideration',
    v538 : 'Consideration',
    v539 : 'Consideration',
    v540 : 'Consideration',
    v541 : 'Consideration',
    v542 : 'Consideration',
    v543 : 'Consideration',
    BrandEquity:'Brand by Product Level',
    RecentPurchaser : 'Brand by Product Level',
    ProductCategory: 'Product Category Level',
    ProductCategoryfau: 'Product Category Level',
    ProductCategorytoi: 'Product Category Level',
    ProductCategoryshd: 'Product Category Level',
    ProductCategorytub: 'Product Category Level',
  }
  constructor(private filterService: FilterService, private fcService: FilterConfigService) {
    this.filtersConfig = new Array<FilterConfig>();
    // this.respondentLevelConfig     = {
    //   category : '',
    //   filter   : []
    // }
    // this.productLevelConfig        = {
    //   category : '',
    //   filter   : []
    // }
    // this.overAllbrandLevelConfig   = {
    //   category : '',
    //   filter   : []
    // }
    // this.productByBrandLevelConfig = {
    //   category : '',
    //   filter   : []
    // }
  }
  
  ngOnInit() {
    this.filterService.getAllFilters().forEach((fc) => {
      this.filtersConfig.push(fc);
      if(fc.actAs === FilterType.Filter){
        // const filterObj = {
        //   category:this.filterMapping[fc.variable],
        //   filter:[]
        // }
        if(this.filterMapping[fc.variable]=='Respondent Level'){
          if(!this.respondentLevelConfig.category){
              this.respondentLevelConfig.category = this.filterMapping[fc.variable];
          }
          this.respondentLevelConfig.filterConfig.push(fc);
        }else if(this.filterMapping[fc.variable]=='Product Category Level'){
          if(!this.productLevelConfig.category){
            this.productLevelConfig.category = this.filterMapping[fc.variable];
          }
          this.productLevelConfig.filterConfig.push(fc);
          // const faucet = {...fc};
          // faucet.hideOptions = {...fc.hideOptions};
          // faucet.hideOptions = ['8', '9', '10', '11', '12', '13', '14', '15', '16','17','18','20','21','22'];
          // faucet.placeHolder = "Market Qualifer (Faucet)";
          // this.productLevelConfig.filterConfig.push(faucet);

          // const toilet = {...fc};
          // toilet.hideOptions = {...fc.hideOptions};
          // toilet.hideOptions = ['2', '3', '4', '5', '6', '13', '14', '15', '16','17','18','20','21','22'];
          // toilet.placeHolder = "Market Qualifer (Toilet)";
          // this.productLevelConfig.filterConfig.push(toilet);

          // const showerhead = {...fc};
          // showerhead.hideOptions = {...fc.hideOptions};
          // showerhead.hideOptions = ['2', '3', '4', '5', '6', '8', '9', '10','11','12','20','21','22'];
          // showerhead.placeHolder = "Market Qualifer (Showerhead)";
          // this.productLevelConfig.filterConfig.push(showerhead);

          // const tub = {...fc};
          // tub.hideOptions = {...fc.hideOptions};
          // tub.hideOptions = ['2', '3', '4', '5', '6', '8', '9', '10','11','12', '14', '15', '16','17','18'];
          // tub.placeHolder = "Market Qualifer (Tub)";
          // this.productLevelConfig.filterConfig.push(tub);
        }else if(this.filterMapping[fc.variable]=='Overall Brand Level'){
          if(!this.overAllbrandLevelConfig.category){
            this.overAllbrandLevelConfig.category = this.filterMapping[fc.variable];
        }
          this.overAllbrandLevelConfig.filterConfig.push(fc);
        }
        else if(this.filterMapping[fc.variable]=='Brand by Product Level' || this.filterMapping[fc.variable]=='Consideration'){
         
          if(this.filterMapping[fc.variable]=='Consideration'){
            if(!this.productByBrandLevelConfig.category){
              this.productByBrandLevelConfig.considrationCategory = this.filterMapping[fc.variable];
            }
            this.productByBrandLevelConfig.considrationFilterConfig.push(fc);
          }else{
            if(!this.productByBrandLevelConfig.category){
              this.productByBrandLevelConfig.category = this.filterMapping[fc.variable];
            }
              this.productByBrandLevelConfig.filterConfig.push(fc);
          }
        }
      }
    });
  }

  close() {
    const nav = document.getElementById('filter-nav');
    nav.style.visibility = "hidden";
    nav.style.width = "0px";
     nav.style.right = "-5px"
  }
}
