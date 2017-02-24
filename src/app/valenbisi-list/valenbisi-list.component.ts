import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-valenbisi-list',
  templateUrl: './valenbisi-list.component.html',
  styleUrls: ['./valenbisi-list.component.scss']
})
export class ValenbisiListComponent implements OnInit {

  @Input('vbData') vbData = {features : []};
  @Output() goToMapFromList = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  showMap(parada) {
    this.goToMapFromList.emit(parada);
  }

}
