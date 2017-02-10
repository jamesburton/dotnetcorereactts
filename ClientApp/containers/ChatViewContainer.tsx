import * as React from 'react';
import ChatView from '../components/ChatView';
import * as ChatStore from '../store/Chat';
import { ApplicationState } from '../store';
import { connect } from 'react-redux';

type ChatViewContainerProps = ChatStore.ChatState & typeof ChatStore.actionCreators;
class ChatViewContainer extends React.Component<ChatViewContainerProps, void> {
    hub: ChatStore.ChatHubProxy;
    //componentWillMount() {}
    componentDidMount() { 
        this.hub = this.props.hub;
        console.log();
    }
    public render() {
        var props = this.props;
        return props.hub 
                ? <ChatView messages={props.messages} users={props.users} 
                    sendMessage={props.sendMessage} name={props.name} setName={props.setName} 
                    connectedUsers={props.connectedUsers} dummy={props.dummy}
                    messageReceived={props.messageReceived} newUserAdded={props.newUserAdded}
                    setHub={null}
                    />
                : <div><em>Please wait, hub loading</em></div>;
    }
}
//export default ChatViewContainer;
export default connect(
    (state:ApplicationState) => state.chat
    , ChatStore.actionCreators
)(ChatViewContainer);