import React from 'react';
import { Grid, Input, Icon } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import { graphql } from 'react-apollo';

import { ChannelInfoQuery } from '../components/queries';

import SendMessage from '../components/SendMessage';
import MessagesList from '../components/MessagesList';
import RightHeader from '../components/RightHeader';

class RightColumn extends React.Component {
  render() {
    const { data: { loading, channelInfo }, match: { params: { channelId } } } = this.props;
    if (!loading && !channelInfo) {
      return <Redirect to="/" />;
    }

    return (
      <Grid.Column width={11} style={{ padding: 0 }}>
        <RightHeader channelId={channelId} />
        {channelInfo && <MessagesList channelId={channelId} />}
        {channelInfo && <SendMessage channelId={channelId} />}
      </Grid.Column>
    );
  }
}

export default graphql(ChannelInfoQuery, {
  options: props => ({
    variables: {
      channelId: props.match.params.channelId,
    },
  }),
})(RightColumn);
