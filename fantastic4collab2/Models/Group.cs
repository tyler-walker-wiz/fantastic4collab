using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace fantastic4collab2.model
{
    public class Group
    {
        IDictionary<int, Item> items;
        
        public Group()
        {
            this.Name = null;
            this.items = new Dictionary<int, Item>();
        }

        public Group(string name)
        {
            this.Name = name;
            this.items = new Dictionary<int, Item>();
        }

        public string Name
        {
            get => Name;
            set => Name = value;
        }

        public int GroupID
        {
            get => GroupID;
            private set => GroupID = value;
        }

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