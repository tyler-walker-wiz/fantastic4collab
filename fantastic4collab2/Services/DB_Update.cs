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

        public static void createGroup(Group group)
        {
            SqlConnection myConnection = new SqlConnection(connectionString);
            string name = group.Name;

            string InsertString = "INSERT INTO [Group] VALUES(@name);";
            string GetIdString = "SELECT GroupId FROM Group WHERE name = @name;";

            myConnection.Open();

            SqlCommand MyCommand = new SqlCommand(InsertString, myConnection);
            SqlCommand SelectCommand = new SqlCommand(GetIdString, myConnection);
            MyCommand.Parameters.AddWithValue("@name", name);
            MyCommand.ExecuteScalar();

            group.GroupID = (int)SelectCommand.ExecuteScalar();

            myConnection.Close();
        }

        public static void Upsert(int groupId, Item item)
        {
            SqlConnection sqlConnection = new SqlConnection(connectionString);
            int itemId = item.ItemID;
            string content = item.Content;
            string title = item.Title;

            string UpsertString = "MERGE Item AS [Target] USING (SELECT @ItemId AS itemId, @Title AS title, @Content AS content, @GroupId AS GroupId) AS [Source] ON [Target].itemId = [Source].itemId WHEN MATCHED THEN UPDATE SET [Target].title = @Title, [Target].content = @Content WHEN NOT MATCHED THEN INSERT (Title, Content, GroupId) VALUES (@Title, @Content, 45); SET IDENTITY_INSERT Item OFF";
            string GetIdString = "SELECT ItemId FROM Item WHERE GroupId = @GroupId AND Title = @Title;";

            sqlConnection.Open();

            SqlCommand MyCommand = new SqlCommand(UpsertString) { Connection = sqlConnection };
            SqlCommand SelectCommand = new SqlCommand(GetIdString) { Connection = sqlConnection };
            SelectCommand.Parameters.AddWithValue("@GroupId", groupId);
            SelectCommand.Parameters.AddWithValue("@Title", title);
            MyCommand.Parameters.AddWithValue("@ItemId", itemId);
            MyCommand.Parameters.AddWithValue("@GroupId", groupId);
            MyCommand.Parameters.AddWithValue("@Title", title);
            MyCommand.Parameters.AddWithValue("@Content", content);
            MyCommand.ExecuteScalar();

            item.ItemID = (int)SelectCommand.ExecuteScalar();

            sqlConnection.Close();
        }

    }
}