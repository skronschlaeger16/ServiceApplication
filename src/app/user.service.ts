import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee, EmployeeOutputClass } from './table/table.component';

export interface ServiceOutputClass {
  id: number;
  name: string;
  employeeId: number;
  date: string;
  address: string;
}

@Injectable()
export class UserService {
    
  private serviceUrl: string;
  private employeeUrl:string;
  serviceOutput: ServiceOutputClass;
  constructor(private http: HttpClient) {
    //Falls Port belegt, bitte hier ändern 
    this.serviceUrl = 'http://localhost:8080/services';
    this.employeeUrl = 'http://localhost:8080/employees'
    //und im Backend unter application.properties 
    //server.port = deinPort    schreiben


  }

  getServices() {
    return this.http.get(this.serviceUrl);
  }

  deleteService(id: number){
    return this.http.delete(this.serviceUrl+'/'+ id).subscribe(data => console.log(data));
    //return this.http.delete(this.userUrl,value).subscribe(data => console.log(data));
  } 

  putService(value: ServiceOutputClass){
    console.log(value);
    var id = value.id;
    return this.http.put(this.serviceUrl + "/"+id,value).subscribe(data=>console.log(data));
  }

  postService(value: ServiceOutputClass){
    console.log(value);
    return this.http.post(this.serviceUrl,value).subscribe(data=>console.log(data));
  }

  postEmployee(value:EmployeeOutputClass){
    console.log(value);
    return this.http.post(this.employeeUrl,value).subscribe(data=>console.log(data));
  }

  getEmployees(){
    return this.http.get(this.employeeUrl);
  }

  deleteEmployee(id: number){
    return this.http.delete(this.employeeUrl + '/' + id).subscribe(data => console.log(data));
  }

//   setUser(user) {
//     let userId = user.id;
//     delete user.id;
//     return this.http.post('https://jsonplaceholder.typicode.com/users/${user.id}', user);
//   }

//   getImages() {
//     return this.http.get('https://jsonplaceholder.typicode.com/photos?albumId=1');
//   }

}