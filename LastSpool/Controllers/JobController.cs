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
using LastSpool.Utils;

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
            //var currentUserProfile = GetCurrentUserProfile();
            //if (currentUserProfile.Id != _jobRepository.GetJobById(id).Id)
            //{
            //    return Unauthorized();
            //}

            _jobRepository.Delete(id);
            return NoContent();
        }

        [HttpPost]
        public IActionResult Add(IncomingJob incomingJob)
        {
            
            Job job = new Job()
            {
                
                Image = incomingJob.Image,
                FileName = incomingJob.FileName,
                StatusDateTime = DbUtils.UnixTimeStampToDateTime(incomingJob.StatusTime),
                FilamentLength = (int)incomingJob.FilamentLength,
                PrintLength = (int)incomingJob.PrintLength,
                DeviceIdentifier = incomingJob.DeviceIdentifier,
                StatusMessage = incomingJob.StatusMessage,
                PercentDone = (int?)incomingJob.PercentDone,
                TimeLeft = incomingJob.TimeLeft,

            };
            Printer currentPrinter = _printerRepository.GetPrinterByDeviceIdentifier(job.DeviceIdentifier);// add catch if not found
            job.PrinterId = currentPrinter.Id;
            Job lastJob = _jobRepository.GetLastPrinterJob(currentPrinter.Id);

            if (job.PercentDone == 100)
            {
                job.CompleteDateTime = DateTime.Now;
            }
            if (job.PercentDone > lastJob.PercentDone)
            {
                job.Id = lastJob.Id;
                _jobRepository.Update(job);
                return Ok();
            }
            
                _jobRepository.Add(job);
            return base.Created("", job);
            
        }
        [HttpPost("ManualAdd")]
        public IActionResult ManualAdd(Job job)
        {

            _jobRepository.Add(job);
            return base.Created("", job);

        }

        private UserProfile GetCurrentUserProfile()
        {
            
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);


        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Job job)
        {
            if (id != job.Id)
            {
                return BadRequest();
            }
            _jobRepository.Update(job);
            return Ok();
        }

   
        [HttpGet("GetLastJob")]
        public IActionResult GetLastJob()
        {
            
            return Ok(_jobRepository.GetLastJob());

        }


        //[HttpGet("GetLastUserJob")]
        //public IActionResult GetLastUserJob()
        //{

        //    return Ok(_jobRepository.GetLastUserJob(currentUser.Id));
            
        //}

        [HttpGet("GetLastPrinterJob/{id}")]
        public IActionResult GetLastPrinterJob(int id)
        {

            return Ok(_jobRepository.GetLastPrinterJob(id));

        }
    }
}