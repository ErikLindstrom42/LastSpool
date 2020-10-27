using LastSpool.Models;

namespace LastSpool.Repositories
{
    public interface IPrinterRepository
    {
        void Add(Printer printer);
        void Delete(int id);
        Printer GetPrinterByDeviceIdentifier(string deviceIdentifier);
        Printer GetPrinterById(int id);
    }
}