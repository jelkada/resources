

import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {DataService} from '../data.service';
import {Banner} from './banner.model';


@Component({
  selector: 'app-banner',
  templateUrl: './app.banner.html',
  styleUrls: ['./app.banner.css']
})
export class AppBannerComponent implements OnInit, OnDestroy {

  banner = new Banner();

  data: object;
  private analyticsData: object = {
    'events': {
      'interaction': true
    },
    'interaction': {
      'type': 'click',
      'name': 'learn about ignite tv'
    }
  }
  private loadedSubscription: Subscription;

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.loadedSubscription = this.dataService.dataLoaded.subscribe(
      (response) => {
        this.data = response.data['banner'];
        console.log('AppBannerComponent: data:', this.data);
        this.setBanner();
      });
  }

  setBanner() {
    console.log('AppBannerComponent: setBanners()');
    this.banner.title = this.data['title'];
    this.banner.subtitle = this.data['subtitle'];
    this.banner.description = this.data['description'];
    this.banner.features = this.data['features'];
    this.banner.videoLink = this.data['videoLink'];
  }

  ngOnDestroy() {
    this.loadedSubscription.unsubscribe();
  }

  // For analytics
  btnClick(){
    if ((window as any)._trackData){
      (window as any)._trackData(this.analyticsData);
    }
  }

}
