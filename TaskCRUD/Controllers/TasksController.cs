using Microsoft.AspNetCore.Mvc;
using TaskCRUD.Services.Interfaces;

namespace TaskCRUD.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TasksController : ControllerBase
    {
        private readonly ITasksService _tasksService;

        public TasksController(ITasksService tasksService) 
        { 
            _tasksService = tasksService;
        }


        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var tasks = await _tasksService.GetTasksAsync();
            return Ok(tasks);
        }
    }
}
