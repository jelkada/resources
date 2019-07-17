

import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {DataService} from '../data.service';
import {Courses} from './courses.model';


@Component({
  selector: 'app-courses',
  templateUrl: './app.courses.html',
  styleUrls: ['./app.courses.css']
})
export class AppCoursesComponent implements OnInit, OnDestroy {

  courses = new Courses();
  private data: object;
  private loadedSubscription: Subscription;

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    console.log('AppVideos3ColumnsComponent: ngOnInit()');
    this.loadedSubscription = this.dataService.dataLoaded.subscribe(
      (response) => {
        console.log('AppCoursesComponent: response:', response);
        this.data = response.data['courses'];
        this.setData();
      });
  }

  setData() {
    console.log('AppCoursesComponent: setBanners()');
    this.courses.title = this.data['title'];
    this.courses.videos = this.data['videos'];
  }

  ngOnDestroy() {
    this.loadedSubscription.unsubscribe();
  }


}
