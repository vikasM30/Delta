import {FilterService} from '../shell/services/filter.service';
import {FilterOption} from '../shell/models/filterOption';

export class AD {
  private readonly defaultAds;
  private selectedAds: Array<FilterOption>;

  constructor(filterService: FilterService) {
    this.defaultAds = filterService.getFilterConfig('v577').default;
    this.selectedAds = filterService.getSelectedChoices('v577');
  }

  getAdsText() {
    const defaultSelected = this.selectedAds.filter(value => this.defaultAds.includes(value.code)).map(value => value.text);
    const otherSelected = this.selectedAds.filter(value => !this.defaultAds.includes(value.code))
      .sort((a, b) => a.text > b.text ? 1 : -1).map(value => value.text);
    return [...defaultSelected, ...otherSelected];
  }

  getAdsCode() {
    const defaultSelected = this.selectedAds.filter(value => this.defaultAds.includes(value.code))
      .map(value => value.code);
    const otherSelected = this.selectedAds.filter(value => !this.defaultAds.includes(value.code))
      .sort((a, b) => a.text > b.text ? 1 : -1).map(value => value.code);
    return [...defaultSelected, ...otherSelected];
  }
}
