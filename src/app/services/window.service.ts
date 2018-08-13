import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WindowService {

  get windowRef() {
    return (<any>window);
  }

  constructor() { }
}
