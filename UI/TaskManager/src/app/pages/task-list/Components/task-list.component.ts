import { Component , OnInit , OnDestroy} from '@angular/core';
import { Tasks } from '../Models/Tasks';
import { TasksService } from '../Services/tasks.service';
import { CommonModule, DatePipe, formatDate } from '@angular/common';
import { MatDialog} from '@angular/material/dialog';
import { FormModalComponent } from '../../form-modal/Components/form-modal.component';
import { Message} from '../Models/Message'
import { ReloadTaskService } from '../Services/reload-task.service';
import { Subscription } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { DeleteTaskService } from '../Services/delete-task.service';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule,MatButtonModule,MatIconModule],
  providers:[DatePipe],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit, OnDestroy {
  title = 'TaskManager';
  tasks: Tasks[] =[];
  taskWithId: Tasks = new Tasks('','','',new Date(),'');
  message:Message= new Message('');
  reloadSubscription?: Subscription;
  getTasksSubscription?:Subscription;
  getTaskWithIdSubscription?:Subscription;

  constructor(private tasksService : TasksService, 
              private dialogRef : MatDialog,
              private reloadTaskService: ReloadTaskService,
              private deleteTaskService: DeleteTaskService,
              private datePipe: DatePipe){}

  ngOnInit(): void {
    this.loadTasks();
    this.reloadSubscription = this.reloadTaskService.reloadTask$.subscribe(() => {
      this.loadTasks();
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe to prevent memory leaks
    this.reloadSubscription?.unsubscribe();
    this.getTasksSubscription?.unsubscribe();
  }

  loadTasks(){
    this.getTasksSubscription=this.tasksService.getTasks().subscribe((result :Tasks[]) => {
      this.tasks = result;
    }); 
  }

  openDialog(){
    this.dialogRef.open(FormModalComponent,{
      width:'30%',
      data: {taskData:new Tasks('','','',new Date(),'')}
    });
  }

  deleteTask(id:string){
    this.deleteTaskService.deleteTask(id);
  }

  openEditDialog(id:string){
    this.getTaskWithIdSubscription=this.tasksService.getTasksWithId(id).subscribe((result:Tasks) => {
      this.taskWithId=result;
      console.log(this.taskWithId);
      // this.taskWithId.dueDate=new Date(this.taskWithId.dueDate,);
      this.taskWithId.dueDateString=this.datePipe.transform(this.taskWithId.dueDate,'yyyy-MM-dd')!;
      console.log(this.taskWithId);
      this.dialogRef.open(FormModalComponent,{
        width:'30%',
        data: {taskData:new Tasks(this.taskWithId.id!,this.taskWithId.name,this.taskWithId.description,this.taskWithId.dueDate,this.taskWithId.dueDateString)}
      });
    })
  }
  
}
