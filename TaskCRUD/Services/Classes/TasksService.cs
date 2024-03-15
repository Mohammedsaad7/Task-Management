using Microsoft.Extensions.Options;
using MongoDB.Driver;
using TaskCRUD.Configurations;
using TaskCRUD.Models;
using TaskCRUD.Services.Interfaces;

namespace TaskCRUD.Services.Classes
{
    public class TasksService : ITasksService
    {
        private readonly IMongoCollection<Tasks> _tasks;

        public TasksService(IOptions<DatabaseSettings> settings)
        {
            var client = new MongoClient(settings.Value.ConnectionString);

            var database = client.GetDatabase(settings.Value.DatabaseName);
            _tasks = database.GetCollection<Tasks>("Tasks");
        }

        public async Task<List<Tasks>> GetTasksAsync(DateTime? start, DateTime? end, int statusId)
        {
            var filterBuilder = Builders<Tasks>.Filter;
            var filter = filterBuilder.Empty; // Start with an empty filter

            // Check if start date is provided
            if (start.HasValue)
            {
                // Add condition to filter for dueDate greater than or equal to start date
                filter &= filterBuilder.Gt(x => x.DueDate, start.Value);
            }

            // Check if end date is provided
            if (end.HasValue)
            {
                // Add condition to filter for dueDate less than or equal to end date
                filter &= filterBuilder.Lt(x => x.DueDate, end.Value);
            }
            if(statusId != 0)
            {
                if (statusId == 4)
                {
                    filter = filter & ( filterBuilder.Eq(x => x.StatusId, 1) | filterBuilder.Eq(x => x.StatusId, 2));
                    //filter |= filterBuilder.Eq(x => x.StatusId, 2);
                }
                else
                {
                    filter &= filterBuilder.Eq(x => x.StatusId, statusId);
                }
            }

            return await _tasks.Find(filter).Project<Tasks>(Builders<Tasks>.Projection.Include("Id").Include("Name").Include("Description").Include("DueDate")).ToListAsync();
        }

        public async Task<Tasks> GetTaskWithIdAsync(string id)
        {
            return await _tasks.Find(x => x.Id == id).Project<Tasks>(Builders<Tasks>.Projection.Include("Id").Include("Name").Include("Description").Include("DueDate").Include("StatusId")).FirstAsync();
        }

        public void InsertTask(Tasks tasks)
        {
            _tasks.InsertOne(tasks);
        }

        public async Task UpdateTask(Tasks tasks)
        {
            await _tasks.FindOneAndReplaceAsync(x => x.Id == tasks.Id, tasks);
        }

        public async Task DeleteTask(string Id)
        {
            await _tasks.DeleteOneAsync(x => x.Id == Id);
        }
    }
}
