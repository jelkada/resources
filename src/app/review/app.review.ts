

import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {DataService} from '../data.service';
import {Review} from './review.model';


@Component({
  selector: 'app-review',
  templateUrl: './app.review.html',
  styleUrls: ['./app.review.css']
})
export class AppReviewComponent implements OnInit, OnDestroy {

  review = new Review();
  private data: object;
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
  hideNote = true;

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.loadedSubscription = this.dataService.dataLoaded.subscribe(
      (response) => {
        console.log('AppReviewComponent: response:', response);
        this.data = response.data['review'];
        // console.log('AppIptv3ColumnsComponent: data:', this.data);
        this.setData();
      });
  }

  setData() {
    console.log('AppReviewComponent: setBanners()');
    this.review.title = this.data['title'];
    this.review.note = this.data['note'];
    this.review.description = this.data['description'];
    this.review.content = this.data['content'];
  }

  ngOnDestroy() {
    this.loadedSubscription.unsubscribe();
  }


}
