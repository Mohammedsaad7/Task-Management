using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System.ComponentModel.DataAnnotations;
using TaskCRUD.Controllers;
using TaskCRUD.Models;
using TaskCRUD.Services.Interfaces;
using ZstdSharp.Unsafe;

namespace UnitTests
{
    public class ApiTests
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
        public async Task Test_Get()
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

        [Test]
        public async Task Test_Insert()
        {
            var taskToAdd = new Tasks { Name = "Workout", Description = "Leg day" , DueDate=DateTime.Now};

            // Act
            var result = _taskController.Insert(taskToAdd);

            // Assert
            Assert.IsInstanceOf<OkResult>(result);
            _mockTasksService.Verify(service => service.InsertTask(taskToAdd), Times.Once);
            Assert.Pass();
        }

        [Test]
        public async Task Test_Insert_RequiredFields()
        {
            // Arrange
            var invalidTask = new Tasks(); // Missing required fields

            // Act
            var validationContext = new ValidationContext(invalidTask, null, null);
            var validationResults = new List<ValidationResult>();
            Validator.TryValidateObject(invalidTask, validationContext, validationResults, true);
            foreach (var validationResult in validationResults)
            {
                _taskController.ModelState.AddModelError(validationResult.MemberNames.FirstOrDefault() ?? string.Empty, validationResult.ErrorMessage);
            }
            // Assert
            Assert.IsTrue(_taskController.ModelState.ErrorCount > 0);
        }

        [Test]
        public async Task Test_Update()
        {
            var taskToUpdate = new Tasks {Id="sdfasdafasd", Name = "Workout", Description = "Leg day", DueDate = DateTime.Now };

            // Act
            var result = await _taskController.Update(taskToUpdate);

            // Assert
            Assert.IsInstanceOf<OkResult>(result);
            _mockTasksService.Verify(service => service.UpdateTask(taskToUpdate), Times.Once);
            Assert.Pass();
        }

        [Test]
        public async Task Test_Update_Missing_Id()
        {
            var taskToUpdate = new Tasks {Name = "Workout", Description = "Leg day", DueDate = DateTime.Now };

            // Act
            var result = await _taskController.Update(taskToUpdate);

            // Assert
            Assert.IsInstanceOf<BadRequestObjectResult>(result);

            var badRequestResult = result as BadRequestObjectResult;
            Assert.IsNotNull(badRequestResult);

            Assert.Pass();
        }

        [Test]
        public async Task Test_Delete()
        {
            string deleteId="sdfaasdf";

            // Act
            var result = await _taskController.Delete(deleteId);

            // Assert
            Assert.IsInstanceOf<OkResult>(result);
            _mockTasksService.Verify(service => service.DeleteTask(deleteId), Times.Once);
            Assert.Pass();
        }

        [Test]
        public async Task Test_Delete_Missing_Id()
        {
            string deleteId = "";

            // Act
            var result = await _taskController.Delete(deleteId);

            // Assert
            Assert.IsInstanceOf<BadRequestObjectResult>(result);

            var badRequestResult = result as BadRequestObjectResult;
            Assert.IsNotNull(badRequestResult);

            Assert.Pass();
        }
    }
}