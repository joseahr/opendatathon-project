import { Component, OnInit } from '@angular/core';

import { ValenbisiService } from '../services/valenbisi.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
  providers : [ValenbisiService]
})
export class ContainerComponent implements OnInit {
  
  vbData;

  tabDefault : number = 0;

  zoomToParada : any;
  
  constructor(private valenbisiService : ValenbisiService) {
    this.loadValenbisiData();
  }

  ngOnInit() { }

  onChangeTab(idx){
    console.log(idx);
    this.tabDefault = idx;
  }

  zoomToParadaFromList(parada) {
    console.log(parada, 'eeee');
    this.tabDefault = 0;
    this.zoomToParada = parada;
  }

  loadValenbisiData(){
    console.log('enviar datos a través de componentes');
    this.valenbisiService.getValenBisiDataInterval(30000)
    .subscribe(
      data => {
        let vbisiData = data.json();
        vbisiData
          .features
          .forEach(f => { f.properties.name = f.properties.name.replace(/_/g, ' '); })
        vbisiData
          .features
          .sort( (a, b) => +a.properties.number - +b.properties.number);
        this.vbData = vbisiData;
      },
      error => { console.error(error) },
      () => {}
    );
  }

}
