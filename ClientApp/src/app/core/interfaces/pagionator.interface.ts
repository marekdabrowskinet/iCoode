import { PageEvent } from '@angular/material';

export interface IPaginator {
  pageSize: number;
  pagesCount: number;
  pageIndex: number;
  setPage(paginator: PageEvent);
  setPaginatorConfig();
}
