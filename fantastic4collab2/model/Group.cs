using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace fantastic4collab2.model
{
    public class Group
    {
        IList<Item> items;

        public Group(string name)
        {
            this.Name = name;
        }

        string Name
        {
            get => Name;
            set => Name = value;
        }

        public void AddItem(Item item)
        {
            items.Add(item);
        }

        public void RemoveItem(Item item)
        {
            items.Remove(item);
        }
    }
}