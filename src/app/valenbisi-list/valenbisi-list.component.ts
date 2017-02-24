import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-valenbisi-list',
  templateUrl: './valenbisi-list.component.html',
  styleUrls: ['./valenbisi-list.component.scss']
})
export class ValenbisiListComponent implements OnInit {

  @Input('vbData') vbData = {features : []};

  constructor() {}

  ngOnInit() {}

}
