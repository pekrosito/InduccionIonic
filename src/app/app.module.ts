import { VentasPageModule } from './ventas/ventas.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { ClusterService } from './cluster.service';
import { dataService } from '../api/data.service';
import {HttpClientModule} from "@angular/common/http";

import { ReactiveFormsModule } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { PhotoLibrary } from '@ionic-native/photo-library/ngx';
import { ImageResizer, ImageResizerOptions } from '@ionic-native/image-resizer/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    VentasPageModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ClusterService,
    dataService,
    ReactiveFormsModule,    
    Camera,
    PhotoLibrary,
    ImageResizer,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
