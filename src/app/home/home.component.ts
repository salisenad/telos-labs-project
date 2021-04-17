import { Component, OnInit } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  mobileQuery: MediaQueryList;
  contacts: any;
  constructor( media: MediaMatcher ) {
    this.mobileQuery = media.matchMedia( '(max-width: 600px)' );
  }

  ngOnInit(): void {
  }
}
