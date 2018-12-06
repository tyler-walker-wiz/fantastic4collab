using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using System.Threading.Tasks;
using Microsoft.AspNet.SignalR.Hubs;
using fantastic4collab2.Models;

namespace fantastic4collab2.Hubs
{
    [HubName("appHub")]
    public class AppHub : Hub
    {
        private static List<string> currentConnections = new List<string>();

        public void Send(string name, string message)
        {
            Console.WriteLine("Connection ID: " + Context.ConnectionId);
            // Call the broadcastMessage method to update clients.
            Clients.All.broadcastMessage(name, message);
        }

        public override Task OnConnected()
        {
            currentConnections.Add(Context.ConnectionId);

            Singleton singletonInstance = Singleton.Instance;

            Clients.All.getEverything(singletonInstance.getEverything());

            return base.OnConnected();
        }

        public override Task OnDisconnected(bool stopCalled)
        {
            currentConnections.Remove(Context.ConnectionId);
            return base.OnDisconnected(stopCalled);
        }

        public override Task OnReconnected()
        {
            if (!currentConnections.Contains(Context.ConnectionId)) {
                currentConnections.Add(Context.ConnectionId);
            }
            return base.OnReconnected();
        }
    }
}