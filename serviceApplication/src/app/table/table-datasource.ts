import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge, Observable, of as observableOf } from 'rxjs';
import { map } from 'rxjs/operators';

// TODO: Replace this with your own data model type
export interface TableItem {
  Id: number;
  Dienstname: string;
  Mitarbeiter: string;
  Datum: string;
  Bearbeiten: string;
  Loeschen: string;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: TableItem[] = [
  {Id: 0, Dienstname: 'Putzen', Mitarbeiter: 'Lukas Humer', Datum: '04.02.2020', Bearbeiten: 'Bearbeiten', Loeschen: 'Löschen'},
  {Id: 1, Dienstname: 'Rasenmaehen', Mitarbeiter: 'Sebastian Kronschläger', Datum: '04.03.2020', Bearbeiten: 'Bearbeiten', Loeschen: 'Löschen'}
];


/**
 * Data source for the Table view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class TableDataSource extends DataSource<TableItem> {
  data: TableItem[] = EXAMPLE_DATA;
  paginator: MatPaginator;
  sort: MatSort;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<TableItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: TableItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: TableItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'Id': return compare(+a.Id, +b.Id, isAsc);
        case 'Dienstname': return compare(a.Dienstname, b.Dienstname, isAsc);
        case 'Mitarbeiter': return compare(a.Mitarbeiter, b.Mitarbeiter, isAsc);
        case 'Datum': return compare(a.Datum, b.Datum, isAsc);
        case 'Bearbeiten': return compare(a.Bearbeiten, b.Bearbeiten, isAsc);
        case 'Bearbeiten': return compare(a.Loeschen, b.Loeschen, isAsc);
        default: return 0;
      }
    });
  }
}



/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
