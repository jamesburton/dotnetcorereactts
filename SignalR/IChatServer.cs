namespace dotnetcorereactts.SignalR
{
    public interface IChatServer
    {
        void Send(string originatorUser, string message);
        void Connect(string newUser);
        void GetConnectedUsers();
    }
}