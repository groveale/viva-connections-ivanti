using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Newtonsoft.Json;

namespace groveale
{
    public class RequestHelper
    {       
        public static List<Request> GenerateFrontLineWorkerRequests(int numberOfRequests)
        {
            List<Request> requests = new List<Request>();

            for (int i = 1; i <= numberOfRequests; i++)
            {
                requests.Add(new Request
                {
                    Number = "REQ00" + GenerateRandomNumber(i, 11111, 99999).ToString(),
                    ShortDescription = GenerateRandomDescription(),
                    CallerId = GenerateRandomCallerId(),
                    SysUpdatedOn = DateTime.Now.AddDays(-i),
                    Category = GenerateRandomCategory(),
                    Urgency = GenerateRandomUrgency(),
                    LastUpdatedString = GenerateRandomLastUpdatedString()
                });
            }

            return requests;
        }

        static int GenerateRandomNumber(int seed, int minValue, int maxValue)
        {
            Random random = new Random(seed);
            return random.Next(minValue, maxValue);
        }

        static string GenerateRandomDescription()
        {
            string[] descriptions = { "Request for new equipment", "Uniform replacement", "Supplies restock", "Equipment repair", "New signage request" };
            return descriptions[new Random().Next(descriptions.Length)];
        }

        static string GenerateRandomCallerId()
        {
            string[] callerIds = { "manager1@example.com", "cashier2@example.com", "stock_clerk3@example.com", "dept_manager@example.com", "employee1@example.com" };
            return callerIds[new Random().Next(callerIds.Length)];
        }

        static string GenerateRandomCategory()
        {
            string[] categories = { "Equipment", "Uniform", "Supplies", "Security", "Cleaning" };
            return categories[new Random().Next(categories.Length)];
        }

        static string GenerateRandomUrgency()
        {
            string[] urgencies = { "High", "Medium", "Low" };
            return urgencies[new Random().Next(urgencies.Length)];
        }

        static string GenerateRandomLastUpdatedString()
        {
            int minutesAgo = new Random().Next(1, 120);
            return $"{minutesAgo} minutes ago";
        }
    }

    public class Request
    {
        public string Number { get; set; }
        public string ShortDescription { get; set; }
        public string CallerId { get; set; }
        public DateTime SysUpdatedOn { get; set; }
        public string Category { get; set; }
        public string Urgency { get; set; }
        public string LastUpdatedString { get; set; }
    }
}