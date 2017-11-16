import React from 'react';
import { graphql } from 'react-apollo';

import { ChannelMessagesQuery } from '../queries';

class MessagesList extends React.Component {
  render() {
    const { channelId, data: { loading, channelMessages } } = this.props;
    return loading ? (
      <div />
    ) : (
      <div>
        <ul>
          {channelMessages.map(message => <li key={`message-${message.id}`}>{message.text}</li>)}
        </ul>
      </div>
    );
  }
}

export default graphql(ChannelMessagesQuery, {
  options: ({ channelId }) => ({
    variables: {
      channelId,
    },
    fetchPolicy: 'network-only',
  }),
})(MessagesList);
