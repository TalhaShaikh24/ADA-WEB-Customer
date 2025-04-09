
using ADA.web.Models;
using ADAClassLibrary;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace BE_ME_Clinic_Web_App.Controllers
{

    public class AccountController : Controller
    {
        public string BaseUrl = "";
        public AccountController(IConfiguration configuration)
        {
            BaseUrl = configuration.GetSection("UrlSetting").GetSection("ApiUrl").Value;
        }
        public IActionResult Authenticate()
        {

            var res = HttpContext.Session.GetString("authorization");

            if (res != null)
            {

                TempData["session"] = res;

                return RedirectToAction("Home", "Index");
            }

            return View();
        }



        #region Login

        [HttpPost]
        public Task<object> AuthenticateUser([FromBody] LoginCredential obj)
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
