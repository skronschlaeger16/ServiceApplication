import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-test2',
  template: `
  <h2>{{"Hello " + name}}</h2>

  <h2>{{date | date: 'short'}}</h2>
  
  `,
  styleUrls: []
})
export class Test2Component implements OnInit {

  @Input('parentData') public name;

  public date = new Date();


  constructor() { }

  ngOnInit(): void {
  }

 

}
