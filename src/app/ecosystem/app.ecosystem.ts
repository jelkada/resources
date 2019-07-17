

import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {DataService} from '../data.service';
import {Ecosystem} from './ecosystem.model';

@Component({
  selector: 'app-ecosystem',
  templateUrl: './app.ecosystem.html',
  styleUrls: ['./app.ecosystem.css']
})
export class AppEcosystemComponent implements OnInit, OnDestroy {

  ecosystem = new Ecosystem();
  private data: object;
  private loadedSubscription: Subscription;
  private analyticsData: object = {
    'events': {
      'interaction': true
    },
    'interaction': {
      'type': 'click',
      'name': 'ignite-view packages'
    }
  };

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    console.log('AppEcosystemComponent: ngOnInit()');
    this.loadedSubscription = this.dataService.dataLoaded.subscribe(
      (response) => {
        this.data = response.data['ecosystem'];
        this.setBanner();
      });
  }

  setBanner() {
    console.log('AppEcosystemComponent: setBanners()');
    this.ecosystem.title = this.data['title'];
    this.ecosystem.desc = this.data['desc'];
    this.ecosystem.image = this.data['image'];
    this.ecosystem.imageAlt = this.data['imageAlt'];
    this.ecosystem.cta = this.data['cta'];
    this.ecosystem.ctaLink = this.data['ctaLink'];
    this.ecosystem.ctaAriaLabel = this.data['ctaAriaLabel'];
  }

  ngOnDestroy() {
    this.loadedSubscription.unsubscribe();
  }


  trackClick() {
    // if ((window as any)._trackData) {
    //    (window as any)._trackData(this.analyticsData);
    // }
  }

}
