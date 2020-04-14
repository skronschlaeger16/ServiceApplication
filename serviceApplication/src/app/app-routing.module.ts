import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FormsModule} from '@angular/forms';
import { EmployeesComponent } from './employees/employees.component';
import { ServicesComponent } from './services/services.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';

const routes: Routes = [
 // {path: '', redirectTo:'/services', pathMatch: 'prefix'},

  {path: 'services', component: ServicesComponent},
  
  {path: 'employees',component: EmployeesComponent},
  {path:'employees/:id', component:EmployeeDetailComponent},
  {path: "**",component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [ServicesComponent, EmployeesComponent,EmployeeDetailComponent, PageNotFoundComponent]
