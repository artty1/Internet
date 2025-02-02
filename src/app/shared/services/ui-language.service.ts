import { Injectable } from '@angular/core';
import { UiCaption } from '../models/ui-caption';

@Injectable({
  providedIn: 'root'
})
export class UiLanguageService {

  constructor() {

  }
  public get TableColumneCaption(): UiCaption {
    return new UiCaption();
  }
}
