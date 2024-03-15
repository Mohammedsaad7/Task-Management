using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TaskCRUD.Models;
using TaskCRUD.Services.Interfaces;

namespace TaskCRUD.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class StatusController : ControllerBase
    {
        private readonly IStatusService _statusService;

        public StatusController(IStatusService statusService)
        {
            _statusService = statusService;
        }

        [HttpGet]
        public async Task<IActionResult> GetStatuses()
        {
            var statuses = await _statusService.GetStatuses();
            return Ok(statuses);
        }

        [HttpPost]
        public async Task<IActionResult> InsertStatuses()
        {
            var res = await GetStatuses();
            if (res is OkObjectResult okResult && okResult.Value != null && (okResult.Value as IEnumerable<Status>).Any())
            {
                // API returned records
                return Ok("Already Inserted");
            }
            else
            {
                List<Status> statuses = new List<Status>()
                {
                    new Status {Id=1, Name="To Do"},
                    new Status {Id=2, Name="In Progress"},
                    new Status {Id=3, Name="Completed"}
                };

                _statusService.InsertStatus(statuses);
                return Ok("Successfully Inserted");
            }

        }
    }
}
