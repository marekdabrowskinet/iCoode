import { EventEmitter, Injectable, Output } from '@angular/core';


@Injectable()
export class SharedService {
  @Output() isBusy: EventEmitter<string> = new EventEmitter();
}
