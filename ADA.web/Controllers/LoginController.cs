using ADA.web.Models;
using ADAClassLibrary;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace ADA.web.Areas.DashBoard.Controllers
{

    
    public class LoginController : Controller
    {
        public string BaseUrl = "";
        public LoginController(IConfiguration configuration)
        {
            BaseUrl = configuration.GetSection("UrlSetting").GetSection("baseApiUrl").Value;
        }
        public IActionResult Authenticate()
        {
            return View();
        }



        #region Login
        //[Route("AuthenticateUser")]
        [HttpPost]
        public Task<object> AuthenticateUser([FromBody] Register obj)
        {
            
            string content = JsonConvert.SerializeObject(obj);
            var buffer = System.Text.Encoding.UTF8.GetBytes(content);
            var byteContent = new ByteArrayContent(buffer);
            //string a=HttpContext.Session.GetString("authorization");
            return HttpClientUtility.CustomHttp(BaseUrl, "api/Authentication/Authenticate", content, HttpContext);

        }






        #endregion
    }
}
