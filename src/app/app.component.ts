import { Component } from '@angular/core';

import { AuthService } from './services/auth.service';

import { AngularFire, FirebaseAuthState } from 'angularfire2';

import { StorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers : [AuthService, StorageService]
})
export class AppComponent {

  vbData;

  private authUser : FirebaseAuthState = null;

  constructor(private authService : AuthService, 
    private angularFire : AngularFire, 
    private storageService : StorageService
  ){
    this.angularFire.auth.subscribe(
      data => {
        if(!data) this.authUser = null;
        else this.authUser = data;
      }
    );
  }

  login(){
    this.authService.login();
  }

  logout(){
    this.authService.logout();
  }

}
