import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
@Component({
  selector: 'app-employee-detail',
  template: `
    <h3>You selected Employee with id = {{employeeId}}</h3>
    <a (click)="goPrevious()">Previous</a>
    <a (click)="goNext()">Next</a>

    <div>
    <button (click)="gotoEmployees()">Back</button>
    </div>
  `,
  styles: [
  ]
})
export class EmployeeDetailComponent implements OnInit {
public employeeId
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
  //  let id = parseInt(this.route.snapshot.paramMap.get('id'));
  //  this.employeeId = id;


  this.route.paramMap.subscribe((params: ParamMap )=>{
    let id = parseInt(params.get('id'));
    this.employeeId = id;
  });
  }

  goPrevious()
  {
    let previousId = this.employeeId - 1;
    this.router.navigate(['/employees', previousId]);
  }

  goNext()
  {
    let nextId = this.employeeId + 1;
    this.router.navigate(['/employees', nextId]);
  }

  gotoEmployees()
  {
    let selectedId = this.employeeId ? this.employeeId : null;
    this.router.navigate(['/employees', {id: selectedId}]);
  }

}
