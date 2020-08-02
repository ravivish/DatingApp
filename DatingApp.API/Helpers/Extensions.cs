using System;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;

namespace DatingApp.API.Helpers
{
    public static class Extensions
    {
        public static void AddApplicationError(this HttpResponse response,string message)
        {
            response.Headers.Add("Application-Error",message);
            response.Headers.Add("Access-Control-Expose-Headers","Application-Error");
            response.Headers.Add("Access-Control-Allow-Origin","*");
        }

        public static void AddPagination(this HttpResponse response,int currentPage,int itemsPerPage,int totalItems,int totalPages)
        {
            var paginatioheader = new PaginationHeader(currentPage,itemsPerPage,totalItems,totalPages);
            var camelCaseFormatter = new JsonSerializerSettings();
            camelCaseFormatter.ContractResolver = new Newtonsoft.Json.Serialization.CamelCasePropertyNamesContractResolver();
            response.Headers.Add("Pagination",JsonConvert.SerializeObject(paginatioheader,camelCaseFormatter));
            response.Headers.Add("Access-Control-Expose-Headers","Pagination");
        }
        public static int CalculateAge(this DateTime dob)
        {
            var age = DateTime.Now.Year - dob.Year;
            if(dob.AddYears(age) > DateTime.Today)
                age--;
                
            return age;
        }
    }
}