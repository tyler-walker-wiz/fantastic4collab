using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace fantastic4collab2.model
{
    public class Item
    {
        public Item(string title, string content)
        {
            this.Title = title;
            this.Content = content;
            this.Locked = false;
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