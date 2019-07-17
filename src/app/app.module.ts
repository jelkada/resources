
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
// import { TranslateHttpLoader } from '@ngx-translate/http-loader';
// import { CookieService } from 'ngx-cookie-service';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { DataService } from './data.service';
import { SafePipe } from './safe.pipe';

import { AppEcosystemComponent } from './ecosystem/app.ecosystem';
import { AppBannerComponent } from './banner/app.banner';
import { AppReviewComponent } from './review/app.review';
import { AppCompareComponent } from './compare/app.compare';
import { AppCompareModalComponent } from './compare/compare-modal/app.compare-modal';
import { AppConclusionComponent } from './conclusion/app.conclusion';
import { AppCoursesComponent } from './courses/app.courses';
import { AppFeaturesComponent } from './features/app.features';


@NgModule({
  declarations: [
    AppComponent,
    AppBannerComponent,
    AppReviewComponent,
    AppEcosystemComponent,
    AppCompareComponent,
    AppCompareModalComponent,
    AppConclusionComponent,
    AppCoursesComponent,
    AppFeaturesComponent,
    SafePipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
