using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace fantastic4collab2.model
{
    public class Group
    {
        public IDictionary<int, Item> items = new Dictionary<int, Item>();

        public Group()
        {
        }

        public Group(string name)
        {
            Name = name;
        }

        public Group(int groupID, string name)
        {
            GroupID = groupID;
            Name = name;
        }

        public string Name { get; set; }

        public int GroupID { get; set; }

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
            items.Add((int) item.ItemID, item);
        }

        public Boolean Contains(int itemID)
        {
            return items.ContainsKey(itemID);
        }
    }
}