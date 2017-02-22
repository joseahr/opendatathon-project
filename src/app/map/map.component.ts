import { Component, OnInit } from '@angular/core';

import * as ol from 'openlayers';
//import * as proj4 from 'proj4';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent {

  map : ol.Map;

  constructor() { }

  ngAfterViewInit() {
    this.createMap();
  }

  fitMap(){
    //console.log('element', document.getElementById('map').getBoundingClientRect().top);
    let offsetTop = document.getElementById('map').getBoundingClientRect().top;
    document.getElementById('map').style.height = `calc(100vh - ${offsetTop}px)`;
  }

  createMap(){
    window.onresize = ()=>{ this.fitMap() }
    this.fitMap();

    this.map = new ol.Map({
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        })
      ],
      target: document.getElementById('map'),
      controls: ol.control.defaults(),
      view: new ol.View({
        center: [0, 0],
        zoom: 2
      })
    });
  }

  
}
