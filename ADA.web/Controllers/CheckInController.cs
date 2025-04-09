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
    public class CheckInController : Controller
    {
        public string BaseUrl = "";
        public CheckInController(IConfiguration configuration)
        {
            BaseUrl = configuration.GetSection("UrlSetting").GetSection("ApiUrl").Value;
        }

        public Task<object> GetCheckinCardDetails(int Id)
        {
            string content = "";

            return HttpClientUtility.CustomHttp(BaseUrl, "/api/CheckIn/GetCheckinCardDetails/" + Id, content, HttpContext);
        } 
        public Task<object> GetMobileCheckin(int Id)
        {
            string content = "";

            return HttpClientUtility.CustomHttp(BaseUrl, "/api/CheckIn/GetMobileCheckin/" + Id, content, HttpContext);
        }
        public Task<object> GetMobileuserDatabyRsvnId(int Id)
        {
            string content = "";

            return HttpClientUtility.CustomHttp(BaseUrl, "/api/CheckIn/GetMobileuserDatabyRsvnId/" + Id, content, HttpContext);
        }
        public Task<object> ReservedSeatByCustomerInMobile([FromBody] CheckIn obj)
        {
            string content = JsonConvert.SerializeObject(obj);

            return HttpClientUtility.CustomHttp(BaseUrl, "api/CheckIn/ReservedSeatByCustomerInMobile", content, HttpContext);
        }
        
    }
}
