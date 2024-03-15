import { Injectable } from '@angular/core';
import { DateRange } from '@angular/material/datepicker';
import { StartEndDates } from '../Models/StartEndDates';

@Injectable({
  providedIn: 'root'
})
export class GetDaterangeService {
  dateRange:StartEndDates = new StartEndDates();
  constructor() { }

  getDateRange(period: string){
    const start=new Date();
    if(period == "Backlog" || period == "Expired"){
      this.dateRange.start=undefined;
      this.dateRange.end =new Date(start.getFullYear(), start.getMonth(), start.getDate());
      this.dateRange.end.setSeconds(this.dateRange.end.getSeconds() - 1);

      return this.dateRange;
    }
    else if(period == "All"){
      this.dateRange.start = new Date(start.getFullYear(), start.getMonth(), start.getDate());
      this.dateRange.start.setSeconds(this.dateRange.start.getSeconds() - 1);
      this.dateRange.end=undefined;

      return this.dateRange;
    }

    else{
      console.log(start);

      this.dateRange.start = new Date(start.getFullYear(), start.getMonth(), start.getDate());
      this.dateRange.start.setSeconds(this.dateRange.start.getSeconds() - 1);

      this.dateRange.end = new Date(start.getFullYear(), start.getMonth(), start.getDate());
      if(period =="Today"){
        this.dateRange.end.setDate(this.dateRange.end.getDate() + 1);  
      }
      else if(period ="Week"){
        this.dateRange.end.setDate(this.dateRange.end.getDate() + 7);  
      }
      else if(period="Month"){
        this.dateRange.end.setDate(this.dateRange.end.getDate() + 30);  
      }
    }

    return this.dateRange;
  }
}
