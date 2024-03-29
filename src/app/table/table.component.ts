import { Component, Inject, OnInit, ViewChild, Input, ReflectiveInjector, Optional, AfterViewInit, ElementRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import { merge, Observable, of as observableOf } from 'rxjs';
import { UserService } from '../user.service';
import { MatTableDataSource } from '@angular/material/table';
import { DataSource } from '@angular/cdk/table';
import { map, first } from 'rxjs/operators';
import { FormControl, Validators } from '@angular/forms';
import { EventEmitter, element } from 'protractor';
import { stringify } from 'querystring';
import { threadId } from 'worker_threads';
import { ITS_JUST_ANGULAR } from '@angular/core/src/r3_symbols';
import { AppComponent } from '../app.component';
import { access } from 'fs';

export interface ServiceOutputClass {
  id: number;
  name: string;
  employeeId: number;
  date: string;
  address: string;
}

export interface EmployeeOutputClass {
  id: number;
  name: string;
  address: string;
}

export interface ServiceClass {
  id: number;
  name: string;
  employeeId: number;
  datee: string;
  longitude: string;
  latitude: string;
}

export interface Employee {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
}

export interface AddressModel{
  name: string;
  address: string;
}
declare var google: any;

@Component({
  selector: 'app-table',
  templateUrl: 'table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent extends DataSource<ServiceClass> implements OnInit, AfterViewInit {
  //, 'Actions'
  displayedColumns: string[] = ['Erledigt','id', 'Dienstname', 'Mitarbeiter', 'Datum', 'Bearbeiten', 'Loeschen', 'Anzeigen'];
  dataSource;
  service;
  services2: ServiceOutputClass;
  map: Object;
  marker: Object;
  location: Object;
  addressesEmployees: AddressModel[]=[];
  addressesServices: AddressModel[]=[];
  @ViewChild('map') mapRef: ElementRef;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  services: ServiceClass[];
  employees: Employee[];
  stringEmps: string[];
  sendValue: string;
  temp: number;
  service3: ServiceOutputClass;

  constructor(
    private userService: UserService,
    public dialog: MatDialog,
    public dialog_add: MatDialog,
    private appcom: AppComponent
  ) {

    super();
  }
  ngAfterViewInit(): void {
    setTimeout(() => this.dataSource.sort = this.sort, 1000);
    setTimeout(() => this.fillEmps(), 0);

  }



  ngOnInit() {
    this.userService.getServices()
      .subscribe((services: ServiceClass[]) => {
        this.services = services;
        this.dataSource = new MatTableDataSource(services);

        setTimeout(() => this.dataSource.sort = this.sort);
        setTimeout(() => this.dataSource.paginator = this.paginator);
      });
    this.userService.getEmployees()
      .subscribe((employees: Employee[]) => {
        this.employees = employees;
      });

    //setTimeout(()=>this.fillEmps());
  }

  fillEmps() {
    this.stringEmps = this.employees.map(d => d.name);
  }

  applyFilter(filtervalue: string) {
    this.dataSource.filter = filtervalue.trim().toLocaleLowerCase();
  }
  addUserToDB(serv) {
    this.userService.postService(serv);
  }

  /* #region(collapsed) Delete */

  deleteServiceChecked(service){
    
    setTimeout(() => {
      this.userService.deleteService(service.id);//.subscribe(res => {
      this.refresh();

      setTimeout(() => window.location.reload());
      setTimeout(() => window.location.reload());

      setTimeout(() => window.location.reload());
      this.refresh();
      this.refresh();
      
    }, 125);
    
  }

  
  
  ButtonClickDeleteService(id) {
    console.log(id);
    var x = confirm('Willst du wirklich löschen?');
    if (x == true) {
      this.userService.deleteService(id);//.subscribe(res => {
      this.refresh();

      setTimeout(() => window.location.reload());
      setTimeout(() => window.location.reload());

      setTimeout(() => window.location.reload());
      this.refresh();
      this.refresh();


    }


    else {
      console.log('You pressed Cancel')

    }



  }
  /* #endregion */


  /* #region(collapsed) EditService */

  ButtonClickEditService(service) {
    console.log("Button_edit_clicked");
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '300px',
      height: '425px',
    });
    dialogRef.componentInstance.employees = this.employees;
    dialogRef.componentInstance.stringEmps = this.stringEmps;
    dialogRef.componentInstance.service = service;
    var id = service.id - 1;
    console.log(service.employee.name);

    dialogRef.componentInstance.showThings(service);
    //console.log(this.employees[this.services[id].name]);
    (<HTMLInputElement>document.getElementById("editName")).value = service.name;
    (<HTMLInputElement>document.getElementById("editDate")).value = service.date;
    (<HTMLInputElement>document.getElementById("editAddress")).value = "";//"service.address";
    (<HTMLInputElement>document.getElementById("employee_select")).setAttribute("selected", service.employee.name);

    dialogRef.componentInstance.serviceId = id;
    console.log(id);

    console.log(service.id);
    dialogRef.componentInstance.services = this.services;
    dialogRef.afterClosed().subscribe(result => {
      let instance = dialogRef.componentInstance;
      this.editService(instance.output, service);

      this.refresh();
      this.refresh();
      setTimeout(() => window.location.reload());
      setTimeout(() => window.location.reload());
      this.refresh();
      this.refresh();
    });


  }
  editService(input: string, service: ServiceClass) {
    if (typeof input != "undefined") {
      var arr = input.split(';');
      var x = this.employees.filter(d => d.name === arr[3]).find(first);
      this.services2 = { id: service.id, employeeId: x.id, address: arr[2], date: arr[1], name: arr[0] };
      console.log(this.services2);

      var s = this.userService.putService(this.services2);
      console.log(s);
      this.refresh();
      this.refresh();
      this.refresh();
      setTimeout(() => window.location.reload());
      setTimeout(() => window.location.reload());
      this.refresh();

    }
    else {
      console.log("edit was canceled");

    }


  }
  /* #endregion */


  /* #region(collapsed) View */

  ButtonClickViewData(service) {
    console.log("Button_clicked_view_data");
    const dialogRef = this.dialog.open(DialogOverviewViewDialog, {
      width: '300px',
      height: '620px',
    });
    (<HTMLInputElement>document.getElementById("viewName")).value = service.name;
    (<HTMLInputElement>document.getElementById("viewEmployee")).value = service.employee.name;
    (<HTMLInputElement>document.getElementById("viewDate")).value = service.date;
    (<HTMLInputElement>document.getElementById("longitude")).value = service.longitude;
    (<HTMLInputElement>document.getElementById("latitude")).value = service.latitude;

    dialogRef.afterClosed().subscribe(result => {
      console.log(closed);

    });
  }

  ButtonClickViewEmp(employee) {

    console.log("Button_clicked_view_emp");
    const dialogRef = this.dialog.open(DialogOverviewViewEmpDialog, {
      width: '300px',
      height: '415px',
    });
    console.log(this.addressesEmployees);
    
    (<HTMLInputElement>document.getElementById("viewName")).value = employee.name;
    (<HTMLInputElement>document.getElementById("viewLat")).value = employee.latitude;
    (<HTMLInputElement>document.getElementById("viewLon")).value = employee.longitude;

    dialogRef.afterClosed().subscribe(result => {
      console.log(closed);

    });
  }
  /* #endregion */


  /* #region(collapsed) AddEmployee */
  ButtonClickAddEmployee() {
    console.log("Button_add_emp_clicked");
    let dialogRef = this.dialog_add.open(DialogOverviewAddEmployeeDialog, {
      width: '300px',
      height: '260px'
    });
    dialogRef.afterClosed().subscribe(result => {
      let instance = dialogRef.componentInstance;
      console.log(instance.output);
      this.addEmp(instance.output);
    });
  }

  addEmp(input: string) {
    if (typeof input != "undefined") {


      var arr = input.split(';');
      var inputName = arr[0];
      var inputAdr = arr[1];
      this.setTemp2();
      if (this.employees.length != 0) {
        let emp: EmployeeOutputClass = { id: this.temp + 1, address: inputAdr, name: inputName };
        console.log(emp);
        console.log("emp is not empty");
        var s = this.userService.postEmployee(emp);
        console.log(s);
      }
      else {
        let emp: EmployeeOutputClass = { id: 0, address: inputAdr, name: inputName };
        console.log(emp);
        console.log("emp is empty");
        var s = this.userService.postEmployee(emp);
        console.log(s);
      }


      this.refresh();
      this.refresh();
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
    else {
      console.log("add was canceled");

    }
  }
  /* #endregion */


  /* #region(collapsed) AddNewService */
  ButtonClickAddNewService() {
    console.log("Button_add_clicked");
    let dialogRef = this.dialog_add.open(DialogOverviewAddDialog, {
      width: '300px',
      height: '425px'

    });
    dialogRef.componentInstance.employees = this.employees;
    dialogRef.componentInstance.stringEmps = this.stringEmps;

    dialogRef.afterClosed().subscribe(result => {
      let instance = dialogRef.componentInstance;
      console.log(instance.test);
      setTimeout(() => this.setTemp);
      this.addService(instance.test, this.temp);

    });

    this.refresh();
    this.refresh();

  };

  addService(input: string, f: number) {
    if (typeof input != "undefined") {


      var arr = input.split(';');
      var x = this.employees.filter(d => d.name === arr[3]).find(first);
      this.services2 = { id: f + 1, employeeId: x.id, address: arr[2], date: arr[1], name: arr[0] };
      var s = this.userService.postService(this.services2);
      console.log(s);

      this.refresh();
      this.refresh();
      this.refresh();
      this.refresh();
      setTimeout(() => {
        window.location.reload();
      }, 1000);

    }
    else {
      console.log("add was canceled");
    }
  }

  /* #endregion */

  setTemp2() {
    this.temp = this.employees[this.employees.length - 1].id;
  }

  setTemp() {
    this.temp = this.services[this.services.length - 1].id;
  }



  connect(): Observable<ServiceClass[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.services),
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.sortData([...this.services]));
    }));
  }

  /* #region(collapsed) Refresh */

  refresh() {
    setTimeout(() => {
      this.userService.getServices()
        .subscribe((services: ServiceClass[]) => {
          this.services = services;
          this.dataSource = new MatTableDataSource(services);

          this.dataSource.sort = this.sort;

          setTimeout(() => this.dataSource.paginator = this.paginator);

        });
    }, 0);
    this.userService.getServices()
      .subscribe((services: ServiceClass[]) => {
        this.services = services;
        this.dataSource = new MatTableDataSource(services);
        this.dataSource.sort = this.sort;
        setTimeout(() => this.dataSource.paginator = this.paginator);

      }); setTimeout(() => {
        this.userService.getServices()
          .subscribe((services: ServiceClass[]) => {
            this.services = services;
            this.dataSource = new MatTableDataSource(services);
            this.dataSource.sort = this.sort;
            // this.dataSource.this.paginator = this.paginator;
            setTimeout(() => this.dataSource.paginator = this.paginator);

          });
      }, 0);
    this.userService.getServices()
      .subscribe((services: ServiceClass[]) => {
        this.services = services;
        this.dataSource = new MatTableDataSource(services);
        this.dataSource.sort = this.sort;
        setTimeout(() => this.dataSource.paginator = this.paginator);


        // this.dataSource.this.paginator = this.paginator;

      });
    setTimeout(() => {
      this.userService.getServices()
        .subscribe((services: ServiceClass[]) => {
          this.services = services;
          this.dataSource = new MatTableDataSource(services);
          this.dataSource.sort = this.sort;
          // this.dataSource.this.paginator = this.paginator;

        });
    }, 0);
    this.userService.getServices()
      .subscribe((services: ServiceClass[]) => {
        this.services = services;
        this.dataSource = new MatTableDataSource(services);
        this.dataSource.sort = this.sort;
        // this.dataSource.this.paginator = this.paginator;

      });
    setTimeout(() => {
      this.userService.getServices()
        .subscribe((services: ServiceClass[]) => {
          this.services = services;
          this.dataSource = new MatTableDataSource(services);
          this.dataSource.sort = this.sort;
          // this.dataSource.this.paginator = this.paginator;

        });
    }, 0);
    this.userService.getServices()
      .subscribe((services: ServiceClass[]) => {
        this.services = services;
        this.dataSource = new MatTableDataSource(services);
        this.dataSource.sort = this.sort;
        // this.dataSource.this.paginator = this.paginator;

      });
  }
  /* #endregion */

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() { }

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */

  /* #region(collapsed) Sort+Paginator */
  private getPagedData(data: ServiceClass[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private sortData(data: ServiceClass[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {

      const isAsc = this.sort.direction === 'desc';
      switch (this.sort.active) {
        case 'id': return compare(+a.id, +b.id, isAsc);
        case 'Dienstname': return compare(+a.name, +b.name, isAsc);
        case 'Mitarbeiter': return compare(a.employeeId, b.employeeId, isAsc);
        case 'Datum': return compare(+a.datee, +b.datee, isAsc);
        default: return 0;
      }
    });
  }
}
function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

/* #endregion */


/* #region(collapsed) Dialogs */
@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog.html',
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: ServiceClass) { }
  @Input() selected: string;
  @Input() inputAddressI: boolean;

  employees: Employee[];
  output: string;
  serviceId: number;
  services: ServiceClass[];
  service: ServiceClass;
  stringEmps: string[];
  ButtonEditService() {

    var inputName = (<HTMLInputElement>document.getElementById("editName")).value;
    var inputDate = (<HTMLInputElement>document.getElementById("editDate")).value;
    var inputAdress = (<HTMLInputElement>document.getElementById("editAddress")).value;
    var emp = this.selected;
    this.output = inputName + ";" + inputDate + ";" + inputAdress + ";" + emp;
    this.dialogRef.close();
  }


  showThings(service) {
    console.log(service.employee.name);

    this.selected = service.employee.name;
  }
  CancelDialog() {
    this.output = "";
    this.dialogRef.close();
  }
}
//#endregion test
@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog_add.html',
})
export class DialogOverviewAddDialog {
  constructor(
    userService: UserService,
    public dialogRef: MatDialogRef<DialogOverviewAddDialog>,
    @Inject(MAT_DIALOG_DATA) public data: ServiceOutputClass) { }
  @Input() selected: string;
  @Input() inputNameI: boolean;
  @Input() inputNameB: boolean;

