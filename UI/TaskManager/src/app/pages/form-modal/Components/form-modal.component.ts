import { Component, Inject, ViewChild } from '@angular/core';
import { Tasks } from '../../task-list/Models/Tasks';
import { FormsModule, NgForm } from '@angular/forms';
import { MatInputModule} from '@angular/material/input'
import { MatFormFieldModule} from '@angular/material/form-field'
import { MatNativeDateModule , DateAdapter, provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from'@angular/material/datepicker'
import { CommonModule } from '@angular/common';
import { InsertTaskService } from '../Services/insert-task.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-form-modal',
  standalone: true,
  imports: [FormsModule,MatInputModule, MatFormFieldModule, CommonModule, MatDatepickerModule,MatNativeDateModule],
  providers:[
    provideNativeDateAdapter(),
    InsertTaskService
  ],
  templateUrl: './form-modal.component.html',
  styleUrl: './form-modal.component.css'
})
export class FormModalComponent {
  @ViewChild('taskForm') taskForm!: NgForm;
  
  // task=new Tasks('', '', '', new Date(),'');

  constructor(private insertTaskService : InsertTaskService, 
              @Inject(MAT_DIALOG_DATA) public data: any){}

  onSubmit(taskForm: NgForm) {
    if (taskForm.valid) { // Ensure form is valid before submitting
      // Pass form values to the service
      const sendtask=new Tasks(this.taskForm.value.id,this.taskForm.value.name,this.taskForm.value.description,this.taskForm.value.dueDate, '');
      this.insertTaskService.InsertTask(sendtask);
    } else {
      // Handle form validation errors if necessary
      console.log('Form is invalid');
    }
  }
}
