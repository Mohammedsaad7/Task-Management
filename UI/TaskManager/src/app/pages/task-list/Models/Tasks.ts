export class Tasks{
    id?:string='';
    name:string;
    description:string;
    dueDate: Date; 
    dueDateString?:string;

    constructor(id: string, name: string, description: string, duedate : Date, dueDateString : string) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.dueDate=duedate;
        this.dueDateString=dueDateString;
    }
}