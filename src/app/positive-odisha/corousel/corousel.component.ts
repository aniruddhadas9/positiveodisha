import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'po-corousel',
  templateUrl: './corousel.component.html',
  styleUrls: ['./corousel.component.scss']
})
export class CorouselComponent implements OnInit {

  images = [];
  constructor() { }

  ngOnInit() {
    for(let i=1; i< 4; i++) {
      this.images.push({'url': 'assets/govt-med-college/'+i+'.jpeg'})
    }
  }

}
