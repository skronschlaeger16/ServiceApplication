import { Component, Injectable, AfterViewInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { timeout, reduce } from 'rxjs/operators';
import { element } from 'protractor';
import { Employee } from './table/table.component';
import { mixinColor } from '@angular/material/core';

interface Location {
  latitude: string;
  longitude: string;
}

interface marker {
	lat: string;
	lng: string;
	label?: string;
  draggable: boolean;
}

export interface ServiceClass {
  id: number;
  name: string;
  employeeId: number;
  datee: string;
  longitude: string;
  latitude: string;
}

@Injectable({
  providedIn: 'root'
})

// export class MapsService {
//   constructor(private http: HttpClient) { }
//   getLocation() {
//     return this.http.get<Location>('https://ipapi.co/json/');

//   }


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  name = 'Angular';

  zoom: number = 2.15;
  lat: string = '';
  lng: string = '';
  location: Object;
  position: Object;
  label: Object;
  images;
  servicesInDb: ServiceClass[];
  employeesInDb:Employee[];
  selectedUser;
  markers:marker[] = [];
  markers2:marker[]=[];
  constructor( private userService: UserService) { }
  ngAfterViewInit(): void {
    this.userService.getEmployees()
      .subscribe((employees: Employee[]) => {
        this.employeesInDb = employees;
      });
    setTimeout(() =>
      this.userService.getServices()
        .subscribe((services: ServiceClass[]) => {
          this.servicesInDb = services;
          this.showInfo(this.servicesInDb,this.employeesInDb);
    }));
    console.log("before showInfo");
    
        
  }

  ngOnInit() {



    // setTimeout(() =>  this.userService.getServices()
    // .subscribe(services => this.services = services));
   
  }
  refresh() {
    
    setTimeout(() => {
      this.userService.getServices()
        .subscribe((services: ServiceClass[]) => {
          this.servicesInDb = services;
         
          // this.dataSource.this.paginator = this.paginator;

        });
    }, 0);
    this.userService.getServices()
      .subscribe((services: ServiceClass[]) => {
        this.servicesInDb = services;
        // this.dataSource.this.paginator = this.paginator;

      });
  }

  showInfo(serv:ServiceClass[],emps:Employee[]){
    serv.forEach(element => {
      let mark:marker = {
        lat:element.latitude,
        lng:element.longitude,
        label:element.name,
        draggable:false
      };
      console.log(mark);
      this.markers.push(mark); 
      this.refresh();
    });

    emps.forEach(element =>{
      let mark2:marker={
        lat:element.latitude.toString(),
        lng:element.longitude.toString(),
        label:element.name,
        draggable:false
      };
      
      this.markers2.push(mark2); 
      this.refresh();
    })
    console.log(this.markers);
  }
}

