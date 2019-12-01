import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SnapshotComponent } from './components/snapshot/snapshot.component';
import { OverallSnapshotComponent } from './components/overall-snapshot/overall-snapshot.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { BrandHealthComponent } from './components/brand-health/brand-health.component';
import { BrandPerceptionsComponent } from './components/brand-perceptions/brand-perceptions.component';
import { TouchpointRecallComponent } from './components/touchpoint-recall/touchpoint-recall.component';
import { UploadFileComponent } from './components/upload-file/upload-file.component';
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
import { AdDiagnosticsComponent } from './components/ad-diagnostics/ad-diagnostics.component';
import { AdDescriptorComponent } from './components/ad-descriptor/ad-descriptor.component';
import { AdAdvertComponent } from './components/ad-advert/ad-advert.component';
import { AdDetailsComponent } from './components/ad-details/ad-details.component';


const childRoutes: Routes = [
  { path: '', redirectTo: 'Overallsnapshot', pathMatch: 'full' },
  { path: 'Overallsnapshot', component: OverallSnapshotComponent },
  { path: 'Snapshot/:order', component: SnapshotComponent },
  { path: 'brandHealth', component: BrandHealthComponent },
  { path: 'brandPerceptions', component: BrandPerceptionsComponent },
  { path: 'touchpointRecall', component: TouchpointRecallComponent },
  { path: 'categoryBrandHealth/:order', component: CategoryBrandHealthComponent },
  { path: 'equity/:order', component: EquityComponent },
  { path: 'consideration/:order', component: ConsiderationComponent },
  { path: 'uploadFile', component: UploadFileComponent },
  { path: 'RecentPurchase/:order', component: RecentPurchaseComponent },
  { path: 'PurchaseReaction/:order', component: PurchaseReactionComponent },
  { path: 'Disposition/:order', component: DispositionComponent },
  { path: 'ReasonBrandChoice', component: ReasonBrandChoiceComponent },
  { path: 'ReasonRecentPurchase/:order', component: ReasonRecentPurchaseComponent },
  { path: 'Conversion/:order', component: ConversionComponent },
  { path: 'ReasonRetailer/:order', component: ReasonForRetailerComponent },
  { path: 'Demographics', component: DemographicsComponent },
  { path: 'AdDiagnostics', component: AdDiagnosticsComponent },
  { path: 'AdDescriptor', component: AdDescriptorComponent },
  { path: 'Advert', component: AdAdvertComponent },
  { path: 'AdDetails/:order', component: AdDetailsComponent },
  { path: '**', component: PageNotFoundComponent }
]

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, children: childRoutes },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false, useHash:true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
