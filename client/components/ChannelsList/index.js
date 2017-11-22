import React from 'react';
import { Comment } from 'semantic-ui-react';
import { graphql } from 'react-apollo';

import Channel from './Channel';

import { AllChannelsQuery } from '../queries';

const channelsList = [
  {
    id: 1,
    name: 'Bob',
    lastMessage: 'hello',
  },
  {
    id: 2,
    name: 'Jake',
    lastMessage: 'Hola',
  },
];

class ChannelsList extends React.Component {
  render() {
    const { loading, allChannels } = this.props.data;
    if (loading) {
      return null;
    }
    return (
      <Comment.Group style={{ height: '83vh', overflow: 'auto' }}>
        {allChannels.map(channel => <Channel key={`channel-${channel.id}`} channel={channel} />)}
      </Comment.Group>
    );
  }
}

export default graphql(AllChannelsQuery)(ChannelsList);
