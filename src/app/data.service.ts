
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Globals } from './app.globals';


@Injectable()
export class DataService {

  dataLoaded  = new Subject<{data: object}>();

  overlaySubject = new Subject();
  indexSubject = new Subject();

  constructor(private http: HttpClient) {
  }

  getData() {
    Globals.lang = document.getElementsByTagName('html')[0].getAttribute('lang');
    // Globals.lang = 'fr';
    console.log('DataService: getData(): Globals.lang: ', Globals.lang);
    return this.http.get('/assets/data/' + Globals.lang  + '.json')
      .subscribe(
        (data) => {
          console.log('DataService: getData(): data.global ', data['global']);
          this.dataLoaded.next({data: data['global']});
        },
        (error) => {
          console.log('getData(): HttpClient getData() error', error);
        }
      );
  }

}

