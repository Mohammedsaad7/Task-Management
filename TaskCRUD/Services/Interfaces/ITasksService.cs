using TaskCRUD.Models;

namespace TaskCRUD.Services.Interfaces
{
    public interface ITasksService
    {
        Task<List<Tasks>> GetTasksAsync(DateTime? start, DateTime? end, int statusId);
        Task<Tasks> GetTaskWithIdAsync(string Id);
        void InsertTask(Tasks tasks);
        Task UpdateTask(Tasks tasks); 
        Task DeleteTask(string Id);
    }
}
