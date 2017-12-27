import React from 'react';
import { Comment, Header } from 'semantic-ui-react';

import Channel from './Channel';
import DMessageList from './DMessageList';

class ChannelsList extends React.Component {
  render() {
    const { me: { channels, directMessages } } = this.props;
    console.log(this.props);
    return (
      <div>
        {channels && (
          <Header textAlign="center" size="small" style={{ marginBottom: 0, marginTop: '12px' }}>
            Channels
          </Header>
        )}
        <Comment.Group>
          {channels.map(channel => <Channel key={`channel-${channel.id}`} channel={channel} />)}
        </Comment.Group>
        {directMessages && (
          <Header textAlign="center" size="small" style={{ marginBottom: 0, marginTop: '12px' }}>
            Direct Messages
          </Header>
        )}
        {directMessages && <DMessageList />}
      </div>
    );
  }
}

export default ChannelsList;
