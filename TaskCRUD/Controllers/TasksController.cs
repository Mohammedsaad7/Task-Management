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

        [HttpGet]
        public async Task<IActionResult> GetWithId(string id)
        {
            var tasks = await _tasksService.GetTaskWithIdAsync(id);
            return Ok(tasks);
        }

        [HttpPost]
        public async Task<IActionResult> Insert(Tasks tasks)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if(tasks.Id != string.Empty && tasks.Id != null)
            {
                await Update(tasks);
            }
            else
            {
                _tasksService.InsertTask(tasks);
            }


            return Ok(200);
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

            return Ok(200);
        }
    }
}
