import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home/home.component';
import {EventsComponent} from './events/events.component';
import {CorouselComponent} from './corousel/corousel.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NewsComponent} from './news/news.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule.forRoot(),
  ],
  declarations: [
    HomeComponent,
    EventsComponent,
    CorouselComponent,
    NewsComponent
  ],
  exports: [
    HomeComponent,
    EventsComponent,
    CorouselComponent,
    NewsComponent
  ]
})
export class PositiveOdishaModule {
}
