import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ReloadTaskService {
  private reloadTaskSubject = new Subject<void>();

  reloadTask$ = this.reloadTaskSubject.asObservable();

  triggerReload() {
    this.reloadTaskSubject.next();
  }
}