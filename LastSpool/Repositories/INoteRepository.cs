using LastSpool.Models;
using System.Collections.Generic;

namespace LastSpool.Repositories
{
    public interface INoteRepository
    {
        void Add(Note note);
        void Delete(int id);
        Note GetNoteById(int id);
        List<Note> GetNotesByJobId(int jobId);
        void Update(Note note);
    }
}