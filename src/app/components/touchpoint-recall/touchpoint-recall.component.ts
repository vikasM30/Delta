import { Component, OnInit } from '@angular/core';
import { Chart } from 'src/app/shell/models/chart';
import { Subject } from 'rxjs';
import { TouchpointRecall } from './table/touchpoint-recall';
import { FilterService } from 'src/app/shell/services/filter.service';
import { TouchpointRecallCsv } from './table/touchpoint-recal-csv';
import { AngularCsv } from 'angular7-csv/dist/Angular-csv';
import { FilterConfigService } from 'src/app/service/filter-config.service';
import { Brands } from 'src/app/model/brands';
import { AssetMappings } from 'src/app/model/asset.mappings';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-touchpoint-recall',
  templateUrl: './touchpoint-recall.component.html',
  styleUrls: ['./touchpoint-recall.component.css']
})
export class TouchpointRecallComponent implements OnInit {
  onDataUpdate: Subject<any> = new Subject;
  optionSelectionUnsubscribe: Subject<any> = new Subject<any>();
  touchpointRecallArray: Array<any>;
  touchpointRecall: Chart;
  touchpointRecallData: Array<any>  = new Array<any>();
  showLoader: boolean;
  dtTouchPointRecallCsv = new Array<any>();
  csvOptions = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalseparator: '.',
    showLabels: true,
    showTitle: true,
    title: 'Delta',
    useBom: true,
    noDownload: false,
    headers: []
  };
  brandList: any;
  brandCodes = AssetMappings.brandNameAndCodes;  
  brandNameCsv: Array<string>
  brandLogos = AssetMappings.logoByBrandCode;
  constructor(private filterService: FilterService, private filterConfigService: FilterConfigService) {
    this.filterConfigService.initializeOverallTouchPointRecall();
  }

  ngOnInit() {
    this.updateTouchPointRecall();
    //let oneTime= true;
    this.filterService.optionSelectionCallback$
      .pipe(takeUntil(this.optionSelectionUnsubscribe))
      .subscribe(value => {
        //if(oneTime){
          //oneTime = false;
          this.updateTouchPointRecall();
        //}
        setTimeout(() => {
          this.onDataUpdate.next();
        });
    });
  }

  /**
   * Get Data for All Brand 
   * Calculate and transform data into table array form
   */
  updateTouchPointRecall() {
    const brands = ["1", "4", "3"];
    this.brandList = brands.map((val)=> this.brandLogos[val] );
    this.brandNameCsv = brands.map((val)=> this.brandCodes[val] );
    if (this.brandList.length) {
      const Touchpoint: TouchpointRecall = new TouchpointRecall();
      this.showLoader = true;
      this.touchpointRecallData = [];
      this.touchpointRecallArray = Touchpoint.getTouchpointRecallData(brands);
      const data = [];
      this.touchpointRecallArray.forEach((value) => {
        value.addTableDataReady((output, dataTable) => {
          data.push(dataTable);
          if(this.touchpointRecallArray.length == data.length){
            const chartLength = data.length-1;
            let baseValueData = Array<any>();
            data.forEach((table,i)=>{
                if(table.headers[0] != "No Answer"){
                  
                  table.bases.forEach((value) => {
                    baseValueData = value[0];
                  });
                  const headerName = table.headers[0];
                  const totalLenght = table.rows.size-1;
                  let counter = 0;
                  table.rows.forEach((val,question)=>{
                    let brandValues = [];
                    const score =  val[0];
                    const valueAndBase = {
                      'Score': Math.round(score),
                      'Base': baseValueData
                    }
                    if(i == 0){
                      this.touchpointRecallData.push({question,brandValues});
                    }
                    this.touchpointRecallData[counter].brandValues[this.brandNameCsv.indexOf(headerName)] = valueAndBase;
                    if(totalLenght == counter && chartLength == i){
                      //Sorting according to Delta value
                      this.touchpointRecallData.sort((a,b)=> b.brandValues[0].Score - a.brandValues[0].Score);
                      this.showLoader = false;
                    } 
                    counter++;
                  });
                }
            });
          }
        });
      });
    }
  }

  /**
   * To Download Data into CSV format
   */
  downloadExcelFile() {
    let csvData = [];
    this.dtTouchPointRecallCsv = this.touchpointRecallData;
    this.dtTouchPointRecallCsv.forEach((val,index)=>{
      let csvDetail = []; 
      csvDetail.push(val.question);
      val.brandValues.forEach((a)=>{
        csvDetail.push(a.Score)
      });
      csvData.push(Object.assign({}, csvDetail));
    });
    var cavBaseValues =['Base'];
    this.dtTouchPointRecallCsv[0].brandValues.forEach((element,index) => {
      cavBaseValues.push(element.Base);
    });
    csvData.push(Object.assign({}, cavBaseValues));
    this.csvOptions.title = "Over All Touchpoint Recall";
    this.csvOptions.headers = ["Series Name", this.brandNameCsv];
    new AngularCsv(csvData, "Touchpoint Recall", this.csvOptions);
  }
  ngOnDestroy(): void {
    this.optionSelectionUnsubscribe.next();
    this.optionSelectionUnsubscribe.complete();
  }
}
