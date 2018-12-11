using fantastic4collab2.model;
using Newtonsoft.Json;

namespace fantastic4collab2.Models
{
    public class GroupItemPair
    {
        public GroupItemPair(Item item, Group group)
        {
            this.Name = item.Title;
            this.Content = item.Content;
            this.Id = item.ItemID;
            this.Locked = item.Locked;
            this.GroupName = group.Name;
            this.GroupId = group.GroupID;
        }

        [JsonProperty("name")]
        public string Name { get; private set; }
        [JsonProperty("content")]
        public string Content { get; private set; }
        [JsonProperty("id")]
        public int Id { get; private set; }
        [JsonProperty("locked")]
        public bool Locked { get; private set; }
        [JsonProperty("groupName")]
        public string GroupName { get; private set; }
        [JsonProperty("groupId")]
        public int GroupId { get; private set; }
    }
}