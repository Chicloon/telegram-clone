import React from 'react';
import { Grid, Input, Icon } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

import { ChannelInfoQuery, MeQuerry } from '../components/queries';

import SendMessage from '../components/SendMessage';
import MessagesList from '../components/MessagesList';
import RightHeader from '../components/RightHeader';

class RightColumn extends React.Component {
  async componentWillMount() {
    await this.props.mutate({
      variables: {
        channelId: this.props.match.params.channelId,
      },
      update: (store, { data: { addChannelMember } }) => {
        const { ok, channel } = addChannelMember;
        if (!ok) {
          return;
        }

        const data = store.readQuery({ query: MeQuerry });
        data.me.channels.push(channel);
        store.writeQuery({ query: MeQuerry, data });
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
    addChannelMember(channelId: $channelId) {
      ok
      channel {
        id
        name
      }
    }
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
