import {Component, OnInit} from '@angular/core';
import {GoogleMap} from '@agm/core/services/google-maps-types';
import {HttpClient} from '@angular/common/http';
import {MapService} from './core/services/map.service';
import {AlertService} from './core/services/alert.service';
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from '@angular/router';
import {ConfigService} from './core/services/config.service';
import {GoogleAnalyticsService} from './core/services/google-analytics.service';
import {filter, tap} from 'rxjs/operators';

@Component({
  selector: 'po-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isLoading: boolean;
  title = 'app';
  coordinates: Coordinates;

  constructor(private httpClient: HttpClient,
              private mapService: MapService,
              private alerter: AlertService,
              private router: Router,
              private configService: ConfigService,
              private ga: GoogleAnalyticsService
  ) {
  }


  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationStart ||
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError),
      tap(event => {
        this.isLoading = false;
        if (event instanceof NavigationEnd) {
          console.log('hitting at :%o', event.urlAfterRedirects);
          this.ga.sendPageViewData(event.urlAfterRedirects);
        }
      }),
    ).subscribe(event => {
      this.isLoading = true;
    });
  }


  mapReady(map: GoogleMap) {
    this.mapService.map = map;
    this.mapService.getLocation({}).subscribe((position: Position) => {
      this.coordinates = position && position.coords;
      this.mapService.getUserLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      }).subscribe((location) => {
        console.log('location: %o', location)
      });
    });
  }
}
