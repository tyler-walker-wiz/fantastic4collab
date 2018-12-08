using fantastic4collab2.model;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace fantastic4collab2.Services
{
    public class DB_Update
    {
        private static string connectionString = ConfigurationManager.ConnectionStrings["NotesDB"].ConnectionString;

        public static void Upsert(int groupId, Item item)
        {
            SqlConnection sqlConnection = new SqlConnection(connectionString);
            string content = item.Content;
            string title = item.Title;
            int itemId = item.ItemID;

            string UpsertString = "SET IDENTITY_INSERT Item ONMERGE Item AS [Target] USING (SELECT itemId AS itemId, title AS title, content AS content, groupId AS GroupId) AS [Source] ON [Target].itemId = [Source].itemId WHEN MATCHED THEN UPDATE SET [Target].title = @Title, [Target].content = @Content WHEN NOT MATCHED THEN INSERT (ItemId, Title, Content, GroupId) VALUES (@ItemId, @Title, @Content, @GroupId); SET IDENTITY_INSERT Item OFF";

            sqlConnection.Open();

            SqlCommand myCommand = new SqlCommand(UpsertString);
            myCommand.Parameters.AddWithValue("@ItemId", itemId);
            myCommand.Parameters.AddWithValue("@GroupId", groupId);
            myCommand.Parameters.AddWithValue("@Title", title);
            myCommand.Parameters.AddWithValue("@Content", content);
            myCommand.ExecuteScalar();

            sqlConnection.Close();
        }

    }
}