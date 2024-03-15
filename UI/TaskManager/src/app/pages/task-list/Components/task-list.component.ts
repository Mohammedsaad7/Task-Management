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
import { GetDaterangeService } from '../Services/get-daterange.service'
import {MatSelectModule} from '@angular/material/select';
import { Status } from '../../form-modal/Models/Status';
import { GetStatusService } from '../../form-modal/Services/get-status.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule,MatButtonModule,MatIconModule, MatSelectModule],
  providers:[DatePipe],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit, OnDestroy {
  title = 'TaskManager';
  tasks: Tasks[] =[];
  statuses:Status[]=[];
  selectedRange: string = 'All';
  selectedStatus:number = 0;
  taskWithId: Tasks = new Tasks('','','',new Date(),'',0);
  message:Message= new Message('');
  reloadSubscription?: Subscription;
  getTasksSubscription?:Subscription;
  getTaskWithIdSubscription?:Subscription;
  getStatusSubscription?:Subscription;
  start:Date=new Date();
  end:Date=new Date();
  constructor(private tasksService : TasksService, 
              private dialogRef : MatDialog,
              private reloadTaskService: ReloadTaskService,
              private deleteTaskService: DeleteTaskService,
              private datePipe: DatePipe,
              private getDateRangeService: GetDaterangeService,
              private getStatusService: GetStatusService){}

  ngOnInit(): void {
    this.loadTasks(this.selectedRange, this.selectedStatus);
    this.getAllStatuses();
    this.reloadSubscription = this.reloadTaskService.reloadTask$.subscribe(() => {
      this.loadTasks(this.selectedRange, this.selectedStatus);
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe to prevent memory leaks
    this.reloadSubscription?.unsubscribe();
    this.getTasksSubscription?.unsubscribe();
  }

  getAllStatuses(){
    this.getStatusSubscription=this.getStatusService.getStatus().subscribe((result :Status[]) => {
      this.statuses = result;
    }); 
  }

  loadTasks(period: string, status: number){
    this.selectedRange=period;
    this.selectedStatus=status;
    if(period == "Expired"){
      status=4;
    }
    const dateRange=this.getDateRangeService.getDateRange(period);
    this.getTasksSubscription=this.tasksService.getTasks(status,dateRange.start!,dateRange.end!).subscribe((result :Tasks[]) => {
      this.tasks = result;
    }); 
  }


  openDialog(){
    this.dialogRef.open(FormModalComponent,{
      width:'30%',
      data: {taskData:new Tasks('','','',new Date(),'',0)}
    });
  }

  deleteTask(id:string){
    this.deleteTaskService.deleteTask(id);
  }

  selectedRangeClass(range: string): string {
    return 'RangePicker' + (this.selectedRange === range ? ' selectedRange' : '');
  }

  openEditDialog(id:string){
    this.getTaskWithIdSubscription=this.tasksService.getTasksWithId(id).subscribe((result:Tasks) => {
      this.taskWithId=result;
      console.log(this.taskWithId);
      // this.taskWithId.dueDate=new Date(this.taskWithId.dueDate,);
      this.taskWithId.dueDateString=this.datePipe.transform(this.taskWithId.dueDate,'yyyy-MM-dd')!;
      this.dialogRef.open(FormModalComponent,{
        width:'30%',
        data: {taskData:new Tasks(this.taskWithId.id!,this.taskWithId.name,this.taskWithId.description,this.taskWithId.dueDate,this.taskWithId.dueDateString,this.taskWithId.statusId)}
      });
    })
  }
  
}
