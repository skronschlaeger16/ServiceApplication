import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-service-detail',
  template: `
  <h2>Service Detail</h2>
  <h3>{{errorMsg}}</h3>
  <ul *ngFor="let service of services">
  <li>{{service.id}} {{service.Dienstname}} {{service.Mitarbeiter}} {{service.Datum}}
  </li>

  </ul>
  `,
  styles: []
})
export class ServiceDetailComponent implements OnInit {

  
  public services = [];

  public errorMsg = '';

  constructor(private _serviceService: ServiceService) { }

  ngOnInit()  {
   this._serviceService.getServices()
   .subscribe(data => this.services = data,
    error => this.errorMsg = error.message
    );
 
 

}
}
