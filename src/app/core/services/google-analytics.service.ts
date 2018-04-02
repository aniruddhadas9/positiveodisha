import { Injectable } from '@angular/core';
import {UserService} from './user.service';
import {ConfigService} from './config.service';
import {environment} from '../../../environments/environment';

declare let ga: Function;

@Injectable()
export class GoogleAnalyticsService {

  /**
   * This is first initialized in the app shell (app component)
   * therefore it is fine to put the ga('create') in its constructor.
   */
  constructor(private cu: UserService, private conf: ConfigService) {
    if ( environment.trackAnalytics && environment.ga.trackingId) {
      ga('create', environment.ga.trackingId, 'auto');
    } else {
      console.warn(`Google Analytics has not been configured for this deployment.
      Either trackAnalytics has not been set in the configuration.json or ga.trackingId has not been provided in the configuration.`);
    }
  }

  public sendPageViewData(url: string) {
    if ( environment.trackAnalytics) {
        ga('set', 'page', url);
        ga('set', 'dimension1', this.cu.encryptedUserIdentifier );
        ga('set', 'userId', this.cu.encryptedUserIdentifier);
        ga('send', 'pageview');
    }
  }

  public sendEventData(eventCategory: string, eventAction: string, eventLabel: string) {
    if ( environment.trackAnalytics) {
     // ga send event with encrypted  user id. GA generated the term 'dimension1'. This cannot be modified.
      ga('send', 'event', eventCategory, eventAction , eventLabel,
       {'dimension1': this.cu.encryptedUserIdentifier});
    }
  }
}
