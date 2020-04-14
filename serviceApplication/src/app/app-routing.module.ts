import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FormsModule} from '@angular/forms';
import { EmployeesComponent } from './employees/employees.component';
import { ServicesComponent } from './services/services.component';

const routes: Routes = [
  {path: 'services', component: ServicesComponent},
  {path: 'employees',component: EmployeesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [ServicesComponent, EmployeesComponent]
