import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appClickCatcher]'
})
export class ClickCatcherDirective {

  constructor() { }
  @HostListener('click',['$event.target']) onClick(target){
    // console.log(target);
    if(target.title == 'Submit' ){
      const nav = document.getElementById('filter-nav');
      nav.style.visibility = "hidden";
      nav.style.width = "0px";
      nav.style.right = "-5px"
    }
  }
}
