import { Injectable } from '@angular/core';

import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';

@Injectable()
export class AuthService {

  constructor(private angularFire : AngularFire) { }

  login(){
    return this.angularFire.auth.login({
      provider : AuthProviders.Google,
      method : AuthMethods.Popup
    });
  }

  logout(){
    return this.angularFire.auth.logout();
  }

}
