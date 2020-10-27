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
    public class NoteController : ControllerBase
    {
        private readonly IUserProfileRepository _userProfileRepository;
        private readonly IJobRepository _jobRepository;
        private readonly INoteRepository _noteRepository;
        public NoteController(INoteRepository noteRepository,IJobRepository jobRepository, IUserProfileRepository userProfileRepository, IPrinterRepository printerRepository)
        //public JobController(IJobRepository jobRepository, IUserProfileRepository userProfileRepository)
        {
            _jobRepository = jobRepository;
            _userProfileRepository = userProfileRepository;
            _noteRepository = noteRepository;
        }

        [HttpGet("{id}")]
        public IActionResult GetNoteById(int id)
        {
            return Ok(_noteRepository.GetNoteById(id));
        }

        [HttpGet("GetNotesByJobId/{id}")]
        public IActionResult GetNotesByJobId(int id)
        {
            return Ok(_noteRepository.GetNotesByJobId(id));
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            //var currentUserProfile = GetCurrentUserProfile();
            //if (currentUserProfile.Id != _noteRepository.GetNoteById(id).Id)
            //{
            //    return Unauthorized();
            //}

            _noteRepository.Delete(id);
            return NoContent();
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Note note)
        {
            if (id != note.Id)
            {
                return BadRequest();
            }
            _noteRepository.Update(note);
            return Ok();
        }

        [HttpPost]
        public IActionResult Add(Note note)
        {
            
            _noteRepository.Add(note);
            return base.Created("", note);
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);


        }
    }
}