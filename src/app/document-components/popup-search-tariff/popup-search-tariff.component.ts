import { Component, OnInit } from '@angular/core';
import { baseModalDialog } from '../../shared/base/base-modal-dialog';

@Component({
  selector: 'cdss-popup-search-tariff',
  templateUrl: './popup-search-tariff.component.html',
  styleUrls: ['./popup-search-tariff.component.css']
})
export class PopupSearchTariff extends baseModalDialog implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
