import { Component, OnInit } from '@angular/core';
import { ApplicationContext } from '../../application-context';

@Component({
  selector: 'cdss-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private app: ApplicationContext) {
    this.app.scrollToTop();
  }

  ngOnInit() {
  }

}
