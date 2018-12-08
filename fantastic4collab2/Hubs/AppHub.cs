using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using System.Threading.Tasks;
using Microsoft.AspNet.SignalR.Hubs;
using fantastic4collab2.Models;
using fantastic4collab2.Services;
using fantastic4collab2.model;

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

        public bool CreateGroup(string groupName)
        {
            // Create a new Group in the DB and singleton
            // Once new group is created broadcast
            Singleton thisInstance = Singleton.Instance;

            try
            {
                // Insert group into DB and get the returned groupID so a Group object can be created
                //Group newGroup = new Group(groupID, groupName);
                //thisInstance.AddGroup(newGroup);
                Broadcast();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public bool CreateItem(int groupID, string itemName, string itemContents)
        {
            // Create a new work item in the DB and singleton
            // Once new item is created broadcast
            Singleton thisInstance = Singleton.Instance;

            try
            {
                // Insert item details into DB and get the returned itemID so an Item object can be created
                // Item newItem = new Item(itemID, itemName, itemContents);
                // thisInstance.AddItem(groupID, newItem);
                Broadcast();
                return true;
            }
            catch
            {
                return false;
            }

        }

        public bool LockItem(int itemID)
        {
            // Attempt to lock an item before beginning to edit, if lock fails reject edits
            // Once item is locked broadcast
            return false;
        }

        public bool UnlockItem(int itemID)
        {
            // Release lock on item so that other users can now edit the item
            // Once item is unlocked broadcast
            return false;
        }

        public bool UpdateItem(int groupID, int itemID, string itemName, string itemContent)
        {
            // Update an existing item. Updates can only be made by the user owning the lock
            // Once item is updated, broadcast changes
            Singleton thisInstance = Singleton.Instance;

            if (thisInstance.UpdateItem(groupID, itemID, itemName, itemContent))
            {
                // Item was successfully updated in the singleton, changes should be reflected in the DB
                DB_Update.Upsert(groupID, thisInstance.GetItem(groupID, itemID));
                Broadcast(); // Definition required
                return true;
            }
            else
            {
                // Item was not updated in the singleton. Error handling?
                return false;
            }
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
            if (!currentConnections.Contains(Context.ConnectionId))
            {
                currentConnections.Add(Context.ConnectionId);
            }
            return base.OnReconnected();
        }

        private void Broadcast()
        {
            // Send changes to clients
        }
    }
}