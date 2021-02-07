import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule} from '@angular/common/http';
import { AboutComponent } from './about/about.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SolicitudComponent } from './tablas/solicitud/solicitud.component';
import { MyModalComponent } from './tablas/my-modal/my-modal.component';
import { ReactiveFormsModule } from '@angular/forms';

import { AdDirective } from './ad.directive';
import { AdService } from './ad.service';

import { FormsModule } from '@angular/forms';


import { AdBannerComponent } from './ad-banner.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    SolicitudComponent,
    MyModalComponent,
    AdBannerComponent,
    AdDirective

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule


  ],

  providers: [AdService],
  bootstrap: [AppComponent]
})
export class AppModule { }
