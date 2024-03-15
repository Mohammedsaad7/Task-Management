db = connect( 'mongodb://localhost:27017/TaskDatabase' );

var today = new Date();
var next7Days = new Date();
next7Days.setDate(next7Days.getDate() + 3);
var nextMonth = new Date();
nextMonth.setDate(nextMonth.getDate() + 10);

var dummyData = [
    // Generate 5 records for today's date
    { Name: "Task for today1", DueDate: today, StatusId: 1 },
    { Name: "Task for today2", DueDate: today, StatusId: 2 },
    { Name: "Task for today3", DueDate: today, StatusId: 3 },
    { Name: "Task for today4", DueDate: today, StatusId: 1 },
    { Name: "Task for today5", DueDate: today, StatusId: 2 },

    // Generate 5 records for the next 7 days
    { Name: "Task for Week1", DueDate: next7Days, StatusId: 1 },
    { Name: "Task for Week2", DueDate: next7Days, StatusId: 2 },
    { Name: "Task for Week3", DueDate: next7Days, StatusId: 3 },
    { Name: "Task for Week4", DueDate: next7Days, StatusId: 1 },
    { Name: "Task for Week5", DueDate: next7Days, StatusId: 2 },

    // Generate 5 records for the next month
    { Name: "Task for Month1", DueDate: nextMonth, StatusId: 1 },
    { Name: "Task for Month2", DueDate: nextMonth, StatusId: 2 },
    { Name: "Task for Month3", DueDate: nextMonth, StatusId: 3 },
    { Name: "Task for Month4", DueDate: nextMonth, StatusId: 1 },
    { Name: "Task for Month5", DueDate: nextMonth, StatusId: 2 },

    // Generate 5 records before today's date with StatusId 1 or 2
    { Name: "OldTask1", DueDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1), StatusId: 3},
    { Name: "OldTask2", DueDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 2), StatusId: 3},
    { Name: "OldTask3", DueDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 3), StatusId: 3 },
    { Name: "OldTask4", DueDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 4), StatusId: 3 },
    { Name: "OldTask5", DueDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 5), StatusId: 3 },

    // Generate 5 records before today's date with StatusId 3
    { Name: "Expired task1", DueDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 6), StatusId: 1 },
    { Name: "Expired task2", DueDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7), StatusId:2},
    { Name: "Expired task3", DueDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 8), StatusId: 2 },
    { Name: "Expired task4", DueDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 9), StatusId: 2},
    { Name: "Expired task5", DueDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 10), StatusId: 1}
];

// Insert dummy data into the Tasks collection
db.Tasks.insertMany(dummyData);


var status=[
	{_id:1, Name:"To Do"},
	{_id:2, Name:"In Progress"},
	{_id:3, Name:"Completed"}
];

db.Status.insertMany(status);