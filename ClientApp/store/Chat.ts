/// <reference path="../../node_modules/@types/jquery/index.d.ts" />
/// <reference path="../../node_modules/@types/signalr/index.d.ts" />
import { Action, Reducer } from 'redux';
import * as uuid from 'node-uuid';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface IChatHubClient {
    messageReceived: (originatorUser:string, message:string) => void;
    connectedUsers: (users:string[]) => void;
    newUser: (newUser:string) => void;
    setName: (name:string) => void;
}
export interface IChatHubServer {
    send: (originatorUser:string, message: string) => void;
    connect: (newUser:string) => void;
}

export interface ChatHubProxy {
    client: IChatHubClient;
    server: IChatHubServer;
}

export interface IChatMessage {
    originatorUser: string;
    message: string;
    id?: string;
}

export interface ChatState {
    //count: number;
    dummy: boolean;
    hub?: any;
    users: string[];
    messages: IChatMessage[];
    name?: string;
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.
// Use @typeName and isActionType for type detection that works even after serialization/deserialization.

interface SetHubAction { type: 'SET_HUB', hub: ChatHubProxy }
interface MessageReceivedAction { type: 'MESSAGE_RECEIVED', originatorUser: string, message: string }
interface ConnectedUsersAction { type: 'CONNECTED_USERS', users: string[] }
interface NewUserAddedAction { type: 'NEW_USER_ADDED', newUser: string }
interface SetNameAction { type: 'SET_NAME', name: string }
interface SendMessageAction { type: 'SEND_MESSAGE', message: string}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
//type KnownAction = DummyAction | AnotherDummyAction | SetHubAction;
type KnownAction = SetHubAction | MessageReceivedAction | ConnectedUsersAction | NewUserAddedAction | SetNameAction | SendMessageAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    //dummy: () => <DummyAction>{ type: 'DUMMY_ACTION' },
    //anotherDummy: () => <AnotherDummyAction>{ type: 'ANOTHER_DUMMY_ACTION' },
    setHub: (hub) => <SetHubAction>{ type: 'SET_HUB', hub }
    , messageReceived: (originatorUser:string, message:string) => <MessageReceivedAction>{ type: 'MESSAGE_RECEIVED', originatorUser, message }
    , connectedUsers: (users:string[]) => <ConnectedUsersAction>{ type: 'CONNECTED_USERS', users }
    , newUserAdded: (newUser:string) => <NewUserAddedAction>{ type: 'NEW_USER_ADDED', newUser }
    , setName: (name:string) => <SetNameAction>{ type: 'SET_NAME', name }
    , sendMessage: (message:string) => <SendMessageAction>{ type: 'SEND_MESSAGE', message }
}

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

export const reducer: Reducer<ChatState> = (state: ChatState, action: KnownAction) => {
    switch (action.type) {
        case 'SET_HUB':
            //console.log('SET_HUB: action.hub=', action.hub);
            return Object.assign({}, state, { hub: action.hub });
        case 'MESSAGE_RECEIVED':
            //console.log('MESSAGE_RECEIVED: user=', action.originatorUser, ', message=', action.message);
            let message = {
                originatorUser: action.originatorUser, 
                message: action.message,
                id: uuid.v1()
            };
            //console.log('MESSAGE_RECEIVED: ', message);
            //let messages = [...state.messages, message];
            let messages = [message, ...state.messages];
            console.log('MESSAGE_RECEIVED: ', messages);
            return Object.assign({}, state, { messages: messages });
        case 'CONNECTED_USERS':
            console.log('CONNECTED_USERS: action.users=', action.users);
            return Object.assign({}, state, { users: action.users });
        case 'NEW_USER_ADDED':
            //return Object.assign({}, state, { users: [...state.users, {action.newUser}]});
            return Object.assign({}, state);
            //return Object.assign({}, state, { users: [action.newUser, ...state.users] });
        case 'SET_NAME':
            return Object.assign({}, state, { name: action.name });
        case 'SEND_MESSAGE':
            if(!state.hub) {
                console.warn('Chat.ts:- SEND_MESSAGE, no hub');
            } else if(!state.name) {
                console.warn('No name, so blocking message ... please set name to continue');
            } else {
                console.debug('Sending message via SignalR: name=', state.name, ', message=', action.message);
                state.hub.server.send(state.name, action.message);
            }
            return state;
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action;
    }

    // For unrecognized actions (or in cases where actions have no effect), must return the existing state
    //  (or default initial state if none was supplied)
    return state || { dummy: false, messages: [], users: [] };
};
