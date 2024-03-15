import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tasks } from '../../task-list/Models/Tasks';
import { MatSnackBar } from '@angular/material/snack-bar'; 
import { ReloadTaskService } from '../../task-list/Services/reload-task.service';
import { MatDialogRef } from '@angular/material/dialog';
import { FormModalComponent } from '../Components/form-modal.component';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class InsertTaskService {

  constructor(private http:HttpClient,
              private snackBar :MatSnackBar,
              private reloadTaskService : ReloadTaskService,
              private dialogRef : MatDialogRef<FormModalComponent>) { }
  
  private message:string='';
  
  public InsertTask(task: Tasks){
      // Extract the form data
      const url = `${environment.apiUrl}Tasks/Insert`;

      this.http.post<Tasks>(url, task).subscribe((res:any) =>{
        if(res == 200){
          this.dialogRef.close();
          if(task.id == null || task.id == ''){
            this.message='Task inserted successfully'
          }
          else{
            this.message='Task updated successfully'

          }
          this.snackBar.open(this.message, 'Close', {
            duration: 2000, // 2 seconds
          });
          this.reloadTaskService.triggerReload();
        }
      })
  }

}
