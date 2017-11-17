import React from 'react';
import { graphql } from 'react-apollo';

import { ChannelMessagesQuery } from '../queries';

const MessagesList = ({ data: { loading, channelMessages } }) =>
  (loading ? (
    <div />
  ) : (
    <div>
      <ul>
        {channelMessages.map(message => <li key={`message-${message.id}`}>{message.text}</li>)}
      </ul>
    </div>
  ));

export default graphql(ChannelMessagesQuery, {
  options: ({ channelId }) => ({
    variables: {
      channelId,
    },
    // fetchPolicy: 'network-only',
  }),
})(MessagesList);
