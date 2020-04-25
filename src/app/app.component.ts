import { Component } from '@angular/core';

import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Angular';
  services; 
  images;

  selectedUser;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getServices()
      .subscribe(services => this.services = services);

    // this.userService.getImages()
    //   .subscribe(images => this.images = images);
  }
  showInfo(service) {
    this.selectedUser = service;
    console.log(this.selectedUser.employee);
  }

}
