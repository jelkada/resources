
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { DataService } from './data.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit, OnDestroy {

  public static lang = 'English';
  hideOverlay = true;
  hideLoader = false;

  private loadedSubscription: Subscription;
  private overlaySubscription: Subscription;

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    console.log('AppComponent: ngOnInit()');


    // this.dataService.getData();
    setTimeout(() => { this.dataService.getData(); }, 500); // add delay for testing

    this.loadedSubscription = this.dataService.dataLoaded.subscribe(
      () => {
        this.hideLoader = true;
        console.log('AppComponent: ngOnInit(): this.hideLoader: ', this.hideLoader);
        setTimeout(() => { this.gotoAnchorId(); }, 500);
      });

    this.overlaySubscription = this.dataService.overlaySubject.subscribe(
      (visibility: string) => {
        console.log('AppComponent: ngOnInit(): visibility: ', visibility);
        this.hideOverlay = (visibility === 'hide');
        console.log('AppComponent: ngOnInit(): this.hideOverlay: ', this.hideOverlay);
      });
  }


  gotoAnchorId() {
    const anchorId = window.location.href.split('#')[1];
    console.log('AppComponent: gotoAnchorId(): anchorId: ', anchorId);
    const elementId = document.getElementById(anchorId);
    console.log('AppComponent: gotoAnchorId(): elementId: ', elementId);
    if (elementId !== null) {
      elementId.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  ngOnDestroy() {
    this.loadedSubscription.unsubscribe();
    this.overlaySubscription.unsubscribe();
  }

}

