import { Injectable } from '@angular/core';
import { Tasks } from '../Models/Tasks';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  url="/Tasks/Get";
  constructor(private http: HttpClient){}
  public getTasks(status:number, start?: Date, end?: Date):Observable<Tasks[]>{
    const url = `${environment.apiUrl}Tasks/Get`;
    let httpParams = new HttpParams()
    if (start !== undefined) {
      httpParams = httpParams.set('start', start!.toLocaleString());
    }
    
    // Check if end is defined before setting it in HttpParams
    if (end !== undefined) {
      httpParams = httpParams.set('end', end!.toLocaleString());
    }
    httpParams=httpParams.set('statusId',status);

    let options = { params: httpParams };
    return this.http.get<Tasks[]>(url,options);
  }

  public getTasksWithId(id:string):Observable<Tasks>{
    const url = `${environment.apiUrl}Tasks/GetWithId`;

    let httpParams = new HttpParams().set('id', id);

    let options = { params: httpParams };
    
    return this.http.get<Tasks>(url,options);
  }
}
