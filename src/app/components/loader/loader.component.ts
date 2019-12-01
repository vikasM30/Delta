import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {
  private _show: boolean;
  get show(): boolean {
    return this._show;
  }
  @Input() set show(showloader: boolean) {
    this._show = showloader;
  }
  constructor() { }

  ngOnInit() {
  }

}
