using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using System.Threading.Tasks;
using Microsoft.AspNet.SignalR.Hubs;

namespace fantastic4collab2.Hubs
{
    [HubName("appHub")]
    public class AppHub : Hub
    {
        public void Send(string name, string message)
        {
            Console.WriteLine("Connection ID: " + Context.ConnectionId);
            // Call the broadcastMessage method to update clients.
            Clients.All.broadcastMessage(name, message);
        }
    }
}