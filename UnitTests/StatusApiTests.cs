using Microsoft.AspNetCore.Mvc;
using Moq;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskCRUD.Controllers;
using TaskCRUD.Models;
using TaskCRUD.Services.Interfaces;

namespace UnitTests
{
    public class StatusApiTests
    {

        private Mock<IStatusService> _mockStatusService;
        private StatusController _statusController;

        [SetUp]
        public void Setup()
        {
            _mockStatusService = new Mock<IStatusService>();
            _statusController = new StatusController(_mockStatusService.Object);
        }

        [Test]
        public async Task Test_Get_Statuses()
        {
            // Arrange
            var expectedStatuses = new List<Status>
            {
                new Status { Id = 1, Name = "Satatus 1" },
                new Status { Id = 2, Name = "Status 2" },

            };

            _mockStatusService.Setup(service => service.GetStatuses()).ReturnsAsync(expectedStatuses);

            // Act
            var result = await _statusController.GetStatuses();

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result);
            var okResult = result as OkObjectResult;
            Assert.IsInstanceOf<List<Status>>(okResult.Value);
            var actualStatus = okResult.Value as List<Status>;
            Assert.AreEqual(expectedStatuses.Count, actualStatus.Count);
            for (int i = 0; i < expectedStatuses.Count; i++)
            {
                Assert.AreEqual(expectedStatuses[i].Id, actualStatus[i].Id);
                Assert.AreEqual(expectedStatuses[i].Name, actualStatus[i].Name);
            }
            Assert.Pass();
        }

        [Test]
        public async Task Test_Status_Insert_Get_Call()
        {

            // Act
            var result = await _statusController.InsertStatuses();

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result);
            _mockStatusService.Verify(_statusController => _statusController.GetStatuses(), Times.Once);
            Assert.Pass();
        }

        [Test]
        public async Task Test_Status_Insert_Already_Inserted()
        {
            var statuses = new List<Status>
            {
                new Status { Id = 1, Name = "To Do" },
                new Status { Id = 2, Name = "In Progress" },
                new Status { Id = 3, Name = "Completed" }
            };
            _mockStatusService.Setup(service => service.GetStatuses()).ReturnsAsync(statuses);

            // Act
            var result = await _statusController.InsertStatuses();

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result);
            Assert.AreEqual("Already Inserted", ((OkObjectResult)result).Value);
        }

        [Test]
        public async Task Test_Status_Insert()
        {
            _mockStatusService.Setup(service => service.GetStatuses()).ReturnsAsync(new List<Status>());
            _mockStatusService.Setup(service => service.InsertStatus(It.IsAny<List<Status>>()));

            // Act
            var result = await _statusController.InsertStatuses();

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result);
            Assert.AreEqual("Successfully Inserted", ((OkObjectResult)result).Value);
            _mockStatusService.Verify(service => service.InsertStatus(It.IsAny<List<Status>>()), Times.Once);
        }
    }
}
