import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-services',
  template: `
  <h2>Service List</h2>
  <h3>{{errorMsg}}</h3>
  <ul *ngFor="let service of services">
  <li>{{service.Dienstname}}</li>
  </ul>
  `,
  styles: []
})
export class ServicesComponent implements OnInit {



  public services = [];
  public errorMsg;

  constructor(private _serviceService: ServiceService) { }

  ngOnInit()  {
  // this._serviceService.getServices()
  this._serviceService.findAll()
   .subscribe(data => this.services = data,
    error => this.errorMsg == error
    );

  }

}
