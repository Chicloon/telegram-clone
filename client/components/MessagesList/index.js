import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import { Comment } from 'semantic-ui-react';

import { ChannelMessagesQuery } from '../queries';
import Message from './Message';

const newChannelMessageSubscription = gql`
  subscription($channelId: Int!) {
    newChannelMessage(channelId: $channelId) {
      id
      text
      created_at
      user {
        id
        username
      }
    }
  }
`;

class MessagesList extends React.Component {
  componentWillMount() {
    this.unsubscribe = this.subscribe(this.props.channelId);
  }

  componentWillReceiveProps({ channelId }) {
    if (this.props.channelId !== channelId) {
      if (this.unsubscribe) {
        this.unsubscribe();
      }
      this.unsubscribe = this.subscribe(channelId);
    }
  }

  componentDidUpdate() {
    if (!this.props.data.loading) {
      this.scrollToBottom();
    }
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  subscribe = channelId =>
    this.props.data.subscribeToMore({
      document: newChannelMessageSubscription,
      variables: {
        channelId,
      },
      updateQuery: (prev, { subscriptionData }) => {
        console.log(prev, subscriptionData);
        if (!subscriptionData) {
          return prev;
        }

        return {
          ...prev,
          channelMessages: [...prev.channelMessages, subscriptionData.data.newChannelMessage],
        };
      },
    });

  scrollToBottom() {
    const { scrollHeight, clientHeight } = this.messageList;
    const maxScrollTop = scrollHeight - clientHeight;
    this.messageList.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
  }

  render() {
    const { data: { loading, channelMessages } } = this.props;
    return loading ? (
      <div />
    ) : (
      <div
        ref={(div) => {
          this.messageList = div;
        }}
        style={{ height: '1vh', overflow: 'auto' }}
      >
        <Comment.Group>
          {channelMessages.map(message => (
            <Message key={`message-${message.id}`} message={message} />
          ))}
        </Comment.Group>
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
