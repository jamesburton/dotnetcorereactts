/// <reference path="./store/Chat.ts" />
declare var $:JQueryStatic;
(window as any).$ = (window as any).jQuery = $;
require('ms-signalr-client');

//declare var $connection:SignalR;
(window as any).$connection = $.connection
console.log('boot-client has set window.$connection: ', (window as any).$connection);

//alert($.hubConnection());
var connection = $.hubConnection();
var chatHubProxy = connection.createHubProxy('chatHub');
chatHubProxy.on('messageReceived', function(originatorUser, message){
    alert(originatorUser + ':\r\n\r\n' + message);
});
connection.start().done(function(){
    chatHubProxy.invoke('send', 'Test User', 'This is a dummy message');
});

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
//import { ChatHubProxy } from './store/Chat';

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
