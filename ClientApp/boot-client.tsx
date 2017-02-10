/// <reference path="./store/Chat.ts" />
declare var $:JQueryStatic;
(window as any).$ = (window as any).jQuery = $;
require('ms-signalr-client');

/*
(window as any).$connection = $.connection
console.log('boot-client has set window.$connection: ', (window as any).$connection);

//alert($.hubConnection());
var connection = $.hubConnection();
var chatHubProxy = connection.createHubProxy('chatHub');
chatHubProxy.on('messageReceived', function(originatorUser, message){
    console.debug('boot-client.tsx:- messageReceived, originatorUser=', originatorUser, ', message=', message);
    alert(originatorUser + ':\r\n\r\n' + message);
});
connection.start().done(function(){
    chatHubProxy.invoke('send', 'Test User', 'This is a dummy message');
});
import { ChatHubProxy } from './store/Chat';
var chatHub:ChatHubProxy = null;
try {
    chatHub = ($.connection as any).chatHub as ChatHubProxy;
    console.log('boot-client.tsx:- chatHub=', chatHub);
    //reducers.chat
} catch(e) {
    console.error('boot-client.tsx:- Failed to get ChatHubProxy.\r\ne=', e);
}
*/

import './css/site.css';
import 'bootstrap';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { browserHistory, Router } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import routes from './routes';
import configureStore from './configureStore';
import { ApplicationState }  from './store';
import { ChatHubProxy, actionCreators as chat } from './store/Chat';

// Get the application-wide store instance, prepopulating with state from the server where available.
const initialState = (window as any).initialReduxState as ApplicationState;
const store = configureStore(initialState);
const history = syncHistoryWithStore(browserHistory, store);

// This code starts up the React app when it runs in a browser. It sets up the routing configuration
// and injects the app into a DOM element.
ReactDOM.render(
    <Provider store={ store }>
        <Router history={ history } children={ routes } />
    </Provider>,
    document.getElementById('react-app')
);

declare var signalRHubUrl:string;
$.getScript(signalRHubUrl, (data, status, xhr) => {
    //console.log('Got script from signalRHubUrl: url=', signalRHubUrl, ', data=', data, ', status=', status);
    console.log('*Loaded SignalR Hub script*');

    // Get chatHub proxy object
    var hub = ($.connection as any).chatHub;

    // Stash dispatch method for SignalR calls
    hub.client.dispatch = store.dispatch;

    // *** Add ChatHub proxy routines
    hub.client.messageReceived = (originatorUser:string, message:string) => { 
        console.log('boot-client.tsx default handler for SignalR chatHub.client.messageReceived:\r\noriginatorUser=', originatorUser, '\r\nmessage=', message); 
        hub.client.dispatch(chat.messageReceived(originatorUser, message)) 
    };
    hub.client.getConnectedUsers = (connectedUsers:string[]) => { 
        console.log('boot-client.tsx default handler for SignalR chatHub.client.getConnectedUsers:\r\nconnectedUsers=', connectedUsers); 
        hub.client.dispatch(chat.connectedUsers(connectedUsers)); 
    };
    hub.client.newUserAdded = (newUser:string) => { 
        console.log('boot-client.tsx default handler for SignalR chatHub.client.newUserAdded:\r\nnewUser=', newUser); 
        hub.client.dispatch(chat.newUserAdded(newUser)); 
    };
    hub.client.info = (message:string) => { 
        hub.client.messageReceived('***', '<em>' + message + '</em>'); 
    }

    // Dispatch a call to add the hub to the chat state
    store.dispatch(chat.setHub(hub));

    // *** Add other hub proxies here if required
    // ***

    // Connect SignalR
    $.connection.hub.start().done(() => {
        // *** ChatHub Initialisation

        // Display ChatHub server methods
        for(var fn in hub.server) {
            if(typeof fn === 'function') {
                console.log('Found server method: ', fn);
            }
        }
        // Show that we are connected
        //var user = "Example User";
        var user = prompt("What is your name?", "Example User");
        store.dispatch(chat.setName(user));
        hub.server.connect(user || "Unnamed");
        hub.server.send(user, 'Hello');
        hub.server.getConnectedUsers();

        // *** Add other hub initialisation routines ehre if required

        // ***
        console.log('SignalR connected and initialisation completed');
    });

});
