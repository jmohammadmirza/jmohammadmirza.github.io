import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface TableItem {
  name: string;
  id: number;
  comments:string;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: TableItem[] = [
  {id: 1, name: 'Hydrogen',comments: 'chemical'},
  {id: 2, name: 'Helium',comments: 'chemical'},
  {id: 3, name: 'Lithium',comments: 'chemical'},
  {id: 4, name: 'Beryllium',comments: 'chemical'},
  {id: 5, name: 'Boron',comments: 'chemical'},
  {id: 6, name: 'Carbon',comments: 'chemical'},
  {id: 7, name: 'Nitrogen',comments: 'chemical'},
  {id: 8, name: 'Oxygen',comments: 'chemical'},
  {id: 9, name: 'Fluorine',comments: 'chemical'},
  {id: 10, name: 'Neon',comments: 'chemical'},
  {id: 11, name: 'Sodium',comments: 'chemical'},
  {id: 12, name: 'Magnesium',comments: 'chemical'},
  {id: 13, name: 'Aluminum',comments: 'chemical'},
  {id: 14, name: 'Silicon',comments: 'chemical'},
  {id: 15, name: 'Phosphorus',comments: 'chemical'},
  {id: 16, name: 'Sulfur',comments: 'chemical'},
  {id: 17, name: 'Chlorine',comments: 'chemical'},
  {id: 18, name: 'Argon',comments: 'chemical'},
  {id: 19, name: 'Potassium',comments: 'chemical'},
  {id: 20, name: 'Calcium',comments: 'chemical'},
];

/**
 * Data source for the Table view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class TableDataSource extends DataSource<TableItem> {
  data: TableItem[] = EXAMPLE_DATA;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<TableItem[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.data ]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: TableItem[]): TableItem[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: TableItem[]): TableItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        case 'comments': return compare(a.name, b.name, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
