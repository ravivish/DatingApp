using System;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;

namespace DatingApp.API.Helpers
{
    public static class Extensions
    {
        public static void AddApplicationError(this HttpResponse response,string message)
        {
            response.Headers.Append("Application-Error",message);
            response.Headers.Append("Access-Control-Expose-Headers","Application-Error");
            response.Headers.Append("Access-Control-Allow-Origin","*");
        }

        public static void AddPagination(this HttpResponse response,int currentPage,int itemsPerPage,int totalItems,int totalPages)
        {
            var paginatioheader = new PaginationHeader(currentPage,itemsPerPage,totalItems,totalPages);
            var camelCaseFormatter = new JsonSerializerSettings
            {
                ContractResolver = new Newtonsoft.Json.Serialization.CamelCasePropertyNamesContractResolver()
            };
            response.Headers.Append("Pagination",JsonConvert.SerializeObject(paginatioheader,camelCaseFormatter));
            response.Headers.Append("Access-Control-Expose-Headers","Pagination");
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