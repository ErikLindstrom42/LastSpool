using LastSpool.Models;
using System.Collections.Generic;

namespace LastSpool.Repositories
{
    public interface IJobRepository
    {
        void Add(Job job);
        void Delete(int id);
        Job GetJobById(int id);
        List<Job> GetJobsByPrinterId(int printerId);
        void Update(Job job);
        Job GetLastUserJob(int id);
        Job GetLastJob();
        Job GetLastPrinterJob(int id);
    }
}