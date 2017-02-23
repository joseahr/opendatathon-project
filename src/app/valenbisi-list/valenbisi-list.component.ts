import { Component, OnInit } from '@angular/core';
import { ValenbisiService } from '../services/valenbisi.service';

@Component({
  selector: 'app-valenbisi-list',
  templateUrl: './valenbisi-list.component.html',
  styleUrls: ['./valenbisi-list.component.scss'],
  providers: [ValenbisiService]
})
export class ValenbisiListComponent implements OnInit {

  features : any[];

  constructor(private valenbisiService : ValenbisiService) {
    this.valenbisiService.getValenBisiData()
    .subscribe(
      data => { this.features = data.json().features; }
    )
  }

  ngOnInit() {
  }

}
