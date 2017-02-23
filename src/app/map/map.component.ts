import { Component, OnInit } from '@angular/core';
import { ValenbisiService } from '../services/valenbisi.service';
import { MdSnackBar } from '@angular/material'

import * as ol from 'openlayers';
import * as proj4 from 'proj4';
ol.proj.setProj4(proj4);

let etrs89utm30 = {
  code : 'EPSG:25830',
  name : 'ETRS89 / UTM zone 30N',
  proj4 : '+proj=utm +zone=30 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs',
  bbox : [80.53, -6.0, 35.26, 0.0]
}

proj4.defs(etrs89utm30.code, etrs89utm30.proj4);
let fromLonLat = ol.proj.getTransform('EPSG:4326', ol.proj.get('EPSG:25830'));
let bbox = etrs89utm30.bbox;
let extent = ol.extent.applyTransform([bbox[1], bbox[2], bbox[3], bbox[0]], fromLonLat);
ol.proj.get('EPSG:25830').setExtent(extent);

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  providers : [ ValenbisiService ]
})
export class MapComponent {

  map : ol.Map;

  vbLayer : ol.layer.Vector;

  geoJSONParser : ol.format.GeoJSON;

  constructor(private valenbisiService : ValenbisiService, private snackbar : MdSnackBar) {
    this.geoJSONParser = new ol.format.GeoJSON({
      defaultDataProjection : 'EPSG:25830', 
      featureProjection : 'EPSG:25830'
    })
  }

  ngAfterViewInit() {
    this.createMap();
    this.loadValenbisiData();
  }

  fitMap(){
    //console.log('element', document.getElementById('map').getBoundingClientRect().top);
    let offsetTop = document.getElementById('map').getBoundingClientRect().top;
    document.getElementById('map').style.height = `calc(100vh - ${offsetTop}px)`;
  }

  createMap(){
    window.onresize = ()=>{ this.fitMap() }
    this.fitMap();

    this.vbLayer = new ol.layer.Vector({
      source : new ol.source.Vector()
    });

    this.map = new ol.Map({
      layers: [
        new ol.layer.Tile({ source: new ol.source.OSM() }),
        this.vbLayer
      ],
      target: document.getElementById('map'),
      controls: ol.control.defaults(),
      view: new ol.View({
        center: [725738.515055, 4371809.447687],
        zoom: 10,
        projection: ol.proj.get('EPSG:25830')
      })
    });
  }

  loadValenbisiData(){
    this.valenbisiService.getValenBisiDataInterval(30000)
    .subscribe(
      data => {
        this.snackbar.open('Datos actualizados', null, { duration : 1000 });

        console.log(data.json());
        this.vbLayer.getSource().clear();
        this.vbLayer.getSource().refresh();

        let features = this.geoJSONParser.readFeatures(data.json());
        this.vbLayer.getSource().addFeatures(features);
      },
      error => { console.error(error) },
      () => {}
    );
  }
  
}
