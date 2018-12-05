using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace fantastic4collab2.model
{
    public class Item
    {
        private Item() {
        }

        public Item(int itemID, string title, string content)
        {
            this.ItemID = itemID;
            this.Title = title;
            this.Content = content;
            this.Locked = false;
        }

        public Item(int itemID, string title)
        {
            this.ItemID = itemID;
            this.Title = title;
            this.Content = null;
            this.Locked = false;
        }

        public int ItemID
        {
            get => ItemID;
            private set => ItemID = value;
        }

        public string Title
        {
            get => Title;
            set => Title = value;
        }

        public string Content
        {
            get => Content;
            set => Content = value;
        }

        public bool Locked
        {
            get => Locked;
            set => Locked = value;
        }        
    }
}