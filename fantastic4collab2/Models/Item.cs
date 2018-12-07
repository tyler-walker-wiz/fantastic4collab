using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace fantastic4collab2.model
{
    public class Item
    {
        private Item()
        {
        }

        public Item(int itemID, string title, string content)
        {
            ItemID = itemID;
            Title = title;
            Content = content;
            Locked = false;
        }

        public Item(int itemID, string title)
        {
            ItemID = itemID;
            Title = title;
            Content = null;
            Locked = false;
        }

        public int ItemID { get; }

        public string Title { get; set; }
        

        public string Content { get; set; }

        public bool Locked { get; set; }
    }
}