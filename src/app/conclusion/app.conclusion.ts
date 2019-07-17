

import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {DataService} from '../data.service';
import {VoiceRemote} from './conclusion.model';


@Component({
  selector: 'app-conclusion',
  templateUrl: './app.conclusion.html',
  styleUrls: ['./app.conclusion.css']
})
export class AppConclusionComponent implements OnInit, OnDestroy {

  dataVoiceRemote = new VoiceRemote();
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

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.loadedSubscription = this.dataService.dataLoaded.subscribe(
      (response) => {
        this.data = response.data['conclusion'];
         console.log('AppConclusionComponent: data:', this.data);
        this.setData();
      });
  }

  setData() {
    console.log('AppConclusionComponent: setBanners()');
    this.dataVoiceRemote.title = this.data['title'];
    this.dataVoiceRemote.subtitle = this.data['subtitle'];
    this.dataVoiceRemote.videoTitle = this.data['videoTitle'];
    this.dataVoiceRemote.videoSubtitle = this.data['videoSubtitle'];
    this.dataVoiceRemote.commandList = this.data['commandList'];
    this.dataVoiceRemote.videoLink = this.data['videoLink'];
  }

  ngOnDestroy() {
    this.loadedSubscription.unsubscribe();
  }

  // For analytics
  btnClick() {
    if ((window as any)._trackData){
      (window as any)._trackData(this.analyticsData);
    }
  }

}
