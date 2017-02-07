using Microsoft.AspNetCore.SignalR;
using System.Collections.Generic;

namespace dotnetcorereactts.SignalR
{
    public class ChatHub : Hub<IChatClient>, IChatServer
    {
        public static List<string> ConnectedUsers;

        public void Send(string originatorUser, string message)
        {
            Clients.All.MessageReceived(originatorUser, message);
        }

        public void Connect(string newUser)
        {
            if (ConnectedUsers == null)
                ConnectedUsers = new List<string>();

            ConnectedUsers.Add(newUser);
            Clients.Caller.GetConnectedUsers(ConnectedUsers);
            Clients.Others.NewUserAdded(newUser);
        }
    }
}