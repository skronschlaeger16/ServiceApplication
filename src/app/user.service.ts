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

  deleteService(id: number){
    
    return this.http.delete(this.userUrl+'/'+ id);//.subscribe(data => console.log(data));
    //return this.http.delete(this.userUrl,value).subscribe(data => console.log(data));
  } 

  putService(value: ServiceOutputClass){
    console.log(value);
    var id = value.id;
    return this.http.put(this.userUrl + "/"+id,value);
  }

  postService(value: ServiceOutputClass){
    console.log(value);
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