using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using TaskCRUD.Models;
using TaskCRUD.Services.Interfaces;

namespace TaskCRUD.Controllers
{
    [ApiController]
    [Route("api/[controller]/[Action]")]
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

        [HttpPost]
        public IActionResult Insert(Tasks tasks)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _tasksService.InsertTask(tasks);

            return Ok();
        }

        [HttpPut]
        public async Task<IActionResult> Update(Tasks tasks)
        {
            if(tasks.Id == null || tasks.Id == string.Empty)
            {
                return BadRequest(error: "Id is missing");
            }

            await _tasksService.UpdateTask(tasks);

            return Ok();
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(string Id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            else if (Id == null || Id == string.Empty)
            {
                return BadRequest(error: "Id is missing");
            }

            await _tasksService.DeleteTask(Id);

            return Ok();
        }
    }
}
