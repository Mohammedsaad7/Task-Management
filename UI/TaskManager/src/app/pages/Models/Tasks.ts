export interface Tasks{
    id?:string;
    name:string;
    description:string;
    duedate: Date; 

    // constructor(id: string, name: string, description: string, duedate : Date) {
    //     this.id = id;
    //     this.name = name;
    //     this.description = description;
    //     this.duedate=duedate;
    // }
}