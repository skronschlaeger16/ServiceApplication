import { Component, Inject, OnInit, ViewChild, Input, ReflectiveInjector, Optional } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import { merge, Observable, of as observableOf } from 'rxjs';
import { UserService } from '../user.service';
import { MatTableDataSource } from '@angular/material/table';
import { DataSource } from '@angular/cdk/table';
import { map } from 'rxjs/operators';
import { FormControl, Validators } from '@angular/forms';
import { EventEmitter } from 'protractor';
import { stringify } from 'querystring';
import { threadId } from 'worker_threads';

export interface ServiceOutputClass {
  id: number;
  name: string;
  employeeId: number;
  date: string;
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

@Component({
  selector: 'app-table',
  templateUrl: 'table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent extends DataSource<ServiceClass> implements OnInit {
  //, 'Actions'
  displayedColumns: string[] = ['id', 'Dienstname', 'Mitarbeiter', 'Datum', 'Bearbeiten', 'Loeschen'];
  dataSource;
  service;
  services2: ServiceOutputClass;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  sort: MatSort;
  services: ServiceClass[];
  sendValue: string;

   service3: ServiceOutputClass;

  constructor(
    private userService: UserService,
    public dialog: MatDialog,
    public dialog_add: MatDialog
  ) {
    super();
  }

  ngOnInit() {
    this.userService.getServices()
      .subscribe((services: ServiceClass[]) => {
        this.services = services;
        this.dataSource = new MatTableDataSource(services);
        this.dataSource.sort = this.sort;
       // this.dataSource.this.paginator = this.paginator;

      });
  }

  applyFilter(filtervalue: string) {
    this.dataSource.filter = filtervalue.trim().toLocaleLowerCase();
  }
  addUserToDB(serv) {
    this.userService.postService(serv);
  }

  ButtonClickAddNewService() {
    console.log("Button_add_clicked");
    let dialogRef = this.dialog_add.open(DialogOverviewAddDialog, {
      height: '400px',
      width: '400px',
    });
    let output = "nicht befüllt";
    dialogRef.afterClosed().subscribe(result => {
      let instance = dialogRef.componentInstance;
      console.log(instance.test);
      this.addService(instance.test);
      output = instance.test;
    });
    
  };


  addService(input:string){
    var arr = input.split(';');
    this.services2 = {id:4,employeeId:1,address:arr[2],date:arr[1],name:arr[0]};
    var s = this.userService.postService(this.services2);
    console.log(s);

    setTimeout(()=>{
      this.userService.getServices()
      .subscribe((services: ServiceClass[]) => {
        this.services = services;
        this.dataSource = new MatTableDataSource(services);
        this.dataSource.sort = this.sort;
       // this.dataSource.this.paginator = this.paginator;

      });
    },0);
    this.userService.getServices()
    .subscribe((services: ServiceClass[]) => {
      this.services = services;
      this.dataSource = new MatTableDataSource(services);
      this.dataSource.sort = this.sort;
     // this.dataSource.this.paginator = this.paginator;

    });
    
  }

  editUser(service) {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: service
    });

    dialogRef.afterClosed().subscribe(result => {
      this.service = service;
    });
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
      return this.getPagedData(this.getSortedData([...this.services]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() { }

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */


  private getPagedData(data: ServiceClass[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: ServiceClass[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'Id': return compare(+a.id, +b.id, isAsc);
        case 'Dienstname': return compare(a.name, b.name, isAsc);
        case 'Mitarbeiter': return compare(a.employeeId, b.employeeId, isAsc);
        case 'Datum': return compare(a.datee, b.datee, isAsc);
        default: return 0;
      }
    });
  }
}
function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}



@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog.html',
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: ServiceClass) { }
  @Input() selected: string;
  onNoClick(): void {
    this.dialogRef.close();
  }

  ButtonEditService() {
    console.log("edit_button");

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
  test: string;
  service: ServiceOutputClass;
  ButtonAddNewService() {
    var inputName = (<HTMLInputElement>document.getElementById("inputName")).value;
    var inputDate = (<HTMLInputElement>document.getElementById("inputDate")).value;
    var inputAdress = (<HTMLInputElement>document.getElementById("inputAdress")).value;
    var inputEmployee = this.selected;
    var empId = 1;//this.searchEmployee(inputEmployee);
    this.test=inputName + ";" + inputDate + ";" + inputAdress + ";" + inputEmployee;
    this.dialogRef.close();
    // this.service.name = inputName.toString();
    // this.service.date = inputDate.toString();
    // this.service.address = inputAdress;
    // this.service.employeeId = empId;
    // //this.userService.postService(data);

  }
}




  //addItem() 
  //{
    // this.services.push({
    //   id: 1,
    //   name: "Leanne Graham",
    //   email: "Sincere@april.biz",
    //   address: {
    //     street: "Kulas Light",
    //     suite: "Apt. 556",
    //     city: "Gwenborough",
    //     zipcode: "92998-3874",
    //     geo: {
    //       lat: "-37.3159",
    //       lng: "81.1496"
    //     }
    //   },
    //   phone: "1-770-736-8031 x56442",
    //   website: "hildegard.org",
    //   company: {
    //     name: "Romaguera-Crona",
    //     catchPhrase: "Multi-layered client-server neural-net",
    //     bs: "harness real-time e-markets"
    //   }
    // });
    // this.dataSource = new MatTableDataSource(this.services);
  // }

//   editUser(user) {
//     const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
//       width: '250px',
//       data: user
//     });

//     dialogRef.afterClosed().subscribe(result => {
//       this.user = user;
//     });
//   }



// }


//
