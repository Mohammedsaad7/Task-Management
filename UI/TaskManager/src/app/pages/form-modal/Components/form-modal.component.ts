import { Component, Inject, ViewChild , OnDestroy, OnInit} from '@angular/core';
import { Tasks } from '../../task-list/Models/Tasks';
import { FormsModule, NgForm } from '@angular/forms';
import { MatInputModule} from '@angular/material/input'
import { MatFormFieldModule} from '@angular/material/form-field'
import { MatNativeDateModule , DateAdapter, provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from'@angular/material/datepicker'
import { CommonModule } from '@angular/common';
import { InsertTaskService } from '../Services/insert-task.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import { Status } from '../Models/Status';
import { Subscription } from 'rxjs';
import { GetStatusService } from '../Services/get-status.service';

@Component({
  selector: 'app-form-modal',
  standalone: true,
  imports: [FormsModule,MatInputModule, MatFormFieldModule, CommonModule, MatDatepickerModule,MatNativeDateModule, MatSelectModule],
  providers:[
    provideNativeDateAdapter(),
    InsertTaskService
  ],
  templateUrl: './form-modal.component.html',
  styleUrl: './form-modal.component.css'
})
export class FormModalComponent implements OnDestroy, OnInit{
  statuses: Status[] =[];
  getStatusSubscription?:Subscription;
  @ViewChild('taskForm') taskForm!: NgForm;
  
  // task=new Tasks('', '', '', new Date(),'');

  constructor(private insertTaskService : InsertTaskService, 
              @Inject(MAT_DIALOG_DATA) public data: any,
              private getStatusService:GetStatusService){}

  ngOnInit(): void {
    this.getAllStatuses();
  }

  getAllStatuses(){
    this.getStatusSubscription=this.getStatusService.getStatus().subscribe((result :Status[]) => {
      this.statuses = result;
    }); 
  }

  onSubmit(taskForm: NgForm) {
    if (taskForm.valid) { // Ensure form is valid before submitting
      // Pass form values to the service
      console.log(this.taskForm.value);
      const sendtask=new Tasks(this.taskForm.value.id,this.taskForm.value.name,this.taskForm.value.description,this.taskForm.value.dueDate, '',this.taskForm.value.statusId);
      this.insertTaskService.InsertTask(sendtask);
    } else {
      // Handle form validation errors if necessary
      console.log('Form is invalid');
    }
  }

  ngOnDestroy(): void {
    // Unsubscribe to prevent memory leaks
    this.getStatusSubscription?.unsubscribe();
  }
}
