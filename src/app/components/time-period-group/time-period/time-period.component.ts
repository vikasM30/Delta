import {Component, Input, OnInit} from '@angular/core';
import {FilterOption} from '../../../shell/models/filterOption';

@Component({
  selector: 'app-time-period',
  templateUrl: './time-period.component.html',
  styleUrls: ['./time-period.component.css']
})
export class TimePeriodComponent implements OnInit {
  @Input() filterConfig;
  @Input() options: Array<FilterOption>;
  constructor() { }

  ngOnInit() {
  }

}
