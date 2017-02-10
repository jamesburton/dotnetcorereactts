using Microsoft.AspNetCore.SignalR;
using System.Collections.Generic;
using System;

namespace dotnetcorereactts.SignalR
{
    public class ChatHub : Hub<IChatClient>, IChatServer
    {
        public static List<string> ConnectedUsers;

        public void Send(string originatorUser, string message)
        {
            Clients.All.MessageReceived(originatorUser, message);
        }

        public void GetConnectedUsers() {
            Clients.Caller.GetConnectedUsers(ConnectedUsers);
        }

        public void Connect(string newUser)
        {
            if (ConnectedUsers == null)
                ConnectedUsers = new List<string>();

            Clients.Caller.GetConnectedUsers(ConnectedUsers);
            if(!ConnectedUsers.Contains(newUser))
            {
                ConnectedUsers.Add(newUser);
                Clients.Others.NewUserAdded(newUser);
            } else {
                Clients.Others.Info($"{newUser} (re-)connected @ {DateTime.Now}");
            }
            Clients.Caller.Info($"Connected @ {DateTime.Now}");
        }
    }
}