  test: string;
  employees: Employee[];
  service: ServiceOutputClass;
  stringEmps: string[];
  ButtonAddNewService() {
    var inputName = (<HTMLInputElement>document.getElementById("inputName")).value;
    var inputDate = (<HTMLInputElement>document.getElementById("inputDate")).value;
    var inputAdress = (<HTMLInputElement>document.getElementById("inputAdress")).value;
    var emp = this.selected;
    this.test = inputName + ";" + inputDate + ";" + inputAdress + ";" + emp;
    this.dialogRef.close();
  }
  CancelDialog() {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog_addEmp.html',
})
export class DialogOverviewAddEmployeeDialog {
  constructor(
    userService: UserService,
    public dialogRef: MatDialogRef<DialogOverviewAddEmployeeDialog>,
    @Inject(MAT_DIALOG_DATA) public data: ServiceOutputClass) { }
  @Input() inputNameI: boolean;
  @Input() inputNameB: boolean;


  output: string;
  ButtonAddEmpService() {
    var inputName = (<HTMLInputElement>document.getElementById("inputEmpName")).value;
    var inputAdress = (<HTMLInputElement>document.getElementById("inputAdr")).value;
    this.output = inputName + ";" + inputAdress;
    this.dialogRef.close();
  }
  CancelDialog() {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'dialog-overview-view-dialog',
  templateUrl: 'dialog_viewData.html',
})
export class DialogOverviewViewDialog {
  constructor(
    userService: UserService,
    public dialogRef: MatDialogRef<DialogOverviewAddDialog>,
    @Inject(MAT_DIALOG_DATA) public data: ServiceOutputClass) { }
  test: string;
  employees: Employee[];
  service: ServiceOutputClass;
  stringEmps: string[];

  CancelDialog() {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'dialog-overview-view-dialog',
  templateUrl: 'dialog_viewEmp.html',
})
export class DialogOverviewViewEmpDialog {
  constructor(
    userService: UserService,
    public dialogRef: MatDialogRef<DialogOverviewViewEmpDialog>,
    @Inject(MAT_DIALOG_DATA) public data: ServiceOutputClass) { }
  test: string;
  employees: Employee[];
  service: ServiceOutputClass;
  stringEmps: string[];

  CancelDialog() {
    this.dialogRef.close();
  }
}

/* #endregion */