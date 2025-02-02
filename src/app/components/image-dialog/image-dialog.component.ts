import { Component, OnInit, Input, Output } from '@angular/core';
import { baseModalDialog } from '../../shared/base/base-modal-dialog';

@Component({
  selector: 'cdss-image-dialog',
  templateUrl: './image-dialog.component.html',
  styleUrls: ['./image-dialog.component.css']
})
export class ImageDialogComponent extends baseModalDialog implements OnInit {

  private image_source: string;

  constructor() {
    super();

    this.image_source = "assets/logo.png";

  }

  ngOnInit() {

  }

  @Input('ImageSource')
  public get ImageSource():string {
    return this.image_source;
  }
  public set ImageSource(value:string) {
    this.image_source = value;
    // console.log('this.image_source : ', this.image_source);
  }

  public get HasImage(): boolean {
    return this.image_source.trim().length > 0;
  }
}
