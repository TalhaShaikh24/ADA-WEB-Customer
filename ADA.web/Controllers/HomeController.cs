using ADA.web.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace ADA.web.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult FlightResults()
        {
            return View();
        }
        public IActionResult FlightBooking()
        {
            return View();
        }

        
        public IActionResult FlightMembers(int id)
        {
            return View();
        }

        public IActionResult BookingHistory()
        {
            return View();
        }
        public IActionResult About()
        {
            return View();
        }
        public IActionResult Thankyou()
        {

            return View();
        }
        public IActionResult Checkin()
        {

            return View();
        }
        public IActionResult ConfirmCheckin()
        {

            return View();
        }
        
         public IActionResult BoardingPass()
        {

            return View();
        }
        
        public IActionResult FlightStatus()
        {

            return View();
        }
        public IActionResult CargoStatus()
        {

            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        public IActionResult MyProfile()
        {

            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }



       
    }
}
