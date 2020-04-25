import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatBadgeModule } from '@angular/material/badge';
import { TableComponent, DialogOverviewExampleDialog, DialogOverviewAddDialog, DialogOverviewViewDialog } from './table/table.component';
import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { UserService } from './user.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSliderModule } from '@angular/material/slider';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatNativeDateModule } from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';


import {MatSortModule} from '@angular/material/sort'; 


@NgModule({
  imports:      [
    MatDialogModule,BrowserModule, FormsModule, HttpClientModule, BrowserAnimationsModule, MatTableModule, MatIconModule,
      MatInputModule ,MatFormFieldModule,MatTableModule, MatInputModule, MatButtonModule, MatListModule, MatButtonToggleModule, MatBadgeModule, MatPaginatorModule,
      MatNativeDateModule,MatDatepickerModule,MatSelectModule,MatFormFieldModule,MatSortModule
      
    ],
  declarations: [ AppComponent, HelloComponent, TableComponent, DialogOverviewAddDialog,DialogOverviewExampleDialog,DialogOverviewViewDialog],
  providers: [UserService],
  bootstrap:    [ AppComponent], 
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [DialogOverviewAddDialog,DialogOverviewExampleDialog,DialogOverviewViewDialog]
})
export class AppModule { }
