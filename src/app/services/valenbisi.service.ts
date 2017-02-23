import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable()
export class ValenbisiService {

  constructor(private http : Http) { }

  getValenBisiData(){
    return this.http.get('http://mapas.valencia.es/lanzadera/opendata/Valenbisi/JSON');
  }
  
  getValenBisiDataInterval(interval){
    let obsSingle = this.getValenBisiData();

    let obsSequence = Observable
      .interval(interval)
      .timeInterval()
      .flatMap( ()=> this.getValenBisiData() );

    return Observable.merge(obsSingle, obsSequence);
  }
}
