import { PageEvent } from '@angular/material/paginator';

export interface IPaginator {
  pageSize: number;
  pagesCount: number;
  pageIndex: number;
  setPage(paginator: PageEvent);
  setPaginatorConfig();
}
