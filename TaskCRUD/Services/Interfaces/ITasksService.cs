using TaskCRUD.Models;

namespace TaskCRUD.Services.Interfaces
{
    public interface ITasksService
    {
        Task<List<Tasks>> GetTasksAsync();
        void InsertTask(Tasks tasks);
        Task UpdateTask(Tasks tasks); 
        Task DeleteTask(string Id);
    }
}
