using Microsoft.Extensions.Options;
using MongoDB.Driver;
using System.Threading.Tasks;
using TaskCRUD.Configurations;
using TaskCRUD.Models;
using TaskCRUD.Services.Interfaces;

namespace TaskCRUD.Services.Classes
{
    public class StatusService : IStatusService
    {

        private readonly IMongoCollection<Status> _status;

        public StatusService(IOptions<DatabaseSettings> settings)
        {
            var client = new MongoClient(settings.Value.ConnectionString);

            var database = client.GetDatabase(settings.Value.DatabaseName);
            _status = database.GetCollection<Status>("Status");
        }

        public async Task<List<Status>> GetStatuses()
        {
            return await _status.Find(x => true).ToListAsync();
        }

        public void InsertStatus(List<Status> statuses)
        {
            _status.InsertMany(statuses);
        }
    }
}
