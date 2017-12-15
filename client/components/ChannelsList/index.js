import React from 'react';
import { Comment } from 'semantic-ui-react';

import Channel from './Channel';

class ChannelsList extends React.Component {
  render() {
    const { channels } = this.props;

    return (
      <Comment.Group>
        {channels.map(channel => <Channel key={`channel-${channel.id}`} channel={channel} />)}
      </Comment.Group>
    );
  }
}

export default ChannelsList;
