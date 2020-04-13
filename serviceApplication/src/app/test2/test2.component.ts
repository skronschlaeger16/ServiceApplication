import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-test2',
  template: `
  <h2>{{"Hello " + name}}</h2>
  `,
  styleUrls: []
})
export class Test2Component implements OnInit {

  @Input('parentData') public name;



  
  constructor() { }

  ngOnInit(): void {
  }

}
