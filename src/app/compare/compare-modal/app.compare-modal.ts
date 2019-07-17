

import {Component, OnInit, OnDestroy, EventEmitter, Output, Input} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {CompareModal} from './compare-modal.model';
import {DataService} from '../../data.service';


@Component({
  selector: 'app-compare-ignite-modal',
  templateUrl: './app.compare-modal.html',
  styleUrls: ['./app.compare-modal.css']
})
export class AppCompareModalComponent implements OnInit, OnDestroy {

  modalData = new CompareModal();
  private data: object;
  private loadedSubscription: Subscription;
  private featureSubscription: Subscription;
  @Output() closeModalEvent = new EventEmitter();

  modalTitle: string;
  modalDesc: string;
  modalImage: string;
  modalImageAlt: string;

  currentFeature = 0;
  maxFeature: number;
  modalTopPos: string;
  changeTopPos = true;

  hideNext = false;
  hidePrev = true;

  private analyticsData: object = {
    'events': {
      'interaction': true
    },
    'interaction': {
      'type': 'click',
      'name': 'view bundles'
    }
  }

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.loadedSubscription = this.dataService.dataLoaded.subscribe(
      (response) => {
        this.data = response.data['compareModal'];
        console.log('AppCompareModalComponent: ngOnInit(): this.data: ', this.data);
        this.setModal();
      });

    this.featureSubscription = this.dataService.indexSubject.subscribe(
      (index: number) => {
        console.log('AppCompareModalComponent: ngOnInit(): index: ', index);
        this.currentFeature = index;
        this.changeTopPos = true;
        this.updateModal(index);
        this.updateLinks();
      });
  }

  setModal() {
    console.log('AppCompareModalComponent: setModal()');
    this.modalData.next = this.data['next'];
    this.modalData.prev = this.data['prev'];
    this.modalData.viewNext = this.data['viewNext'];
    this.modalData.viewPrev = this.data['viewPrev'];
    this.modalData.nextAriaLabel = this.data['nextAriaLabel'];
    this.modalData.prevAriaLabel = this.data['prevAriaLabel'];
    this.modalData.closeAlt = this.data['closeAlt'];
    this.modalData.content = this.data['content'];
    this.maxFeature = this.data['content'].length;
    this.updateModal(this.currentFeature);
    this.changeTopPos = true;
  }

  updateModal(index) {
    this.modalTitle = this.modalData.content[index]['title'];
    this.modalDesc = this.modalData.content[index]['description'];
    this.modalImage = this.modalData.content[index]['image'];
    this.modalImageAlt = this.modalData.content[index]['imageAlt'];
  }

  closeModal(evt) {
    console.log('AppCompareModalComponent: closeModal(): evt: ', evt);
    evt.preventDefault();
    this.closeModalEvent.emit();
  }

  nextModal(evt) {
    evt.preventDefault();
    this.currentFeature++;
    this.changeTopPos = false;
    this.updateModal(this.currentFeature);
    console.log('AppCompareModalComponent: nextModal(): this.currentFeature: ', this.currentFeature);
    this.updateLinks();
  }

  prevModal(evt) {
    evt.preventDefault();
    this.currentFeature--;
    this.changeTopPos = false;
    this.updateModal(this.currentFeature);
    console.log('AppCompareModalComponent: prevModal(): this.currentFeature: ', this.currentFeature);
    this.updateLinks();
  }

  updateLinks() {
    if (this.currentFeature === this.maxFeature - 1) {
      this.hideNext = true;
    }
    if (this.currentFeature < this.maxFeature - 1) {
      this.hideNext = false;
    }
    if (this.currentFeature > 0) {
      this.hidePrev = false;
    }
    if (this.currentFeature === 0) {
      this.hidePrev = true;
    }
  }

  // For analytics
  btnClick() {
    if ((window as any)._trackData){
      (window as any)._trackData(this.analyticsData);
    }
  }

  ngOnDestroy() {
    this.loadedSubscription.unsubscribe();
    this.featureSubscription.unsubscribe();
  }

}
