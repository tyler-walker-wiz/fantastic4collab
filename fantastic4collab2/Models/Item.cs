using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace fantastic4collab2.model
{
    public class Item
    {
        public Item() {
            // On object construction, upset
            // If insert, return ID and set.
            this.Locked = false;
        }

        public Item(string title, string content)
        {
            this.Title = title;
            this.Content = content;
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