using Microsoft.AspNetCore.Mvc;
using Moq;
using TaskCRUD.Controllers;
using TaskCRUD.Models;
using TaskCRUD.Services.Interfaces;

namespace UnitTests
{
    public class Tests
    {
        private Mock<ITasksService> _mockTasksService;
        private TasksController _taskController;

        [SetUp]
        public void Setup()
        {
            _mockTasksService = new Mock<ITasksService>();
            _taskController = new TasksController(_mockTasksService.Object);
        }

        [Test]
        public async Task Test1()
        {
            // Arrange
            var expectedTasks = new List<Tasks>
            {
                new Tasks { Id = "1", Name = "Task 1" },
                new Tasks { Id = "2", Name = "Task 2" },

            };

            _mockTasksService.Setup(service => service.GetTasksAsync()).ReturnsAsync(expectedTasks);

            // Act
            var result = await _taskController.Get();

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result);
            var okResult = result as OkObjectResult;
            Assert.IsInstanceOf<List<Tasks>>(okResult.Value);
            var actualTasks = okResult.Value as List<Tasks>;
            Assert.AreEqual(expectedTasks.Count, actualTasks.Count);
            for (int i = 0; i < expectedTasks.Count; i++)
            {
                Assert.AreEqual(expectedTasks[i].Id, actualTasks[i].Id);
                Assert.AreEqual(expectedTasks[i].Name, actualTasks[i].Name);
            }
            Assert.Pass();
        }
    }
}