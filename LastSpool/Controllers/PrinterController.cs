using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using LastSpool.Models;
using LastSpool.Repositories;
using System.Security.Claims;

namespace LastSpool.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PrinterController : ControllerBase
    {
        private readonly IPrinterRepository _printerRepository;
        private readonly IUserProfileRepository _userProfileRepository;
        public PrinterController(IPrinterRepository printerRepository, IUserProfileRepository userProfileRepository)
        {
            _printerRepository = printerRepository;
            _userProfileRepository = userProfileRepository;
        }

        [HttpGet("getprinterbydeviceidentifier/{id}")]
        public IActionResult GetPrinterByDeviceIdentifier(string deviceIdentifier)
        {
            return Ok(_printerRepository.GetPrinterByDeviceIdentifier(deviceIdentifier));
        }

        [HttpGet("getprintersbyuserprofileid/{id}")]
        public IActionResult GetPrintersByUserProfileId(int id)
        {
            return Ok(_printerRepository.GetPrintersByUserProfileId(id));
        }

        [HttpPost]
        public IActionResult Post(Printer printer)
        {
            if (_printerRepository.GetPrinterByDeviceIdentifier(printer.DeviceIdentifier) != null)
            {
                return BadRequest();
            }
            _printerRepository.Add(printer);
            return base.Created("", printer);
        }

        [HttpGet("{id}")]
        public IActionResult GetPrinterById(int id)
        {
            return Ok(_printerRepository.GetPrinterById(id));
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            //var currentUserProfile = GetCurrentUserProfile();
            //if (currentUserProfile.Id != _commentRepository.GetCommentById(id).UserProfileId || currentUserProfile.UserTypeId != 1)
            //{
            //    return Unauthorized();
            //}

            _printerRepository.Delete(id);
            return NoContent();
        }
    }
}
