import { Component } from '@angular/core';

import { AuthService } from './services/auth.service';

import { AngularFire, FirebaseAuthState } from 'angularfire2';

import { ValenbisiService } from './services/valenbisi.service';

import { StorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers : [AuthService, ValenbisiService, StorageService]
})
export class AppComponent {

  vbData;

  private authUser : FirebaseAuthState = null;

  constructor(private authService : AuthService, 
    private angularFire : AngularFire, 
    private valenbisiService : ValenbisiService,
    private storageService : StorageService
  ){
    this.angularFire.auth.subscribe(
      data => {
        if(!data) this.authUser = null;
        else this.authUser = data;
      }
    );
    this.loadValenbisiData();

  }

  login(){
    this.authService.login();
  }

  logout(){
    this.authService.logout();
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
