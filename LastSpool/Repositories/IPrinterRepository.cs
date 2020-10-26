using LastSpool.Models;

namespace LastSpool.Repositories
{
    public interface IPrinterRepository
    {
        Printer GetPrinterByDeviceIdentifier(string deviceIdentifier);
        Printer GetPrinterById(int id);
    }
}