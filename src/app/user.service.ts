import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ServiceOutputClass {
  id: number;
  name: string;
  employeeId: number;
  date: string;
  address: string;
}

@Injectable()
export class UserService {
    
  private userUrl: string;
  serviceOutput: ServiceOutputClass;
  constructor(private http: HttpClient) {
    this.userUrl = 'http://localhost:8080/services';

  }

  getServices() {
    return this.http.get(this.userUrl);
  }

  postService(value: ServiceOutputClass){
    console.log(value);
    this.serviceOutput = {id:4,employeeId:2,address:"Peuerbach",date:"10.10.2020",name:"Service5"};
    return this.http.post(this.userUrl,value).subscribe(data=>console.log(data));
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