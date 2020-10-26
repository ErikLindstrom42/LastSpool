using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LastSpool.Repositories;
using LastSpool.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using Newtonsoft.Json.Linq;

namespace LastSpool.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JobController : ControllerBase
    {
        private readonly IUserProfileRepository _userProfileRepository;
        private readonly IJobRepository _jobRepository;
        private readonly IPrinterRepository _printerRepository;
        public JobController(IJobRepository jobRepository, IUserProfileRepository userProfileRepository, IPrinterRepository printerRepository)
        //public JobController(IJobRepository jobRepository, IUserProfileRepository userProfileRepository)
        {
            _jobRepository = jobRepository;
            _userProfileRepository = userProfileRepository;
            _printerRepository = printerRepository;
        }

        [HttpGet("{id}")]
        public IActionResult GetJobById(int id)
        {
            return Ok(_jobRepository.GetJobById(id));
        }

        [HttpGet("GetJobsByPrinterId/{id}")]
        public IActionResult GetJobsByPrinterId(int id)
        {
            return Ok(_jobRepository.GetJobsByPrinterId(id));
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var currentUserProfile = GetCurrentUserProfile();
            if (currentUserProfile.Id != _jobRepository.GetJobById(id).Id)
            {
                return Unauthorized();
            }

            _jobRepository.Delete(id);
            return NoContent();
        }

        [HttpPost]
        public IActionResult Add(IncomingJob job)
        {
            job.PrinterId = _printerRepository.GetPrinterByDeviceIdentifier(job.DeviceIdentifier).Id;
            _jobRepository.Add(job);
            return base.Created("", job);

        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);


        }
    }
}