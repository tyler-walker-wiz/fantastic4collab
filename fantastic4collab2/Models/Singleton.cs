using fantastic4collab2.model;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace fantastic4collab2.Models
{
    public sealed class Singleton
    {
        private static volatile Singleton instance;
        private static object mutex = new Object();
        private static IDictionary<int, Group> itemCollection;
        private static string connectionString = ConfigurationManager.ConnectionStrings["NotesDB"].ConnectionString;
        private static IDictionary<string, int> lockedItems;

        private Singleton()
        {
            itemCollection = new Dictionary<int, Group>();
            lockedItems = new Dictionary<string, int>();

            using (SqlConnection sqlConnection = new SqlConnection(connectionString))
            {
                sqlConnection.Open();

                string getAllExistingNotesQueryString = "select g.groupid, groupname, itemid, title, content from [Group] g join [Item] i on g.groupid = i.groupid";
                SqlCommand cmd = new SqlCommand(getAllExistingNotesQueryString, sqlConnection);
                SqlDataReader reader = cmd.ExecuteReader();

                try
                {
                    while (reader.Read())
                    {
                        int? groupID = reader["groupid"] as int?;
                        string groupName = reader.GetString(1);
                        int? itemID = reader["itemid"] as int?;
                        string itemTitle = reader.GetString(3);
                        string itemContent = reader.GetString(4);

                        AddItem(new Group((int)groupID, groupName), new Item((int)itemID, itemTitle, itemContent));
                    }
                }
                catch (Exception e)
                {
                    throw e;
                }
                finally
                {
                    reader.Close();
                }

                sqlConnection.Close();
            }
        }

        public static Singleton Instance
        {
            get
            {
                if (instance == null)
                {
                    lock (mutex)
                    {
                        if (instance == null)
                        {
                            instance = new Singleton();
                        }
                    }
                }

                return instance;

            }
        }

        public Group GetGroup(int groupID)
        {
            if (itemCollection.ContainsKey(groupID))
            {
                return itemCollection[groupID];
            }

            return null;
        }

        public Item GetItem(int groupID, int itemID)
        {
            if (itemCollection.ContainsKey(groupID))
            {
                if (itemCollection[groupID].Contains(itemID))
                {
                    return itemCollection[groupID].GetItem(itemID);
                }
            }

            return null;
        }

        public void AddGroup(Group group)
        {
            itemCollection.Add(group.GroupID, group);
        }

        public void AddItem(int groupID, Item item)
        {
            if (!itemCollection.ContainsKey(groupID))
            {
                Group group = new Group();
                AddGroup(group);
            }

            itemCollection[groupID].AddItem(item);
        }

        public void AddItem(Group group, Item item)
        {
            if (!itemCollection.ContainsKey(group.GroupID))
            {
                AddGroup(group);
            }

            AddItem(group.GroupID, item);
        }

        public GroupItemPair[] getEverything()
        {
            List<GroupItemPair> returnList = new List<GroupItemPair>();

            foreach (var group in itemCollection.Values)
            {
                foreach (var item in group.items.Values)
                {
                    returnList.Add(new GroupItemPair(item, group));
                }
            }

            return returnList.ToArray();
        }

        public IDictionary<string, int> getLockedItems()
        {
            return lockedItems;
        }

        public void addLockedItem(string connectionId, int itemId)
        {
            if (!lockedItems.ContainsKey(connectionId) || lockedItems.Values.Contains(itemId))
            {
                lock (mutex)
                {
                    lockedItems.Add(connectionId, itemId);
                    var group = itemCollection.FirstOrDefault(i => i.Value != null && i.Value.items.Count > 0 && i.Value.items.Values.Any(v => v.ItemID == itemId));
                    if (group.Value != null)
                    {
                        var item = GetItem(group.Key, itemId);
                        item.Locked = true;
                    }

                }
            }
        }

        public void removeLockedItem(string connectionId, int itemId)
        {
            if (lockedItems.ContainsKey(connectionId) || lockedItems.Values.Contains(itemId))
            {
                lock (mutex)
                {
                    lockedItems.Remove(connectionId);
                    var group = itemCollection.FirstOrDefault(i => i.Value != null && i.Value.items.Count > 0 && i.Value.items.Values.Any(v => v.ItemID == itemId));
                    if (group.Value != null)
                    {
                        var item = GetItem(group.Key, itemId);
                        item.Locked = false;
                    }
                }
            }
        }

        public bool UpdateItem(int groupID, int itemID, string itemName, string itemContent, bool? locked = null)
        {
            Item theItem = GetItem(groupID, itemID);

            if (theItem != null)
            {
                theItem.Title = itemName;
                theItem.Content = itemContent;
                if (locked.HasValue)
                    theItem.Locked = locked.GetValueOrDefault();
                return true;
            }

            return false;
        }
    }
}