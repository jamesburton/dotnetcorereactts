// / <reference path="../../node_modules/@types/signalr/index.d.ts" />
import { Action, Reducer } from 'redux';
//import * as $ from 'jquery';
import * as $ from 'jquery';
//import {  } from 'signalr';
//import * as SignalR from 'signalr';

//import 'expose-loader?jQuery!jquery';
////import '../node_modules/signalr/jquery.signalR.js';
//import 'ms-signalr-client';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface IChatHubClient {

}
export interface IChatHubServer {

}

export interface ChatHubProxy {
    client: IChatHubClient;
    server: IChatHubServer;
}

/*
var _chatHub: any;
//var _$ = $ as any
var _$ = window ? (window as any).$ : null;
_chatHub = (_$ && _$.connection && _$.connection.chatHub ? _$.connection.chatHub : null) as ChatHubProxy;
console.log('$=', _$);
console.log('$.connection=', _$.connection);
console.log('_chatHub=', _chatHub);
*/
var _chatHub = null;
console.log('$=', $);

export interface ChatState {
    //count: number;
    dummy: boolean;
    chatHub: any;
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.
// Use @typeName and isActionType for type detection that works even after serialization/deserialization.

//interface IncrementCountAction { type: 'INCREMENT_COUNT' }
//interface DecrementCountAction { type: 'DECREMENT_COUNT' }
interface DummyAction { type: 'DUMMY_ACTION' }
interface AnotherDummyAction { type: 'ANOTHER_DUMMY_ACTION' }

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
//type KnownAction = IncrementCountAction | DecrementCountAction;
type KnownAction = DummyAction | AnotherDummyAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    //increment: () => <IncrementCountAction>{ type: 'INCREMENT_COUNT' },
    dummy: () => <DummyAction>{ type: 'DUMMY_ACTION' },
    anotherDummy: () => <AnotherDummyAction>{ type: 'ANOTHER_DUMMY_ACTION' }
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

export const reducer: Reducer<ChatState> = (state: ChatState, action: KnownAction) => {
    switch (action.type) {
        case 'DUMMY_ACTION':
            return Object.assign({}, state, { dummy: true });
        case 'ANOTHER_DUMMY_ACTION':
            //return { dummy: false };
            return Object.assign({}, state, { dummy: false });
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action;
    }

    // For unrecognized actions (or in cases where actions have no effect), must return the existing state
    //  (or default initial state if none was supplied)
    return state || { dummy: false, chatHub: _chatHub };
};
