import { Component, OnInit } from '@angular/core';




@Component({
  selector: 'cdss-xls-file-reader',
  templateUrl: './xls-file-reader.component.html',
  styleUrls: ['./xls-file-reader.component.css']
})
export class XlsFileReaderComponent implements OnInit {

  private id: string;

  constructor() {

    this.id = 'file-' + Math.round(Math.random()*100000);

  }

  ngOnInit() {
  }

  public uploadDialog() {
    console.log('id: ', this.id);
    console.log(document.getElementById(this.id));
    document.getElementById(this.id).click();
  }

  public get ID(): string {
    console.log('id: ', this.id);
    return this.id;
  }
  public readFile(event) {
    console.log(event.target.files[0]);
  }
}
