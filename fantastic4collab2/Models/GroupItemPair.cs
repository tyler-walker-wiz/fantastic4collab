using fantastic4collab2.model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace fantastic4collab2.Models
{
    public class GroupItemPair
    {
        public GroupItemPair(Item item, Group group)
        {
            this.ItemName = item.Title;
            this.ItemContent = item.Content;
            this.ItemID = item.ItemID;
            this.ItemLocked = item.Locked;
            this.GroupName = group.Name;
            this.GroupID = group.GroupID;
        }

        public string ItemName { get; private set; }
        public string ItemContent { get; private set; }
        public int ItemID { get; private set; }
        public bool ItemLocked { get; private set; }
        public string GroupName { get; private set; }
        public int GroupID { get; private set; }
    }
}