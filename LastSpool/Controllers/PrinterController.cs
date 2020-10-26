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

        [HttpGet("{id}")]
        public IActionResult GetPrinterById(int id)
        {
            return Ok(_printerRepository.GetPrinterById(id));
        }
    }
}
