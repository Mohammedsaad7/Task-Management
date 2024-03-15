using TaskCRUD.Models;

namespace TaskCRUD.Services.Interfaces
{
    public interface IStatusService
    {
        Task<List<Status>> GetStatuses();
        void InsertStatus(List<Status> statuses);
    }
}
