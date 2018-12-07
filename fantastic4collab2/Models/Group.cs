using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace fantastic4collab2.model
{
    public class Group
    {
        IDictionary<int, Item> items = new Dictionary<int, Item>();

        private Group()
        {
        }

        public Group(int groupID, string name)
        {
            GroupID = groupID;
            Name = name;
        }

        public Group(int groupID)
        {
            GroupID = groupID;
            Name = "";
        }

        public string Name { get; set; }

        public int GroupID { get; }

        public Item GetItem(int ItemID)
        {
            if (items.ContainsKey(ItemID))
            {
                return items[ItemID];
            }
            return null;
        }

        public void AddItem(Item item)
        {
            items.Add(item.ItemID, item);
        }

        public Boolean Contains(int itemID)
        {
            return items.ContainsKey(itemID);
        }
    }
}