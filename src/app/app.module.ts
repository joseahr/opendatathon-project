import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// Angular 2 Material
import { MaterialModule } from '@angular/material';
// Configuración adicional para gestures Angular 2 Material
import 'hammerjs';

// Configuración firebase
import { AngularFireModule } from 'angularfire2';

import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';

import fireConfig from './firebase.config';
import { ValenbisiListComponent } from './valenbisi-list/valenbisi-list.component';
import { ContainerComponent } from './container/container.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    ValenbisiListComponent,
    ContainerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(), // Angular 2 Material
    AngularFireModule.initializeApp(fireConfig) // FireBase
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
