import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserService {
    
  private userUrl: string;

  constructor(private http: HttpClient) {
    this.userUrl = 'http://localhost:8080/services';

  }

  getServices() {
    return this.http.get(this.userUrl);
  }

  postService(value){
    return this.http.post(this.userUrl,value);
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