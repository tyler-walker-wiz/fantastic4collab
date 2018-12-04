using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace fantastic4collab2.Services
{
    public class DB_Update
    {
        public static void UpdateItem(string title, string content, string id)
        {
            string InsertString = "UPDATE Item SET Title = @Title, Content = @Content WHERE ItemId = @ItemId";

            SqlCommand myCommand = new SqlCommand(InsertString);

            myCommand.Parameters.AddWithValue("@Title", title);
            myCommand.Parameters.AddWithValue("@Content", content);

            myCommand.ExecuteScalar();
        }
    }
}