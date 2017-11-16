import React from 'react';
import { graphql } from 'react-apollo';
import { Icon } from 'semantic-ui-react';
import ColumnHeaderWrapper from '../../layouts/ColumnHeaderWrapper';

import { ChannelInfoQuery } from '../queries';

class RightHeader extends React.Component {
  render() {
    const { data: { loading, channelInfo } } = this.props;
    return (
      <ColumnHeaderWrapper>
        <div style={{ flexGrow: 2 }}> Channel name: {!loading && channelInfo.name}</div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Icon name="search" size="large" style={{ cursor: 'pointer' }} />
          <Icon
            name="ellipsis vertical"
            size="large"
            style={{ marginLeft: '20px', cursor: 'pointer' }}
          />
        </div>
      </ColumnHeaderWrapper>
    );
  }
}

export default graphql(ChannelInfoQuery, {
  options: ({ channelId }) => ({
    variables: {
      channelId,
    },
    fetchPolicy: 'network-only',
  }),
})(RightHeader);
