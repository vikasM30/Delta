import {FilterService} from '../shell/services/filter.service';
import {FilterOption} from '../shell/models/filterOption';

export class Retailers {
  private readonly defaultRetailers;
  private selectedRetailers: Array<FilterOption>;

  constructor(filterService: FilterService, Category) {
    if (Category === 'Faucet') {
      this.defaultRetailers = filterService.getFilterConfig('v786').default;
   
      this.selectedRetailers = filterService.getSelectedChoices('v786');
    }
    if (Category === 'Showerhead') {
    this.defaultRetailers = filterService.getFilterConfig('v1214').default;
      
    this.selectedRetailers = filterService.getSelectedChoices('v1214');
    }
    if (Category === 'Toilet') {
    this.defaultRetailers = filterService.getFilterConfig('v870').default;
  
    this.selectedRetailers = filterService.getSelectedChoices('v870');
    }
    if (Category === 'TubShowerUnit') {
    this.defaultRetailers = filterService.getFilterConfig('').default;
    this.selectedRetailers = filterService.getSelectedChoices('');
    }
  }

  getRetailersText() {
    const defaultSelected = this.selectedRetailers.filter(value => this.defaultRetailers.includes(value.code)).map(value => value.text);
    const otherSelected = this.selectedRetailers.filter(value => !this.defaultRetailers.includes(value.code))
      .sort((a, b) => a.text > b.text ? 1 : -1).map(value => value.text);
    return [...defaultSelected, ...otherSelected];
  }

  getRetailersCode() {
    const defaultSelected = this.selectedRetailers.filter(value => this.defaultRetailers.includes(value.code))
      .map(value => value.code);
    const otherSelected = this.selectedRetailers.filter(value => !this.defaultRetailers.includes(value.code))
      .sort((a, b) => a.text > b.text ? 1 : -1).map(value => value.code);
    return [...defaultSelected, ...otherSelected];
  }
}
