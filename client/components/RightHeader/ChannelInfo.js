import React from 'react';
import { graphql } from 'react-apollo';

import { ChannelInfoQuery } from '../queries';

const ChannelInfo = ({ data: { loading, channelInfo } }) => (
  <div style={{ flexGrow: 2 }}>Channel name: {!loading && channelInfo ? channelInfo.name : ''}</div>
);

export default graphql(ChannelInfoQuery, {
  options: ({ channelId }) => ({
    variables: {
      channelId,
    },
    fetchPolicy: 'network-only',
  }),
})(ChannelInfo);
