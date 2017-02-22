import { Component } from '@angular/core';

import { AuthService } from './services/auth.service';

import { AngularFire, FirebaseAuthState } from 'angularfire2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers : [AuthService]
})
export class AppComponent {

  private authUser : FirebaseAuthState;

  constructor(private authService : AuthService, private angularFire : AngularFire){
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
