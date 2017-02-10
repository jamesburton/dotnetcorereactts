using System.Collections.Generic;
using Microsoft.AspNetCore.SignalR.Hubs;

namespace dotnetcorereactts.SignalR
{
    public interface IChatClient
    {
        [HubMethodName("messageReceived")]
        void MessageReceived(string originatorUser, string message);
        [HubMethodName("getConnectedUsers")]
        void GetConnectedUsers(List<string> connectedUsers);
        [HubMethodName("newUserAdded")]
        void NewUserAdded(string newUser);
        [HubMethodName("info")]
        void Info(string message);
    }
}