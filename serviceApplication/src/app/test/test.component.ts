import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  template: `
  <div>Inline template</div>
  <h2 class="text-success">
  
  
  </h2>


  <input [id]="myId" type="text" value="Employee" >
  <h2 [ngClass]="messageClasses">Service</h2>

  <h2 [style.color]="hasError ? 'red' : 'green'">Style</h2>

  <button (click)="onClick($event)">Neuen Dienst hinzufügen</button>

  <input [(ngModel)]="name" type="text">
  {{name}}


  <h2 *ngIf="displayName; else elseBlock">
  HALLO
  </h2>
  <ng-template #elseBlock>
  <h2>
  No Hallo
  </h2>
  </ng-template>


  <div *ngFor="let name of names; index as i">
  <h2>{{i}} {{name}}</h2>
  </div>
  `
  
  ,
  styles: [`
  .text-success 
  {
    color: green;
  }

  .text-danger
  {
    color: red;
  }

  .text-special
  {
    font-style: italic;
  }

  div
    
  {
    color:red
  }
   
  `]

 
})
export class TestComponent implements OnInit {
public myId = "testId";
public name="";
public hasError = false;
public isSpecial=true;
displayName= false;
public messageClasses = {
  "text-success":!this.hasError,
  "text-danger": this.hasError,
  "text-special":this.isSpecial
}

public names = ["Sebi", "Luki", "Flo", "Oli"];


  constructor() { }

  ngOnInit(): void {
  }

  onClick(event)
  {
    this.hasError=true;
    this.displayName = true;
  }

}
