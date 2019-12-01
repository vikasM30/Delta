import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/shell/services/login.service';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  headerName: string;
  hideTimePeriod: boolean;

  constructor(private loginService: LoginService, private router: Router) {
    this.headerName = 'BRAND SNAPSHOT';
  }

  ngOnInit() {
    this.router.events
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.setHeaderName(event.url);
          setTimeout(() => {
            this.hideTimePeriod = false;
          }, 0);
        } else if (event instanceof NavigationStart) {
          this.hideTimePeriod = true;
        }
      });
    this.setHeaderName(this.router.url);
  }

  // methods defination
  logout() {
    this.loginService.logout();
  }

  openNavMenu() {
    const nav = document.getElementById('nav');
    nav.style.visibility = 'visible';
    nav.style.width = '300px';
  }

  openFilterMenu() {
    const nav = document.getElementById('filter-nav');
    nav.style.visibility = 'visible';
    nav.style.width = '300px';
    nav.style.right = '0px';
  }

  uploadFile() {
    this.router.navigateByUrl('home/uploadFile');
  }

  private setHeaderName(route: string) {
    switch (route.split('/')[2]) {
      case 'Overallsnapshot':
        this.headerName = 'BRAND SNAPSHOT';
        break;
      case 'brandHealth':
        this.headerName = 'BRAND HEALTH';
        break;
      case 'brandPerceptions':
        this.headerName = 'BRAND PERCEPTIONS';
        break;
      case 'touchpointRecall':
        this.headerName = 'TOUCHPOINT RECALL';
        break;
      case 'Demographics':
        this.headerName = 'DEMOGRAPHICS';
        break;
      case 'categoryBrandHealth':
        this.headerName = 'BRAND HEALTH - ' + route.split('/')[3].toUpperCase();
        break;
      case 'equity':
        this.headerName = 'BRAND EQUITY - ' + route.split('/')[3].toUpperCase();
        break;
      case 'consideration':
        this.headerName = 'BRAND CONSIDERATION - ' + route.split('/')[3].toUpperCase();
        break;
      case 'Snapshot':
        this.headerName = 'BRAND SNAPSHOT - ' + route.split('/')[3].toUpperCase();
        break;
      case 'RecentPurchase':
        this.headerName = 'RECENT PURCHASE - ' + route.split('/')[3].toUpperCase();
        break;
      case 'PurchaseReaction':
        this.headerName = 'PURCHASE REACTION - ' + route.split('/')[3].toUpperCase();
        break;
      case 'Disposition':
        this.headerName = 'PURCHASE DISPOSITION - ' + route.split('/')[3].toUpperCase();
        break;
      case 'Conversion':
        this.headerName = 'CONVERSION - ' + route.split('/')[3].toUpperCase();
        document.getElementById('Conversion').className += 'active';
        break;
      case 'ReasonRetailer':
        this.headerName = 'REASON FOR RETAILER - ' + route.split('/')[3].toUpperCase();
        break;
      case 'ReasonRecentPurchase':
        this.headerName = 'Reason for Recent Purchase - ' + route.split('/')[3].toUpperCase();
        break;
      case 'AdDetails':
        this.headerName = 'Ad Details';
        break;
      case 'AdDiagnostics':
        this.headerName = 'Ad Diagnostics';
        break;
     
    }
  }
}
