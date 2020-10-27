using LastSpool.Models;
using System.Collections.Generic;

namespace LastSpool.Repositories
{
    public interface IPrinterRepository
    {
        void Add(Printer printer);
        void Delete(int id);
        Printer GetPrinterByDeviceIdentifier(string deviceIdentifier);
        Printer GetPrinterById(int id);
        List<Printer> GetPrintersByUserProfileId(int userProfileId);
    }
}