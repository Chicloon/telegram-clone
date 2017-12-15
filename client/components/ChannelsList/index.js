import React from 'react';
import { Comment } from 'semantic-ui-react';
import { graphql } from 'react-apollo';

import Channel from './Channel';

import { UserChannelsQuery } from '../queries';

class ChannelsList extends React.Component {
  render() {
    const { channels, data: { loading, userChannels } } = this.props;

    if (loading) {
      return null;
    }
    return (
      <Comment.Group>
        {channels.map(channel => <Channel key={`channel-${channel.id}`} channel={channel} />)}
      </Comment.Group>
    );
  }
}

export default graphql(UserChannelsQuery, {
  options: {
    fetchPolicy: 'network-only',
  },
})(ChannelsList);
