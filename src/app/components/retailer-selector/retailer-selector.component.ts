import { Component, OnInit, Input } from '@angular/core';
import { FilterConfig } from 'src/app/shell/models/filterConfig';
import { FilterOption } from 'src/app/shell/models/filterOption';
import { FilterConfigService } from 'src/app/service/filter-config.service';
import { FilterService } from 'src/app/shell/services/filter.service';
import { FilterType } from 'src/app/shell/enums/filter-type';

@Component({
  selector: 'app-retailer-selector',
  templateUrl: './retailer-selector.component.html',
  styleUrls: ['./retailer-selector.component.css']
})
export class RetailerSelectorComponent implements OnInit {

  config: FilterConfig;
  options: Array<FilterOption>;
  @Input() Category;
  constructor(private filterService: FilterService, private filterConfigService: FilterConfigService) {
    this.options = new Array<FilterOption>();
  }

  ngOnInit() {
    this.filterService.getAllFilters().forEach(value => {
      if (this.Category === 'Faucet') {
        if (value.actAs === FilterType.SeriesSelector && value.variable === 'v786') {
          this.config = value;
        }
      }
      if (this.Category === 'Showerhead') {
        if (value.actAs === FilterType.SeriesSelector && value.variable === 'v1214') {
          this.config = value;
        }
    }
      if (this.Category === 'Toilet') {
        if (value.actAs === FilterType.SeriesSelector && value.variable === 'v870') {
          this.config = value;
        }
    }
      if (this.Category === 'TubShowerUnit') {
        if (value.actAs === FilterType.SeriesSelector && value.variable === '') {
          this.config = value;
        }
    }
    });
    this.filterConfigService.onConfigChange.subscribe(val => {
      this.config = val;
    });
    this.filterService.getFilterData(this.config).subscribe(value => {
        this.options = value.options.sort((a, b) => a.text < b.text ? -1 : 1);
    });
  }

}
