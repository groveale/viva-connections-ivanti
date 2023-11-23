using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace groveale
{
    public static class GetUsersRequests
    {
        [FunctionName("GetUsersRequests")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");

            string usersEmail = req.Query["usersEmail"];

            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            dynamic data = JsonConvert.DeserializeObject(requestBody);
            usersEmail = usersEmail ?? data?.name;

            // Generate a random number between 1 and 3
            int numberOfRequests = new Random().Next(1, 4);
            var requests = RequestHelper.GenerateFrontLineWorkerRequests(numberOfRequests);

            return new OkObjectResult(new { requests, usersEmail});
        }
    }
}
