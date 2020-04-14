import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router'

@Component({
  selector: 'app-employees',
  template: `<h3>
  Employee List
  </h3>
  <ul class="items">
  <li (click)="onSelect(employee)" [class.selected]="isSelected(employee)" *ngFor="let employee of employees">
  <span class="badge">{{employee.id}}</span> {{employee.name}}
  </li>
  </ul>
  `,
  styles: []
})
export class EmployeesComponent implements OnInit {

  public selectedId;
  employees =
  
  [
    {"id":1, "name": "Sebi"},
    {"id":2, "name": "Oli"},
    {"id":3, "name": "Luki"},
    {"id":4, "name": "Flo"},
  ]
 
  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap )=>{
      let id = parseInt(params.get('id'));
      this.selectedId = id;
    });
  }

  onSelect(employee)
  {
this.router.navigate(['/employees',employee.id]);
  }

  isSelected(employee)
  {
    return employee.id === this.selectedId;
  }

}
