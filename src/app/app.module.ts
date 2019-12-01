import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SnapshotComponent} from './components/snapshot/snapshot.component';
import {OverallSnapshotComponent} from './components/overall-snapshot/overall-snapshot.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {ShellModule} from './shell/shell.module';
import {ProjectConfig} from './shell/interfaces/project-config';
import {HomeComponent} from './components/home/home.component';
import {LoginComponent} from './components/login/login.component';
import {LoaderComponent} from './components/loader/loader.component';
import {NavMenuComponent} from './components/nav-menu/nav-menu.component';
import {BrandSelectorComponent} from './components/brand-selector/brand-selector.component';
import {FilterMenuComponent} from './components/filter-menu/filter-menu.component';
import {HeaderComponent} from './components/header/header.component';
import {FormsModule,ReactiveFormsModule } from '@angular/forms';
import {BrandHealthComponent} from './components/brand-health/brand-health.component';
import {BrandPerceptionsComponent} from './components/brand-perceptions/brand-perceptions.component';
import {TouchpointRecallComponent} from './components/touchpoint-recall/touchpoint-recall.component';
import {UploadFileComponent} from './components/upload-file/upload-file.component';
import {TreeType} from './shell/enums/tree.type';
import {TimePeriodComponent} from './components/time-period-group/time-period/time-period.component';
import {TimePeriodGroupComponent} from './components/time-period-group/time-period-group.component';
import { CategoryBrandHealthComponent } from './components/category-brand-health/category-brand-health.component';
import { EquityComponent } from './components/equity/equity.component';
import { ConsiderationComponent } from './components/consideration/consideration.component';
import { RecentPurchaseComponent } from './components/recent-purchase/recent-purchase.component';
import { PurchaseReactionComponent } from './components/purchase-reaction/purchase-reaction.component';
import { DispositionComponent } from './components/disposition/disposition.component';
import { ReasonBrandChoiceComponent } from './components/reason-brand-choice/reason-brand-choice.component';
import { ReasonRecentPurchaseComponent } from './components/reason-recent-purchase/reason-recent-purchase.component';
import { ConversionComponent } from './components/conversion/conversion.component';
import { ReasonForRetailerComponent } from './components/reason-for-retailer/reason-for-retailer.component';
import { DemographicsComponent } from './components/demographics/demographics.component';
import { RetailerSelectorComponent } from './components/retailer-selector/retailer-selector.component';
import { AdDiagnosticsComponent } from './components/ad-diagnostics/ad-diagnostics.component';
import { AdCallToActionComponent } from './components/ad-call-to-action/ad-call-to-action.component';
import { AdDescriptorComponent } from './components/ad-descriptor/ad-descriptor.component';
import { AdAdvertComponent } from './components/ad-advert/ad-advert.component';
import { AdDetailsComponent } from './components/ad-details/ad-details.component';
import { AdSelectorComponent } from './components/ad-selector/ad-selector.component';
import { ClickCatcherDirective } from './directives/click-catcher.directive';
import { AdService } from './service/ad-service';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import { AddSelectorSingleSelectComponent } from './components/add-selector-single-select/add-selector-single-select.component';
const projectConfig: ProjectConfig = {
  ProjectID: '2b4720c8-7220-3019-09ae-7a83251e09bf',
  ProjectName: 'Delta',
  DashboardName: 'DeltaDashboard',
  DashboardID: 'd00566f0-b806-b0e1-3c4d-3592e88f3d92',
  Subscription: '145',
  HostPath: 'https://api-test.rebuscode.com/',
  version: 'v3',
  TreeTypes: [TreeType.Survey, TreeType.Calculated]
};

@NgModule({
  declarations: [
    AppComponent,
    SnapshotComponent,
    OverallSnapshotComponent,
    PageNotFoundComponent,
    HomeComponent,
    LoginComponent,
    LoaderComponent,
    NavMenuComponent,
    BrandSelectorComponent,
    FilterMenuComponent,
    HeaderComponent,
    BrandHealthComponent,
    BrandPerceptionsComponent,
    TouchpointRecallComponent,
    UploadFileComponent,
    TimePeriodComponent,
    TimePeriodGroupComponent,
    CategoryBrandHealthComponent,
    EquityComponent,
    ConsiderationComponent,
    RecentPurchaseComponent,
    PurchaseReactionComponent,
    DispositionComponent,
    ReasonBrandChoiceComponent,
    ReasonRecentPurchaseComponent,
    ConversionComponent,
    ReasonForRetailerComponent,
    DemographicsComponent,
    RetailerSelectorComponent,
    AdDiagnosticsComponent,
    AdCallToActionComponent,
    AdDescriptorComponent,
    AdSelectorComponent,
    AdAdvertComponent,
    AdDetailsComponent,
    AdSelectorComponent,
    ClickCatcherDirective,
    AddSelectorSingleSelectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ShellModule.forRoot(projectConfig),
    NoopAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule, 
    MatInputModule     
  ],
  providers: [AdService, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
