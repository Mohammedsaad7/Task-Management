import { Injectable } from '@angular/core';
import { Tasks } from '../Models/Tasks';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  url="/Tasks/Get";
  constructor(private http: HttpClient){}
  public getTasks():Observable<Tasks[]>{
    return this.http.get<Tasks[]>('https://localhost:7226/api/Tasks/Get');
  }
}
