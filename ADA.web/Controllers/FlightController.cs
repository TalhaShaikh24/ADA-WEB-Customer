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
    public class FlightController : Controller
    {
        public string BaseUrl = "";
        public FlightController(IConfiguration configuration)
        {
            BaseUrl = configuration.GetSection("UrlSetting").GetSection("ApiUrl").Value;
        }

        
        public Task<object> GetFlightAndMembersDetails([FromBody] GetFlightAndMembersDetails obj)
        {
            string content = JsonConvert.SerializeObject(obj);

            return HttpClientUtility.CustomHttp(BaseUrl, "api/Flight/GetFlightAndMembersDetails", content, HttpContext);
        }
        public Task<object> GetAllDropdowns()
        {
            string content = "";

            return HttpClientUtility.CustomHttpWithout(BaseUrl, "api/Flight/GetAllDropdowns", content);
        }


    }
}
