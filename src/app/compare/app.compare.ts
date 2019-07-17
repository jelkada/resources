

import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {DataService} from '../data.service';
import {Compare} from './compare.model';
import {Subject} from 'rxjs/Subject';


@Component({
  selector: 'app-compare',
  templateUrl: './app.compare.html',
  styleUrls: ['./app.compare.css']
})
export class AppCompareComponent implements OnInit, OnDestroy {

  compareIgnite = new Compare();
  private data: object;
  private loadedSubscription: Subscription;
  hideModal = true;
  featureIndex = 0;

  // the event dispatcher when the button is clicked and the index is changed
  // indexSubject = new Subject();

  private analyticsData: object = {
    'events': {
      'interaction': true
    },
    'interaction': {
      'type': 'click',
      'name': ''
    }
  }

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    console.log('AppCompareComponent: ngOnInit()');
    this.loadedSubscription = this.dataService.dataLoaded.subscribe(
      (response) => {
        this.data = response.data['compare'];
        this.setTable();
      });
  }

  setTable() {
    console.log('AppCompareComponent: setTable()');
    this.compareIgnite.title = this.data['title'];
    this.compareIgnite.subtitle = this.data['subtitle'];
    this.compareIgnite.columns = this.data['columns'];
    this.compareIgnite.rows = this.data['rows'];
    this.compareIgnite.checkmarks = this.data['checkmarks'];
    this.compareIgnite.redRow = this.data['redRow'];
    this.compareIgnite.footnoteTitle = this.data['footnoteTitle'];
    this.compareIgnite.footnote = this.data['footnote'];
    this.compareIgnite.yes = this.data['yes'];
    this.compareIgnite.no = this.data['no'];
    this.compareIgnite.analytics = this.data['analytics'];
  }

  ngOnDestroy() {
    this.loadedSubscription.unsubscribe();
  }

  showModal(evt, index) {
    console.log('AppCompareComponent: showModal(): index: ', index);
    evt.preventDefault();
    this.featureIndex = index;
    this.dataService.indexSubject.next(index);
    this.dataService.overlaySubject.next('show');
    this.hideModal = false;
    this.trackClick(this.compareIgnite.analytics[index]);
  }

  closeModal() {
    console.log('AppCompareComponent: closeModal()');
    this.dataService.overlaySubject.next('hide');
    this.hideModal = true;
  }

  trackClick(feature) {
    console.log('AppCompareComponent: trackClick(): ', feature);
    this.analyticsData['interaction'].name = feature;
    if ((window as any)._trackData) {
      (window as any)._trackData(this.analyticsData);
    }
  }

}
