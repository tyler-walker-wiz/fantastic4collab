using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace fantastic4collab2
{
    public class Connections
    {
        private static List<string> currentConnections = new List<string>();

        public int Count
        {
            get
            {
                return currentConnections.Count;
            }
        }

        public void Add(string connectionId)
        {
            currentConnections.Add(connectionId);
        }

        public List<string> getConnections() {
            return currentConnections;
        }
    }
}