import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'cdss-floating-scroll-to',
  templateUrl: './floating-scroll-to.component.html',
  styleUrls: ['./floating-scroll-to.component.css']
})
export class FloatingScrollToComponent implements OnInit {

  
  @Input("target") _target:string = "";
  
  private lenghtOfTop:number = 100;
  private currentTop:number = 0;
  private id:number;
//-----------------------------------------------
  constructor() {

    this.id = Math.round(Math.random()*100000);

    this.Initial();
  }
//-----------------------------------------------
  ngOnInit() {
  }
//-----------------------------------------------
  public get ID():number{
    return this.id;
  }
//-----------------------------------------------
  protected Initial(): void {
    document.addEventListener("scroll", ()=>{
      this.getCurrentTop();
    });
  }
  //-----------------------------------------------
  protected getCurrentTop(){
    this.currentTop = window.pageYOffset;
    // console.log(this.currentTop);
  }
  //-----------------------------------------------
  public get IsInvisible():boolean{  
    return (this.currentTop < this.lenghtOfTop);
  }
  //-----------------------------------------------
  public scrollTarget(){

    let ele = document.getElementById(this._target);

    if(ele==null){
      console.error('scrolling to target : '+this._target+' NOT FOUND !!!!');
      return;
    }
    // ****************
    let ele_top = ele.clientTop;

    window.scrollTo({
      top: ele_top,
      behavior: 'smooth',
    });

  }
  //-----------------------------------------------

}
