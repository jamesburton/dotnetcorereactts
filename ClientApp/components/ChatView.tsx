import * as React from 'react';
//import { Link } from 'react-router';
//import { connect } from 'react-redux';
//import { ApplicationState }  from '../store';
import * as ChatStore from '../store/Chat';

type ChatViewProps = ChatStore.ChatState & typeof ChatStore.actionCreators;
class ChatView extends React.Component<ChatViewProps, void> {
    messageInput: any;
    render() {
        var props = this.props;
        console.log('props=', props , ', users: ', props.users);
        return <div>
            <h3>[ChatView]</h3>
            <div>
                <div>
                    <h5>Connected Users</h5>
                    <ul>
                        { props.users
                            ? props.users.map(user => <li key={user}>{user}</li>)
                            : <li key="">[None?]</li>
                        }
                    </ul>
                </div>
                <div>
                    <h5>Messages</h5>
                </div>
            </div>
            <div>
                <h5>New Mesage</h5>
                <input ref={input => this.messageInput=input} />
                <button onClick={ () => alert('To be written') }>Send</button>
            </div>
        </div>;
    }
}
export default ChatView;