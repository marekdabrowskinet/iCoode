import { MatTableDataSource } from '@angular/material/table';

export interface ITable<T> {
  displayedColumns: string[];
  tableItems: MatTableDataSource<T>;
  loadTableItems();
}
