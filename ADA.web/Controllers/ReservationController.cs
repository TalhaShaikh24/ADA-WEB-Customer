using ADA.web.Models;
using ADAClassLibrary;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ADA.web.Controllers
{
    public class ReservationController : Controller
    {
        public string BaseUrl = "";
        public ReservationController(IConfiguration configuration)
        {
            BaseUrl = configuration.GetSection("UrlSetting").GetSection("ApiUrl").Value;
        }

        
        public Task<object> Add([FromBody] Reservation obj)
        {
            string content = JsonConvert.SerializeObject(obj);

            return HttpClientUtility.CustomHttp(BaseUrl, "api/Reservation/Add", content, HttpContext);
        }
        public Task<object> GetMyBookingDetailsByID(int Id)
        {
            string content = "";

            return HttpClientUtility.CustomHttp(BaseUrl, "/api/Reservation/GetMyBookingDetailsByID/" + Id, content, HttpContext);
        }
        public Task<object> GetCancelBookingDetailsByUserId(int Id)
        {
            string content = "";

            return HttpClientUtility.CustomHttp(BaseUrl, "/api/Reservation/GetCancelBookingDetailsByUserId/" + Id, content, HttpContext);
        }

        
        [HttpPost]
        public Task<object> CancelBookingByRsvnId([FromBody] Reservation obj)
        {
            string content = JsonConvert.SerializeObject(obj);

            return HttpClientUtility.CustomHttp(BaseUrl, "/api/Reservation/CancelBookingByRsvnId/", content, HttpContext);
        }

        
        [HttpPost]
        public Task<object> ReBookingByRsvnId([FromBody] Reservation obj)
        {
            string content = JsonConvert.SerializeObject(obj);

            return HttpClientUtility.CustomHttp(BaseUrl, "/api/Reservation/ReBookingByRsvnId/", content, HttpContext);
        }


        
    }
}
