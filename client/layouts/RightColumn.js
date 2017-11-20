import React from 'react';
import { Grid, Input, Icon } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

import { ChannelInfoQuery } from '../components/queries';

import SendMessage from '../components/SendMessage';
import MessagesList from '../components/MessagesList';
import RightHeader from '../components/RightHeader';

class RightColumn extends React.Component {
  componentWillUpdate() {
    this.props.mutate({
      variables: {
        channelId: this.props.match.params.channelId,
      },
    });
  }

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

const addChanelMemberMutation = gql`
  mutation($channelId: Int!) {
    addChannelMember(channelId: $channelId)
  }
`;

export default compose(
  graphql(ChannelInfoQuery, {
    options: props => ({
      variables: {
        channelId: props.match.params.channelId,
      },
    }),
  }),
  graphql(addChanelMemberMutation),
)(RightColumn);
