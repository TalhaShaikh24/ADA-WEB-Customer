using ADA.web.Models;
using ADAClassLibrary;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace ADA.web.Controllers
{
    public class RegisterController : Controller
    {
        public string BaseUrl = "";
        public RegisterController(IConfiguration configuration)
        {
            BaseUrl = configuration.GetSection("UrlSetting").GetSection("ApiUrl").Value;
        }

       
        public Task<object> GetAllFlightMembersByUserID(int Id)
        {
            string content = "";

            return HttpClientUtility.CustomHttp(BaseUrl, "/api/Register/GetAllFlightMembersByUserID/"+Id, content, HttpContext);
        }


        public Task<object> GetAllGroupUsersByID(int Id)
        {
            string content = "";
           
            return HttpClientUtility.CustomHttp(BaseUrl, "/api/Register/GetAllGroupUsersByID?Id="+Id, content, HttpContext);
        }

        public IActionResult Register()
        {
            return View();
        }

 
        public IActionResult RegisterGroup()
        {
            return View();
        }
        

        public IActionResult RegisterCorporate()
        {
            return View();
        }

        public IActionResult MobileRegister()
        {
            return View();
        }

        public IActionResult MobileRegisterArabic()
        {
            return View();
        }
        public IActionResult MobileRegisterGroup()
        {
            return View();
        }

        public IActionResult MobileRegisterGroupArabic()
        {
            return View();
        }

        public IActionResult MobileRegisterCorporate()
        {
            return View();
        }

        public IActionResult MobileRegisterCorporateArabic()
        {
            return View();
        }
        
        public IActionResult ForgotPassword()
        {
            return View();
        }
         public IActionResult ResetPassword()
        {
            return View();
        }

    }

}

