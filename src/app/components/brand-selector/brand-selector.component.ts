import {Component, OnInit} from '@angular/core';
import {FilterService} from '../../shell/services/filter.service';
import {FilterConfig} from '../../shell/models/filterConfig';
import {FilterOption} from '../../shell/models/filterOption';
import {FilterType} from '../../shell/enums/filter-type';
import { FilterConfigService } from 'src/app/service/filter-config.service';

@Component({
  selector: 'app-brand-selector',
  templateUrl: './brand-selector.component.html',
  styleUrls: ['./brand-selector.component.css']
})
export class BrandSelectorComponent implements OnInit {

  config: FilterConfig;
  options : Array<FilterOption>;
  constructor(private filterService: FilterService, private filterConfigService: FilterConfigService) {
    this.options = new Array<FilterOption>();
  }


  ngOnInit() {
    this.filterService.getAllFilters().forEach(value => {
      if (value.actAs === FilterType.SeriesSelector && value.variable === 'Allbrands') {
        this.config = value;
      }
    });
    this.filterConfigService.onConfigChange.subscribe(val => {
      this.config = val;
    });
    this.filterService.getFilterData(this.config).subscribe(value => {
        this.options = value.options.sort((a,b) => a.text < b.text ? -1 : 1);
        //this.options = value.options.filter(());
        //this.options = this.options.concat(value.options.filter().sort((a,b) => a.text < b.text ? -1 : 1));
    })
  }
}
