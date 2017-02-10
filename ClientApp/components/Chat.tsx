/// <reference path="../../node_modules/@types/jquery/index.d.ts" />
/// <reference path="../../node_modules/@types/signalr/index.d.ts" />

import * as React from 'react';
//import { Link } from 'react-router';
import { connect } from 'react-redux';
import { ApplicationState }  from '../store';
import * as ChatStore from '../store/Chat';
//import * as WeatherForecasts from '../store/WeatherForecasts';
import ChatView from './ChatView';

type ChatProps = ChatStore.ChatState & typeof ChatStore.actionCreators;
class Chat extends React.Component<ChatProps, void> {
//class Chat extends React.Component<void, void> {
    //componentWillMount() {}
    componentDidMount() { 
        //if(alert) alert('Chat mounted');
        //console.debug('Chat mounted');
        //console.debug('Chat mounted: this=', this);
    }
    public render() {
        var props = this.props;
        return <div>
            <h1>Chat</h1>

            <p>This will be replaced with a SignalR Chat example.</p>

            { props.hub 
                //? <ChatView hub={props.hub} />
                ? <ChatView {...props} />
                : <div><em>Please wait, hub loading</em></div>
            }
        </div>;
    }
}

//*
export default connect(
    (state: ApplicationState) => state.chat,    // Selects which state properties are merged into the component's props
    ChatStore.actionCreators                 // Selects which action creators are merged into the component's props
)(Chat);
//*/
//export default Chat;

/*

import * as React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { ApplicationState }  from '../store';
import * as CounterStore from '../store/Counter';
import * as WeatherForecasts from '../store/WeatherForecasts';

type CounterProps = CounterStore.CounterState & typeof CounterStore.actionCreators;

class Counter extends React.Component<CounterProps, void> {
    public render() {
        return <div>
            <h1>Counter</h1>

            <p>This is a simple example of a React component.</p>

            <p>Current count: <strong>{ this.props.count }</strong></p>

            <button onClick={ () => { this.props.increment() } }>Increment</button>
        </div>;
    }
}

// Wire up the React component to the Redux store
export default connect(
    (state: ApplicationState) => state.counter, // Selects which state properties are merged into the component's props
    CounterStore.actionCreators                 // Selects which action creators are merged into the component's props
)(Counter);

*/