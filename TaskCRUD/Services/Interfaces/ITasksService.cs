using TaskCRUD.Models;

namespace TaskCRUD.Services.Interfaces
{
    public interface ITasksService
    {
        Task<List<Tasks>> GetTasksAsync();
    }
}
