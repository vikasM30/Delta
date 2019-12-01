import {FilterService} from '../shell/services/filter.service';
import {FilterOption} from '../shell/models/filterOption';

export class Brands {
  private readonly defaultBrands;
  private selectedBrands: Array<FilterOption>;

  constructor(filterService: FilterService) {
    this.defaultBrands = filterService.getFilterConfig('Allbrands').default;
    this.selectedBrands = filterService.getSelectedChoices('Allbrands');
  }

  getBrandsText() {
    const defaultSelected = this.selectedBrands.filter(value => this.defaultBrands.includes(value.code)).map(value => value.text);
    const otherSelected = this.selectedBrands.filter(value => !this.defaultBrands.includes(value.code))
      .sort((a, b) => a.text > b.text ? 1 : -1).map(value => value.text);
    return [...defaultSelected, ...otherSelected];
  }

  getBrandsCode() {
    const defaultSelected = this.selectedBrands.filter(value => this.defaultBrands.includes(value.code))
      .map(value => value.code);
    const otherSelected = this.selectedBrands.filter(value => !this.defaultBrands.includes(value.code))
      .sort((a, b) => a.text > b.text ? 1 : -1).map(value => value.code);
    return [...defaultSelected, ...otherSelected];
  }
}
