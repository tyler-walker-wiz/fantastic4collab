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

        public bool CreateGroup(string groupName)
        {
            // Create a new Group in the DB and singleton
            // Once new group is created broadcast
            Singleton thisInstance = Singleton.Instance;

            try
            {
                // Insert group into DB and get the returned groupID so a Group object can be created
                Group newGroup = new Group(groupName);
                DB_Update.createGroup(newGroup);
                thisInstance.AddGroup(newGroup);
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
            // Once new item is created and broadcasted
            Singleton thisInstance = Singleton.Instance;

            try
            {
                // Insert item details into DB and get the returned itemID so an Item object can be created
                Item newItem = new Item(itemName, itemContents);
                DB_Update.Upsert(groupID, newItem);
                thisInstance.AddItem(groupID, newItem);
                Broadcast();
                return true;
            }
            catch (Exception e)
            {
                throw e;
            }

        }

        public bool LockItem(int itemID)
        {
            Singleton thisInstance = Singleton.Instance;
            // Attempt to lock an item before beginning to edit, if lock fails reject edits
            // Once item is locked broadcast
            var isLocked = thisInstance.getLockedItems().FirstOrDefault(i => i.Value == itemID);
            if ((isLocked.Value == itemID && isLocked.Key == Context.ConnectionId) || isLocked.Value != itemID)
            {
                if (isLocked.Value != itemID)
                {
                    thisInstance.addLockedItem(Context.ConnectionId, itemID);
                    Broadcast();
                }

                return true;
            }
            else
            {
                return false;
            }
        }

        public bool UnlockItem(int itemID)
        {
            Singleton thisInstance = Singleton.Instance;
            // Release lock on item so that other users can now edit the item
            // Once item is unlocked broadcast
            if (thisInstance.getLockedItems().ContainsKey(Context.ConnectionId) || thisInstance.getLockedItems().Values.Contains(itemID))
            {
                thisInstance.removeLockedItem(Context.ConnectionId, itemID);
                Broadcast();
                return true;
            }
            else
            {
                return false;
            }
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
                Broadcast();
                return true;
            }
            else
            {
                // Item was not updated in the singleton. Error handling?
                return false;
            }
        }

        public void update()
        {
            Broadcast();
        }

        public override Task OnConnected()
        {
            currentConnections.Add(Context.ConnectionId);

            Broadcast();
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
            Broadcast();
            return base.OnReconnected();
        }

        private void Broadcast()
        {
            Singleton thisInstance = Singleton.Instance;
            Clients.All.getEverything(thisInstance.getEverything());
        }
    }
}