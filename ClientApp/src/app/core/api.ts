import { HttpClient } from '@angular/common/http';

export abstract class Api {
  constructor(public httpClient: HttpClient) { }
}
