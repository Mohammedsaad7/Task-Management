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

        public async Task<List<Tasks>> GetTasksAsync()
        {
            return await _tasks.Find(x => true).Project<Tasks>(Builders<Tasks>.Projection.Include("Id")).ToListAsync();
        }
    }
}
