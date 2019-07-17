

import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {DataService} from '../data.service';
import {Features} from './features.model';
import {Globals} from '../app.globals';


@Component({
  selector: 'app-features',
  templateUrl: './app.features.html',
  styleUrls: ['./app.features.css']
})
export class AppFeaturesComponent implements OnInit, OnDestroy {

  featureList = new Features();
  currentFeature = 0;
  featuredClicked = false;
  langFr = false;
  private data: object;
  private loadedSubscription: Subscription;

  private analyticsData: object = {
    'events': {
      'interaction': true
    },
    'interaction': {
      'type': 'click',
      'name': ''
    }
  };

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.loadedSubscription = this.dataService.dataLoaded.subscribe(
      (response) => {
        this.data = response.data['features'];
        console.log('AppFeaturesComponent: data:', this.data);
        this.langFr = Globals.lang === 'fr';
        this.setData();
      });
  }

  setData() {
    console.log('AppFeaturesComponent: setData()');
    this.featureList.title = this.data['title'];
    this.featureList.listTitle = this.data['listTitle'];
    this.featureList.features = this.data['features'];
    this.featureList.videos = this.data['videos'];
    this.featureList.analytics = this.data['analytics'];
  }

  ngOnDestroy() {
    this.loadedSubscription.unsubscribe();
  }

  onFeatureClick(evt, index) {
    console.log('AppFeaturesComponent: onFeatureClick(): index:', index);
    evt.preventDefault();
    if (this.currentFeature === index) {
      this.featuredClicked = !this.featuredClicked;
    } else {
      this.currentFeature = index;
      this.featuredClicked = true;
      this.trackClick(this.featureList.analytics[index])
    }
  }

  trackClick(feature) {
    console.log('AppFeaturesComponent: trackClick(): feature:', feature);
    this.analyticsData['interaction'].name = feature;
    if ((window as any)._trackData) {
       (window as any)._trackData(this.analyticsData);
    }
  }

}
