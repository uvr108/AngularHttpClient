import { SolicitudComponent } from './solicitud/solicitud.component';
import { Injectable } from '@angular/core';
import { AdItem } from './ad-item';


@Injectable()
export class AdService {
  getAds() {
    return [
      // new AdItem(HeroProfileComponent, {name: 'Bombasto', bio: 'Brave as they come'}),

      // new AdItem(HeroProfileComponent, {name: 'Dr IQ', bio: 'Smart as they come'}),

      new AdItem(SolicitudComponent,   {headline: 'Hiring for several positions',
                                        body: 'Submit your resume today!'}),

    ];
  }
}
