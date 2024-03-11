import { Component , OnInit} from '@angular/core';
import { Tasks } from '../../Models/Tasks';
import { TasksService } from '../../Services/tasks.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {
  title = 'TaskManager';
  tasks: Tasks[] =[];
  constructor(private tasksService : TasksService){}
  ngOnInit(): void {
    this.tasksService.getTasks().subscribe((result :Tasks[]) => {
      this.tasks = result;
    }); 
  }
}
