import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IService } from './service';
import { Observable, throwError as observablethrowError } from 'rxjs';

import { catchError } from 'rxjs/operators'
import { ServiceClass } from './service-class';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private _url: string = "/assets/data/service.json";


  private userUrl: string;

  constructor(private http: HttpClient) {
    this.userUrl = 'http://localhost:8080/services';
  }
 
  public findAll(): Observable<ServiceClass[]> {
    return this.http.get<ServiceClass[]>(this.userUrl);
  }
 
  public save(user: ServiceClass) {
    return this.http.post<ServiceClass>(this.userUrl, user);
  }


//   constructor(private http: HttpClient) { }

//   getServices() : Observable<IService[]>{
// return this.http.get<IService[]>(this._url).pipe(catchError(this.errorHandler));



// [
//    {"id": 0, "Dienstname": "Putzen", "Mitarbeiter":"Hubert", "Datum" : Date.now()},
//      { "id": 1, "Dienstname": "Rasenmachen","Mitarbeiter":"Hubert", "Datum" : Date.now()},
//      { "id": 2, "Dienstname": "Heckenschneiden","Mitarbeiter":"Franz", "Datum" : Date.now()}
  
//   ];
  

  // errorHandler(error: HttpErrorResponse)
  // {
  //  return observablethrowError(error.message || "Server Error");
  //  // return Observable.throwError(error.message || "Server Error");
    
  // }
  

}
