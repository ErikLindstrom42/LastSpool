using LastSpool.Models;
using System.Collections.Generic;

namespace LastSpool.Repositories
{
    public interface IJobRepository
    {
        void Add(IncomingJob incomgingJob);
        void Delete(int id);
        Job GetJobById(int id);
        List<Job> GetJobsByPrinterId(int printerId);
        void Update(Job job);
    }
}