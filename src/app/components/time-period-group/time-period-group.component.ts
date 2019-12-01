import {Component, OnInit} from '@angular/core';
import {FilterService} from 'src/app/shell/services/filter.service';
import {FilterConfig} from '../../shell/models/filterConfig';
import {FilterType} from '../../shell/enums/filter-type';

@Component({
  selector: 'app-time-period-group',
  templateUrl: './time-period-group.component.html',
  styleUrls: ['./time-period-group.component.css']
})
export class TimePeriodGroupComponent implements OnInit {

  filterConfigs: Map<string, FilterConfig>;

  constructor(private filterService: FilterService) {
    this.filterConfigs = new Map<string, FilterConfig>();
  }

  ngOnInit() {
    this.getFilterOption();
  }

  getFilterOption() {
    this.filterService.getAllFilters().forEach((value, key) => {
      if (value.actAs === FilterType.TimePeriod) {
        this.filterConfigs.set(key, value);
      }
    });
  }
}
