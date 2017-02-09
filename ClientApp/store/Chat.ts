/// <reference path="../../node_modules/@types/jquery/index.d.ts" />
/// <reference path="../../node_modules/@types/signalr/index.d.ts" />
import { Action, Reducer } from 'redux';

//export var $connection : SignalR = null;
if(typeof window !== 'undefined' && window && window['$']) {
    console.log('Chat.ts:- $=', window['$']);
    (window as any).$connection = null as SignalR;
}


//declare var $connection : SignalR;
//console.log('$connection=', typeof $connection === 'undefined' ? 'undefined' : $connection);
//console.log('window.$connection=', typeof window === 'undefined' ? 'window undefined' : typeof (window as any).$connection === 'undefined' ? 'undefined' : (window as any).$connection);

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

//declare var $:JQueryStatic;
//var _chatHub = typeof $ !== 'undefined' ? $.connection ? ($.connection as any).chatHub as ChatHubProxy : 'No connection' : 'No jQuery';
var _chatHub = null;
console.log(_chatHub);

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
