import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReloadTaskService } from './reload-task.service';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class DeleteTaskService {

  constructor(private http: HttpClient,
              private snackBar: MatSnackBar,
              private reloadTaskService: ReloadTaskService) { }

  deleteTask(id:string){
    let httpParams = new HttpParams().set('id', id);
    
    let options = { params: httpParams };
    const url = `${environment.apiUrl}Tasks/Delete/`;
    this.http.delete(url,options).subscribe((res:any) =>{
        if(res == 200){
          this.snackBar.open('Task deleted successfully', 'Close', {
            duration: 2000, // 2 seconds
          });
          this.reloadTaskService.triggerReload();
        }
      })
  }
}
