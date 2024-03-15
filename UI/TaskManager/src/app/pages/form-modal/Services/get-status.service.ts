import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Status } from '../Models/Status';
import { Statement } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class GetStatusService {

  constructor(private http: HttpClient){}
  public getStatus():Observable<Status[]>{
    return this.http.get<Status[]>('https://localhost:7226/api/Status/GetStatuses');
  }
}
