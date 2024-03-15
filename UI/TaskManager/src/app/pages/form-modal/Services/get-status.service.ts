import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Status } from '../Models/Status';
import { Statement } from '@angular/compiler';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class GetStatusService {

  constructor(private http: HttpClient){}
  public getStatus():Observable<Status[]>{
    const url = `${environment.apiUrl}Status/GetStatuses`;
    
    return this.http.get<Status[]>(url);
  }
}
