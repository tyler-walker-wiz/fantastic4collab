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
            sqlConnection.Open();

            SqlCommand cmd = sqlConnection.CreateCommand();
            SqlTransaction transaction = sqlConnection.BeginTransaction();
            cmd.Connection = sqlConnection;
            cmd.Transaction = transaction;

            try
            {
                if (item.ItemID == null)
                {
                    cmd.CommandText = "INSERT INTO [Item] VALUES (@Title, @Content, @GroupID); SELECT SCOPE_IDENTITY()";

                    cmd.Parameters.AddWithValue("@Title", item.Title);
                    cmd.Parameters.AddWithValue("@Content", item.Content);
                    cmd.Parameters.AddWithValue("@GroupID", groupId);

                    Object ret = cmd.ExecuteScalar();
                    item.ItemID = Convert.ToInt32(ret);
                }
                else
                {
                    cmd.CommandText = "UPDATE [Item] SET Title = @Title, Content = @Content WHERE ItemId = @ItemId AND GroupId = @GroupId";

                    cmd.Parameters.AddWithValue("@Title", item.Title);
                    cmd.Parameters.AddWithValue("@Content", item.Content);
                    cmd.Parameters.AddWithValue("@ItemId", item.ItemID);
                    cmd.Parameters.AddWithValue("@GroupId", groupId);

                    cmd.ExecuteNonQuery();
                }
                transaction.Commit();
            }
            catch (Exception ex)
            {

                try
                {
                    transaction.Rollback();
                }
                catch (Exception ex2)
                {

                    throw ex2;
                }
                finally
                {
                    throw ex;
                }
            }

            sqlConnection.Close();
        }

    }
}