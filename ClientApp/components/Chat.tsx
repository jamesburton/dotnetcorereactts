/// <reference path="../../node_modules/@types/jquery/index.d.ts" />
/// <reference path="../../node_modules/@types/signalr/index.d.ts" />

import * as React from 'react';

//import { connect } from 'react-redux';
//import { ApplicationState }  from '../store';

//type ChatProps = ChatStore.ChatState & typeof ChatStore.actionCreators;
//class Chat extends React.Component<CgatProps, void> {
class Chat extends React.Component<void, void> {
    //componentWillMount() {}
    componentDidMount() { 
        //if(alert) alert('Chat mounted');
        console.debug('Chat mounted');
    }
    public render() {
        return <div>
            <h1>Chat</h1>

            <p>This will be replaced with a SignalR Chat example</p>
        </div>;
    }
}

/*
export default connect(
    (state: ApplicationState) => state.chat,    // Selects which state properties are merged into the component's props
    CounterStore.actionCreators                 // Selects which action creators are merged into the component's props
)(Counter);
*/
export default Chat;

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