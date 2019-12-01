export class FilterOption {
  text: string;
  code: string;
  child: FilterOption[];
  isSelected?: boolean;
  isHidden?: boolean;

  constructor() {
    this.child = new Array<FilterOption>();
  }
}
