using ADAClassLibrary;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace ADA.web.Models
{
    public class HttpClientUtility
    {
        public static async Task<object> CustomHttp(string BaseUrl, string Url, string content, HttpContext httpContext)
        {
            using (var client = new HttpClient())
            {

                client.BaseAddress = new Uri(BaseUrl);

                client.DefaultRequestHeaders
                      .Accept
                      .Add(new MediaTypeWithQualityHeaderValue("application/json"));

                HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Post, Url);
                if (!String.IsNullOrEmpty(httpContext.Session.GetString("authorization")))
                request.Headers.Add("authorization", httpContext.Session.GetString("authorization"));
                request.Content = new StringContent(content, Encoding.UTF8, "application/json");
                HttpResponseMessage Res = await client.SendAsync(request);
                if (Res.IsSuccessStatusCode)
                {
                    var response = Res.Content.ReadAsStringAsync().Result;
                    var obj = JsonConvert.DeserializeObject<Response>(response);
                    httpContext.Session.SetString("authorization", obj.Token == null ? "" : obj.Token);
                    return response;

                }
                else
                    return null;
            }
        }
        public static async Task<object> CustomHttpWithout(string BaseUrl, string Url, string content)
        {
            using (var client = new HttpClient())
            {

                client.BaseAddress = new Uri(BaseUrl);

                client.DefaultRequestHeaders
                      .Accept
                      .Add(new MediaTypeWithQualityHeaderValue("application/json"));

                HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Post, Url);
                request.Content = new StringContent(content, Encoding.UTF8, "application/json");
                HttpResponseMessage Res = await client.SendAsync(request);
                if (Res.IsSuccessStatusCode)
                {
                    var response = Res.Content.ReadAsStringAsync().Result;
                    var obj = JsonConvert.DeserializeObject<Response>(response);
                    return response;

                }
                else
                    return null;
            }
        }


        public static async Task<object> CustomHttpForGetAll(string BaseUrl, string Url, string content, HttpContext httpContext)
        {
            using (var client = new HttpClient())
            {

                client.BaseAddress = new Uri(BaseUrl);

                client.DefaultRequestHeaders
                      .Accept
                      .Add(new MediaTypeWithQualityHeaderValue("application/json"));

                HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Post, Url);
                request.Headers.Add("draw", httpContext.Request.Form["draw"].FirstOrDefault());
                request.Headers.Add("start", httpContext.Request.Form["start"].FirstOrDefault());
                request.Headers.Add("length", httpContext.Request.Form["length"].FirstOrDefault());
                request.Headers.Add("sortColumn", httpContext.Request.Form["columns[" + httpContext.Request.Form["order[0][column]"].FirstOrDefault() + "][name]"].FirstOrDefault());
                request.Headers.Add("sortColumnDir", httpContext.Request.Form["order[0][dir]"].FirstOrDefault());
                request.Headers.Add("searchValue", httpContext.Request.Form["search[value]"].FirstOrDefault());

              

                if (!String.IsNullOrEmpty(httpContext.Session.GetString("authorization")))
                 request.Headers.Add("authorization", httpContext.Session.GetString("authorization"));
                request.Content = new StringContent(content, Encoding.UTF8, "application/json");
                HttpResponseMessage Res = await client.SendAsync(request);
                if (Res.IsSuccessStatusCode)
                {
                    var response = Res.Content.ReadAsStringAsync().Result;
                    var obj = JsonConvert.DeserializeObject<Response>(response);
                    httpContext.Session.SetString("authorization", obj.Token == null ? "" : obj.Token);
                    return response;

                }
                else
                    return null;
            }
        }



        public static async Task<object> CustomHttpForFlightGetAllWithCustomParameters(string BaseUrl, string Url, string content, HttpContext httpContext)
        {
            using (var client = new HttpClient())
            {

                client.BaseAddress = new Uri(BaseUrl);

                client.DefaultRequestHeaders
                      .Accept
                      .Add(new MediaTypeWithQualityHeaderValue("application/json"));

                HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Post, Url);
                request.Headers.Add("draw", httpContext.Request.Form["draw"].FirstOrDefault());
                request.Headers.Add("start", httpContext.Request.Form["start"].FirstOrDefault());
                request.Headers.Add("length", httpContext.Request.Form["length"].FirstOrDefault());
                request.Headers.Add("sortColumn", httpContext.Request.Form["columns[" + httpContext.Request.Form["order[0][column]"].FirstOrDefault() + "][name]"].FirstOrDefault());
                request.Headers.Add("sortColumnDir", httpContext.Request.Form["order[0][dir]"].FirstOrDefault());
                request.Headers.Add("searchValue", httpContext.Request.Form["search[value]"].FirstOrDefault());
                request.Headers.Add("FromDate", httpContext.Request.Form["columns[0][search][value]"].FirstOrDefault());
                request.Headers.Add("ToDate", httpContext.Request.Form["columns[1][search][value]"].FirstOrDefault());
                request.Headers.Add("AirCraftType", httpContext.Request.Form["columns[2][search][value]"].FirstOrDefault());
                if (!String.IsNullOrEmpty(httpContext.Session.GetString("authorization")))
                request.Headers.Add("authorization", httpContext.Session.GetString("authorization"));
                request.Content = new StringContent(content, Encoding.UTF8, "application/json");
                HttpResponseMessage Res = await client.SendAsync(request);
                if (Res.IsSuccessStatusCode)
                {
                    var response = Res.Content.ReadAsStringAsync().Result;
                    var obj = JsonConvert.DeserializeObject<Response>(response);
                   httpContext.Session.SetString("authorization", obj.Token == null ? "" : obj.Token);
                    return response;

                }
                else
                    return null;
            }
        }

        public static async Task<object> CustomHttpForTeamTargetToMembersGetAllWithCustomParameters(string BaseUrl, string Url, string content, HttpContext httpContext)
        {
            using (var client = new HttpClient())
            {

                client.BaseAddress = new Uri(BaseUrl);

                client.DefaultRequestHeaders
                      .Accept
                      .Add(new MediaTypeWithQualityHeaderValue("application/json"));

                HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Post, Url);
                request.Headers.Add("draw", httpContext.Request.Form["draw"].FirstOrDefault());
                request.Headers.Add("start", httpContext.Request.Form["start"].FirstOrDefault());
                request.Headers.Add("length", httpContext.Request.Form["length"].FirstOrDefault());
                request.Headers.Add("sortColumn", httpContext.Request.Form["columns[" + httpContext.Request.Form["order[0][column]"].FirstOrDefault() + "][name]"].FirstOrDefault());
                request.Headers.Add("sortColumnDir", httpContext.Request.Form["order[0][dir]"].FirstOrDefault());
                request.Headers.Add("searchValue", httpContext.Request.Form["search[value]"].FirstOrDefault());
                request.Headers.Add("TeamName", httpContext.Request.Form["columns[1][search][value]"].FirstOrDefault());
                request.Headers.Add("TargetYear", httpContext.Request.Form["columns[2][search][value]"].FirstOrDefault());
                request.Headers.Add("TargetType", httpContext.Request.Form["columns[3][search][value]"].FirstOrDefault());
                request.Headers.Add("TeamTargetToMembersAssign", httpContext.Request.Form["columns[7][search][value]"].FirstOrDefault());
                if (!String.IsNullOrEmpty(httpContext.Session.GetString("authorization")))
                    request.Headers.Add("authorization", httpContext.Session.GetString("authorization"));
                request.Content = new StringContent(content, Encoding.UTF8, "application/json");
                HttpResponseMessage Res = await client.SendAsync(request);
                if (Res.IsSuccessStatusCode)
                {
                    var response = Res.Content.ReadAsStringAsync().Result;
                    var obj = JsonConvert.DeserializeObject<Response>(response);
                    httpContext.Session.SetString("authorization", obj.Token == null ? "" : obj.Token);
                    return response;

                }
                else
                    return null;
            }
        }

        public static async Task<object> CustomHttpForGetAllWithCustomParameters(string BaseUrl, string Url, string content, HttpContext httpContext)
        {
            using (var client = new HttpClient())
            {

                client.BaseAddress = new Uri(BaseUrl);

                client.DefaultRequestHeaders
                      .Accept
                      .Add(new MediaTypeWithQualityHeaderValue("application/json"));

                HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Post, Url);
                request.Headers.Add("draw", httpContext.Request.Form["draw"].FirstOrDefault());
                request.Headers.Add("start", httpContext.Request.Form["start"].FirstOrDefault());
                request.Headers.Add("length", httpContext.Request.Form["length"].FirstOrDefault());
                request.Headers.Add("sortColumn", httpContext.Request.Form["columns[" + httpContext.Request.Form["order[0][column]"].FirstOrDefault() + "][name]"].FirstOrDefault());
                request.Headers.Add("sortColumnDir", httpContext.Request.Form["order[0][dir]"].FirstOrDefault());
                request.Headers.Add("searchValue", httpContext.Request.Form["search[value]"].FirstOrDefault());
                request.Headers.Add("searchByType", httpContext.Request.Form["searchByType"].FirstOrDefault());
                request.Headers.Add("searchData", httpContext.Request.Form["searchData"].FirstOrDefault());
                request.Headers.Add("columnName", httpContext.Request.Form["columnName"].FirstOrDefault());
                if (!String.IsNullOrEmpty(httpContext.Session.GetString("authorization")))
                    request.Headers.Add("authorization", httpContext.Session.GetString("authorization"));
                request.Content = new StringContent(content, Encoding.UTF8, "application/json");
                HttpResponseMessage Res = await client.SendAsync(request);
                if (Res.IsSuccessStatusCode)
                {
                    var response = Res.Content.ReadAsStringAsync().Result;
                    var obj = JsonConvert.DeserializeObject<Response>(response);
                    httpContext.Session.SetString("authorization", obj.Token == null ? "" : obj.Token);
                    return response;

                }
                else
                    return null;
            }
        }



        public static async Task<object> CustomHttpForGetAllRegionLeadsManagementCustomParameters(string BaseUrl, string Url, string content, HttpContext httpContext)
        {
            using (var client = new HttpClient())
            {

                client.BaseAddress = new Uri(BaseUrl);

                client.DefaultRequestHeaders
                      .Accept
                      .Add(new MediaTypeWithQualityHeaderValue("application/json"));

                HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Post, Url);
                request.Headers.Add("draw", httpContext.Request.Form["draw"].FirstOrDefault());
                request.Headers.Add("start", httpContext.Request.Form["start"].FirstOrDefault());
                request.Headers.Add("length", httpContext.Request.Form["length"].FirstOrDefault());
                request.Headers.Add("sortColumn", httpContext.Request.Form["columns[" + httpContext.Request.Form["order[0][column]"].FirstOrDefault() + "][name]"].FirstOrDefault());
                request.Headers.Add("sortColumnDir", httpContext.Request.Form["order[0][dir]"].FirstOrDefault());
                request.Headers.Add("searchValue", httpContext.Request.Form["search[value]"].FirstOrDefault());
                request.Headers.Add("InquiryNo", httpContext.Request.Form["columns[0][search][value]"].FirstOrDefault());
                request.Headers.Add("OpportunityTitle", httpContext.Request.Form["columns[1][search][value]"].FirstOrDefault());
                request.Headers.Add("ReferenceSource", httpContext.Request.Form["columns[2][search][value]"].FirstOrDefault());
                request.Headers.Add("ReferenceSourceChid", httpContext.Request.Form["columns[3][search][value]"].FirstOrDefault());
                request.Headers.Add("ReferenceBy", httpContext.Request.Form["columns[4][search][value]"].FirstOrDefault());
                request.Headers.Add("CustomerName", httpContext.Request.Form["columns[5][search][value]"].FirstOrDefault());
                request.Headers.Add("CustomerEmail", httpContext.Request.Form["columns[6][search][value]"].FirstOrDefault());
                request.Headers.Add("CustomerMobileNo", httpContext.Request.Form["columns[7][search][value]"].FirstOrDefault());
                request.Headers.Add("Company", httpContext.Request.Form["columns[8][search][value]"].FirstOrDefault());
                request.Headers.Add("Team", httpContext.Request.Form["columns[9][search][value]"].FirstOrDefault());
                request.Headers.Add("BranchName", httpContext.Request.Form["columns[10][search][value]"].FirstOrDefault());
                request.Headers.Add("TeamAssignToMemberName", httpContext.Request.Form["columns[11][search][value]"].FirstOrDefault());
                request.Headers.Add("Status", httpContext.Request.Form["columns[12][search][value]"].FirstOrDefault());
                if (!String.IsNullOrEmpty(httpContext.Session.GetString("authorization")))
                    request.Headers.Add("authorization", httpContext.Session.GetString("authorization"));
                request.Content = new StringContent(content, Encoding.UTF8, "application/json");
                HttpResponseMessage Res = await client.SendAsync(request);
                if (Res.IsSuccessStatusCode)
                {
                    var response = Res.Content.ReadAsStringAsync().Result;
                    var obj = JsonConvert.DeserializeObject<Response>(response);
                    httpContext.Session.SetString("authorization", obj.Token == null ? "" : obj.Token);
                    return response;

                }
                else
                    return null;
            }
        }
        public static async Task<object> CustomHttpForGetAllGlobalLeadsManagementCustomParameters(string BaseUrl, string Url, string content, HttpContext httpContext)
        {
            using (var client = new HttpClient())
            {

                client.BaseAddress = new Uri(BaseUrl);

                client.DefaultRequestHeaders
                      .Accept
                      .Add(new MediaTypeWithQualityHeaderValue("application/json"));

                HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Post, Url);
                request.Headers.Add("draw", httpContext.Request.Form["draw"].FirstOrDefault());
                request.Headers.Add("start", httpContext.Request.Form["start"].FirstOrDefault());
                request.Headers.Add("length", httpContext.Request.Form["length"].FirstOrDefault());
                request.Headers.Add("sortColumn", httpContext.Request.Form["columns[" + httpContext.Request.Form["order[0][column]"].FirstOrDefault() + "][name]"].FirstOrDefault());
                request.Headers.Add("sortColumnDir", httpContext.Request.Form["order[0][dir]"].FirstOrDefault());
                request.Headers.Add("searchValue", httpContext.Request.Form["search[value]"].FirstOrDefault());
                request.Headers.Add("InquiryNo", httpContext.Request.Form["columns[0][search][value]"].FirstOrDefault());
                request.Headers.Add("OpportunityTitle", httpContext.Request.Form["columns[1][search][value]"].FirstOrDefault());
                request.Headers.Add("ReferenceSource", httpContext.Request.Form["columns[2][search][value]"].FirstOrDefault());
                request.Headers.Add("ReferenceSourceChid", httpContext.Request.Form["columns[3][search][value]"].FirstOrDefault());
                request.Headers.Add("ReferenceBy", httpContext.Request.Form["columns[4][search][value]"].FirstOrDefault());
                request.Headers.Add("CustomerName", httpContext.Request.Form["columns[5][search][value]"].FirstOrDefault());
                request.Headers.Add("CustomerEmail", httpContext.Request.Form["columns[6][search][value]"].FirstOrDefault());
                request.Headers.Add("CustomerMobileNo", httpContext.Request.Form["columns[7][search][value]"].FirstOrDefault());
                request.Headers.Add("Company", httpContext.Request.Form["columns[8][search][value]"].FirstOrDefault());
                if (!String.IsNullOrEmpty(httpContext.Session.GetString("authorization")))
                    request.Headers.Add("authorization", httpContext.Session.GetString("authorization"));
                request.Content = new StringContent(content, Encoding.UTF8, "application/json");
                HttpResponseMessage Res = await client.SendAsync(request);
                if (Res.IsSuccessStatusCode)
                {
                    var response = Res.Content.ReadAsStringAsync().Result;
                    var obj = JsonConvert.DeserializeObject<Response>(response);
                    httpContext.Session.SetString("authorization", obj.Token == null ? "" : obj.Token);
                    return response;

                }
                else
                    return null;
            }
        }



    }
}
