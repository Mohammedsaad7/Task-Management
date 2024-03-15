export class Tasks{
    id?:string='';
    name:string;
    description:string;
    dueDate: Date; 
    dueDateString?:string;
    statusId:number;

    constructor(id: string, name: string, description: string, duedate : Date, dueDateString : string, statusId:number) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.dueDate=duedate;
        this.dueDateString=dueDateString;
        this.statusId=statusId;
    }
}