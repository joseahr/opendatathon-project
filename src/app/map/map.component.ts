import { Component, OnInit, Input } from '@angular/core';

import * as ol from 'openlayers';
import * as proj4 from 'proj4';
ol.proj.setProj4(proj4);

let etrs89utm30 = {
  code : 'EPSG:25830',
  name : 'ETRS89 / UTM zone 30N',
  proj4 : '+proj=utm +zone=30 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs',
  bbox : [44, -9.6, 35.2, 4.6]
}

proj4.defs(etrs89utm30.code, etrs89utm30.proj4);
let fromLonLat = ol.proj.getTransform('EPSG:4326', ol.proj.get('EPSG:25830'));
let bbox = etrs89utm30.bbox;
let extent = ol.extent.applyTransform([bbox[1], bbox[2], bbox[3], bbox[0]], fromLonLat);
ol.proj.get('EPSG:25830').setExtent(extent);

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent {

  map : ol.Map;

  vbLayer : ol.layer.Vector;

  geoJSONParser : ol.format.GeoJSON;

  @Input('vbData') vbData;

  @Input('zoomToParada') zoomToParada;

  constructor() {
    this.geoJSONParser = new ol.format.GeoJSON({
      defaultDataProjection : 'EPSG:25830', 
      featureProjection : 'EPSG:25830'
    })
  }

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
        new ol.layer.Tile({ source: new ol.source.OSM() }),
      ],
      target: document.getElementById('map'),
      controls: ol.control.defaults(),
      view: new ol.View({
        center: [725738.515055, 4371809.447687],
        zoom: 10,
        projection: ol.proj.get('EPSG:25830')
      })
    });

    this.vbLayer = new ol.layer.Vector({
      source : new ol.source.Vector()
    });

    this.map.addLayer(this.vbLayer);

    if(this.vbData != undefined){
      let features = this.geoJSONParser.readFeatures(this.vbData);
      this.vbLayer.getSource().addFeatures(features);
    }

  }

  ngOnChanges(changes){
    console.log(changes, 'changesssssss')
    if(changes['vbData'] !== undefined){
      if(!this.vbLayer){
        return;
      }
      this.vbLayer.getSource().clear();
      this.vbLayer.getSource().refresh();
  
      let features = this.geoJSONParser.readFeatures(this.vbData);
      this.vbLayer.getSource().addFeatures(features);
    }
    
    if(changes['zoomToParada'] !== undefined){
      if(this.zoomToParada){
        let parada = this.zoomToParada;
        console.log(parada, 'aaa');
        this.map.getView().setCenter(parada.geometry.coordinates);
        this.map.getView().setZoom(15)
      }
    }

  }
  
}
